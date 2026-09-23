/**
 * One registry for the site's primary navigation, shared by the header, the
 * fullscreen menu and the footer, so a new section is registered in one place.
 *
 * Homepage sections are stored as bare hashes rather than absolute URLs: on
 * `/` they stay hashes so Lenis can intercept them for smooth scrolling, and
 * anywhere else they are resolved against `/` for a real navigation.
 */

/** @typedef {{ label: string, hash?: string, href?: string }} NavLink */

/** @type {NavLink[]} */
export const NAV_LINKS = [
  { label: "About us", hash: "#about" },
  { label: "Course", hash: "#courses" },
  { label: "Programmes", hash: "#programmes" },
  { label: "Founders", hash: "#founders" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact us", hash: "#contact" },
];

/** Dedicated programme pages exposed from the Programmes navigation menu. */
export const PROGRAMME_LINKS = [
  { label: "Trading Course", href: "/programmes/trading-course" },
  { label: "Premium Community", href: "/programmes/premium-community" },
  { label: "AI Wolf Indicator", href: "/programmes/ai-wolf-indicator" },
  { label: "Multi Account Management", href: "/programmes/mam" },
  { label: "Financial Advisor", href: "/programmes/financial-advisor" },
];

/** Resolve a link for the page it is being rendered on. */
export function resolveHref(link, pathname) {
  if (link.href) return link.href;
  return pathname === "/" ? link.hash : `/${link.hash}`;
}

/** True when this link points at the page currently being viewed. */
export function isActiveLink(link, pathname) {
  if (!link.href) return false;
  return pathname === link.href || pathname.startsWith(`${link.href}/`);
}
