import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

/**
 * Gate for /admin.
 *
 * This is the optimistic check that keeps signed-out browsers out of the UI.
 * It is not the authorization boundary — every mutating Server Action calls
 * `requireSession()` itself, because actions are POST endpoints reachable
 * without ever passing through here.
 */
export async function proxy(request) {
  const { pathname, search } = request.nextUrl;

  // The login page must stay reachable, or signing in is impossible.
  if (pathname === "/admin/login") return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (await verifySessionToken(token)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  url.search = `?next=${encodeURIComponent(`${pathname}${search}`)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/admin/:path*",
};
