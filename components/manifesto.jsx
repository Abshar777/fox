"use client";

import { useRef } from "react";
import { gsap, SplitText, useIsoLayoutEffect, REDUCED } from "@/lib/gsap";
import { FoxMark } from "./fox-art";
import { SectionHead } from "./ui";

const COPY =
  "The financial markets reward preparation, discipline and consistency, not emotion. Successful trading goes beyond strategies; it is about building the mindset of the 5% Club, where discipline, patience and continuous learning drive long term success. You learn not just what to do, but why the market moves.";

export default function Manifesto() {
  const root = useRef(null);
  const para = useRef(null);

  useIsoLayoutEffect(() => {
    const node = para.current;
    if (!node) return;

    if (REDUCED()) {
      gsap.set(node, { opacity: 1 });
      return;
    }

    let split;
    const ctx = gsap.context(() => {
      const run = () => {
        split = SplitText.create(node, {
          type: "words,lines",
          autoSplit: true,
          onSplit(self) {
            return gsap.fromTo(
              self.words,
              { opacity: 0.13 },
              {
                opacity: 1,
                ease: "none",
                stagger: 0.6,
                scrollTrigger: {
                  trigger: root.current,
                  start: "top 68%",
                  end: "bottom 72%",
                  scrub: 0.8,
                },
              },
            );
          },
        });
      };
      document.fonts?.ready.then(run) ?? run();

      gsap.to(".manifesto-fox", {
        rotate: 26,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, root);

    return () => {
      split?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={root}
      className="relative scroll-mt-24 py-24 md:py-36"
    >
      <div className="u-shell">
        <SectionHead label="Our Philosophy" />

        <div className="relative mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-2">
            <FoxMark
              className="manifesto-fox h-20 w-20 opacity-80 md:h-28 md:w-28"
              id="man"
            />
          </div>

          <p
            ref={para}
            className="u-display text-[clamp(1.5rem,7.4vw,2.6rem)] leading-[1.06] text-ink lg:col-span-10 lg:text-[clamp(1.9rem,3.5vw,3.4rem)]"
          >
            {COPY}
          </p>
        </div>
      </div>
    </section>
  );
}
