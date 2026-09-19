"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useIsoLayoutEffect, REDUCED } from "@/lib/gsap";
import { Magnetic, Reveal, SectionHead } from "./ui";
import { TrendGlyph } from "./icons";

const PROGRAMS = [
  {
    n: "01",
    title: "Forex Blueprint",
    lead: "Structure before opinion.",
    body: "Designed for complete beginners who want to learn forex and gold trading the right way, with structure, discipline and the risk-first mindset of the top 5% of traders. 10–15 days, online & offline.",
    tags: ["Market basics", "Gold trading", "Risk management"],
    art: "structure",
    cta: "Explore the course",
  },
  {
    n: "02",
    title: "Master PowerHouse",
    lead: "Trade like the institutions.",
    body: "You've learned the basics, now learn what the institutions know: liquidity, institutional order flow and advanced price action. 30–40 days, online & offline.",
    tags: ["Institutional concepts", "Liquidity analysis", "Advanced price action"],
    art: "liquidity",
    cta: "Level up",
  },
  {
    n: "03",
    title: "Premium Community",
    lead: "Never trade alone.",
    body: "A live trading community for daily signals, expert insights, market discussions and continued mentorship long after the last class.",
    tags: ["Daily signals", "Market discussions", "Ongoing mentorship"],
    art: "loop",
    cta: "Join the community",
  },
  {
    n: "04",
    title: "Wolfpack AI Technology",
    lead: "Insight, on tap.",
    body: "Our proprietary AI scans the Gold and Forex markets, detects patterns and delivers actionable insights that complement your own analysis.",
    tags: ["Gold & Forex scans", "Pattern detection", "Actionable insights"],
    art: "scan",
    cta: "Explore Wolfpack AI",
  },
  {
    n: "05",
    title: "Wolfpack Bootcamp",
    lead: "Real traders, real feedback.",
    body: "Courses teach you concepts, the Bootcamp makes you a trader. Live trading mentorship in Kochi that bridges the gap between learning and actual market participation.",
    tags: ["Journal reviews", "Live analysis", "1:1 doubt clearing"],
    art: "review",
    cta: "Join the Bootcamp",
  },
  {
    n: "06",
    title: "Wealth Creation · The 5% Club",
    lead: "Capital protection before profits.",
    body: "Our wealth creation circle for the disciplined few, committed to compounding capital patiently instead of chasing quick wins.",
    tags: ["Compounding", "Capital allocation", "Senior mentor access"],
    art: "compound",
    cta: "Ask about the 5% Club",
  },
  {
    n: "07",
    title: "Multi Account Management",
    lead: "Trade with discipline, on your behalf.",
    body: "Experienced professionals manage your trading with a disciplined, transparent and risk-focused approach. Your account stays in your name.",
    tags: ["Trading access only", "Full transparency", "Capital protection"],
    art: "accounts",
    cta: "Ask about MAM",
  },
];

/* ------------------------------------------------------------------
   Candlestick diagrams one per programme, hand-authored OHLC so each
   chart actually tells that programme's story. Nothing is drawn from
   an image asset; it is all geometry.
   ------------------------------------------------------------------ */

const UP = "#B3841F";
const INK = "#14100B";
const RUST = "#C9501F";

/** [open, high, low, close] in 0–100 space, oldest first. */
const SERIES = {
  // higher highs, higher lows clean bullish structure
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
  // the same read, repeated two matching cycles
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
  // a tight range the AI flags, then a breakout twice over
  scan: [
    [40, 45, 37, 43],
    [43, 46, 40, 41],
    [41, 44, 38, 42],
    [42, 45, 39, 44],
    [44, 58, 43, 56],
    [56, 60, 52, 54],
    [54, 58, 50, 52],
    [52, 55, 48, 53],
    [53, 56, 49, 54],
    [54, 70, 52, 68],
    [68, 74, 64, 66],
    [66, 72, 62, 70],
  ],
  // a drawdown that gets flagged, then a disciplined recovery
  review: [
    [30, 36, 27, 34],
    [34, 39, 31, 33],
    [33, 42, 30, 40],
    [40, 44, 34, 36],
    [36, 40, 30, 32],
    [32, 38, 29, 36],
    [36, 46, 34, 44],
    [44, 52, 42, 50],
    [50, 58, 48, 56],
    [56, 64, 54, 62],
    [62, 70, 60, 68],
    [68, 76, 66, 74],
  ],
  // capital compounding in discrete, growing steps
  compound: [
    [15, 20, 13, 19],
    [19, 22, 17, 18],
    [18, 30, 16, 28],
    [28, 32, 25, 27],
    [27, 29, 24, 26],
    [26, 40, 24, 38],
    [38, 43, 35, 37],
    [37, 40, 33, 36],
    [36, 52, 34, 50],
    [50, 56, 47, 49],
    [49, 52, 45, 48],
    [48, 68, 46, 66],
  ],
  // one disciplined run, mirrored for a second managed account
  accounts: [
    [40, 46, 37, 44],
    [44, 49, 41, 42],
    [42, 52, 40, 50],
    [50, 54, 47, 49],
    [49, 60, 47, 58],
    [58, 62, 54, 56],
    [56, 66, 54, 64],
    [64, 68, 60, 62],
    [62, 72, 60, 70],
    [70, 74, 66, 68],
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
      {/* --- per-programme annotation, drawn under the candles --- */}
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

      {kind === "scan" && (
        <>
          {[
            [0, 3, 46, 37],
            [5, 8, 60, 48],
          ].map(([from, to, hi, lo], i) => (
            <rect
              key={i}
              x={at(from) - step * 0.4}
              y={y(hi)}
              width={at(to) - at(from) + step * 0.8}
              height={Math.abs(y(lo) - y(hi))}
              fill="none"
              stroke={INK}
              strokeOpacity="0.28"
              strokeDasharray="2 3"
            />
          ))}
          <text x={VB.padX} y={VB.padY - 3} fontSize="7" fill="#7A7060">
            AI SCAN
          </text>
        </>
      )}

      {kind === "review" && (
        <>
          <rect
            x={at(3) - step * 0.5}
            y={y(40)}
            width={at(5) - at(3) + step}
            height={Math.abs(y(29) - y(40))}
            fill={RUST}
            opacity="0.1"
          />
          <text
            x={at(3) - step * 0.5}
            y={y(40) - 4}
            fontSize="6.5"
            fill="#7A7060"
          >
            REVIEWED
          </text>
        </>
      )}

      {kind === "compound" &&
        [
          [0, 1, 19],
          [3, 4, 27],
          [6, 7, 37],
          [9, 10, 49],
        ].map(([from, to, level], i) => (
          <line
            key={i}
            x1={at(from) - step / 2}
            x2={at(to) + step / 2}
            y1={y(level)}
            y2={y(level)}
            stroke={INK}
            strokeOpacity="0.18"
            strokeDasharray="3 4"
          />
        ))}

      <Candles kind={kind} />

      {kind === "accounts" && (
        <polyline
          points={series.map((c, i) => `${at(i)},${y(c[3])}`).join(" ")}
          fill="none"
          stroke={INK}
          strokeWidth="1"
          strokeDasharray="2 3"
          opacity="0.32"
          transform="translate(0, 7)"
        />
      )}

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
      {kind === "scan" &&
        [4, 9].map((i) => (
          <circle key={i} cx={at(i)} cy={y(series[i][1])} r="3" fill={RUST} />
        ))}
      {kind === "review" && (
        <circle
          cx={at(4)}
          cy={y(series[4][2])}
          r="6"
          fill="none"
          stroke={RUST}
          strokeWidth="1.4"
          strokeDasharray="2 2"
        />
      )}
      {kind === "compound" &&
        [2, 5, 8, 11].map((i) => (
          <text
            key={i}
            x={at(i)}
            y={y(series[i][1]) - 6}
            textAnchor="middle"
            fontSize="6.5"
            fill={UP}
          >
            +R
          </text>
        ))}
      {kind === "accounts" && (
        <>
          <g transform={`translate(${VB.w - 26}, 8)`}>
            <path
              d="M2 6 v-2.2 a4 4 0 0 1 8 0 V6"
              fill="none"
              stroke={INK}
              strokeWidth="1.3"
              opacity="0.6"
            />
            <rect
              x="0"
              y="6"
              width="12"
              height="8"
              rx="1.5"
              fill={INK}
              opacity="0.14"
              stroke={INK}
              strokeWidth="1"
            />
          </g>
          <text x={VB.padX} y={VB.h - 6} fontSize="7" fill="#7A7060">
            IN YOUR NAME
          </text>
        </>
      )}
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
        return () => ScrollTrigger.getAll().forEach(() => { });
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="programmes"
      className="relative scroll-mt-24 py-10 md:py-16"
    >
      <div className="u-shell">
        <SectionHead label="Programmes" />

        <Reveal
          as="h2"
          className="u-display mt-10 max-w-4xl text-[clamp(2rem,10vw,3.4rem)] leading-[0.95] lg:text-[clamp(2.6rem,5vw,4.6rem)]"
        >
          Choose your path. Seven programmes, one philosophy.
        </Reveal>
      </div>

      <div className="u-shell mt-16 md:mt-24">
        {PROGRAMS.map((p, i) => (
          <div
            key={p.n}
            className="method-card sticky origin-top will-change-transform"
            style={{ top: `calc(13vh + ${i * 12}px)`, marginBottom: "4vh" }}
          >
            <article className="u-card grid content-center gap-8 rounded-[2px] p-7 md:min-h-[56vh] md:grid-cols-12 md:gap-10 md:p-14">
              <div className="md:col-span-4">
                <p className="u-mono text-[0.68rem] tracking-[0.2em] text-gold">
                  {p.n} / 07
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

                <Magnetic strength={0.22} className="mt-8 inline-block">
                  <a
                    href="#contact"
                    data-cursor="grow"
                    className="group u-mono inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.16em] text-ink transition-colors duration-500 hover:text-gold-deep"
                  >
                    {p.cta}
                    <TrendGlyph className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </a>
                </Magnetic>
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
