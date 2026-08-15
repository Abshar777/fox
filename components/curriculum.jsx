"use client";

import { useRef } from "react";
import { gsap, useIsoLayoutEffect, REDUCED } from "@/lib/gsap";
import { Reveal, SectionHead } from "./ui";
import { FoxMark } from "./fox-art";

const MODULES = [
  {
    n: "00",
    title: "Foundations",
    weeks: "Foundation",
    items: [
      "How the Forex market works",
      "Platform & charting setup",
      "Building your trading plan",
      "How the programme runs",
    ],
  },
  {
    n: "01",
    title: "Market Structure",
    weeks: "Core",
    items: [
      "Swing anatomy & trend reads",
      "Balance, imbalance, delivery",
      "Higher timeframe narrative",
      "Session profiles",
    ],
  },
  {
    n: "02",
    title: "Liquidity & Price Action",
    weeks: "Core",
    items: [
      "Where stops actually rest",
      "Inducement & the false break",
      "Sweep, reclaim, continuation",
      "Reading the reaction candle",
    ],
  },
  {
    n: "03",
    title: "Entry & Execution",
    weeks: "Applied",
    items: [
      "Mechanical entry models",
      "Confirmation vs anticipation",
      "Timeframe alignment",
      "Backtesting protocol",
    ],
  },
  {
    n: "04",
    title: "Risk Management",
    weeks: "Applied",
    items: [
      "Position sizing models",
      "Correlation & exposure",
      "Drawdown limits",
      "Capital protection first",
    ],
  },
  {
    n: "05",
    title: "Trading Psychology",
    weeks: "Applied",
    items: [
      "Discipline over emotion",
      "Handling losing streaks",
      "Patience & the 5% Club mindset",
      "Journalling habits",
    ],
  },
  {
    n: "06",
    title: "Live Market Analysis",
    weeks: "Live",
    items: [
      "Real time Forex & Gold sessions",
      "Trade along with a mentor",
      "Live trade reviews",
      "Community signals & discussion",
    ],
  },
  {
    n: "07",
    title: "AI Wolf Indicator",
    weeks: "Tools",
    items: [
      "AI assisted market insight",
      "Reading high probability setups",
      "Combining AI with your analysis",
      "Built for working professionals",
    ],
  },
];

export default function Curriculum() {
  const root = useRef(null);
  const track = useRef(null);

  useIsoLayoutEffect(() => {
    if (REDUCED()) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const el = track.current;
        const getDistance = () => el.scrollWidth - window.innerWidth + 80;

        const tween = gsap.to(el, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            start: "top top",
            end: () => "+=" + getDistance(),
          },
        });

        gsap.to(".curriculum-bar", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + getDistance(),
            scrub: 0.4,
          },
        });

        return () => tween.kill();
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="curriculum"
      ref={root}
      className="relative scroll-mt-0 overflow-hidden bg-paper py-16 lg:py-0"
    >
      <div className="relative flex min-h-0 flex-col lg:h-[100svh] lg:justify-center">
        <div className="u-shell shrink-0 lg:pt-10">
          <SectionHead label="Curriculum" />
          <Reveal
            as="h2"
            className="u-display mt-6 max-w-3xl text-[clamp(2rem,10vw,3.4rem)] leading-[0.95] md:mt-8 md:text-[clamp(2.4rem,4.6vw,4.4rem)]"
          >
            The learning path, end to end.
          </Reveal>
        </div>

        {/* horizontal track */}
        <div className="mt-10 md:mt-12">
          <div
            ref={track}
            className="flex gap-5 overflow-x-auto px-[var(--gutter)] pb-4 will-change-transform lg:overflow-visible lg:pb-0
                       [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {MODULES.map((m) => (
              <article
                key={m.n}
                className="group relative flex w-[76vw] shrink-0 flex-col justify-between border border-[var(--rule)] bg-bone p-6
                           transition-colors duration-500 hover:bg-ink sm:w-[46vw] md:h-[46vh] md:w-[clamp(300px,25vw,400px)] md:p-8"
                data-cursor="grow"
              >
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="u-display text-[3.4rem] leading-none text-gold transition-colors duration-500 group-hover:text-gold-lite md:text-[4rem]">
                      {m.n}
                    </span>
                    <span className="u-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-45 transition-colors duration-500 group-hover:text-bone/60">
                      {m.weeks}
                    </span>
                  </div>
                  <h3 className="u-display mt-4 text-[2rem] leading-[0.98] transition-colors duration-500 group-hover:text-bone md:text-[2.3rem]">
                    {m.title}
                  </h3>
                </div>

                <ul className="mt-7 space-y-2.5 border-t border-[var(--rule)] pt-5 transition-colors duration-500 group-hover:border-white/15">
                  {m.items.map((it) => (
                    <li
                      key={it}
                      className="flex gap-3 text-[0.86rem] leading-snug text-ink-70 transition-colors duration-500 group-hover:text-bone/70"
                    >
                      <span className="mt-[0.45em] block h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            ))}

            {/* closing panel */}
            <article className="relative flex w-[76vw] shrink-0 flex-col items-start justify-center gap-6 border border-gold bg-ink p-8 sm:w-[46vw] md:h-[46vh] md:w-[clamp(300px,25vw,400px)]">
              <FoxMark className="h-16 w-16" id="cur" />
              <h3 className="u-display text-[2.2rem] leading-[0.98] text-bone">
                Then the market is yours.
              </h3>
              <p className="text-sm leading-relaxed text-bone/60">
                Graduates stay in the community: market discussions, journal
                reviews and mentorship continue after the course.
              </p>
              <a
                href="#programmes"
                className="u-btn border-gold text-gold-lite"
              >
                <span>See programmes</span>
              </a>
            </article>
          </div>
        </div>

        {/* progress rail */}
        <div className="u-shell mt-8 hidden shrink-0 lg:block lg:pb-10">
          <div className="flex items-center gap-5">
            <span className="u-mono text-[0.6rem] tracking-[0.2em] text-ink-45">
              START
            </span>
            <div className="h-px flex-1 bg-[var(--rule)]">
              <div className="curriculum-bar h-px w-full origin-left scale-x-0 bg-gold" />
            </div>
            <span className="u-mono text-[0.6rem] tracking-[0.2em] text-ink-45">
              CERTIFIED
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
