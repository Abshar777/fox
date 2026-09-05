import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

/** True when the caller presents a valid, unexpired session cookie. */
export async function hasSession() {
  const store = await cookies();
  return verifySessionToken(store.get(SESSION_COOKIE)?.value);
}

/**
 * Guard for every admin page and mutating action.
 *
 * `proxy.js` already redirects unauthenticated browsers away from /admin, but
 * Server Actions are POST endpoints that can be invoked directly, so each one
 * re-checks here rather than trusting that the proxy ran.
 */
export async function requireSession() {
  if (!(await hasSession())) redirect("/admin/login");
}
