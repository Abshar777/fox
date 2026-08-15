"use client";

import { useRef } from "react";
import { gsap, useIsoLayoutEffect, REDUCED } from "@/lib/gsap";
import {
  FoxDefs,
  FoxLayerHead,
  FoxLayerMuzzle,
  FoxLayerSnout,
} from "./fox-art";

/**
 * Depth-layered crest. Each facet group sits on its own Z plane inside a
 * preserve-3d stage, so rotating the stage produces real parallax between
 * ears, muzzle and snout. Yaws toward the pointer and breathes when idle.
 */
export default function FoxHead({ className = "", id = "hero" }) {
  const stage = useRef(null);
  const inner = useRef(null);

  useIsoLayoutEffect(() => {
    const box = inner.current;
    if (!box || REDUCED()) return;

    const ctx = gsap.context(() => {
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
        rotY(nx * 24);
        rotX(-ny * 14);
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
      };
    }, stage);

    return () => ctx.revert();
  }, []);

  const plane = (z) => ({ transform: `translateZ(${z}px)` });

  return (
    <div ref={stage} className={`fox-stage ${className}`}>
      <div ref={inner} className="fox-3d relative h-full w-full">
        {/* back plane: halo */}
        <div
          className="fox-layer absolute inset-0 grid place-items-center"
          style={plane(-140)}
        >
          <div className="h-[86%] w-[86%] rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(246,230,188,0.95),rgba(233,223,201,0.35)_55%,transparent_72%)]" />
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
          className="fox-layer absolute inset-x-[18%] bottom-[6%] h-6 rounded-[50%] bg-ink/25 blur-xl"
          style={plane(-160)}
        />

        {/* head plane */}
        <svg
          viewBox="0 0 400 400"
          className="fox-layer absolute inset-0 h-full w-full drop-shadow-[0_30px_45px_rgba(20,16,11,0.22)]"
          style={plane(0)}
        >
          <FoxDefs id={id} />
          <FoxLayerHead id={id} />
        </svg>

        {/* muzzle plane */}
        <svg
          viewBox="0 0 400 400"
          className="fox-layer absolute inset-0 h-full w-full"
          style={plane(34)}
        >
          <FoxDefs id={`${id}-m`} />
          <FoxLayerMuzzle id={`${id}-m`} />
        </svg>

        {/* snout plane */}
        <svg
          viewBox="0 0 400 400"
          className="fox-layer absolute inset-0 h-full w-full"
          style={plane(62)}
        >
          <FoxLayerSnout />
        </svg>

        {/* specular sheen */}
        <div
          className="fox-layer pointer-events-none absolute inset-0 mix-blend-overlay"
          style={plane(88)}
        >
          <div className="h-full w-full bg-[linear-gradient(115deg,transparent_38%,rgba(255,255,255,0.55)_47%,transparent_56%)]" />
        </div>
      </div>
    </div>
  );
}
