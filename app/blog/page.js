import Link from "next/link";
import SiteChrome from "@/components/site-chrome";
import BlogFilter from "@/components/blog-filter";
import { FeaturedPost } from "@/components/post-card";
import { Reveal, SectionHead, Magnetic } from "@/components/ui";
import { listPosts } from "@/lib/blog-repo";

export const metadata = {
  title: "Blogs",
  description:
    "Trading notes from the Wolfpack Wealth Academy desk in Kochi — market structure, risk management, trading psychology and gold, written by the mentors who teach them.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "Blogs · Wolfpack Wealth Academy",
    description:
      "Trading notes from the Wolfpack Wealth Academy desk — market structure, risk, psychology and gold.",
    url: "/blog",
  },
};

/** Card lists never render `body`; dropping it keeps the client payload small. */
function toSummary({ body, ...rest }) {
  return rest;
}

export default async function BlogPage() {
  const posts = await listPosts();
  const [featured] = posts;
  const categories = new Set(posts.map((post) => post.category));

  return (
    <SiteChrome>
      {/* ── header ───────────────────────────────────────────── */}
      <section className="u-shell pb-14 pt-32 md:pb-20 md:pt-44">
        <SectionHead label="The Desk" />

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal
              as="h1"
              className="u-display text-[clamp(2.6rem,13vw,4.2rem)] leading-[0.92] md:text-[clamp(3rem,6.4vw,6rem)]"
            >
              Blogs from the Wolfpack desk.
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:pt-3">
            <p className="max-w-md text-[0.95rem] leading-relaxed text-ink-70 md:text-base">
              Structure, liquidity, risk and psychology — written by the mentors
              who teach them in Kochi. No signals, no hype, no guaranteed
              returns. Just the reasoning we use on live charts.
            </p>

            <dl className="mt-9 flex flex-wrap gap-x-12 gap-y-6 border-t border-[var(--rule)] pt-7">
              <div>
                <dt className="u-eyebrow text-ink-45">Notes published</dt>
                <dd className="u-display mt-1.5 text-3xl text-gold">
                  {String(posts.length).padStart(2, "0")}
                </dd>
              </div>
              <div>
                <dt className="u-eyebrow text-ink-45">Topics covered</dt>
                <dd className="u-display mt-1.5 text-3xl text-gold">
                  {String(categories.size).padStart(2, "0")}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* ── featured ─────────────────────────────────────────── */}
      {featured ? (
        <section className="u-shell">
          <FeaturedPost post={featured} />
        </section>
      ) : null}

      {/* ── everything else ──────────────────────────────────── */}
      <section className="u-shell py-16 md:py-24">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-6 border-t border-[var(--rule)] pt-9">
          <h2 className="u-display text-[clamp(1.8rem,7vw,2.4rem)] leading-none md:text-[clamp(2rem,3.4vw,3rem)]">
            All blogs
          </h2>
          <p className="u-mono text-[0.62rem] tracking-[0.18em] text-ink-45">
            FILTER BY TOPIC
          </p>
        </div>

        <BlogFilter posts={posts.map(toSummary)} />
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="u-shell pb-24 md:pb-32">
        <div className="u-card relative overflow-hidden p-8 text-center sm:p-14">
          <div
            className="u-hatch pointer-events-none absolute inset-0 opacity-40"
            aria-hidden="true"
          />
          <div className="relative">
            <p className="u-eyebrow text-gold">Next step</p>
            <h2 className="u-display mx-auto mt-6 max-w-2xl text-[clamp(1.9rem,8vw,2.6rem)] leading-[1] md:text-[clamp(2.2rem,3.8vw,3.4rem)]">
              Reading about it is the easy part.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[0.9rem] leading-relaxed text-ink-70">
              Every note here is drawn from what we teach in the programme —
              live market analysis, journal reviews and mentorship, online or
              offline in Kochi.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Magnetic strength={0.25}>
                <Link
                  href="/#programmes"
                  data-cursor="grow"
                  className="u-btn u-btn--solid"
                >
                  <span>See the programmes</span>
                </Link>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href="https://wa.me/919207790485"
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="grow"
                  className="u-btn u-btn--ghost"
                >
                  <span>Talk to a mentor</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
