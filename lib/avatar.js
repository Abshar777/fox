/**
 * Deterministic initials + colour for authors without a photo.
 * Pure and server-safe so it can run inside prerendered pages.
 */

const PALETTE = [
  { bg: "#c69732", fg: "#14100b" },
  { bg: "#e0653a", fg: "#f4efe4" },
  { bg: "#7d5a10", fg: "#f6e6bc" },
  { bg: "#322718", fg: "#e7c46b" },
  { bg: "#e7c46b", fg: "#14100b" },
];

/** Up to two initials: "Adhil Rahman" -> "AR". */
export function initialsOf(name) {
  const parts = String(name ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Stable colour pair for a name — same author always gets the same swatch. */
export function colorsOf(name) {
  const key = String(name ?? "");
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return PALETTE[hash % PALETTE.length];
}
