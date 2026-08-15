"use client";

import { useRef } from "react";
import { gsap, useIsoLayoutEffect, REDUCED } from "@/lib/gsap";
import { Magnetic, MaskUp, Reveal } from "./ui";

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
      const card = q(".cta-card")[0];

      /* the glow trails the pointer inside the card */
      const gx = gsap.quickTo(glow.current, "x", {
        duration: 1.4,
        ease: "power3",
      });
      const gy = gsap.quickTo(glow.current, "y", {
        duration: 1.4,
        ease: "power3",
      });
      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        gx((e.clientX - r.left - r.width / 2) * 0.4);
        gy((e.clientY - r.top - r.height / 2) * 0.4);
      };
      card.addEventListener("pointermove", onMove, { passive: true });

      /* it breathes even when nothing is moving */
      const pulse = gsap.to(glow.current, {
        scale: 1.16,
        opacity: 0.85,
        duration: 3.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      /* the card rises slightly as it comes into view */
      gsap.from(card, {
        y: 60,
        autoAlpha: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 85%", once: true },
      });

      gsap.fromTo(
        q(".cta-ring"),
        { rotate: -18 },
        {
          rotate: 18,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        },
      );

      return () => {
        card.removeEventListener("pointermove", onMove);
        pulse.kill();
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={root}
      className="relative scroll-mt-24 py-20 md:py-28"
    >
      <div className="u-shell">
        <div className="cta-card relative isolate overflow-hidden rounded-[4px] border border-gold/30 bg-ink px-6 py-14 text-center text-bone shadow-[0_50px_120px_-60px_rgba(20,16,11,0.9)] sm:py-20 md:px-16 md:py-28">
          {/* --- atmosphere, contained by the card --- */}
          <div
            ref={glow}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[110%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(179,132,31,0.5),rgba(201,80,31,0.14)_45%,transparent_68%)] blur-3xl"
          />

          <svg
            className="cta-ring pointer-events-none absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 md:w-[95%]"
            viewBox="0 0 400 400"
            aria-hidden="true"
          >
            <circle
              cx="200"
              cy="200"
              r="196"
              fill="none"
              stroke="#E7C46B"
              strokeOpacity="0.14"
              strokeWidth="0.5"
              strokeDasharray="1 12"
            />
            <circle
              cx="200"
              cy="200"
              r="150"
              fill="none"
              stroke="#E7C46B"
              strokeOpacity="0.07"
              strokeWidth="0.6"
            />
          </svg>

          {/* --- content --- */}
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="u-display text-bone">
              <Reveal
                as="span"
                className="block text-[clamp(2.2rem,11vw,3.6rem)] leading-[0.98] lg:text-[clamp(2.8rem,5.4vw,5.4rem)]"
              >
                Stop guessing.
              </Reveal>
              <MaskUp
                className="mt-1 block"
                innerClassName="u-foil pb-[0.12em] text-[clamp(1.85rem,9vw,3rem)] italic leading-[1.04] lg:text-[clamp(2.2rem,4.4vw,4.4rem)]"
                delay={0.1}
              >
                Start trading with a plan.
              </MaskUp>
            </h2>

            <p className="mt-7 max-w-xl text-[0.9rem] leading-relaxed text-bone/65 md:text-[1.02rem]">
              Join 25,000+ traders who learned structure, liquidity and risk the
              disciplined way. Create your account and take the first step
              today.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
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

            <ul className="mt-11 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/10 pt-7">
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
        </div>
      </div>
    </section>
  );
}
