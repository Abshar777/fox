"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, REDUCED } from "@/lib/gsap";
import { useLoader } from "./loader-context";

export default function SmoothScroll() {
  const { ready } = useLoader();

  useEffect(() => {
    if (REDUCED()) return;

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.95,
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // in-page anchors
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -10, duration: 1.5 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // hold the page still until the preloader clears
  useEffect(() => {
    const l = window.__lenis;
    if (!l) return;
    if (ready) l.start();
    else l.stop();
  }, [ready]);

  useEffect(() => {
    if (ready) ScrollTrigger.refresh();
  }, [ready]);

  return null;
}
