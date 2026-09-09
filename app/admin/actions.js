"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  createSessionToken,
  isAuthConfigured,
  sessionCookieOptions,
  verifyPassword,
} from "@/lib/auth";
import {
  createPost,
  updatePost,
  deletePost,
  seedPosts,
} from "@/lib/blog-repo";
import { slugify, estimateReadMinutes } from "@/lib/posts";
import { requireSession } from "./session";

/**
 * Server Actions for Blogs.
 *
 * Every mutating action calls `requireSession()` first: actions are reachable
 * as plain POST endpoints, so proxy-level protection is not sufficient on its
 * own.
 */

/** Refresh every surface a note appears on. */
function revalidateBlog(slug) {
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin");
  if (slug) revalidatePath(`/blog/${slug}`);
}

/**
 * Only allow post-login redirects to our own admin paths an unchecked
 * `next` parameter would turn the login page into an open redirect.
 */
function safeNext(value) {
  const target = String(value ?? "");
  if (!target.startsWith("/admin") || target.startsWith("//")) return "/admin";
  return target;
}

/* ── auth ─────────────────────────────────────────────────── */

export async function signIn(_prev, formData) {
  if (!isAuthConfigured()) {
    return { error: "Set ADMIN_PASSWORD and AUTH_SECRET before signing in." };
  }

  if (!verifyPassword(formData.get("password"))) {
    return { error: "That password is not right." };
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, await createSessionToken(), sessionCookieOptions());

  redirect(safeNext(formData.get("next")));
}

export async function signOut() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

/* ── notes ────────────────────────────────────────────────── */

/** FormData -> PostInput. Derives slug and read time when left blank. */
function parsePost(formData) {
  const read = (key) => String(formData.get(key) ?? "").trim();

  const title = read("title");
  const body = read("body")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter(Boolean);

  const slug = slugify(read("slug") || title);
  const readMinutes =
    Number(read("readMinutes")) || estimateReadMinutes(body.length ? body : [""]);

  return {
    slug,
    title,
    category: read("category") || "Market Structure",
    excerpt: read("excerpt"),
    image: read("image"),
    avatar: read("avatar") || undefined,
    author: read("author"),
    role: read("role") || undefined,
    publishedAt: read("publishedAt"),
    readMinutes,
    body,
  };
}

/** First failing rule, or null when the note is publishable. */
function validate(post) {
  if (!post.title) return "Give the note a title.";
  if (!post.slug) return "That title does not produce a usable slug.";
  if (!post.excerpt) return "Write a short excerpt it is used on cards and in search results.";
  if (!post.author) return "Name the author.";
  if (!post.image) return "Add a cover image.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(post.publishedAt)) {
    return "Set a publish date.";
  }
  if (!post.body.length) return "The note has no body text.";
  return null;
}

export async function savePost(_prev, formData) {
  await requireSession();

  const id = String(formData.get("id") ?? "");
  const post = parsePost(formData);

  const invalid = validate(post);
  if (invalid) return { error: invalid, values: post };

  try {
    if (id) await updatePost(id, post);
    else await createPost(post);
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Could not save the note.",
      values: post,
    };
  }

  revalidateBlog(post.slug);
  redirect("/admin?saved=1");
}

export async function removePost(formData) {
  await requireSession();

  const id = String(formData.get("id") ?? "");
  const slug = String(formData.get("slug") ?? "");
  if (!id) redirect("/admin");

  await deletePost(id);
  revalidateBlog(slug);
  redirect("/admin?deleted=1");
}

export async function importSeedPosts() {
  await requireSession();

  const inserted = await seedPosts();
  revalidateBlog();
  redirect(`/admin?imported=${inserted}`);
}
