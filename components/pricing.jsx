"use client";

import { FadeUp, Magnetic, Reveal, SectionHead } from "./ui";
import { FoxMark } from "./fox-art";
import { TrendGlyph } from "./icons";

/**
 * The five Wolfpack offerings, laid out as a bento grid.
 * No prices are published on the source site, so none are invented here —
 * every tile routes to an enquiry instead.
 */
const PROGRAMMES = [
  {
    n: "01",
    name: "Trading Course",
    line: "Build the skills, confidence and discipline to trade the markets through structured Forex education, expert mentorship and practical real market experience.",
    features: [
      "Structured curriculum for all levels",
      "Market structure, liquidity & price action",
      "Live market analysis and trade reviews",
      "Trading psychology & risk management",
    ],
    cta: "Explore the course",
    size: "hero",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    n: "02",
    name: "Premium Community",
    line: "An exclusive trading community for daily signals, expert insights, live discussions and continued mentorship.",
    features: [
      "Daily signals & market commentary",
      "Live discussion rooms",
      "Mentorship after the course",
      "Journal reviews & accountability",
    ],
    cta: "Join the community",
    size: "wide",
    span: "lg:col-span-2",
  },
  {
    n: "03",
    name: "AI Wolf Indicator",
    line: "Spot high probability opportunities and make smarter, data driven decisions.",
    cta: "See the indicator",
    size: "small",
    span: "lg:col-span-1",
  },
  {
    n: "04",
    name: "Financial Advisory",
    line: "Personalised guidance to build a clear strategy and pursue long term growth.",
    cta: "Request a call",
    size: "small",
    span: "lg:col-span-1",
  },
  {
    n: "05",
    name: "Multi Account Management",
    line: "Experienced professionals manage your trading with a disciplined, transparent and risk focused approach.",
    features: [
      "Account stays in your name",
      "Trading access only, never your deposits or withdrawals",
      "Monitor your account activity at any time",
      "Capital protection before profits",
    ],
    cta: "Ask about MAM",
    size: "banner",
    span: "lg:col-span-4",
  },
];

function Tile({ t }) {
  const dark = t.size === "hero";
  const banner = t.size === "banner";

  return (
    <article
      className={`tier group relative flex flex-col overflow-hidden rounded-[3px] border p-7 transition-colors duration-500 md:p-9 ${t.span} ${
        dark
          ? "border-gold bg-ink text-bone"
          : "border-[var(--rule)] bg-paper hover:border-gold"
      }`}
    >
      {dark && (
        <>
          <FoxMark
            className="absolute -right-8 -top-10 h-40 w-40 opacity-[0.13]"
            id="tier"
          />
          <span className="u-mono absolute right-6 top-6 rounded-full border border-gold/50 px-3 py-1 text-[0.52rem] tracking-[0.2em] text-gold-lite">
            MOST CHOSEN
          </span>
        </>
      )}

      <div className={banner ? "lg:flex lg:items-start lg:gap-14" : ""}>
        <div className={banner ? "lg:w-[42%] lg:shrink-0" : ""}>
          <p
            className={`u-mono text-[0.6rem] tracking-[0.2em] ${
              dark ? "text-gold-lite" : "text-gold"
            }`}
          >
            {t.n}
          </p>
          <h3
            className={`u-display mt-3 leading-tight ${
              dark ? "text-[2.6rem] text-gold-lite" : "text-[1.9rem] text-ink"
            }`}
          >
            {t.name}
          </h3>
          <p
            className={`mt-4 text-sm leading-relaxed ${
              dark ? "text-bone/60" : "text-ink-70"
            }`}
          >
            {t.line}
          </p>
        </div>

        {t.features && (
          <ul
            className={`mt-7 space-y-3 border-t pt-6 ${
              dark ? "border-white/15" : "border-[var(--rule)]"
            } ${banner ? "lg:mt-0 lg:grid lg:flex-1 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-3 lg:space-y-0 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0" : ""}`}
          >
            {t.features.map((f) => (
              <li key={f} className="flex gap-3 text-[0.88rem] leading-snug">
                <span
                  className={`mt-[0.42em] block h-1 w-1 shrink-0 rounded-full ${
                    dark ? "bg-gold-lite" : "bg-gold"
                  }`}
                />
                <span className={dark ? "text-bone/75" : "text-ink-70"}>
                  {f}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-auto pt-9">
        {t.size === "small" ? (
          <a
            href="#contact"
            data-cursor="grow"
            className="u-mono inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.16em] text-ink transition-colors duration-500 group-hover:text-gold-deep"
          >
            {t.cta}
            <TrendGlyph className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
          </a>
        ) : (
          <Magnetic strength={0.22}>
            <a
              href="#contact"
              data-cursor="grow"
              className={`u-btn ${
                dark ? "border-gold bg-gold text-ink" : "u-btn--ghost"
              }`}
            >
              <span>{t.cta}</span>
            </a>
          </Magnetic>
        )}
      </div>
    </article>
  );
}

export default function Pricing() {
  return (
    <section id="programmes" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="u-shell relative">
        <SectionHead label="Programmes" />

        <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <Reveal
            as="h2"
            className="u-display max-w-2xl text-[clamp(2.1rem,11vw,3.4rem)] leading-[0.95] md:text-[clamp(2.4rem,4.8vw,4.6rem)]"
          >
            Everything you need to trade, grow and move forward.
          </Reveal>
          <p className="max-w-sm text-[0.82rem] leading-relaxed text-ink-70 md:text-sm">
            Five ways to work with Wolfpack, from your first structured course
            through to managed accounts and long term advisory.
          </p>
        </div>

        <FadeUp
          as="div"
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:auto-rows-[minmax(0,auto)] lg:grid-cols-4"
          selector=".tier"
          stagger={0.1}
        >
          {PROGRAMMES.map((t) => (
            <Tile key={t.name} t={t} />
          ))}
        </FadeUp>

        <p className="u-mono mt-10 max-w-3xl text-[0.6rem] leading-relaxed text-ink-45">
          Trading always involves risk and no returns can be guaranteed. Our
          focus is responsible risk management, transparency and long term
          consistency rather than unrealistic promises. Capital protection
          before profits.
        </p>
      </div>
    </section>
  );
}
