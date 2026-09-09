/**
 * Admin session tokens.
 *
 * A single shared password gates /admin; a successful sign-in mints an
 * HMAC-signed, expiring token stored in an httpOnly cookie. There is no user
 * table, so the token carries only an expiry the signature is what makes it
 * unforgeable.
 *
 * Implemented on Web Crypto (not `node:crypto`) so the exact same module runs
 * inside `proxy.js`, which executes on the Edge runtime.
 */

export const SESSION_COOKIE = "wolfpack_admin";

/** Sessions last a week; the expiry is signed into the token itself. */
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

const encoder = new TextEncoder();

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 16) return null;
  return value;
}

/** True when both admin env vars are present, so the UI can explain if not. */
export function isAuthConfigured() {
  return Boolean(secret() && process.env.ADMIN_PASSWORD);
}

function toBase64Url(bytes) {
  let binary = "";
  for (const byte of new Uint8Array(bytes)) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(payload, key) {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return toBase64Url(
    await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(payload)),
  );
}

/** Length-independent equality, to avoid leaking a match through timing. */
function safeEqual(a, b) {
  const left = encoder.encode(a);
  const right = encoder.encode(b);
  // Compare a fixed number of bytes either way; the length check is folded
  // into the result rather than short-circuiting.
  let diff = left.length ^ right.length;
  const max = Math.max(left.length, right.length);
  for (let i = 0; i < max; i += 1) {
    diff |= (left[i] ?? 0) ^ (right[i] ?? 0);
  }
  return diff === 0;
}

/** Compare a submitted password against ADMIN_PASSWORD. */
export function verifyPassword(input) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(String(input ?? ""), expected);
}

/** Mint a signed token valid for `SESSION_MAX_AGE`. */
export async function createSessionToken() {
  const key = secret();
  if (!key) throw new Error("AUTH_SECRET is not set.");

  const expiresAt = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = String(expiresAt);
  return `${payload}.${await hmac(payload, key)}`;
}

/** Verify signature and expiry. Returns false for anything malformed. */
export async function verifySessionToken(token) {
  const key = secret();
  if (!key || typeof token !== "string") return false;

  const separator = token.indexOf(".");
  if (separator < 1) return false;

  const payload = token.slice(0, separator);
  const signature = token.slice(separator + 1);

  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;

  return safeEqual(signature, await hmac(payload, key));
}

/** Cookie options shared by sign-in and sign-out. */
export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}
