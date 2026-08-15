"use client";

import { Marquee, SectionHead, Reveal } from "./ui";

const QUOTES = [
  {
    q: "I joined Wolfpack as a complete beginner with no trading experience. The mentors explained every concept clearly and the practical sessions helped me understand how the Forex market actually works.",
    n: "Rahul S.",
    m: "Kochi",
  },
  {
    q: "The structured approach is what impressed me the most. Instead of random strategies, we learnt market structure, risk management and trading psychology. I now approach every trade with much more confidence.",
    n: "Nithin M.",
    m: "Ernakulam",
  },
  {
    q: "The live market analysis sessions were a game changer. Watching experienced mentors break down Gold and Forex trades in real time gave me a much better understanding of price action than videos ever could.",
    n: "Veena Raghin",
    m: "Kannur",
  },
  {
    q: "What makes Wolfpack different is the community. Even after completing the course, I continue learning through market discussions, journal reviews and regular mentorship sessions.",
    n: "Shamil P.",
    m: "Thrissur",
  },
  {
    q: "I attended the online classes from the UAE, and the experience was excellent. The mentors were always available to answer questions and the sessions were interactive and easy to follow.",
    n: "Fathima M.",
    m: "UAE",
  },
  {
    q: "I appreciated the one on one doubt clearing sessions and continuous mentorship. The trainers genuinely care about helping students improve, and the learning environment is very supportive.",
    n: "Anjali R.",
    m: "Kochi",
  },
];

function Quote({ q, n, m }) {
  return (
    <figure className="mx-2 flex w-[78vw] shrink-0 flex-col justify-between border border-[var(--rule)] bg-paper p-5 sm:mx-3 sm:w-[44vw] sm:p-7 lg:w-[26vw]">
      <span className="u-display text-3xl leading-none text-gold sm:text-4xl">
        &ldquo;
      </span>
      <blockquote className="mt-2 text-[0.9rem] leading-relaxed text-ink sm:mt-3 sm:text-[1.02rem]">
        {q}
      </blockquote>
      <figcaption className="mt-5 border-t border-[var(--rule)] pt-3.5 sm:mt-7 sm:pt-4">
        <p className="u-eyebrow text-ink">{n}</p>
        <p className="u-mono mt-1 text-[0.6rem] text-ink-45">{m}</p>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section className="relative py-20 md:py-32">
      <div className="u-shell">
        <SectionHead label="The Record" />
        <Reveal
          as="h2"
          className="u-display mt-10 max-w-3xl text-[clamp(2rem,10vw,3.4rem)] leading-[0.95] md:text-[clamp(2.3rem,4.4vw,4.2rem)]"
        >
          What our traders say afterwards.
        </Reveal>
      </div>

      <div className="mt-10 space-y-3 md:mt-14 md:space-y-4">
        <Marquee speed={58}>
          {QUOTES.map((t, i) => (
            <Quote key={`a-${i}`} {...t} />
          ))}
        </Marquee>
        {/* second lane is desktop only — on a phone one row is plenty, and it
            halves both the section height and the running animation cost */}
        <div className="hidden md:block">
          <Marquee speed={64} direction={-1}>
            {[...QUOTES].reverse().map((t, i) => (
              <Quote key={`b-${i}`} {...t} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
