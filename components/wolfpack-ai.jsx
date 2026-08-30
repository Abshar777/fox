"use client";

import { Reveal, SectionHead, FadeUp } from "./ui";

/* Wolfpack AI Technology — copy from the published site content. */
const FEATURES = [
  {
    n: "01",
    title: "Advanced AI analysis",
    body: "Continuously monitors the Forex and Gold markets, analysing price movements to identify potential trading opportunities.",
  },
  {
    n: "02",
    title: "Automated trade execution",
    body: "Executes trades using predefined trading logic, helping reduce emotional decision making and manual effort.",
  },
  {
    n: "03",
    title: "Built for busy professionals",
    body: "Perfect for entrepreneurs, business owners, corporate professionals and anyone who wants a more efficient trading experience.",
  },
];

export default function WolfpackAi() {
  return (
    <section id="ai" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="u-shell">
        <SectionHead label="Wolfpack AI Technology" />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal
              as="h2"
              className="u-display text-[clamp(2.1rem,11vw,3.4rem)] leading-[0.95] lg:text-[clamp(2.2rem,4vw,4rem)]"
            >
              Smarter trading starts here.
            </Reveal>
            <p className="mt-6 max-w-md text-[0.85rem] leading-relaxed text-ink-70 md:text-base">
              Successful trading requires time, market analysis and disciplined
              decision making — but not everyone can spend hours watching
              charts every day. Wolfpack AI continuously analyses the Forex and
              Gold markets, identifies potential opportunities and executes
              trades based on its programmed trading logic.
            </p>
          </div>

          <FadeUp
            as="div"
            className="grid gap-5 lg:col-span-7"
            selector=".ai-card"
            stagger={0.1}
          >
            {FEATURES.map((f) => (
              <article
                key={f.n}
                className="ai-card u-card flex items-start gap-6 rounded-[2px] p-6 md:p-8"
              >
                <span className="u-display text-[2.2rem] leading-none text-gold">
                  {f.n}
                </span>
                <div>
                  <h3 className="u-display text-[1.5rem] leading-tight text-ink">
                    {f.title}
                  </h3>
                  <p className="mt-2.5 text-[0.85rem] leading-relaxed text-ink-70 md:text-[0.95rem]">
                    {f.body}
                  </p>
                </div>
              </article>
            ))}
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
