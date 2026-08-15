"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useIsoLayoutEffect, REDUCED } from "@/lib/gsap";
import { Reveal, SectionHead } from "./ui";

const PILLARS = [
  {
    n: "01",
    title: "Market structure",
    lead: "Structure before opinion.",
    body: "Every chart is an auction between two impatient crowds. You learn to read structure and price action so a setup becomes something you recognise, not something you hope for.",
    tags: ["Market structure", "Price action", "Higher timeframe reads"],
    art: "structure",
  },
  {
    n: "02",
    title: "Liquidity & flow",
    lead: "Trade where the fuel is.",
    body: "Price moves to where orders rest. We map liquidity and walk through live market analysis and trade reviews, so you see the read applied to a real chart rather than a slide.",
    tags: ["Liquidity", "Live analysis", "Trade reviews"],
    art: "liquidity",
  },
  {
    n: "03",
    title: "Risk & psychology",
    lead: "Capital protection before profits.",
    body: "A good idea taken at the wrong size is a losing idea. Risk management and trading psychology sessions build the discipline that keeps you in the market long enough to compound.",
    tags: ["Risk management", "Position sizing", "Trading psychology"],
    art: "risk",
  },
  {
    n: "04",
    title: "Community & review",
    lead: "The edge is in the loop.",
    body: "Learning does not stop at the last class. Market discussions, journal reviews and continuous mentorship inside the Wolfpack community turn scattered trades into a measurable process.",
    tags: ["Journal reviews", "Mentorship", "Accountability"],
    art: "loop",
  },
];

/* ------------------------------------------------------------------
   Candlestick diagrams — one per pillar, hand-authored OHLC so each
   chart actually tells that pillar's story. Nothing is drawn from an
   image asset; it is all geometry.
   ------------------------------------------------------------------ */

const UP = "#B3841F";
const INK = "#14100B";
const RUST = "#C9501F";

/** [open, high, low, close] in 0–100 space, oldest first. */
const SERIES = {
  // higher highs, higher lows — clean bullish structure
  structure: [
    [20, 28, 17, 26],
    [26, 32, 23, 24],
    [24, 38, 22, 36],
    [36, 40, 32, 34],
    [34, 50, 33, 48],
    [48, 54, 44, 46],
    [46, 62, 44, 60],
    [60, 66, 56, 58],
    [58, 74, 56, 72],
    [72, 78, 68, 70],
    [70, 86, 68, 84],
    [84, 90, 80, 88],
  ],
  // balance, a sweep of the highs on candle 6, then delivery lower
  liquidity: [
    [50, 57, 46, 54],
    [54, 59, 50, 56],
    [56, 59, 52, 52],
    [52, 57, 48, 56],
    [56, 60, 53, 58],
    [58, 90, 56, 60],
    [60, 62, 44, 46],
    [46, 50, 38, 40],
    [40, 44, 32, 36],
    [36, 39, 26, 30],
    [30, 34, 22, 26],
    [26, 30, 17, 21],
  ],
  // one idea, sized: entry, stop below, target above
  risk: [
    [34, 40, 30, 38],
    [38, 43, 35, 36],
    [36, 45, 33, 43],
    [43, 52, 41, 50],
    [50, 62, 47, 60],
    [60, 71, 57, 69],
    [69, 80, 66, 78],
    [78, 86, 74, 84],
  ],
  // the same read, repeated — two matching cycles
  loop: [
    [28, 36, 25, 34],
    [34, 40, 31, 33],
    [33, 45, 30, 43],
    [43, 48, 40, 42],
    [42, 54, 39, 52],
    [52, 58, 49, 51],
    [30, 38, 27, 36],
    [36, 42, 33, 35],
    [35, 47, 32, 45],
    [45, 50, 42, 44],
    [44, 56, 41, 54],
    [54, 60, 51, 53],
  ],
};

const VB = { w: 200, h: 120, padX: 8, padY: 12 };

function scaler(series) {
  const lo = Math.min(...series.map((c) => c[2]));
  const hi = Math.max(...series.map((c) => c[1]));
  const span = hi - lo || 1;
  return (v) => VB.padY + ((hi - v) / span) * (VB.h - VB.padY * 2);
}

function Candles({ kind }) {
  const series = SERIES[kind];
  const y = scaler(series);
  const step = (VB.w - VB.padX * 2) / series.length;
  const body = Math.min(9, step * 0.56);

  return series.map(([o, h, l, c], i) => {
    const cx = VB.padX + i * step + step / 2;
    const up = c >= o;
    const top = y(Math.max(o, c));
    const bot = y(Math.min(o, c));
    return (
      <g key={i} className="candle">
        <line
          x1={cx}
          x2={cx}
          y1={y(h)}
          y2={y(l)}
          stroke={up ? UP : INK}
          strokeWidth="1"
        />
        <rect
          x={cx - body / 2}
          y={top}
          width={body}
          height={Math.max(1.5, bot - top)}
          fill={up ? UP : "#FBF8F1"}
          stroke={up ? UP : INK}
          strokeWidth="1"
        />
      </g>
    );
  });
}

function Art({ kind }) {
  const series = SERIES[kind];
  const y = scaler(series);
  const step = (VB.w - VB.padX * 2) / series.length;
  const at = (i) => VB.padX + i * step + step / 2;

  return (
    <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="h-full w-full">
      {/* --- per-pillar annotation, drawn under the candles --- */}
      {kind === "structure" &&
        [3, 5, 7].map((i) => (
          <line
            key={i}
            x1={VB.padX}
            x2={VB.w - VB.padX}
            y1={y(series[i][2])}
            y2={y(series[i][2])}
            stroke={INK}
            strokeOpacity="0.16"
            strokeDasharray="3 5"
          />
        ))}

      {kind === "liquidity" && (
        <>
          <rect
            x={VB.padX}
            y={y(62)}
            width={VB.w - VB.padX * 2}
            height={Math.abs(y(56) - y(62))}
            fill={UP}
            opacity="0.16"
          />
          <rect
            x={VB.padX}
            y={y(26)}
            width={VB.w - VB.padX * 2}
            height={Math.abs(y(20) - y(26))}
            fill={UP}
            opacity="0.16"
          />
          <text x={VB.padX} y={y(62) - 4} fontSize="7" fill="#7A7060">
            BUY SIDE
          </text>
          <text x={VB.padX} y={y(20) + 9} fontSize="7" fill="#7A7060">
            SELL SIDE
          </text>
        </>
      )}

      {kind === "risk" && (
        <>
          {/* risk block below entry, reward block above */}
          <rect
            x={VB.padX}
            y={y(43)}
            width={VB.w - VB.padX * 2}
            height={Math.abs(y(31) - y(43))}
            fill={RUST}
            opacity="0.14"
          />
          <rect
            x={VB.padX}
            y={y(86)}
            width={VB.w - VB.padX * 2}
            height={Math.abs(y(43) - y(86))}
            fill={UP}
            opacity="0.12"
          />
          {[
            [86, "3R", UP],
            [43, "ENTRY", INK],
            [31, "STOP", RUST],
          ].map(([v, label, col]) => (
            <g key={label}>
              <line
                x1={VB.padX}
                x2={VB.w - VB.padX}
                y1={y(v)}
                y2={y(v)}
                stroke={col}
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.7"
              />
              <text
                x={VB.w - VB.padX}
                y={y(v) - 3}
                textAnchor="end"
                fontSize="7"
                fill={col}
                opacity="0.85"
              >
                {label}
              </text>
            </g>
          ))}
        </>
      )}

      {kind === "loop" && (
        <>
          <line
            x1={at(5) + step / 2}
            x2={at(5) + step / 2}
            y1={VB.padY - 6}
            y2={VB.h - VB.padY + 6}
            stroke={INK}
            strokeOpacity="0.2"
            strokeDasharray="2 4"
          />
          <path
            d={`M${at(0)} ${VB.h - 6} L${at(5)} ${VB.h - 6}`}
            stroke={UP}
            strokeWidth="1.5"
          />
          <path
            d={`M${at(6)} ${VB.h - 6} L${at(11)} ${VB.h - 6}`}
            stroke={UP}
            strokeWidth="1.5"
          />
          <text x={at(2)} y={VB.h - 9} fontSize="7" fill="#7A7060">
            CYCLE 1
          </text>
          <text x={at(8)} y={VB.h - 9} fontSize="7" fill="#7A7060">
            CYCLE 2
          </text>
        </>
      )}

      <Candles kind={kind} />

      {/* --- the moment that matters --- */}
      {kind === "structure" && (
        <circle cx={at(10)} cy={y(86)} r="3.5" fill={RUST} />
      )}
      {kind === "liquidity" && (
        <>
          <line
            x1={at(5)}
            x2={at(5)}
            y1={y(90)}
            y2={y(62)}
            stroke={RUST}
            strokeWidth="2.5"
          />
          <circle cx={at(5)} cy={y(90)} r="3" fill={RUST} />
        </>
      )}
      {kind === "risk" && <circle cx={at(2)} cy={y(43)} r="3.5" fill={RUST} />}
    </svg>
  );
}

export default function Method() {
  const root = useRef(null);

  useIsoLayoutEffect(() => {
    if (REDUCED()) return;

    const ctx = gsap.context((self) => {
      const cards = self.selector(".method-card");

      // candles grow out of the axis as each card arrives
      cards.forEach((card) => {
        gsap.from(card.querySelectorAll(".candle"), {
          scaleY: 0,
          transformOrigin: "50% 100%",
          autoAlpha: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 75%", once: true },
        });
      });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;
          gsap.to(card, {
            scale: 0.9 - (cards.length - 1 - i) * 0.012,
            yPercent: -4,
            filter: "saturate(0.6)",
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top 78%",
              end: "top 22%",
              scrub: 0.5,
            },
          });
        });
        return () => ScrollTrigger.getAll().forEach(() => {});
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-10 md:py-16">
      <div className="u-shell">
        <SectionHead label="Our approach" />

        <Reveal
          as="h2"
          className="u-display mt-10 max-w-4xl text-[clamp(2rem,10vw,3.4rem)] leading-[0.95] lg:text-[clamp(2.6rem,5vw,4.6rem)]"
        >
          Everything we teach hangs on four pillars.
        </Reveal>
      </div>

      <div className="u-shell mt-16 md:mt-24">
        {PILLARS.map((p, i) => (
          <div
            key={p.n}
            className="method-card sticky origin-top will-change-transform"
            style={{ top: `calc(13vh + ${i * 12}px)`, marginBottom: "4vh" }}
          >
            <article className="u-card grid content-center gap-8 rounded-[2px] p-7 md:min-h-[56vh] md:grid-cols-12 md:gap-10 md:p-14">
              <div className="md:col-span-4">
                <p className="u-mono text-[0.68rem] tracking-[0.2em] text-gold">
                  {p.n} / 04
                </p>
                <h3 className="u-display mt-4 text-[clamp(1.9rem,9vw,2.8rem)] leading-[0.98] md:text-[clamp(1.8rem,3.2vw,3rem)]">
                  {p.title}
                </h3>
                <p className="u-display mt-3 text-xl italic text-gold-deep">
                  {p.lead}
                </p>
              </div>

              <div className="md:col-span-5">
                <p className="max-w-md leading-relaxed text-ink-70">{p.body}</p>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="u-mono rounded-full border border-[var(--rule)] px-3 py-1.5 text-[0.6rem] uppercase tracking-widest text-ink-45"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="u-hatch flex max-h-[170px] items-center justify-center rounded-[2px] border border-[var(--rule)] p-5 md:col-span-3 md:max-h-none">
                <Art kind={p.art} />
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
