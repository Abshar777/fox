import Link from "next/link";
import { LogoMark } from "@/components/logo";
import { requireSession } from "../session";
import { signOut } from "../actions";
import SectionNav from "./SectionNav";

/**
 * Sections available in the admin. A new content type registers itself here.
 */
const SECTIONS = [{ href: "/admin", label: "Blogs" }];

export default async function DashboardLayout({ children }) {
  await requireSession();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-[var(--rule)] bg-[color-mix(in_srgb,var(--color-bone)_88%,transparent)] backdrop-blur-xl">
        <div className="u-shell flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-3">
              <LogoMark className="h-auto w-9" />
              <span className="leading-none">
                <span className="u-display block text-[1.15rem]">Wolfpack</span>
                <span className="u-eyebrow block text-[0.5rem] text-ink-45">
                  Blog desk
                </span>
              </span>
            </Link>

            <SectionNav sections={SECTIONS} />
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              target="_blank"
              className="u-mono text-[0.62rem] tracking-[0.16em] text-ink-45 transition-colors hover:text-gold"
            >
              VIEW SITE ↗
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="u-mono border border-[var(--rule)] px-3.5 py-2 text-[0.62rem] tracking-[0.16em] text-ink-70 transition-colors hover:border-rust hover:text-rust"
              >
                SIGN OUT
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="u-shell py-10 md:py-14">{children}</main>
    </div>
  );
}
