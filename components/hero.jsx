"use client";

import { useRef } from "react";
import { gsap, useIsoLayoutEffect, REDUCED } from "@/lib/gsap";
import { useLoader } from "./loader-context";
import { Magnetic } from "./ui";
import { CandleGlyph } from "./icons";

const FACTS = [
  ["25,000+", "students empowered"],
  ["5+", "expert mentors"],
  ["98%", "learner satisfaction"],
];

export default function Hero() {
  const root = useRef(null);
  const { ready } = useLoader();

  /* intro — begins while the preloader curtains are still lifting */
  useIsoLayoutEffect(() => {
    if (!ready || !root.current) return;

    const ctx = gsap.context((self) => {
      const q = self.selector;

      if (REDUCED()) {
        gsap.set(q(".hero-in, .hero-line-i"), {
          autoAlpha: 1,
          yPercent: 0,
          y: 0,
        });
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .fromTo(
          q(".hero-crest"),
          { autoAlpha: 0, scaleY: 0 },
          { autoAlpha: 1, scaleY: 1, duration: 1.2, ease: "expo.inOut" },
          0,
        )
        .fromTo(
          q(".hero-line-i"),
          { yPercent: 122, rotate: 2.5 },
          { yPercent: 0, rotate: 0, duration: 1.5, stagger: 0.12 },
          0.1,
        )
        .fromTo(
          q(".hero-ring"),
          { autoAlpha: 0, scale: 0.82 },
          { autoAlpha: 1, scale: 1, duration: 2, ease: "expo.out" },
          0.15,
        )
        .fromTo(
          q(".hero-in"),
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 1.05, stagger: 0.08 },
          0.55,
        );
    }, root);

    return () => ctx.revert();
  }, [ready]);

  /* scroll choreography */
  useIsoLayoutEffect(() => {
    if (REDUCED()) return;

    const ctx = gsap.context((self) => {
      const q = self.selector;

      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        })
        .to(q(".hero-l1"), { xPercent: -5, ease: "none" }, 0)
        .to(q(".hero-l2"), { xPercent: 5, ease: "none" }, 0)
        .to(q(".hero-ring"), { rotate: 42, scale: 1.12, ease: "none" }, 0)
        .to(q(".hero-support"), { y: 70, autoAlpha: 0.2, ease: "none" }, 0);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-10 pt-24 md:pb-14 md:pt-28"
    >
      {/* ---------- atmosphere ---------- */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(246,230,188,0.85),transparent_58%)] blur-2xl" />

      <svg
        className="hero-ring pointer-events-none absolute left-1/2 top-1/2 h-[112vmin] w-[112vmin] -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 400 400"
        aria-hidden="true"
      >
        <circle
          cx="200"
          cy="200"
          r="196"
          fill="none"
          stroke="#B3841F"
          strokeOpacity="0.28"
          strokeWidth="0.6"
          strokeDasharray="1 10"
        />
        <circle
          cx="200"
          cy="200"
          r="158"
          fill="none"
          stroke="#14100B"
          strokeOpacity="0.07"
          strokeWidth="0.7"
        />
        <circle
          cx="200"
          cy="200"
          r="122"
          fill="none"
          stroke="#B3841F"
          strokeOpacity="0.16"
          strokeWidth="0.8"
          strokeDasharray="70 340"
        />
      </svg>

      {/* ---------- centred headline ---------- */}
      <div className="u-shell relative z-10 flex flex-col items-center justify-center text-center">
        <div className="hero-crest mb-4 flex origin-top flex-col items-center gap-2.5 md:mb-6 md:gap-3">
          <span className="block h-7 w-px bg-[linear-gradient(180deg,transparent,var(--color-gold))] md:h-9" />
          <CandleGlyph className="h-4 w-4 text-gold md:h-5 md:w-5" />
        </div>

        <p className="hero-in js-fade u-eyebrow mb-5 text-ink-45 md:mb-7">
          The best forex trading academy in Kochi, Kerala
        </p>

        <h1 className="u-display text-ink">
          <span className="js-mask hero-l1">
            <span className="hero-line-i block text-[clamp(2rem,min(11vw,13vh),4.4rem)] leading-[0.95] lg:text-[clamp(3rem,min(7vw,12vh),8rem)]">
              Your trusted
            </span>
          </span>
          <span className="js-mask hero-l2 mt-2 block">
            <span className="hero-line-i u-foil block pb-[0.1em] text-[clamp(2rem,min(11vw,13vh),4.4rem)] italic leading-[1] lg:text-[clamp(3rem,min(7vw,12vh),8rem)]">
              forex trading academy.
            </span>
          </span>
        </h1>

        <div className="hero-support mt-6 flex flex-col items-center md:mt-8">
          <p className="hero-in js-fade max-w-sm text-[0.82rem] leading-relaxed text-ink-70 md:max-w-2xl md:text-[0.98rem]">
            <span className="md:hidden">
              Structured Forex education, live mentorship and real time market
              analysis, for traders who want clarity and discipline.
            </span>
            <span className="hidden md:inline">
              Wolfpack Wealth Academy helps aspiring traders build the
              knowledge, discipline and confidence to succeed in today&rsquo;s
              financial markets, through structured education, live mentorship,
              real time market analysis and professional risk management.
            </span>
          </p>

          <div className="hero-in js-fade mt-5 flex flex-wrap justify-center gap-3 md:mt-7">
            <Magnetic strength={0.3}>
              <a
                href="#programmes"
                className="u-btn u-btn--solid"
                data-cursor="grow"
              >
                <span>Explore programmes</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a
                href="#contact"
                className="u-btn u-btn--ghost"
                data-cursor="grow"
              >
                <span>Contact us</span>
              </a>
            </Magnetic>
          </div>

          <dl className="hero-in js-fade mt-7 grid w-full max-w-md grid-cols-3 items-start gap-x-3 sm:max-w-xl sm:gap-x-10 md:mt-9">
            {FACTS.map(([k, v]) => (
              <div key={v} className="text-center">
                <dt className="u-display text-[1.7rem] leading-none text-gold-deep md:text-[2.2rem]">
                  {k}
                </dt>
                <dd className="u-mono mt-1.5 text-[0.55rem] uppercase tracking-[0.18em] text-ink-45">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
