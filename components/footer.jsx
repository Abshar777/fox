"use client";

import { useRef } from "react";
import { gsap, useIsoLayoutEffect, REDUCED } from "@/lib/gsap";
import { LogoFull } from "./logo";
import { Magnetic } from "./ui";

const COLUMNS = [
  {
    head: "Navigation",
    links: [
      ["Home", "#top"],
      ["About us", "#about"],
      ["Programmes", "#programmes"],
      ["Founders", "#founders"],
      ["Contact us", "#contact"],
    ],
  },
  {
    head: "Programmes",
    links: [
      ["Forex Blueprint", "#programmes"],
      ["Master PowerHouse", "#programmes"],
      ["Wolfpack Bootcamp", "#programmes"],
      ["Premium community", "#programmes"],
      ["Wolfpack AI", "#programmes"],
    ],
  },
  {
    head: "Elsewhere",
    links: [
      ["Instagram", "https://www.instagram.com/wolfpack_wealth__academy"],
      ["Facebook", "https://www.facebook.com/share/1J1zFfWpY8/"],
      ["YouTube", "https://youtube.com/@wolfpackwealthacademy"],
      ["WhatsApp", "https://wa.me/919207790485"],
    ],
  },
];

export default function Footer() {
  const root = useRef(null);

  useIsoLayoutEffect(() => {
    if (REDUCED()) return;

    const ctx = gsap.context((self) => {
      gsap.fromTo(
        self.selector(".footer-word"),
        { xPercent: -4 },
        {
          xPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={root}
      className="relative overflow-hidden bg-ink pt-20 text-bone"
    >
      <div className="u-shell relative">
        <div className="grid gap-10 pb-16 sm:grid-cols-2 sm:gap-12 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-4">
            <Magnetic strength={0.3}>
              <LogoFull className="h-auto w-52" />
            </Magnetic>

            <p className="mt-8 max-w-sm text-[0.82rem] leading-relaxed text-bone/55 md:text-sm">
              The premier destination in Kochi for professional Forex and Gold
              trading education, AI tools and mentorship.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic strength={0.25}>
                <a
                  href="https://client.mbfx.co/register?ref=3A52F2"
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="grow"
                  className="u-btn border-gold bg-gold text-night"
                >
                  <span>Create account</span>
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href="https://wa.me/919207790485"
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="grow"
                  className="u-btn border-bone/25 text-bone"
                >
                  <span>WhatsApp us</span>
                </a>
              </Magnetic>
            </div>
          </div>

          {COLUMNS.map((c) => (
            <nav key={c.head} className="lg:col-span-2">
              <p className="u-eyebrow mb-5 text-bone/35">{c.head}</p>
              <ul className="space-y-3">
                {c.links.map(([label, href]) => {
                  const ext = href.startsWith("http");
                  return (
                    <li key={label}>
                      <a
                        href={href}
                        {...(ext
                          ? { target: "_blank", rel: "noreferrer noopener" }
                          : {})}
                        className="group inline-flex items-center gap-2"
                      >
                        <span className="u-roll text-sm text-bone/75">
                          <span data-t={label}>{label}</span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-2">
            <p className="u-eyebrow mb-5 text-bone/35">Reach us</p>
            <a
              href="https://wa.me/919207790485"
              target="_blank"
              rel="noreferrer noopener"
              className="u-mono block text-[0.68rem] leading-relaxed text-bone/60 transition-colors hover:text-gold-lite"
            >
              +91 92077 90485
            </a>
            <a
              href="tel:+916238188112"
              className="u-mono mt-1.5 block text-[0.68rem] leading-relaxed text-bone/60 transition-colors hover:text-gold-lite"
            >
              +91 62381 88112
            </a>
            <a
              href="mailto:info@wolfpackwealthacademy.com"
              className="u-mono mt-1.5 block break-all text-[0.68rem] leading-relaxed text-bone/60 transition-colors hover:text-gold-lite"
            >
              info@wolfpackwealthacademy.com
            </a>
            <p className="u-mono mt-3 text-[0.68rem] leading-relaxed text-bone/60">
              Door no. 39/2501-A, Perayil Annexe,
              <br />
              RBI Lane, South Janatha Road,
              <br />
              Palarivattom, Kochi — 682032
              <br />
              Online &amp; offline
            </p>
          </div>
        </div>

        {/* legal */}
        <div className="flex flex-col gap-6 border-t border-bone/12 py-8 md:flex-row md:items-start md:justify-between">
          <p className="u-mono max-w-2xl text-[0.58rem] leading-relaxed text-bone/35">
            Wolfpack Wealth Academy provides trading education, tools and
            mentorship. Trading in foreign exchange, gold and crypto carries a
            high level of risk and may not be suitable for every investor. No
            returns are guaranteed. Never risk capital you cannot afford to
            lose.
          </p>
          <div className="flex shrink-0 gap-6">
            {["Privacy", "Terms", "Disclaimer"].map((l) => (
              <a key={l} href="#" className="u-link u-eyebrow text-bone/45">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* oversized wordmark */}
      <div className="relative select-none overflow-hidden">
        <p className="footer-word u-display whitespace-nowrap text-center text-[clamp(3rem,17vw,16rem)] leading-[0.78] text-bone/10">
          WOLFPACK WEALTH
        </p>
      </div>

      <div className="u-shell flex items-center justify-between border-t border-bone/10 py-5">
        <p className="u-mono text-[0.58rem] tracking-widest text-bone/30">
          © 2026 WOLFPACK WEALTH ACADEMY · POWERED BY LIMETEA
        </p>
        <a
          href="#top"
          data-cursor="grow"
          className="u-mono flex items-center gap-2 text-[0.58rem] tracking-widest text-bone/45 transition-colors hover:text-gold-lite"
        >
          BACK TO TOP <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
