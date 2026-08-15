"use client";

import { useRef } from "react";
import { gsap, useIsoLayoutEffect, REDUCED } from "@/lib/gsap";
import { Magnetic, Marquee, MaskUp, Reveal } from "./ui";
import { CandleGlyph } from "./icons";

const PROOF = [
  "Beginner friendly",
  "Mentor led",
  "Online & offline",
  "Kochi based",
];

export default function Cta() {
  const root = useRef(null);
  const glow = useRef(null);

  useIsoLayoutEffect(() => {
    if (!root.current || REDUCED()) return;

    const ctx = gsap.context((self) => {
      const q = self.selector;
      const section = root.current;

      /* the glow trails the pointer across the section */
      const gx = gsap.quickTo(glow.current, "x", {
        duration: 1.4,
        ease: "power3",
      });
      const gy = gsap.quickTo(glow.current, "y", {
        duration: 1.4,
        ease: "power3",
      });
      const onMove = (e) => {
        const r = section.getBoundingClientRect();
        gx((e.clientX - r.left - r.width / 2) * 0.45);
        gy((e.clientY - r.top - r.height / 2) * 0.45);
      };
      section.addEventListener("pointermove", onMove, { passive: true });

      /* it breathes even when nothing is moving */
      const pulse = gsap.to(glow.current, {
        scale: 1.18,
        opacity: 0.85,
        duration: 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      /* depth: ring and backdrop type drift against the scroll */
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        })
        .fromTo(
          q(".cta-ring"),
          { rotate: -22 },
          { rotate: 22, ease: "none" },
          0,
        )
        .fromTo(
          q(".cta-backdrop"),
          { yPercent: 12 },
          { yPercent: -12, ease: "none" },
          0,
        );

      return () => {
        section.removeEventListener("pointermove", onMove);
        pulse.kill();
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={root}
      className="relative isolate scroll-mt-24 overflow-hidden bg-ink py-28 text-bone md:py-40"
    >
      {/* --- atmosphere --- */}
      <div
        ref={glow}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[78vmin] w-[78vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(179,132,31,0.5),rgba(201,80,31,0.16)_45%,transparent_68%)] blur-3xl"
      />

      <svg
        className="cta-ring pointer-events-none absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 400 400"
        aria-hidden="true"
      >
        <circle
          cx="200"
          cy="200"
          r="196"
          fill="none"
          stroke="#E7C46B"
          strokeOpacity="0.16"
          strokeWidth="0.5"
          strokeDasharray="1 12"
        />
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="#E7C46B"
          strokeOpacity="0.08"
          strokeWidth="0.6"
        />
      </svg>

      {/* --- oversized backdrop type --- */}
      <div className="cta-backdrop pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none opacity-[0.055]">
        <Marquee speed={52}>
          {["Discipline", "Structure", "Patience", "Process"].map((w, i) => (
            <span key={`${w}-${i}`} className="flex shrink-0 items-center px-8">
              <span className="u-display text-[16vw] leading-none text-bone md:text-[10vw]">
                {w}
              </span>
              <CandleGlyph className="ml-8 h-[6vw] w-[6vw] text-gold-lite md:h-[3.4vw] md:w-[3.4vw]" />
            </span>
          ))}
        </Marquee>
      </div>

      {/* --- content --- */}
      <div className="u-shell relative z-10 flex flex-col items-center text-center">
        <p className="u-eyebrow mb-6 flex items-center gap-3 text-gold-lite">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rust opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rust" />
          </span>
          Enrolling now
        </p>

        <h2 className="u-display text-bone">
          <Reveal
            as="span"
            className="block text-[clamp(2.4rem,13vw,4.2rem)] leading-[0.95] lg:text-[clamp(3rem,6.4vw,6.4rem)]"
          >
            Stop guessing.
          </Reveal>
          <MaskUp
            className="mt-1 block"
            innerClassName="u-foil pb-[0.12em] text-[clamp(2rem,10.5vw,3.4rem)] italic leading-[1.02] lg:text-[clamp(2.4rem,5.2vw,5.2rem)]"
            delay={0.1}
          >
            Start trading with a plan.
          </MaskUp>
        </h2>

        <p className="mt-8 max-w-xl text-[0.9rem] leading-relaxed text-bone/65 md:text-[1.02rem]">
          Join 25,000+ traders who learned structure, liquidity and risk the
          disciplined way. Create your account and take the first step today.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Magnetic strength={0.28}>
            <a
              href="https://client.mbfx.co/register?ref=3A52F2"
              target="_blank"
              rel="noreferrer noopener"
              className="u-btn border-gold bg-gold text-ink"
              data-cursor="grow"
            >
              <span>Create your account</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.28}>
            <a
              href="https://wa.me/919074620945"
              target="_blank"
              rel="noreferrer noopener"
              className="u-btn border-white/25 text-bone"
              data-cursor="grow"
            >
              <span>Talk to a mentor</span>
            </a>
          </Magnetic>
        </div>

        {/* --- reassurance strip --- */}
        <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/10 pt-8">
          {PROOF.map((p) => (
            <li
              key={p}
              className="u-mono flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.16em] text-bone/45"
            >
              <span className="h-1 w-1 rounded-full bg-gold-lite/70" />
              {p}
            </li>
          ))}
        </ul>

        <p className="u-mono mt-6 text-[0.58rem] leading-relaxed tracking-[0.14em] text-bone/30">
          TRADING INVOLVES RISK. NO RETURNS ARE GUARANTEED.
        </p>
      </div>
    </section>
  );
}
