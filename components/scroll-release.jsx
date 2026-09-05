"use client";

import { useEffect } from "react";

/**
 * Clears the `is-loading` class the document sets before hydration.
 *
 * That class locks the body to 100vh so the landing page cannot be scrolled
 * behind the preloader. Routes without a preloader have nothing to clear it,
 * so they mount this instead.
 */
export default function ScrollRelease() {
  useEffect(() => {
    document.body.classList.remove("is-loading");
  }, []);
  return null;
}
