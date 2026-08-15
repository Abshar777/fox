"use client";

import { useRef, useState } from "react";
import { gsap, useIsoLayoutEffect } from "@/lib/gsap";
import { LogoSvgLine, LogoSvgSolid } from "./logo-svg";
import { useLoader } from "./loader-context";

const COLUMNS = 5;

export default function Preloader() {
  const root = useRef(null);
  const counter = useRef(null);
  const [done, setDone] = useState(false);
  const { finish } = useLoader();

  useIsoLayoutEffect(() => {
    if (!root.current) return;
    // the browser would otherwise restore the previous scroll behind the curtain
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const ctx = gsap.context((self) => {
      const q = self.selector;
      const count = { v: 0 };

      /* --- one continuous pen tracing the whole outline ---
         The runs are contiguous, so playing them back to back at a constant
         speed (ease "none", duration proportional to each run's length) reads
         as a single stroke rather than five. A dot rides the tip. */
      const runs = q(".logo-stroke");
      const pen = q(".logo-pen")[0];
      const lens = runs.map((r) => r.getTotalLength());
      const total = lens.reduce((a, b) => a + b, 0) || 1;
      const DRAW = 2.1;

      // Apply every hidden state now, inside the layout effect, rather than as
      // the timeline's first tween — a timeline only renders on its first tick,
      // which is one painted frame too late and flashes the finished mark.
      gsap.set(runs, { strokeDasharray: 1, strokeDashoffset: 1 });
      gsap.set(pen, { autoAlpha: 0 });
      gsap.set(q(".pl-solid"), { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(q(".logo-sheen"), { autoAlpha: 0 });

      const trace = gsap.timeline();
      runs.forEach((run, i) => {
        trace.fromTo(
          run,
          { strokeDasharray: 1, strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: DRAW * (lens[i] / total),
            ease: "none",
            onUpdate() {
              if (!pen) return;
              const pt = run.getPointAtLength(this.progress() * lens[i]);
              gsap.set(pen, {
                attr: { transform: `translate(${pt.x} ${pt.y})` },
              });
            },
          },
        );
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => setDone(true),
      });

      tl.fromTo(
        q(".pl-meta"),
        { yPercent: 110 },
        { yPercent: 0, duration: 0.9, stagger: 0.08 },
      )
        .to(
          count,
          {
            v: 100,
            duration: DRAW + 0.3,
            ease: "power1.inOut",
            onUpdate: () => {
              if (counter.current) {
                counter.current.textContent = String(
                  Math.round(count.v),
                ).padStart(3, "0");
              }
            },
          },
          0.1,
        )
        .fromTo(
          q(".pl-bar"),
          { scaleX: 0 },
          { scaleX: 1, duration: DRAW + 0.3, ease: "power1.inOut" },
          0.1,
        )
        .to(pen, { autoAlpha: 1, duration: 0.25 }, 0.15)
        .add(trace, 0.15)
        // the gold floods up into the drawn outline
        .to(pen, { autoAlpha: 0, duration: 0.3 }, ">-0.1")
        .to(
          q(".pl-solid"),
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.95,
            ease: "power2.inOut",
          },
          "<",
        )
        .to(q(".pl-line"), { autoAlpha: 0, duration: 0.5 }, "<+0.35")
        // sheen sweeps across the mark, clipped to its silhouette
        .fromTo(
          q(".logo-sheen"),
          { attr: { x: -170 }, autoAlpha: 1 },
          {
            attr: { x: 420 },
            duration: 0.95,
            ease: "power2.inOut",
            onComplete: () => gsap.set(q(".logo-sheen"), { autoAlpha: 0 }),
          },
          "<+0.15",
        )
        .to(q(".pl-fox"), { scale: 1.05, duration: 0.6 }, "<")
        // exit
        .to(q(".pl-meta"), { yPercent: -110, duration: 0.6 }, "+=0.15")
        .to(q(".pl-fox"), { yPercent: -30, autoAlpha: 0, duration: 0.6 }, "<")
        .to(
          q(".pl-col"),
          {
            scaleY: 0,
            duration: 1.15,
            stagger: { each: 0.075, from: "start" },
            ease: "expo.inOut",
          },
          "-=0.3",
        )
        // hand off early so the hero is already moving under the curtains
        .call(finish, null, "-=0.95");

      // rAF is paused in a background tab, which would strand the timeline —
      // timers still fire, so force the handoff if we overrun.
      const bail = setTimeout(() => {
        if (tl.progress() < 1) tl.progress(1);
      }, 8000);

      return () => {
        clearTimeout(bail);
        tl.kill();
      };
    }, root);

    return () => ctx.revert();
  }, [finish]);

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      aria-hidden="true"
    >
      {/* curtain columns */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: COLUMNS }).map((_, i) => (
          <div
            key={i}
            className="pl-col h-full flex-1 origin-top bg-bone [transform:scaleY(1)]"
          />
        ))}
      </div>

      {/* crest */}
      <div className="pl-fox relative z-10 h-[34vmin] max-h-[260px] w-[34vmin] max-w-[260px]">
        <LogoSvgLine className="pl-line absolute inset-0 h-full w-full text-gold" />
        <LogoSvgSolid
          sheen
          id="pl"
          className="pl-solid absolute inset-0 h-full w-full"
          style={{ clipPath: "inset(100% 0% 0% 0%)" }}
        />
      </div>

      {/* meta */}
      <div className="u-shell absolute inset-x-0 top-0 z-10 flex justify-between pt-8">
        <div className="js-mask">
          <p className="pl-meta u-eyebrow text-ink-70">Wolfpack Wealth</p>
        </div>
        <div className="js-mask">
          <p className="pl-meta u-eyebrow text-ink-70">Kochi, Kerala</p>
        </div>
      </div>

      <div className="u-shell absolute inset-x-0 bottom-0 z-10 pb-8">
        <div className="mb-5 h-px w-full bg-[var(--rule)]">
          <div className="pl-bar h-px w-full origin-left bg-gold" />
        </div>
        <div className="flex items-end justify-between">
          <div className="js-mask">
            <p className="pl-meta u-eyebrow text-ink-45">Reading the market</p>
          </div>
          <div className="js-mask">
            <p
              ref={counter}
              className="pl-meta u-mono text-[13vw] leading-[0.78] tracking-tighter text-ink md:text-[7vw]"
            >
              000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
