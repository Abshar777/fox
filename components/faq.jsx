"use client";

import { useState } from "react";
import { Reveal, SectionHead } from "./ui";

const ITEMS = [
  {
    q: "Is MAM account management safe? What if I lose money?",
    a: "Safety comes first at Wolfpack. With MAM your account stays in your name, and we only receive trading access, with no access to your deposits or withdrawals. You can monitor your account activity at any time while our team focuses on disciplined execution and risk management. Our rule is capital protection before profits. Trading always involves risk and no returns can be guaranteed.",
  },
  {
    q: "Do you guarantee 5 to 10% profit every month?",
    a: "No. Any programme promising guaranteed monthly returns is not being honest with you. Trading always involves risk, and our focus is responsible risk management, transparency and long term consistency rather than unrealistic promises.",
  },
  {
    q: "How is Wolfpack different from other trading courses?",
    a: "Most courses hand you strategies. We teach a structured framework: market structure, liquidity, price action, risk management and trading psychology, and then keep supporting you through live analysis, trade reviews and a community that continues long after the course ends.",
  },
  {
    q: "Do I need prior trading experience to join?",
    a: "None at all. Our curriculum is designed for every experience level, and complete beginners start each cohort. If you have traded before, the structured approach will help you replace scattered habits with a repeatable process.",
  },
  {
    q: "What do I get with Premium Community Membership?",
    a: "Daily signals, expert market insights, live discussions and continued mentorship, plus the market discussions and journal reviews that keep your process sharp between sessions.",
  },
  {
    q: "Can I learn online, or do I need to be in Kochi?",
    a: "Both work. We run a professional learning environment in Kochi with offline training, and our online sessions are fully interactive, and students join from across Kerala and the UAE.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative py-24 md:py-32">
      <div className="u-shell">
        <SectionHead label="Questions" />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Reveal
              as="h2"
              className="u-display text-[clamp(2.1rem,11vw,3.4rem)] leading-[0.95] lg:text-[clamp(2rem,3.8vw,3.6rem)]"
            >
              Before you join.
            </Reveal>
            <p className="mt-6 max-w-xs text-[0.82rem] leading-relaxed text-ink-70 md:text-sm">
              Still unsure? Message the team on WhatsApp. A mentor, not a
              salesperson, answers every enquiry.
            </p>
            <a
              href="https://wa.me/919074620945"
              target="_blank"
              rel="noreferrer noopener"
              className="u-link u-display mt-4 inline-block text-xl text-gold-deep"
            >
              +91 90746 20945
            </a>
          </div>

          <div className="lg:col-span-8">
            {ITEMS.map((it, i) => {
              const isOpen = open === i;
              return (
                <div key={it.q} className="border-b border-[var(--rule)]">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    data-cursor="grow"
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="flex items-baseline gap-5">
                      <span className="u-mono text-[0.6rem] text-gold">
                        0{i + 1}
                      </span>
                      <span
                        className={`u-display text-[1.6rem] leading-tight transition-colors duration-400 md:text-[1.9rem] ${
                          isOpen ? "text-gold-deep" : "text-ink"
                        }`}
                      >
                        {it.q}
                      </span>
                    </span>
                    <span className="relative mt-3 block h-3 w-3 shrink-0">
                      <span className="absolute left-0 top-1/2 block h-px w-3 bg-ink" />
                      <span
                        className={`absolute left-1/2 top-0 block h-3 w-px bg-ink transition-transform duration-500 ${
                          isOpen ? "scale-y-0" : "scale-y-100"
                        }`}
                      />
                    </span>
                  </button>

                  <div
                    className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-7 pl-0 text-[0.95rem] leading-relaxed text-ink-70 md:pl-12">
                        {it.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
