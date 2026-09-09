"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, REDUCED } from "@/lib/gsap";
import { useLoader } from "./loader-context";
import { usePathname } from "next/navigation";

export default function SmoothScroll() {
  const { ready } = useLoader();
  const pathname = usePathname();

  useEffect(() => {

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.95,
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    if (!lenis) return;
    if (window.location.hash) return;

    // BOTH sides have to be reset, and that is the whole bug.
    //
    // Lenis keeps its own `animatedScroll` value and writes it to the document
    // every frame. Telling only Lenis leaves the document where it was until the
    // next tick; moving only the document leaves Lenis's value stale, and its
    // next frame puts the old position straight back which is why navigating
    // into a post from halfway down /blog landed mid-article.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    lenis.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

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
