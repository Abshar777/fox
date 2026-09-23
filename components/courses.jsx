"use client";

import Link from "next/link";
import { FadeUp, Magnetic, Reveal, SectionHead } from "./ui";
import { CandleGlyph, TrendGlyph } from "./icons";

const COURSES = [
  {
    n: "01",
    title: "Forex Blueprint",
    lead: "Structure before opinion.",
    body: "Designed for complete beginners who want to learn forex and gold trading the right way, with structure, discipline and the risk-first mindset of the top 5% of traders.",
    duration: "10–15 days · online & offline",
    tags: ["Market basics", "Gold trading", "Risk management"],
    cta: "Explore the course",
    href: "/programmes/trading-course",
  },
  {
    n: "02",
    title: "Master PowerHouse",
    lead: "Trade like the institutions.",
    body: "You've learned the basics, now learn what the institutions know: liquidity, institutional order flow and advanced price action.",
    duration: "30–40 days · online & offline",
    tags: ["Institutional concepts", "Liquidity analysis", "Advanced price action"],
    cta: "Level up",
    href: "/programmes/trading-course",
  },
];

export default function Courses() {
  return (
    <section id="courses" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="u-shell">
        <SectionHead label="Courses" />

        <Reveal
          as="h2"
          className="u-display mt-10 max-w-3xl text-[clamp(2rem,10vw,3.4rem)] leading-[0.95] lg:text-[clamp(2.6rem,5vw,4.2rem)]"
        >
          Two courses. One clear way in.
        </Reveal>

        <p className="u-eyebrow mt-6 max-w-xl text-ink-45">
          A structured path from market foundations to institutional
          concepts, with live mentorship and real practice. No detours, no
          filler modules.
        </p>
      </div>

      <FadeUp
        as="div"
        className="u-shell mt-14 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8"
        y={56}
        stagger={0.14}
      >
        {COURSES.map((c) => (
          <article
            key={c.n}
            className="u-card group relative flex flex-col overflow-hidden rounded-[2px] p-8 md:p-11"
          >
            <CandleGlyph className="pointer-events-none absolute -right-3 -top-3 h-28 w-28 text-gold opacity-[0.08] transition-transform duration-700 group-hover:scale-110" />

            <div className="relative flex items-center justify-between">
              <span className="u-mono text-[0.68rem] tracking-[0.2em] text-gold">
                {c.n} / 02
              </span>
              <span className="u-mono rounded-full border border-[var(--rule)] px-3 py-1.5 text-[0.6rem] uppercase tracking-widest text-ink-45">
                {c.duration}
              </span>
            </div>

            <h3 className="u-display relative mt-6 text-[clamp(2rem,9vw,2.8rem)] leading-[0.98] md:text-[clamp(1.9rem,3vw,2.6rem)]">
              {c.title}
            </h3>
            <p className="u-display relative mt-3 text-xl italic text-gold-deep">
              {c.lead}
            </p>

            <p className="relative mt-5 max-w-md leading-relaxed text-ink-70">
              {c.body}
            </p>

            <ul className="relative mt-7 flex flex-wrap gap-2">
              {c.tags.map((t) => (
                <li
                  key={t}
                  className="u-mono rounded-full border border-[var(--rule)] px-3 py-1.5 text-[0.6rem] uppercase tracking-widest text-ink-45"
                >
                  {t}
                </li>
              ))}
            </ul>

            <div className="relative mt-9">
              <Magnetic strength={0.22} className="inline-block">
                <Link
                  href={c.href}
                  data-cursor="grow"
                  className="group/cta u-mono inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.16em] text-ink transition-colors duration-500 hover:text-gold-deep"
                >
                  {c.cta}
                  <TrendGlyph className="h-4 w-4 transition-transform duration-500 group-hover/cta:translate-x-1" />
                </Link>
              </Magnetic>
            </div>
          </article>
        ))}
      </FadeUp>
    </section>
  );
}
