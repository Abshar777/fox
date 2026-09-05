import Link from "next/link";
import Avatar from "./avatar";
import { formatDate } from "@/lib/posts";

/**
 * Card vocabulary for Blogs, shared by the index, the homepage strip
 * and the related-notes grid so a note looks the same everywhere it appears.
 *
 * Covers are plain <img> for the same reason as Avatar: the source is
 * operator-supplied and may be any host.
 */

/** Category chip. `tone="over"` sits on top of an image. */
export function CategoryPill({ children, tone = "flat" }) {
  const skin =
    tone === "over"
      ? "border-bone/25 bg-night/55 text-gold-deep backdrop-blur-md"
      : "border-[var(--rule)] bg-sand/60 text-ink-70";
  return (
    <span className={`u-eyebrow rounded-full border px-3 py-1.5 ${skin}`}>
      {children}
    </span>
  );
}

/** Author, date and read time — the recurring byline row. */
export function Meta({ post, size = 32, className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Avatar name={post.author} src={post.avatar} size={size} />
      <div className="min-w-0">
        <p className="u-eyebrow truncate text-ink">{post.author}</p>
        <p className="u-mono mt-1 truncate text-[0.6rem] text-ink-45">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span className="mx-1.5 text-gold" aria-hidden="true">
            ·
          </span>
          {post.readMinutes} min read
        </p>
      </div>
    </div>
  );
}

/** Cover image with the site's hover-zoom and a warm tint over it. */
function Cover({ post, className = "", sizes = "(max-width: 1024px) 100vw, 33vw" }) {
  return (
    <span className={`relative block overflow-hidden bg-sand ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- operator-supplied URL, may be any host */}
      <img
        src={post.image}
        alt=""
        loading="lazy"
        decoding="async"
        sizes={sizes}
        className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
      />
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-night/70 via-night/5 to-transparent opacity-80"
      />
    </span>
  );
}

/**
 * Standard grid card.
 * @param {{ post: import("@/lib/posts").Post, index?: number }} props
 */
export function PostCard({ post, index }) {
  return (
    <article className="group relative flex h-full flex-col">
      <Link
        href={`/blog/${post.slug}`}
        data-cursor="grow"
        className="flex h-full flex-col border border-[var(--rule)] bg-paper transition-colors duration-500 hover:border-gold/45"
      >
        <span className="relative block">
          <Cover post={post} className="aspect-[16/10]" />

          <span className="absolute left-4 top-4">
            <CategoryPill tone="over">{post.category}</CategoryPill>
          </span>

          {typeof index === "number" ? (
            <span className="u-mono absolute bottom-3 right-4 text-[0.6rem] tracking-[0.2em] text-bone/60">
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : null}
        </span>

        <span className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="u-display text-[1.45rem] leading-[1.08] text-ink transition-colors duration-500 group-hover:text-gold sm:text-[1.6rem]">
            {post.title}
          </h3>

          <p className="mt-3 line-clamp-3 text-[0.86rem] leading-relaxed text-ink-70">
            {post.excerpt}
          </p>

          <span className="mt-auto block pt-6">
            <span className="mb-4 block h-px w-full origin-left scale-x-100 bg-[var(--rule)]">
              <span className="block h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
            </span>
            <Meta post={post} />
          </span>
        </span>
      </Link>
    </article>
  );
}

/** Oversized lead card for the newest note. */
export function FeaturedPost({ post }) {
  return (
    <article className="group relative">
      <Link
        href={`/blog/${post.slug}`}
        data-cursor="grow"
        className="grid gap-0 border border-[var(--rule)] bg-paper transition-colors duration-500 hover:border-gold/45 lg:grid-cols-12"
      >
        <span className="relative block lg:col-span-7">
          <Cover
            post={post}
            className="aspect-[16/10] lg:aspect-[16/11] lg:h-full"
            sizes="(max-width: 1024px) 100vw, 58vw"
          />
          <span className="absolute left-5 top-5">
            <CategoryPill tone="over">{post.category}</CategoryPill>
          </span>
        </span>

        <span className="flex flex-col justify-between p-6 sm:p-9 lg:col-span-5">
          <span className="block">
            <span className="u-eyebrow flex items-center gap-3 text-gold">
              <span className="h-px w-8 bg-gold" aria-hidden="true" />
              Latest note
            </span>

            <h2 className="u-display mt-6 text-[clamp(1.9rem,4.6vw,2.9rem)] leading-[0.98] text-ink transition-colors duration-500 group-hover:text-gold">
              {post.title}
            </h2>

            <p className="mt-5 max-w-prose text-[0.92rem] leading-relaxed text-ink-70">
              {post.excerpt}
            </p>
          </span>

          <span className="mt-10 block">
            <span className="mb-5 block h-px w-full bg-[var(--rule)]">
              <span className="block h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
            </span>
            <span className="flex flex-wrap items-center justify-between gap-4">
              <Meta post={post} size={40} />
              <span className="u-mono flex items-center gap-2 text-[0.62rem] tracking-[0.18em] text-ink transition-colors duration-500 group-hover:text-gold">
                READ
                <span
                  aria-hidden="true"
                  className="transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </span>
          </span>
        </span>
      </Link>
    </article>
  );
}
