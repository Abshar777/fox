import { ObjectId } from "mongodb";
import { getCollection, requireCollection } from "./mongodb";

/**
 * Binary image storage.
 *
 * Uploads are kept as BSON blobs rather than files on disk because serverless
 * hosts give each invocation an ephemeral, read-only filesystem anything
 * written to `public/` at runtime disappears. Documents are content-addressed
 * by their Mongo `_id`, which is what makes the public route immutable-cacheable.
 */

const COLLECTION = "images";

/** Upload types we accept, mapped to the magic bytes we verify them against. */
export const ALLOWED_IMAGE_TYPES = {
  "image/jpeg": [[0xff, 0xd8, 0xff]],
  "image/png": [[0x89, 0x50, 0x4e, 0x47]],
  "image/webp": [[0x52, 0x49, 0x46, 0x46]], // "RIFF"; WEBP checked at offset 8
  "image/gif": [[0x47, 0x49, 0x46, 0x38]],
  "image/avif": [], // brand checked at offset 4 below
};

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

/**
 * Verify the bytes really are the declared type. A browser-supplied MIME type
 * is attacker-controlled, so it alone is not enough to gate what we store and
 * later serve back with that same content type.
 */
export function sniffMatches(type, bytes) {
  const head = bytes.subarray(0, 16);

  if (type === "image/avif" || type === "image/webp") {
    const ascii = Buffer.from(head).toString("latin1");
    if (type === "image/webp") {
      return ascii.startsWith("RIFF") && ascii.slice(8, 12) === "WEBP";
    }
    return ascii.slice(4, 8) === "ftyp";
  }

  const signatures = ALLOWED_IMAGE_TYPES[type];
  if (!signatures?.length) return false;
  return signatures.some((sig) => sig.every((byte, i) => head[i] === byte));
}

/**
 * Persist image bytes and return the new id.
 * @param {Buffer} bytes
 * @param {string} contentType
 * @param {string} [filename]
 */
export async function saveImage(bytes, contentType, filename = "") {
  const images = await requireCollection(COLLECTION);
  const result = await images.insertOne({
    data: bytes,
    contentType,
    filename,
    size: bytes.length,
    createdAt: new Date(),
  });
  return result.insertedId.toString();
}

/**
 * Fetch stored bytes, or `null` when the id is unknown or malformed.
 * @returns {Promise<{ bytes: Buffer, contentType: string } | null>}
 */
export async function getImage(id) {
  if (!ObjectId.isValid(id)) return null;

  const images = await getCollection(COLLECTION);
  if (!images) return null;

  const doc = await images.findOne({ _id: new ObjectId(id) });
  if (!doc) return null;

  // The driver hands binary back as a BSON `Binary`; older documents or a
  // different write path may already be a Buffer.
  const raw = doc.data;
  const bytes = Buffer.isBuffer(raw) ? raw : Buffer.from(raw.buffer ?? raw);

  return { bytes, contentType: doc.contentType || "application/octet-stream" };
}

/** Public URL for a stored image id. */
export function imageUrl(id) {
  return `/api/images/${id}`;
}
