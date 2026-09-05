import { MongoClient } from "mongodb";

/**
 * Shared MongoDB connection.
 *
 * The client is cached on `globalThis` so that Next's dev-mode HMR — which
 * re-evaluates modules on every edit — does not open a new connection pool
 * each time. Every caller must tolerate `getDb()` returning `null`: the site
 * is designed to serve bundled seed content when the database is absent.
 */

const DB_NAME = process.env.MONGODB_DB || "wolfpack";
const URI = process.env.MONGODB_URI;

/** True when a connection string is configured at all. */
export const isConfigured = Boolean(URI);

const store = (globalThis.__wolfpackMongo ??= {
  client: null,
  promise: null,
  failedAt: 0,
});

/** After a connection failure, stop retrying for this long. */
const RETRY_COOLDOWN_MS = 30_000;

/**
 * Resolve the shared `Db`, or `null` when Mongo is unconfigured or failing.
 * Never throws — callers fall back to seed content instead of erroring a page.
 */
export async function getDb() {
  if (!URI) return null;

  if (store.failedAt && Date.now() - store.failedAt < RETRY_COOLDOWN_MS) {
    return null;
  }

  try {
    store.promise ??= new MongoClient(URI, {
      serverSelectionTimeoutMS: 5000,
    }).connect();

    store.client = await store.promise;
    store.failedAt = 0;
    return store.client.db(DB_NAME);
  } catch (error) {
    // Drop the rejected promise so the next attempt after the cooldown
    // reconnects rather than re-awaiting the same failure forever.
    store.promise = null;
    store.client = null;
    store.failedAt = Date.now();
    console.error("[mongodb] connection failed:", error?.message ?? error);
    return null;
  }
}

/**
 * Resolve a collection, or `null` when the database is unavailable.
 * @param {string} name
 */
export async function getCollection(name) {
  const db = await getDb();
  return db ? db.collection(name) : null;
}

/** Reads tolerate a missing database; writes must not silently no-op. */
export async function requireCollection(name) {
  const collection = await getCollection(name);
  if (!collection) {
    throw new Error(
      "MongoDB is not configured. Set MONGODB_URI in your environment to save changes.",
    );
  }
  return collection;
}
