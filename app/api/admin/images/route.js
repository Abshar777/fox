import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_BYTES,
  imageUrl,
  saveImage,
  sniffMatches,
} from "@/lib/image-repo";

/**
 * Authenticated upload endpoint.
 *
 * This exists as a Route Handler rather than a Server Action because Server
 * Actions cap request bodies at 1MB, which is below any realistic cover image.
 */
export async function POST(request) {
  const store = await cookies();
  if (!(await verifySessionToken(store.get(SESSION_COOKIE)?.value))) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Malformed upload." }, { status: 400 });
  }

  const file = form.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file received." }, { status: 400 });
  }

  if (!Object.hasOwn(ALLOWED_IMAGE_TYPES, file.type)) {
    return NextResponse.json(
      { error: "Use a JPEG, PNG, WebP, GIF or AVIF image." },
      { status: 415 },
    );
  }

  if (file.size > MAX_IMAGE_BYTES) {
    return NextResponse.json(
      { error: `Images must be under ${MAX_IMAGE_BYTES / 1024 / 1024}MB.` },
      { status: 413 },
    );
  }

  const bytes = Buffer.from(await file.arrayBuffer());

  // The declared MIME type comes from the browser and is attacker-controlled;
  // these bytes get served back later under that same type, so verify it.
  if (!sniffMatches(file.type, bytes)) {
    return NextResponse.json(
      { error: "That file is not the image type it claims to be." },
      { status: 400 },
    );
  }

  try {
    const id = await saveImage(bytes, file.type, file.name);
    return NextResponse.json({ url: imageUrl(id) }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Could not store the image.",
      },
      { status: 500 },
    );
  }
}
