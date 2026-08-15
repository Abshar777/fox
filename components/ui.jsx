"use client";

import { useRef } from "react";
import {
  gsap,
  ScrollTrigger,
  SplitText,
  useIsoLayoutEffect,
  REDUCED,
} from "@/lib/gsap";

/* ------------------------------------------------------------------
   Reveal — masked line-by-line typography reveal driven by ScrollTrigger
   ------------------------------------------------------------------ */

export function Reveal({
  as: Tag = "div",
  children,
  className = "",
  type = "lines",
  stagger = 0.09,
  duration = 1.15,
  delay = 0,
  start = "top 85%",
  ...rest
}) {
  const el = useRef(null);

  useIsoLayoutEffect(() => {
    const node = el.current;
    if (!node) return;

    if (REDUCED()) {
      node.classList.add("is-ready");
      return;
    }

    let split;
    let killed = false;

    const run = () => {
      if (killed || !el.current) return;
      node.classList.add("is-ready");

      split = SplitText.create(node, {
        type: type === "chars" ? "chars,words,lines" : "lines",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit(self) {
          const targets = type === "chars" ? self.chars : self.lines;
          return gsap.from(targets, {
            yPercent: 115,
            rotate: type === "chars" ? 0 : 2,
            duration,
            delay,
            stagger: type === "chars" ? stagger * 0.14 : stagger,
            ease: "power4.out",
            scrollTrigger: {
              trigger: node,
              start,
              once: true,
            },
          });
        },
      });
    };

    document.fonts?.ready.then(run) ?? run();

    return () => {
      killed = true;
      split?.revert();
    };
  }, []);

  return (
    <Tag ref={el} data-split="" className={className} {...rest}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   MaskUp — single-line masked reveal that does NOT split the text.
   Use for gradient/background-clip type, which SplitText would flatten.
   ------------------------------------------------------------------ */

export function MaskUp({
  children,
  className = "",
  innerClassName = "",
  delay = 0,
  start = "top 88%",
}) {
  const el = useRef(null);

  useIsoLayoutEffect(() => {
    const node = el.current;
    if (!node || REDUCED()) return;

    const ctx = gsap.context(() => {
      gsap.from(node.firstElementChild, {
        yPercent: 118,
        duration: 1.25,
        delay,
        ease: "power4.out",
        scrollTrigger: { trigger: node, start, once: true },
      });
    }, node);

    return () => ctx.revert();
  }, []);

  return (
    <span ref={el} className={`js-mask ${className}`}>
      <span className={`block ${innerClassName}`}>{children}</span>
    </span>
  );
}

/* ------------------------------------------------------------------
   FadeUp — simple staggered entrance for non-text blocks
   ------------------------------------------------------------------ */

export function FadeUp({
  as: Tag = "div",
  children,
  className = "",
  y = 40,
  stagger = 0.1,
  selector = ":scope > *",
  start = "top 85%",
  ...rest
}) {
  const el = useRef(null);

  useIsoLayoutEffect(() => {
    const node = el.current;
    if (!node || REDUCED()) return;

    const ctx = gsap.context(() => {
      const targets = node.querySelectorAll(selector);
      if (!targets.length) return;
      gsap.from(targets, {
        y,
        autoAlpha: 0,
        duration: 1.1,
        stagger,
        ease: "power3.out",
        scrollTrigger: { trigger: node, start, once: true },
      });
    }, node);

    return () => ctx.revert();
  }, []);

  return (
    <Tag ref={el} className={className} {...rest}>
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   Magnetic — pointer-attracted wrapper for buttons and marks
   ------------------------------------------------------------------ */

export function Magnetic({ children, strength = 0.35, className = "" }) {
  const el = useRef(null);

  useIsoLayoutEffect(() => {
    const node = el.current;
    if (!node || window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(node, "x", {
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
    });
    const yTo = gsap.quickTo(node, "y", {
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
    });

    const move = (e) => {
      const r = node.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };

    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", leave);
    return () => {
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <span
      ref={el}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------
   Marquee — seamless loop that reacts to scroll velocity
   ------------------------------------------------------------------ */

export function Marquee({
  children,
  speed = 40,
  direction = 1,
  className = "",
  reactive = true,
}) {
  const wrap = useRef(null);

  useIsoLayoutEffect(() => {
    const node = wrap.current;
    if (!node) return;
    const track = node.querySelector(".u-marquee");
    if (!track) return;

    const ctx = gsap.context(() => {
      const tl = gsap.to(track, {
        xPercent: -50,
        duration: speed,
        ease: "none",
        repeat: -1,
      });
      tl.timeScale(direction);

      if (!reactive) return;

      let dir = direction;
      const st = ScrollTrigger.create({
        trigger: node,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = gsap.utils.clamp(-6, 6, self.getVelocity() / 260);
          const next = self.direction * direction;
          if (next !== dir) {
            dir = next;
            gsap.to(tl, { timeScale: dir, duration: 0.5 });
          }
          gsap.to(tl, {
            timeScale: dir * (1 + Math.abs(v)),
            duration: 0.4,
            overwrite: true,
          });
        },
      });

      return () => {
        st.kill();
        tl.kill();
      };
    }, node);

    return () => ctx.revert();
  }, [speed, direction, reactive]);

  return (
    <div ref={wrap} className={`overflow-hidden ${className}`}>
      <div className="u-marquee">
        {children}
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Counter — count-up on enter
   ------------------------------------------------------------------ */

export function Counter({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}) {
  const el = useRef(null);

  useIsoLayoutEffect(() => {
    const node = el.current;
    if (!node) return;

    const fmt = new Intl.NumberFormat("en-GB", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    const write = (v) => {
      node.textContent = `${prefix}${fmt.format(v)}${suffix}`;
    };

    if (REDUCED()) {
      write(to);
      return;
    }

    const ctx = gsap.context(() => {
      const obj = { v: 0 };
      gsap.to(obj, {
        v: to,
        duration: 2.1,
        ease: "power2.out",
        scrollTrigger: { trigger: node, start: "top 88%", once: true },
        onUpdate: () => write(obj.v),
      });
    }, node);

    return () => ctx.revert();
  }, [to, decimals, prefix, suffix]);

  // tabular figures keep the width stable while counting, without forcing
  // the mono face onto a display-serif heading
  return (
    <span
      ref={el}
      className={`[font-variant-numeric:tabular-nums] ${className}`}
    >
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------
   SectionHead — the recurring numbered rule + label
   ------------------------------------------------------------------ */

export function SectionHead({ label, className = "" }) {
  return <p className={`u-eyebrow text-ink-45 ${className}`}>{label}</p>;
}
