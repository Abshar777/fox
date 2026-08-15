"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useIsoLayoutEffect } from "@/lib/gsap";
import { LogoMark, LogoFull } from "./logo";
import { Magnetic } from "./ui";

const LINKS = [
  { href: "#about", label: "About us" },
  { href: "#curriculum", label: "Course" },
  { href: "#desk", label: "Live desk" },
  { href: "#mentors", label: "Mentors" },
  { href: "#programmes", label: "Programmes" },
];

/* live London clock — renders a stable placeholder for SSR */
function Clock() {
  const [t, setT] = useState(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="u-mono flex items-center gap-2 text-[0.6rem] tracking-[0.16em] text-ink-45">
      <span className="h-1 w-1 rounded-full bg-rust [animation:tick-pulse_1.6s_ease-in-out_infinite]" />
      LDN {t ?? "--:--:--"}
    </span>
  );
}

export default function Nav() {
  const root = useRef(null);
  const menu = useRef(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  /* condensed skin, hide-on-scroll-down, scroll progress */
  useIsoLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const q = self.selector;
      const bar = q(".nav-bar")[0];

      gsap.set(q(".nav-skin"), { yPercent: -100 });

      ScrollTrigger.create({
        start: "top -90",
        end: 99999,
        onToggle: (s) =>
          gsap.to(q(".nav-skin"), {
            yPercent: s.isActive ? 0 : -100,
            duration: 0.6,
            ease: "power3.out",
          }),
      });

      let last = 0;
      ScrollTrigger.create({
        start: 0,
        end: 99999,
        onUpdate: (s) => {
          const y = s.scroll();
          if (Math.abs(y - last) < 12) return;
          const down = y > last && y > 300;
          gsap.to(bar, {
            yPercent: down ? -115 : 0,
            duration: 0.55,
            ease: "power3.out",
          });
          last = y;
        },
      });

      gsap.to(q(".nav-progress"), {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  /* active section */
  useIsoLayoutEffect(() => {
    const triggers = LINKS.map(({ href }) => {
      const el = document.querySelector(href);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: "top 45%",
        end: "bottom 45%",
        onToggle: (self) => self.isActive && setActive(href),
      });
    }).filter(Boolean);

    return () => triggers.forEach((t) => t.kill());
  }, []);

  /* fullscreen menu */
  useIsoLayoutEffect(() => {
    const node = menu.current;
    if (!node) return;

    const ctx = gsap.context((self) => {
      const q = self.selector;
      const tl = gsap
        .timeline({ paused: true, defaults: { ease: "expo.inOut" } })
        .set(node, { pointerEvents: "auto" })
        .fromTo(
          q(".menu-panel"),
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
        )
        .fromTo(
          q(".menu-item"),
          { yPercent: 115, rotate: 4 },
          {
            yPercent: 0,
            rotate: 0,
            duration: 1,
            stagger: 0.07,
            ease: "power4.out",
          },
          "-=0.65",
        )
        .fromTo(
          q(".menu-foot"),
          { autoAlpha: 0, y: 20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .fromTo(
          q(".menu-fox"),
          { autoAlpha: 0, scale: 0.7, rotate: -18 },
          {
            autoAlpha: 1,
            scale: 1,
            rotate: 0,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.9",
        );

      node.__tl = tl;
    }, node);

    return () => ctx.revert();
  }, []);

  useIsoLayoutEffect(() => {
    const tl = menu.current?.__tl;
    if (!tl) return;
    if (open) {
      tl.play();
      window.__lenis?.stop();
    } else {
      tl.reverse();
      window.__lenis?.start();
      gsap.delayedCall(1.1, () => {
        if (menu.current) menu.current.style.pointerEvents = "none";
      });
    }
  }, [open]);

  return (
    <>
      <div ref={root}>
        <div className="fixed inset-x-0 top-0 z-[70] h-px">
          <div className="nav-progress h-px w-full origin-left scale-x-0 bg-gold" />
        </div>

        <header className="nav-bar fixed inset-x-0 top-0 z-[60] will-change-transform">
          <div className="nav-skin absolute inset-0 border-b border-[var(--rule)] bg-[color-mix(in_srgb,var(--color-bone)_84%,transparent)] backdrop-blur-xl" />

          <div className="u-shell relative flex items-center justify-between gap-6 py-4 md:py-5">
            {/* mark */}
            <a
              href="#top"
              className="group flex shrink-0 items-center gap-3"
              aria-label="Wolfpack Wealth Academy, home"
            >
              <Magnetic strength={0.5}>
                <LogoMark
                  priority
                  className="h-auto w-11 transition-transform duration-700 group-hover:scale-105 md:w-12"
                />
              </Magnetic>
              <span className="hidden leading-none sm:block">
                <span className="u-display block text-[1.4rem] tracking-tight">
                  Wolfpack
                </span>
                <span className="u-eyebrow block text-[0.52rem] text-ink-45">
                  Wealth Academy
                </span>
              </span>
            </a>

            {/* links */}
            <nav className="hidden items-center gap-1 lg:flex">
              {LINKS.map((l) => {
                const on = active === l.href;
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    className="group relative flex items-baseline gap-2 px-3.5 py-2"
                  >
                    <span
                      className={`u-eyebrow transition-colors duration-400 ${
                        on ? "text-ink" : "text-ink-70"
                      }`}
                    >
                      {l.label}
                    </span>
                    <span
                      className={`absolute inset-x-3 bottom-0 h-px origin-left bg-gold transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                        on ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* utilities */}
            <div className="flex shrink-0 items-center gap-4">
              <span className="hidden xl:flex">
                <Clock />
              </span>

              <Magnetic strength={0.25}>
                <a
                  href="#contact"
                  className="u-btn u-btn--solid hidden md:inline-flex"
                  data-cursor="grow"
                >
                  <span>Get started</span>
                </a>
              </Magnetic>

              <button
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-label="Toggle menu"
                data-cursor="grow"
                className="relative z-[110] grid h-11 w-11 place-items-center rounded-full border border-ink/25 transition-colors duration-500 hover:border-gold lg:hidden"
              >
                <span className="relative block h-3 w-5">
                  <span
                    className={`absolute left-0 block h-px w-5 transition-all duration-500 ${
                      open ? "top-1.5 rotate-45 bg-bone" : "top-0 bg-ink"
                    }`}
                  />
                  <span
                    className={`absolute left-0 block h-px w-5 transition-all duration-500 ${
                      open ? "top-1.5 -rotate-45 bg-bone" : "top-3 bg-ink"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* fullscreen menu */}
      <div
        ref={menu}
        className="pointer-events-none fixed inset-0 z-[65]"
        aria-hidden={!open}
      >
        <div className="menu-panel absolute inset-0 bg-ink [clip-path:inset(0%_0%_100%_0%)]">
          <LogoFull
            alt=""
            className="menu-fox absolute -right-[6%] bottom-[8%] h-auto w-[52vmin] opacity-30"
          />

          <div className="u-shell relative flex h-full flex-col justify-center pb-12 pt-24">
            <nav className="flex flex-col">
              {LINKS.map((l) => (
                <div key={l.href} className="js-mask border-b border-white/10">
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="menu-item group flex items-baseline gap-5 py-3"
                  >
                    <span className="u-display text-[13vw] leading-[0.95] text-bone transition-colors duration-500 group-hover:text-gold-lite sm:text-[9vw]">
                      {l.label}
                    </span>
                  </a>
                </div>
              ))}
            </nav>

            <div className="mt-12 flex flex-wrap items-end justify-between gap-8">
              <div className="menu-foot">
                <p className="u-eyebrow mb-2 text-white/40">Enquiries</p>
                <a
                  href="https://wa.me/919074620945"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="u-link u-display text-2xl text-gold-lite"
                >
                  +91 90746 20945
                </a>
              </div>
              <div className="menu-foot">
                <p className="u-eyebrow mb-2 text-white/40">Where</p>
                <p className="u-mono text-sm text-bone">
                  Kochi, Kerala · online &amp; offline
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
