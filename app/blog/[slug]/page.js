import Link from "next/link";
import { notFound } from "next/navigation";
import SiteChrome from "@/components/site-chrome";
import { PostCard, CategoryPill, Meta } from "@/components/post-card";
import { Reveal, Magnetic } from "@/components/ui";
import Avatar from "@/components/avatar";
import { listPosts, getPostBySlug } from "@/lib/blog-repo";
import { formatDate } from "@/lib/posts";

/**
 * Notes are prerendered at build time. `dynamicParams` is left at its default
 * of `true` so a note published from /admin after the last build still renders
 * on demand instead of 404ing.
 */
export async function generateStaticParams() {
  const posts = await listPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return { title: "Note not found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

/** Same category first, newest first, never the note being read. */
async function relatedTo(post, limit = 3) {
  const posts = await listPosts();
  const others = posts.filter((p) => p.slug !== post.slug);
  const sameTopic = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...sameTopic, ...rest].slice(0, limit);
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const [standfirst, ...paragraphs] = post.body;
  const related = await relatedTo(post);

  return (
    <SiteChrome>
      <article>
        {/* ── header ─────────────────────────────────────────── */}
        <header className="u-shell pt-32 md:pt-40">
          <nav aria-label="Breadcrumb">
            <ol className="u-mono flex flex-wrap items-center gap-2 text-[0.6rem] tracking-[0.16em] text-ink-45">
              <li>
                <Link href="/" className="u-link transition-colors hover:text-gold">
                  HOME
                </Link>
              </li>
              <li aria-hidden="true" className="text-gold">
                /
              </li>
              <li>
                <Link
                  href="/blog"
                  className="u-link transition-colors hover:text-gold"
                >
                  BLOGS
                </Link>
              </li>
              <li aria-hidden="true" className="text-gold">
                /
              </li>
              <li className="max-w-[16rem] truncate text-ink-70" aria-current="page">
                {post.category.toUpperCase()}
              </li>
            </ol>
          </nav>

          <div className="mt-10 max-w-4xl">
            <CategoryPill>{post.category}</CategoryPill>

            <Reveal
              as="h1"
              className="u-display mt-7 text-[clamp(2.2rem,10vw,3.2rem)] leading-[0.96] md:text-[clamp(2.6rem,5.2vw,4.6rem)]"
            >
              {post.title}
            </Reveal>

            <p className="mt-7 max-w-2xl text-[1rem] leading-relaxed text-ink-70 md:text-[1.1rem]">
              {post.excerpt}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-y border-[var(--rule)] py-5">
            <div className="flex items-center gap-4">
              <Avatar name={post.author} src={post.avatar} size={46} />
              <div>
                <p className="u-eyebrow text-ink">{post.author}</p>
                <p className="u-mono mt-1 text-[0.62rem] text-ink-45">
                  {post.role || "Wolfpack Wealth Academy"}
                </p>
              </div>
            </div>

            <div className="u-mono flex items-center gap-5 text-[0.62rem] tracking-[0.16em] text-ink-45">
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt).toUpperCase()}
              </time>
              <span className="text-gold" aria-hidden="true">
                ·
              </span>
              <span>{post.readMinutes} MIN READ</span>
            </div>
          </div>
        </header>

        {/* ── cover ──────────────────────────────────────────── */}
        <div className="u-shell mt-10 md:mt-14">
          <figure className="relative overflow-hidden border border-[var(--rule)] bg-sand">
            {/* eslint-disable-next-line @next/next/no-img-element -- operator-supplied URL, may be any host */}
            <img
              src={post.image}
              alt=""
              className="aspect-[16/9] w-full object-cover"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/35 to-transparent"
            />
          </figure>
        </div>

        {/* ── body ───────────────────────────────────────────── */}
        <div className="u-shell py-14 md:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* running head, desktop only */}
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-32">
                <p className="u-eyebrow text-ink-45">Filed under</p>
                <p className="u-display mt-3 text-2xl leading-tight text-gold">
                  {post.category}
                </p>
                <div className="mt-7 border-t border-[var(--rule)] pt-5">
                  <p className="u-mono text-[0.6rem] leading-relaxed text-ink-45">
                    Educational content only. Trading carries risk and no
                    returns are guaranteed.
                  </p>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-9">
              {standfirst ? (
                <p className="u-display text-[clamp(1.35rem,5.4vw,1.75rem)] leading-[1.28] text-ink md:text-[clamp(1.5rem,2.3vw,2.1rem)]">
                  {standfirst}
                </p>
              ) : null}

              <div className="mt-9 max-w-[68ch] space-y-6">
                {paragraphs.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-[0.96rem] leading-[1.85] text-ink-70 md:text-[1.02rem]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* inline promo */}
              <aside className="u-card relative mt-14 overflow-hidden p-7 sm:p-9">
                <div
                  className="u-hatch pointer-events-none absolute inset-0 opacity-40"
                  aria-hidden="true"
                />
                <div className="relative flex flex-wrap items-center justify-between gap-7">
                  <div className="max-w-md">
                    <p className="u-eyebrow text-gold">Learn this properly</p>
                    <p className="u-display mt-4 text-[1.6rem] leading-[1.05] sm:text-[1.9rem]">
                      Structure, risk and psychology taught step by step.
                    </p>
                    <p className="mt-4 text-[0.86rem] leading-relaxed text-ink-70">
                      Live mentorship and trade reviews with the Wolfpack desk,
                      online or offline in Kochi.
                    </p>
                  </div>
                  <Magnetic strength={0.25}>
                    <Link
                      href="/#programmes"
                      data-cursor="grow"
                      className="u-btn u-btn--solid"
                    >
                      <span>Explore programmes</span>
                    </Link>
                  </Magnetic>
                </div>
              </aside>

              <div className="mt-12 flex items-center justify-between border-t border-[var(--rule)] pt-7">
                <Meta post={post} size={38} />
                <Link
                  href="/blog"
                  data-cursor="grow"
                  className="u-mono group flex items-center gap-2 text-[0.62rem] tracking-[0.18em] text-ink transition-colors hover:text-gold"
                >
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-x-1"
                  >
                    ←
                  </span>
                  ALL NOTES
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* ── related ──────────────────────────────────────────── */}
      {related.length ? (
        <section className="u-shell pb-24 md:pb-32">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-5 border-t border-[var(--rule)] pt-9">
            <h2 className="u-display text-[clamp(1.8rem,7vw,2.4rem)] leading-none md:text-[clamp(2rem,3.4vw,3rem)]">
              More from the desk
            </h2>
            <Link
              href="/blog"
              className="u-mono text-[0.62rem] tracking-[0.18em] text-ink-45 transition-colors hover:text-gold"
            >
              VIEW ALL →
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {related.map((item) => (
              <PostCard key={item.slug} post={item} />
            ))}
          </div>
        </section>
      ) : null}
    </SiteChrome>
  );
}
