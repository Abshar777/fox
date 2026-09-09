import { getImage } from "@/lib/image-repo";

/**
 * Public byte-serving endpoint for uploaded images.
 *
 * Responses are immutable-cacheable because the URL is content-addressed by
 * the Mongo `_id` a given id always returns the same bytes, and replacing
 * an image mints a new id.
 */
export async function GET(_request, ctx) {
  const { id } = await ctx.params;

  const image = await getImage(id);
  if (!image) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(image.bytes, {
    headers: {
      "Content-Type": image.contentType,
      "Content-Length": String(image.bytes.length),
      "Cache-Control": "public, max-age=31536000, immutable",
      // The type was verified by magic bytes on upload; refuse to let a
      // browser second-guess it back into something executable.
      "X-Content-Type-Options": "nosniff",
    },
  });
}
