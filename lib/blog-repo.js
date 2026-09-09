import { cache } from "react";
import { ObjectId } from "mongodb";
import { getCollection, requireCollection } from "./mongodb";
import { SEED_POSTS, byNewest } from "./posts";

/**
 * Data access for Blogs.
 *
 * Reads are Mongo-first with a bundled-seed fallback, so the site renders
 * correctly on a fresh clone with no database. Writes have no fallback —
 * they require Mongo and throw a readable error when it is missing.
 *
 * Reads are wrapped in React's `cache()` to dedupe within a single render
 * (a post page resolves the same slug in `generateMetadata` and again in the
 * page body).
 */

const COLLECTION = "posts";

/** Mongo document -> plain `Post` safe to pass into client components. */
function toPost(doc) {
  const { _id, createdAt, updatedAt, ...rest } = doc;
  return {
    ...rest,
    id: _id.toString(),
    body: Array.isArray(rest.body) ? rest.body : [],
  };
}

/** `null` for anything that is not a valid 24-char hex id. */
function toObjectId(id) {
  return ObjectId.isValid(id) ? new ObjectId(id) : null;
}

export const listPosts = cache(async () => {
  try {
    const posts = await getCollection(COLLECTION);
    if (!posts) return [...SEED_POSTS].sort(byNewest);

    const docs = await posts.find({}).sort({ publishedAt: -1 }).toArray();
    if (docs.length === 0) return [...SEED_POSTS].sort(byNewest);

    return docs.map(toPost).sort(byNewest);
  } catch (error) {
    console.error("[blog-repo] listPosts fell back to seed content:", error);
    return [...SEED_POSTS].sort(byNewest);
  }
});

export const getPostBySlug = cache(async (slug) => {
  try {
    const posts = await getCollection(COLLECTION);
    if (posts) {
      const doc = await posts.findOne({ slug });
      if (doc) return toPost(doc);

      // An empty collection means "not seeded yet", so fall through to the
      // bundled content. A populated collection is authoritative: an unknown
      // slug there is a genuine 404.
      const total = await posts.estimatedDocumentCount();
      if (total > 0) return null;
    }
  } catch (error) {
    console.error("[blog-repo] getPostBySlug fell back to seed content:", error);
  }

  return SEED_POSTS.find((post) => post.slug === slug) ?? null;
});

export const getPostById = cache(async (id) => {
  const _id = toObjectId(id);
  if (!_id) return null;

  const posts = await getCollection(COLLECTION);
  if (!posts) return null;

  const doc = await posts.findOne({ _id });
  return doc ? toPost(doc) : null;
});

/** True when the collection holds at least one post (used by admin banners). */
export async function hasStoredPosts() {
  try {
    const posts = await getCollection(COLLECTION);
    if (!posts) return false;
    return (await posts.estimatedDocumentCount()) > 0;
  } catch {
    return false;
  }
}

/** Reject a slug already taken by a *different* post. */
async function assertSlugFree(posts, slug, exceptId) {
  const clash = await posts.findOne({ slug });
  if (clash && clash._id.toString() !== exceptId) {
    throw new Error(`The slug "${slug}" is already used by another note.`);
  }
}

export async function createPost(input) {
  const posts = await requireCollection(COLLECTION);
  await assertSlugFree(posts, input.slug);

  const now = new Date();
  const result = await posts.insertOne({
    ...input,
    createdAt: now,
    updatedAt: now,
  });
  return result.insertedId.toString();
}

export async function updatePost(id, input) {
  const _id = toObjectId(id);
  if (!_id) throw new Error("That note id is not valid.");

  const posts = await requireCollection(COLLECTION);
  await assertSlugFree(posts, input.slug, id);

  const result = await posts.updateOne(
    { _id },
    { $set: { ...input, updatedAt: new Date() } },
  );
  if (result.matchedCount === 0) throw new Error("That note no longer exists.");
}

export async function deletePost(id) {
  const _id = toObjectId(id);
  if (!_id) throw new Error("That note id is not valid.");

  const posts = await requireCollection(COLLECTION);
  await posts.deleteOne({ _id });
}

/**
 * Idempotent starter import only writes into an empty collection, so it can
 * never duplicate or clobber notes that already exist.
 * @returns {Promise<number>} how many notes were inserted
 */
export async function seedPosts() {
  const posts = await requireCollection(COLLECTION);
  if ((await posts.estimatedDocumentCount()) > 0) return 0;

  const now = new Date();
  const result = await posts.insertMany(
    SEED_POSTS.map((post) => ({ ...post, createdAt: now, updatedAt: now })),
  );
  return result.insertedCount;
}
