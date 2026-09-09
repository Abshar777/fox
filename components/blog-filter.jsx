"use client";

import { useMemo, useRef, useState } from "react";
import { gsap, useIsoLayoutEffect, REDUCED } from "@/lib/gsap";
import { PostCard } from "./post-card";

const ALL = "All notes";

/**
 * Category filter over the notes grid.
 *
 * Filtering is client-side on an already-loaded list rather than a URL query,
 * because the whole index is a handful of records a round trip per pill
 * would be slower and would lose scroll position.
 */
export default function BlogFilter({ posts }) {
  const [active, setActive] = useState(ALL);
  const grid = useRef(null);

  const categories = useMemo(
    () => [ALL, ...new Set(posts.map((post) => post.category))],
    [posts],
  );

  const visible = useMemo(
    () =>
      active === ALL ? posts : posts.filter((post) => post.category === active),
    [posts, active],
  );

  // Re-enter the cards whenever the filter changes, so the grid reads as a
  // deliberate change rather than a flicker of swapped content.
  useIsoLayoutEffect(() => {
    const node = grid.current;
    if (!node || REDUCED()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        node.children,
        { y: 26, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
          overwrite: true,
        },
      );
    }, node);

    return () => ctx.revert();
  }, [active]);

  return (
    <>
      <div
        role="tablist"
        aria-label="Filter notes by category"
        className="flex flex-wrap items-center gap-2"
      >
        {categories.map((category) => {
          const on = category === active;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActive(category)}
              data-cursor="grow"
              className={`u-eyebrow rounded-full border px-4 py-2.5 transition-all duration-500 ease-[var(--ease-out-expo)] ${on
                  ? "border-gold bg-gold text-night"
                  : "border-[var(--rule)] text-ink-70 hover:border-gold/50 hover:text-ink"
                }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div
        ref={grid}
        className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6"
      >
        {visible.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="u-mono mt-16 text-center text-[0.7rem] text-ink-45">
          No notes in this category yet.
        </p>
      ) : null}
    </>
  );
}
