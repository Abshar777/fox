"use client";

import { useActionState } from "react";
import { signIn } from "../actions";

export default function LoginForm({ next }) {
  const [state, action, pending] = useActionState(signIn, null);

  return (
    <form action={action} className="mt-9">
      <input type="hidden" name="next" value={next} />

      <label htmlFor="password" className="u-eyebrow block text-ink-45">
        Admin password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        autoFocus
        className="mt-3 w-full border border-[var(--rule)] bg-paper px-4 py-3.5 text-sm text-ink outline-none transition-colors focus:border-gold"
      />

      {state?.error ? (
        <p role="alert" className="u-mono mt-4 text-[0.68rem] text-rust">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="u-btn u-btn--solid mt-7 w-full justify-center disabled:opacity-60"
      >
        <span>{pending ? "Signing in…" : "Sign in"}</span>
      </button>
    </form>
  );
}
