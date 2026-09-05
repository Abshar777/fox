import { notFound } from "next/navigation";
import Link from "next/link";
import PostForm from "@/components/admin/post-form";
import { getPostById } from "@/lib/blog-repo";

export const metadata = { title: "Edit note" };

export default async function EditPostPage({ params }) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) notFound();

  return (
    <>
      <p className="u-eyebrow text-ink-45">Blogs</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <h1 className="u-display text-[2.4rem] leading-none">Edit note</h1>
        <Link
          href={`/blog/${post.slug}`}
          target="_blank"
          className="u-mono text-[0.62rem] tracking-[0.16em] text-ink-45 transition-colors hover:text-gold"
        >
          VIEW NOTE ↗
        </Link>
      </div>
      <PostForm post={post} />
    </>
  );
}
