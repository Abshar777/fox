"use client";

import { Marquee } from "./ui";
import { CandleGlyph } from "./icons";

const PAIRS = [
  ["XAU/USD", "2 341.60", 0.94],
  ["EUR/USD", "1.0872", 0.31],
  ["GBP/JPY", "193.44", -0.18],
  ["BTC/USD", "64 218", 1.42],
  ["USD/JPY", "151.28", 0.12],
  ["GBP/USD", "1.2715", 0.22],
  ["USD/CAD", "1.3588", -0.41],
  ["ETH/USD", "3 148", 0.77],
];

const WORDS = ["Discipline", "Consistency", "Patience", "Clarity", "Purpose"];

export default function Ticker() {
  return (
    <section className="relative select-none" aria-label="Market tape">
      {/* rate tape */}
      <div className="bg-paper/70 py-3 backdrop-blur">
        <Marquee speed={46}>
          {PAIRS.map(([pair, px, chg], i) => {
            const up = chg >= 0;
            return (
              <span
                key={`${pair}-${i}`}
                className="flex shrink-0 items-center gap-3 px-6"
              >
                <span className="u-mono text-[0.7rem] tracking-widest text-ink">
                  {pair}
                </span>
                <span className="u-mono text-[0.7rem] text-ink-45">{px}</span>
                <span
                  className={`u-mono text-[0.7rem] ${up ? "text-gold-deep" : "text-rust"}`}
                >
                  {up ? "▲" : "▼"} {Math.abs(chg).toFixed(2)}%
                </span>
                <span className="ml-3 h-3 w-px bg-[var(--rule)]" />
              </span>
            );
          })}
        </Marquee>
      </div>

      {/* creed */}
      <div className="overflow-hidden bg-ink py-5 md:py-7">
        <Marquee speed={38} direction={-1}>
          {WORDS.map((w, i) => (
            <span key={`${w}-${i}`} className="flex shrink-0 items-center px-7">
              <span className="u-display text-[clamp(1.8rem,9vw,2.8rem)] leading-none text-bone md:text-[clamp(2rem,5.4vw,5rem)]">
                {w}
              </span>
              <CandleGlyph className="ml-7 h-[clamp(1rem,5vw,1.7rem)] w-[clamp(1rem,5vw,1.7rem)] text-gold md:h-[clamp(1.1rem,2.6vw,2.4rem)] md:w-[clamp(1.1rem,2.6vw,2.4rem)]" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
