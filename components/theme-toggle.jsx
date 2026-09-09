"use client";

import { useEffect, useState } from "react";

/**
 * Light/dark switch. Dark is the default (no attribute); light mode sets
 * data-theme="light" on <html>, mirrored to localStorage and restored
 * before paint by the inline script in app/layout.js.
 */
export default function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.dataset.theme === "light");
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    if (next) {
      document.documentElement.dataset.theme = "light";
    } else {
      delete document.documentElement.dataset.theme;
    }
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {
      /* private mode theme just won't persist */
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
      aria-pressed={light}
      data-cursor="grow"
      className="grid h-11 w-11 place-items-center rounded-full border border-ink/25 text-ink transition-colors duration-500 hover:border-gold hover:text-gold"
    >
      {light ? (
        /* moon */
        <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
          <path
            d="M15.5 12.2A6.6 6.6 0 0 1 7.8 4.5a6.6 6.6 0 1 0 7.7 7.7Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        /* sun */
        <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
          <circle
            cx="10"
            cy="10"
            r="3.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
            <path d="M10 1.8v2.1M10 16.1v2.1M1.8 10h2.1M16.1 10h2.1M4.2 4.2l1.5 1.5M14.3 14.3l1.5 1.5M15.8 4.2l-1.5 1.5M5.7 14.3l-1.5 1.5" />
          </g>
        </svg>
      )}
    </button>
  );
}
