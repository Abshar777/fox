"use client";

import { useRef } from "react";
import { gsap, useIsoLayoutEffect, REDUCED } from "@/lib/gsap";
import { Reveal, Magnetic, MaskUp } from "./ui";
import FoxHead from "./fox-head";

export default function Cta() {
  const root = useRef(null);

  useIsoLayoutEffect(() => {
    if (REDUCED()) return;

    const ctx = gsap.context((self) => {
      const q = self.selector;

      gsap.fromTo(
        q(".cta-fox"),
        { yPercent: 18, scale: 0.86 },
        {
          yPercent: -12,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        },
      );

      gsap.fromTo(
        q(".cta-glow"),
        { scale: 0.7, opacity: 0.4 },
        {
          scale: 1.15,
          opacity: 0.9,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "center center",
            scrub: 1,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={root}
      className="relative scroll-mt-24 overflow-hidden bg-bone py-28 md:py-40"
    >
      <div className="cta-glow pointer-events-none absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(246,230,188,0.9),transparent_66%)] blur-2xl" />

      <div className="u-shell relative grid items-center gap-14 lg:grid-cols-12">
        <div className="order-2 lg:order-1 lg:col-span-7">
          <p className="u-eyebrow mb-6 text-gold">Get started</p>

          <Reveal
            as="h2"
            className="u-display text-[clamp(2.2rem,12.5vw,3.8rem)] leading-[0.92] lg:text-[clamp(2.8rem,5.6vw,5.6rem)]"
          >
            Create your trading account.
          </Reveal>
          <MaskUp
            className="mt-1"
            innerClassName="u-display u-foil pb-[0.12em] text-[clamp(1.8rem,9.5vw,3rem)] italic leading-[1] lg:text-[clamp(2.1rem,4.2vw,4.2rem)]"
            delay={0.12}
          >
            Start your trading journey.
          </MaskUp>

          <p className="mt-8 max-w-xl text-[0.85rem] leading-relaxed text-ink-70 md:text-base">
            Start with the right foundation. Create your account and get the
            guidance you need to understand the market, build a clear trading
            plan, and execute with confidence and discipline.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Magnetic strength={0.26}>
              <a
                href="https://client.mbfx.co/register?ref=3A52F2"
                target="_blank"
                rel="noreferrer noopener"
                className="u-btn u-btn--solid"
                data-cursor="grow"
              >
                <span>Create account</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.26}>
              <a
                href="https://wa.me/919074620945"
                target="_blank"
                rel="noreferrer noopener"
                className="u-btn u-btn--ghost"
                data-cursor="grow"
              >
                <span>Talk on WhatsApp</span>
              </a>
            </Magnetic>
          </div>

          <p className="u-mono mt-6 text-[0.62rem] tracking-widest text-ink-45">
            KOCHI, KERALA · ONLINE & OFFLINE TRAINING
          </p>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:col-span-5">
          <FoxHead
            id="cta"
            className="cta-fox h-[52vw] w-[52vw] max-h-[440px] max-w-[440px] lg:h-[30vw] lg:w-[30vw]"
          />
        </div>
      </div>
    </section>
  );
}
