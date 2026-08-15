"use client";

import { useRef } from "react";
import { gsap, useIsoLayoutEffect } from "@/lib/gsap";

/**
 * Two-part cursor: a hard dot that tracks 1:1 and a ring that lags behind.
 * Elements can opt into states with data-cursor="grow" | "hide" | a label string.
 */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);

  useIsoLayoutEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(dot.current, "x", {
      duration: 0.12,
      ease: "none",
    });
    const yTo = gsap.quickTo(dot.current, "y", {
      duration: 0.12,
      ease: "none",
    });
    const rx = gsap.quickTo(ring.current, "x", {
      duration: 0.55,
      ease: "power3",
    });
    const ry = gsap.quickTo(ring.current, "y", {
      duration: 0.55,
      ease: "power3",
    });

    let shown = false;
    const onMove = (e) => {
      if (!shown) {
        shown = true;
        gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3 });
      }
      xTo(e.clientX);
      yTo(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    const onOver = (e) => {
      const t = e.target.closest?.("[data-cursor], a, button");
      if (!t) return;
      const mode = t.getAttribute?.("data-cursor");

      if (mode === "hide") {
        gsap.to(ring.current, { scale: 0, duration: 0.4 });
        return;
      }
      const isLabel = mode && !["grow", "hide"].includes(mode);
      if (isLabel && label.current) label.current.textContent = mode;

      gsap.to(ring.current, {
        scale: isLabel ? 2.5 : 1.9,
        borderColor: "rgba(179,132,31,0.9)",
        backgroundColor: isLabel
          ? "rgba(246,230,188,0.92)"
          : "rgba(179,132,31,0.08)",
        duration: 0.45,
        ease: "power3.out",
      });
      if (isLabel)
        gsap.to(label.current, {
          autoAlpha: 1,
          scale: 0.42,
          duration: 0.35,
          ease: "power3.out",
        });
    };

    const onOut = (e) => {
      if (!e.target.closest?.("[data-cursor], a, button")) return;
      gsap.to(ring.current, {
        scale: 1,
        borderColor: "rgba(20,16,11,0.45)",
        backgroundColor: "rgba(0,0,0,0)",
        duration: 0.45,
        ease: "power3.out",
      });
      gsap.to(label.current, { autoAlpha: 0, scale: 0.6, duration: 0.25 });
    };

    const onDown = () => gsap.to(ring.current, { scale: 0.75, duration: 0.2 });
    const onUp = () => gsap.to(ring.current, { scale: 1, duration: 0.3 });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, true);
    document.addEventListener("pointerout", onOut, true);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver, true);
      document.removeEventListener("pointerout", onOut, true);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="u-cursor invisible">
        <div className="u-cursor__dot" />
      </div>
      <div ref={ring} className="u-cursor__ring invisible">
        <span ref={label} className="u-cursor__label" />
      </div>
    </>
  );
}
