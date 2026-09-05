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
  { label: "Course", hash: "#programmes" },
  { label: "Founders", hash: "#founders" },
  { label: "Blogs", href: "/blog" },
  { label: "Contact us", hash: "#contact" },
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
