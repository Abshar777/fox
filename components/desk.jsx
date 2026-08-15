"use client";

import { useRef } from "react";
import { gsap, useIsoLayoutEffect, REDUCED } from "@/lib/gsap";
import { Reveal, SectionHead, FadeUp } from "./ui";

/* ------------------------------------------------------------------
   Deterministic price series — seeded LCG so server and client agree.
   ------------------------------------------------------------------ */

function makeSeries(count, seed) {
  let s = seed >>> 0;
  const rnd = () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;

  const out = [];
  let price = 1.083;
  for (let i = 0; i < count; i++) {
    const drift = 0.00022 * Math.sin(i / 4.5) + 0.00009;
    const open = price;
    const close = open + drift + (rnd() - 0.47) * 0.0016;
    const high = Math.max(open, close) + rnd() * 0.0008;
    const low = Math.min(open, close) - rnd() * 0.0008;
    out.push({ open, close, high, low });
    price = close;
  }
  return out;
}

const CANDLES = makeSeries(38, 20260816);

const W = 760;
const H = 300;
const PAD = 14;

const lows = CANDLES.map((c) => c.low);
const highs = CANDLES.map((c) => c.high);
const MIN = Math.min(...lows);
const MAX = Math.max(...highs);
const step = (W - PAD * 2) / CANDLES.length;
const y = (v) => PAD + ((MAX - v) / (MAX - MIN)) * (H - PAD * 2);

const EQUITY = CANDLES.map((c, i) => {
  const x = PAD + i * step + step / 2;
  return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y(c.close).toFixed(1)}`;
}).join(" ");

const POSITIONS = [
  ["EUR/USD", "LONG", "+2.4R", true],
  ["GBP/JPY", "SHORT", "+1.1R", true],
  ["USD/CAD", "LONG", "−0.3R", false],
  ["XAU/USD", "LONG", "+3.8R", true],
];

export default function Desk() {
  const root = useRef(null);

  useIsoLayoutEffect(() => {
    if (REDUCED()) return;

    const ctx = gsap.context((self) => {
      const q = self.selector;

      gsap.from(q(".candle"), {
        scaleY: 0,
        transformOrigin: "50% 100%",
        opacity: 0,
        duration: 0.5,
        stagger: 0.022,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 62%", once: true },
      });

      const path = q(".equity")[0];
      if (path) {
        const len = path.getTotalLength();
        gsap.fromTo(
          path,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration: 2.4,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: root.current,
              start: "top 62%",
              once: true,
            },
          },
        );
      }

      gsap.to(q(".desk-panel"), {
        yPercent: -7,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.from(q(".desk-row"), {
        xPercent: 8,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 55%", once: true },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="desk"
      ref={root}
      className="relative scroll-mt-24 py-24 md:py-36"
    >
      <div className="u-shell">
        <SectionHead label="Live Desk" />

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* copy */}
          <div className="lg:col-span-4">
            <Reveal
              as="h2"
              className="u-display text-[clamp(2.1rem,11vw,3.4rem)] leading-[0.95] lg:text-[clamp(2rem,3.8vw,3.6rem)]"
            >
              You don&rsquo;t learn this alone.
            </Reveal>

            <FadeUp as="div" className="mt-8 space-y-6" selector=".desk-p">
              <p className="desk-p text-[0.85rem] leading-relaxed text-ink-70 md:text-base">
                Watching experienced mentors break down Gold and Forex trades in
                real time teaches price action in a way recorded videos never
                could. The room is live, and questions are answered as they
                come.
              </p>
              <p className="desk-p text-[0.85rem] leading-relaxed text-ink-70 md:text-base">
                Sessions run online and offline from Kochi, with trade reviews,
                one to one doubt clearing and daily signals inside the
                community.
              </p>

              <dl className="desk-p grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[var(--rule)] pt-7">
                {[
                  ["Live", "Market analysis"],
                  ["Daily", "Community signals"],
                  ["1 : 1", "Doubt clearing"],
                  ["Real time", "Trade reviews"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="u-display text-2xl text-gold-deep">{k}</dt>
                    <dd className="u-eyebrow mt-1 text-ink-45">{v}</dd>
                  </div>
                ))}
              </dl>
            </FadeUp>
          </div>

          {/* terminal */}
          <div className="lg:col-span-8">
            <div className="desk-panel u-card rounded-[3px] p-3 md:p-4">
              {/* chrome */}
              <div className="mb-3 flex items-center justify-between border-b border-[var(--rule)] px-2 pb-3">
                <div className="flex items-center gap-3">
                  <span className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-rust/70" />
                    <span className="h-2 w-2 rounded-full bg-gold/70" />
                    <span className="h-2 w-2 rounded-full bg-ink/25" />
                  </span>
                  <span className="u-mono text-[0.62rem] tracking-widest text-ink-70">
                    WOLFPACK DESK · XAU/USD · M15
                  </span>
                </div>
                <span className="u-mono flex items-center gap-2 text-[0.62rem] text-ink-45">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rust" />
                  LIVE
                </span>
              </div>

              <div className="grid gap-3 md:grid-cols-[1.7fr_1fr]">
                {/* chart */}
                <div className="u-hatch relative overflow-hidden rounded-[2px] border border-[var(--rule)] bg-bone">
                  <svg
                    viewBox={`0 0 ${W} ${H}`}
                    className="h-full w-full"
                    role="img"
                    aria-label="Illustrative candlestick chart"
                  >
                    {[0.2, 0.4, 0.6, 0.8].map((f) => (
                      <line
                        key={f}
                        x1={PAD}
                        x2={W - PAD}
                        y1={PAD + f * (H - PAD * 2)}
                        y2={PAD + f * (H - PAD * 2)}
                        stroke="#14100B"
                        strokeOpacity="0.07"
                      />
                    ))}

                    {CANDLES.map((c, i) => {
                      const cx = PAD + i * step + step / 2;
                      const up = c.close >= c.open;
                      const top = y(Math.max(c.open, c.close));
                      const bot = y(Math.min(c.open, c.close));
                      return (
                        <g key={i} className="candle">
                          <line
                            x1={cx}
                            x2={cx}
                            y1={y(c.high)}
                            y2={y(c.low)}
                            stroke={up ? "#B3841F" : "#14100B"}
                            strokeWidth="1"
                          />
                          <rect
                            x={cx - step * 0.3}
                            y={top}
                            width={step * 0.6}
                            height={Math.max(1.5, bot - top)}
                            fill={up ? "#B3841F" : "#FBF8F1"}
                            stroke={up ? "#B3841F" : "#14100B"}
                            strokeWidth="1"
                          />
                        </g>
                      );
                    })}

                    <path
                      className="equity"
                      d={EQUITY}
                      fill="none"
                      stroke="#C9501F"
                      strokeWidth="1.6"
                      strokeOpacity="0.85"
                    />

                    {/* entry / stop / target rails */}
                    <line
                      x1={PAD}
                      x2={W - PAD}
                      y1={y(CANDLES[24].close)}
                      y2={y(CANDLES[24].close)}
                      stroke="#14100B"
                      strokeDasharray="4 4"
                      strokeOpacity="0.45"
                    />
                    <text
                      x={W - PAD - 4}
                      y={y(CANDLES[24].close) - 6}
                      textAnchor="end"
                      fontSize="10"
                      fill="#14100B"
                      opacity="0.6"
                      fontFamily="var(--font-mono)"
                    >
                      ENTRY 1.0871
                    </text>
                  </svg>
                </div>

                {/* blotter */}
                <div className="rounded-[2px] border border-[var(--rule)] bg-bone p-4">
                  <p className="u-eyebrow mb-4 text-ink-45">Room blotter</p>
                  <ul className="space-y-3">
                    {POSITIONS.map(([pair, side, r, win]) => (
                      <li
                        key={pair}
                        className="desk-row flex items-center justify-between border-b border-[var(--rule)] pb-3 last:border-0"
                      >
                        <span>
                          <span className="u-mono block text-[0.72rem] text-ink">
                            {pair}
                          </span>
                          <span className="u-mono block text-[0.58rem] tracking-widest text-ink-45">
                            {side}
                          </span>
                        </span>
                        <span
                          className={`u-mono text-[0.78rem] ${win ? "text-gold-deep" : "text-rust"}`}
                        >
                          {r}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 border-t border-[var(--rule)] pt-4">
                    <p className="u-eyebrow text-ink-45">Week to date</p>
                    <p className="u-display mt-1 text-3xl text-ink">+7.0R</p>
                  </div>
                </div>
              </div>

              <p className="u-mono mt-3 px-2 text-[0.55rem] leading-relaxed text-ink-45">
                Illustrative interface. Past performance does not indicate
                future results. Trading carries risk of loss.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
