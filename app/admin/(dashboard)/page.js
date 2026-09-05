import Link from "next/link";
import Avatar from "@/components/avatar";
import ConfirmButton from "@/components/admin/confirm-button";
import { isConfigured } from "@/lib/mongodb";
import { listPosts, hasStoredPosts } from "@/lib/blog-repo";
import { formatDate } from "@/lib/posts";
import { importSeedPosts, removePost } from "../actions";

export const metadata = { title: "Blogs" };

/** Reads searchParams so the redirect after a mutation can flash a result. */
function flashFor(params) {
  if (params.saved) return "Note saved.";
  if (params.deleted) return "Note deleted.";
  if (params.imported !== undefined) {
    const count = Number(params.imported);
    return count > 0
      ? `Imported ${count} starter note${count === 1 ? "" : "s"}.`
      : "Nothing imported — the collection already has notes.";
  }
  return null;
}

export default async function AdminPostsPage({ searchParams }) {
  const params = await searchParams;
  const [posts, stored] = await Promise.all([listPosts(), hasStoredPosts()]);
  const flash = flashFor(params);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="u-eyebrow text-ink-45">Content</p>
          <h1 className="u-display mt-3 text-[2.4rem] leading-none">
            Blogs
          </h1>
        </div>

        <Link href="/admin/posts/new" className="u-btn u-btn--solid">
          <span>New note</span>
        </Link>
      </div>

      {flash ? (
        <p className="u-mono mt-7 border border-gold/40 bg-gold/10 px-4 py-3 text-[0.68rem] text-ink">
          {flash}
        </p>
      ) : null}

      {/* Reads fall back to bundled content, but writes need a database — say
          so plainly rather than letting saves fail with a driver error. */}
      {!isConfigured ? (
        <p className="u-mono mt-7 border border-rust/40 bg-rust/10 px-4 py-3.5 text-[0.68rem] leading-relaxed text-ink">
          MONGODB_URI is not set. The site is serving the {posts.length} bundled
          starter notes, and saving is disabled until a database is configured.
        </p>
      ) : !stored ? (
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border border-gold/40 bg-gold/10 px-4 py-3.5">
          <p className="u-mono text-[0.68rem] leading-relaxed text-ink">
            Connected to MongoDB, but the notes collection is empty. The site is
            showing bundled starter notes.
          </p>
          <form action={importSeedPosts}>
            <button
              type="submit"
              className="u-mono border border-ink px-3.5 py-2 text-[0.62rem] tracking-[0.16em] transition-colors hover:border-gold hover:text-gold"
            >
              IMPORT STARTER NOTES
            </button>
          </form>
        </div>
      ) : null}

      <div className="mt-9 overflow-x-auto border border-[var(--rule)]">
        <table className="w-full min-w-[52rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-[var(--rule)] bg-paper">
              {["Note", "Category", "Author", "Published", ""].map((head) => (
                <th
                  key={head}
                  scope="col"
                  className="u-eyebrow px-4 py-3.5 text-ink-45"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {posts.map((post) => (
              <tr
                key={post.slug}
                className="border-b border-[var(--rule)] last:border-b-0"
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3.5">
                    {/* eslint-disable-next-line @next/next/no-img-element -- operator-supplied URL, may be any host */}
                    <img
                      src={post.image}
                      alt=""
                      className="h-11 w-16 shrink-0 border border-[var(--rule)] object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm text-ink">{post.title}</p>
                      <p className="u-mono mt-1 truncate text-[0.6rem] text-ink-45">
                        /blog/{post.slug}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-4 py-3.5">
                  <span className="u-eyebrow rounded-full border border-[var(--rule)] px-2.5 py-1 text-ink-70">
                    {post.category}
                  </span>
                </td>

                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={post.author} src={post.avatar} size={26} />
                    <span className="text-[0.8rem] text-ink-70">
                      {post.author}
                    </span>
                  </div>
                </td>

                <td className="u-mono px-4 py-3.5 text-[0.68rem] text-ink-45">
                  {formatDate(post.publishedAt)}
                </td>

                <td className="px-4 py-3.5">
                  {post.id ? (
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="u-mono border border-[var(--rule)] px-3 py-1.5 text-[0.6rem] tracking-[0.14em] transition-colors hover:border-gold hover:text-gold"
                      >
                        EDIT
                      </Link>
                      <form action={removePost}>
                        <input type="hidden" name="id" value={post.id} />
                        <input type="hidden" name="slug" value={post.slug} />
                        <ConfirmButton
                          message={`Delete "${post.title}"? This cannot be undone.`}
                          className="u-mono border border-[var(--rule)] px-3 py-1.5 text-[0.6rem] tracking-[0.14em] transition-colors hover:border-rust hover:text-rust"
                        >
                          DELETE
                        </ConfirmButton>
                      </form>
                    </div>
                  ) : (
                    <p className="u-mono text-right text-[0.6rem] text-ink-45">
                      BUNDLED
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
