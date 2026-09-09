import Link from "next/link";
import { PostCard } from "./post-card";
import { Reveal, SectionHead, Magnetic } from "./ui";
import { listPosts } from "@/lib/blog-repo";

/**
 * Homepage strip: the three newest Blogs.
 *
 * A server component so the landing page ships the notes in its initial HTML
 * the section is above the footer and inside the crawl path for /blog.
 */
export default async function Journal() {
  const posts = (await listPosts()).slice(0, 3);
  if (!posts.length) return null;

  return (
    <section id="notes" className="relative py-20 md:py-32">
      <div className="u-shell">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <SectionHead label="The Desk" />
            <Reveal
              as="h2"
              className="u-display mt-10 text-[clamp(2rem,10vw,3.4rem)] leading-[0.95] md:text-[clamp(2.3rem,4.4vw,4.2rem)]"
            >
              Blogs, written by the mentors.
            </Reveal>
          </div>

          <Magnetic strength={0.25}>
            <Link href="/blog" data-cursor="grow" className="u-btn u-btn--ghost">
              <span>Read all blogs</span>
            </Link>
          </Magnetic>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 md:mt-16">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
