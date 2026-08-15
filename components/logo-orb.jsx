"use client";

import { useRef } from "react";
import { gsap, useIsoLayoutEffect, REDUCED } from "@/lib/gsap";
import { LogoSvgSolid } from "./logo-svg";

/**
 * The crest on a depth stage. Halo and orbit rings sit behind the mark on
 * their own Z planes, so tilting the stage toward the pointer gives real
 * parallax. A gold gloss sweeps across the mark on a loop, clipped to the
 * silhouette so it only ever lights the crest itself.
 */
export default function LogoOrb({ className = "", id = "orb" }) {
  const stage = useRef(null);
  const inner = useRef(null);

  useIsoLayoutEffect(() => {
    const box = inner.current;
    if (!box || REDUCED()) return;

    const ctx = gsap.context((self) => {
      const q = self.selector;

      /* --- looping gloss --- */
      const sheen = q(".logo-sheen")[0];
      let gloss;
      if (sheen) {
        gloss = gsap
          .timeline({ repeat: -1, repeatDelay: 2.6 })
          .set(sheen, { attr: { x: -170 }, opacity: 1 })
          .to(sheen, {
            attr: { x: 420 },
            duration: 1.5,
            ease: "power2.inOut",
          })
          .set(sheen, { opacity: 0 });
      }

      /* --- pointer tilt --- */
      const rotY = gsap.quickTo(box, "rotationY", {
        duration: 1.1,
        ease: "power3",
      });
      const rotX = gsap.quickTo(box, "rotationX", {
        duration: 1.1,
        ease: "power3",
      });

      const onMove = (e) => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;
        rotY(nx * 22);
        rotX(-ny * 13);
      };
      const onLeave = () => {
        rotY(0);
        rotX(0);
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);

      const float = gsap.to(stage.current, {
        y: -16,
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      return () => {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerleave", onLeave);
        float.kill();
        gloss?.kill();
      };
    }, stage);

    return () => ctx.revert();
  }, []);

  const plane = (z) => ({ transform: `translateZ(${z}px)` });

  return (
    <div ref={stage} className={`fox-stage ${className}`}>
      <div ref={inner} className="fox-3d relative h-full w-full">
        {/* halo */}
        <div
          className="fox-layer absolute inset-0 grid place-items-center"
          style={plane(-140)}
        >
          <div className="h-[88%] w-[88%] rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(246,230,188,0.95),rgba(233,223,201,0.35)_55%,transparent_72%)]" />
        </div>

        {/* orbit rings */}
        <div className="fox-layer absolute inset-0" style={plane(-90)}>
          <svg viewBox="0 0 400 400" className="h-full w-full">
            <circle
              cx="200"
              cy="200"
              r="176"
              fill="none"
              stroke="#B3841F"
              strokeOpacity="0.35"
              strokeWidth="1"
              strokeDasharray="2 9"
              className="fox-orbit"
              style={{ transformOrigin: "200px 200px" }}
            />
            <circle
              cx="200"
              cy="200"
              r="150"
              fill="none"
              stroke="#14100B"
              strokeOpacity="0.12"
              strokeWidth="1"
            />
            <g
              className="fox-orbit-rev"
              style={{ transformOrigin: "200px 200px" }}
            >
              <circle cx="200" cy="24" r="4" fill="#B3841F" />
              <circle cx="376" cy="200" r="2.5" fill="#C9501F" />
            </g>
          </svg>
        </div>

        {/* ground shadow */}
        <div
          className="fox-layer absolute inset-x-[22%] bottom-[10%] h-6 rounded-[50%] bg-ink/20 blur-xl"
          style={plane(-160)}
        />

        {/* the crest */}
        <div
          className="fox-layer absolute inset-0 grid place-items-center"
          style={plane(30)}
        >
          <LogoSvgSolid
            id={id}
            sheen
            className="h-[72%] w-[72%] drop-shadow-[0_24px_40px_rgba(20,16,11,0.28)]"
          />
        </div>
      </div>
    </div>
  );
}
