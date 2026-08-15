"use client";

import { Counter, FadeUp } from "./ui";

const STATS = [
  { to: 25000, suffix: "+", label: "Students empowered", note: "and counting" },
  { to: 5, suffix: "+", label: "Expert mentors", note: "live guidance" },
  {
    to: 50,
    suffix: "+",
    label: "Programmes & workshops",
    note: "online & offline",
  },
  {
    to: 98,
    suffix: "%",
    label: "Learner satisfaction",
    note: "community rated",
  },
];

export default function Stats() {
  return (
    <section className="relative bg-paper">
      <FadeUp
        as="div"
        className="u-shell grid grid-cols-2 lg:grid-cols-4"
        selector=".stat"
        stagger={0.12}
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`stat min-w-0 px-3 py-9 md:px-6 md:py-14 ${
              i % 2 === 1 ? "border-l border-[var(--rule)]" : ""
            } ${i > 1 ? "border-t border-[var(--rule)] lg:border-t-0" : ""} ${
              i === 2 ? "lg:border-l" : ""
            }`}
          >
            <p className="u-display text-[clamp(1.7rem,8.5vw,2.7rem)] leading-[0.9] text-ink md:text-[clamp(2rem,4.6vw,4rem)]">
              <Counter to={s.to} decimals={s.decimals ?? 0} suffix={s.suffix} />
            </p>
            <p className="u-eyebrow mt-4 text-[0.58rem] tracking-[0.13em] text-ink-70 md:text-[0.68rem] md:tracking-[0.2em]">
              {s.label}
            </p>
            <p className="u-mono mt-1.5 text-[0.58rem] text-ink-45 md:text-[0.62rem]">
              {s.note}
            </p>
          </div>
        ))}
      </FadeUp>
    </section>
  );
}
