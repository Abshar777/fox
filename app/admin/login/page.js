import { redirect } from "next/navigation";
import { isAuthConfigured } from "@/lib/auth";
import { hasSession } from "../session";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Sign in",
  robots: { index: false, follow: false, nocache: true },
};

export default async function LoginPage({ searchParams }) {
  const { next } = await searchParams;

  // Already signed in no reason to show the form again.
  if (await hasSession()) redirect("/admin");

  return (
    <main className="grid min-h-screen place-items-center px-6 py-16">
      <div className="w-full max-w-sm">
        <p className="u-eyebrow text-gold">Wolfpack Wealth Academy</p>
        <h1 className="u-display mt-4 text-[2.6rem] leading-[0.95]">
          Blog desk
        </h1>
        <p className="mt-4 text-[0.85rem] leading-relaxed text-ink-70">
          Sign in to write, edit and publish notes.
        </p>

        {isAuthConfigured() ? (
          <LoginForm next={typeof next === "string" ? next : "/admin"} />
        ) : (
          <p className="u-mono mt-8 border border-rust/40 bg-rust/10 p-4 text-[0.68rem] leading-relaxed text-ink">
            ADMIN_PASSWORD and AUTH_SECRET are not both set. Add them to your
            environment and restart the server.
          </p>
        )}
      </div>
    </main>
  );
}
