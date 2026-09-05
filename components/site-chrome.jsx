"use client";

import { LoaderProvider } from "./loader-context";
import SmoothScroll from "./smooth-scroll";
import Cursor from "./cursor";
import Nav from "./nav";
import Footer from "./footer";

/**
 * Shared chrome for routes other than the homepage.
 *
 * Same texture, cursor and smooth scrolling as the landing page, minus the
 * preloader — a full-screen intro animation is right once on arrival, and
 * wrong on every article a reader opens afterwards. `initialReady` stands in
 * for the preloader's completion so scrolling is released immediately.
 */
export default function SiteChrome({ children, footer = true }) {
  return (
    <LoaderProvider initialReady>
      <SmoothScroll />
      <Cursor />

      <div className="u-grain" aria-hidden="true" />
      <div className="u-vignette" aria-hidden="true" />

      <Nav />

      <main>{children}</main>

      {footer ? <Footer /> : null}
    </LoaderProvider>
  );
}
