"use client";

import { useState } from "react";
import { Reveal, FadeUp } from "./ui";

/**
 * Founders roster, from the published site content.
 * To finish a card:
 *   1. drop a portrait at the `photo` path (public/founders/0n.jpg)
 *   2. set `hasPhoto: true`
 * Cards default to a generated crest tile, so no request is made for a
 * portrait that does not exist yet.
 */
const FOUNDERS = [
  {
    name: "Mr Mohammed Haneef",
    role: "Chief Executive Officer",
    photo: "/founders/01.webp",
    hasPhoto: true,
    initials: "MH",
  },
  {
    name: "Mr Adhil Ameer",
    role: "Chief Business Development Officer",
    photo: "/founders/Mr-Adhil.webp",
    hasPhoto: true,
    initials: "AA",
  },
  {
    name: "Ms Nincy KMS",
    role: "Chief Operating Officer",
    photo: "/founders/NINCY.webp",
    hasPhoto: true,
    initials: "NK",
  },
];

/* generated crest tile, shown until a real portrait is supplied */
function Fallback({ f, i }) {
  const rot = [-6, 4, -3][i % 3];
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${140 + i * 22}deg, #7D5A10, #B3841F 42%, #F3DCA0 78%, #C9501F)`,
          opacity: 0.9,
        }}
      />
      <svg viewBox="0 0 200 260" className="absolute inset-0 h-full w-full">
        <g opacity="0.3" stroke="#14100B" fill="none" strokeWidth="1">
          {Array.from({ length: 9 }).map((_, k) => (
            <line key={k} x1="0" x2="200" y1={k * 30 + 12} y2={k * 30 + 4} />
          ))}
        </g>
        <polygon
          points="100,44 156,150 100,214 44,150"
          fill="#14100B"
          opacity="0.14"
          transform={`rotate(${rot} 100 130)`}
        />
      </svg>
      <span className="u-display absolute inset-0 grid place-items-center text-[4rem] leading-none text-bone mix-blend-overlay">
        {f.initials}
      </span>
    </div>
  );
}

function FounderCard({ f, i }) {
  const [failed, setFailed] = useState(false);

  return (
    <article className="founder-card group" data-cursor="grow">
      <div className="relative aspect-[3/4] w-full overflow-hidden border border-bone/12">
        {!f.hasPhoto || failed ? (
          <Fallback f={f} i={i} />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={f.photo}
            alt={f.name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
          />
        )}

        <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(20,16,11,0.78))]" />

        <span className="u-mono absolute bottom-3 left-3 text-[0.55rem] tracking-[0.2em] text-gold-pale">
          FOUNDER
        </span>
      </div>

      <h3 className="u-display mt-4 text-[1.6rem] leading-tight text-bone">
        {f.name}
      </h3>
      <p className="u-mono mt-1.5 text-[0.6rem] leading-relaxed tracking-[0.14em] text-bone/45">
        {f.role.toUpperCase()}
      </p>
    </article>
  );
}

export default function Founders() {
  return (
    <section
      id="founders"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-24 text-bone md:py-32"
    >
      <div className="u-shell relative">
        <p className="u-eyebrow text-bone/45">The Founders</p>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <Reveal
            as="h2"
            className="u-display max-w-3xl text-[clamp(2.1rem,11vw,3.4rem)] leading-[0.95] text-bone md:text-[clamp(2.4rem,4.6vw,4.4rem)]"
          >
            The people behind the pack.
          </Reveal>
          <p className="max-w-sm text-[0.82rem] leading-relaxed text-bone/55 md:text-sm">
            The founders of Wolfpack Wealth Academy — a professional Forex
            trading institute in Kochi — lead every programme, online and
            offline.
          </p>
        </div>

        <FadeUp
          as="div"
          className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6"
          selector=".founder-card"
          stagger={0.09}
        >
          {FOUNDERS.map((f, i) => (
            <FounderCard key={f.photo} f={f} i={i} />
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
