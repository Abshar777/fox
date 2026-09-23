import Link from "next/link";
import { notFound } from "next/navigation";
import SiteChrome from "@/components/site-chrome";
import { PROGRAMME_BY_SLUG, PROGRAMMES } from "@/lib/programmes";

export function generateStaticParams() {
  return PROGRAMMES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const programme = PROGRAMME_BY_SLUG[slug];
  if (!programme) return { title: "Programme not found" };
  return {
    title: programme.title,
    description: programme.lead,
    alternates: { canonical: `/programmes/${programme.slug}` },
  };
}

export default async function ProgrammePage({ params }) {
  const { slug } = await params;
  const programme = PROGRAMME_BY_SLUG[slug];
  if (!programme) notFound();

  return (
    <SiteChrome>
      <article>
        <header className="u-shell pb-12 pt-32 md:pb-16 md:pt-40">
          <nav aria-label="Breadcrumb" className="u-mono text-[0.62rem] tracking-[0.16em] text-ink-45">
            <Link href="/" className="transition-colors hover:text-gold">HOME</Link>
            <span className="mx-3 text-gold" aria-hidden="true">/</span>
            <Link href="/#programmes" className="transition-colors hover:text-gold">PROGRAMMES</Link>
            <span className="mx-3 text-gold" aria-hidden="true">/</span>
            <span className="text-ink-70">{programme.title.toUpperCase()}</span>
          </nav>

          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="u-eyebrow text-gold">{programme.number} / 05 · {programme.eyebrow}</p>
              <h1 className="u-display mt-6 max-w-4xl text-[clamp(2.8rem,12vw,5.8rem)] leading-[0.9]">{programme.title}</h1>
              <p className="u-display mt-7 max-w-2xl text-[clamp(1.35rem,5vw,2rem)] leading-tight text-gold-deep">{programme.lead}</p>
            </div>
            <aside className="u-card relative overflow-hidden p-6 lg:col-span-4 lg:p-8">
              <div className="u-hatch pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
              <p className="u-eyebrow relative text-gold">The Wolfpack approach</p>
              <ul className="relative mt-5 space-y-4">
                {programme.points.map((point, index) => (
                  <li key={point} className="flex gap-3 text-[0.86rem] leading-relaxed text-ink-70">
                    <span className="u-mono text-[0.62rem] text-gold">0{index + 1}</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </header>

        <div className="u-shell pb-20 md:pb-28">
          <div className="grid gap-12 border-t border-[var(--rule)] pt-10 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-3">
              <p className="u-mono text-[0.62rem] tracking-[0.16em] text-ink-45">A CLOSER LOOK</p>
            </aside>
            <div className="space-y-6 lg:col-span-7">
              {programme.description.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="max-w-[68ch] text-[0.96rem] leading-[1.85] text-ink-70 md:text-[1.02rem]">{paragraph}</p>
              ))}
            </div>
          </div>

          <section className="u-card relative mt-16 overflow-hidden p-7 md:mt-24 md:p-12">
            <div className="u-hatch pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
            <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
              <div className="max-w-2xl">
                <p className="u-eyebrow text-gold">Take the next step</p>
                <h2 className="u-display mt-4 text-[clamp(2rem,8vw,3.5rem)] leading-none">Let’s talk about your goals.</h2>
                <p className="mt-4 max-w-xl text-[0.9rem] leading-relaxed text-ink-70">Connect with the Wolfpack team to learn more about {programme.title.toLowerCase()} and discuss whether it fits your needs.</p>
              </div>
              <a href="https://wa.me/919048514395" target="_blank" rel="noreferrer noopener" className="u-btn u-btn--solid" data-cursor="grow"><span>{programme.cta}</span></a>
            </div>
          </section>
        </div>
      </article>
    </SiteChrome>
  );
}
