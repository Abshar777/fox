"use client";

import { useState } from "react";
import { Reveal, FadeUp } from "./ui";

/**
 * Mentor roster.
 *
 * The Wolfpack site publishes specialisms but not individual mentor names,
 * so nothing here is invented. To finish a card:
 *   1. drop a portrait at the `photo` path (public/mentors/0n.jpg)
 *   2. set `hasPhoto: true`
 *   3. fill in `name`
 * Cards default to a generated crest tile, so no request is made for a
 * portrait that does not exist yet.
 */
const MENTORS = [
  {
    name: "",
    role: "Lead Mentor",
    focus: "Market structure & price action",
    photo: "/mentors/01.jpg",
    hasPhoto: false,
    initials: "01",
  },
  {
    name: "",
    role: "Senior Mentor",
    focus: "Liquidity & live market analysis",
    photo: "/mentors/02.jpg",
    hasPhoto: false,
    initials: "02",
  },
  {
    name: "",
    role: "Risk Mentor",
    focus: "Risk management & trading psychology",
    photo: "/mentors/03.jpg",
    hasPhoto: false,
    initials: "03",
  },
  {
    name: "",
    role: "Programme Mentor",
    focus: "Gold & crypto sessions",
    photo: "/mentors/04.jpg",
    hasPhoto: false,
    initials: "04",
  },
  {
    name: "",
    role: "Community Mentor",
    focus: "Journal reviews & accountability",
    photo: "/mentors/05.jpg",
    hasPhoto: false,
    initials: "05",
  },
];

/* generated crest tile, shown until a real portrait is supplied */
function Fallback({ m, i }) {
  const rot = [-6, 4, -3, 7, -5][i % 5];
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
        {m.initials}
      </span>
    </div>
  );
}

function MentorCard({ m, i }) {
  const [failed, setFailed] = useState(false);

  return (
    <article className="mentor-card group" data-cursor="grow">
      <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/12">
        {!m.hasPhoto || failed ? (
          <Fallback m={m} i={i} />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={m.photo}
            alt={m.name || m.role}
            loading="lazy"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
          />
        )}

        <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(20,16,11,0.78))]" />

        <span className="u-mono absolute bottom-3 left-3 text-[0.55rem] tracking-[0.2em] text-gold-lite">
          {m.role.toUpperCase()}
        </span>
      </div>

      <h3 className="u-display mt-4 text-[1.6rem] leading-tight text-bone">
        {m.name || m.role}
      </h3>
      <p className="u-mono mt-1.5 text-[0.6rem] leading-relaxed tracking-[0.14em] text-bone/45">
        {m.focus.toUpperCase()}
      </p>
    </article>
  );
}

export default function Mentors() {
  return (
    <section
      id="mentors"
      className="relative scroll-mt-24 overflow-hidden bg-ink py-24 text-bone md:py-32"
    >
      <div className="u-shell relative">
        <p className="u-eyebrow text-bone/45">The Mentors</p>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <Reveal
            as="h2"
            className="u-display max-w-3xl text-[clamp(2.1rem,11vw,3.4rem)] leading-[0.95] text-bone md:text-[clamp(2.4rem,4.6vw,4.4rem)]"
          >
            Train with mentors who trade the market.
          </Reveal>
          <p className="max-w-sm text-[0.82rem] leading-relaxed text-bone/55 md:text-sm">
            Experienced mentors guide every cohort through live analysis, trade
            reviews and one to one doubt clearing, online and offline in Kochi.
          </p>
        </div>

        <FadeUp
          as="div"
          className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-5"
          selector=".mentor-card"
          stagger={0.09}
        >
          {MENTORS.map((m, i) => (
            <MentorCard key={m.photo} m={m} i={i} />
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
