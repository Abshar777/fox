"use client";

import Link from "next/link";
import { useActionState, useMemo, useState } from "react";
import { savePost } from "@/app/admin/actions";
import { CATEGORIES, slugify, estimateReadMinutes } from "@/lib/posts";
import ImageField from "./image-field";

/** Shared field chrome so every input in the form looks the same. */
function Field({ label, hint, children, required = false, htmlFor }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="u-eyebrow block text-ink-45">
        {label}
        {required ? <span className="ml-1 text-rust">*</span> : null}
      </label>
      <div className="mt-3">{children}</div>
      {hint ? (
        <p className="u-mono mt-2 text-[0.58rem] leading-relaxed text-ink-45">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

const inputClass =
  "w-full border border-[var(--rule)] bg-paper px-3.5 py-2.5 text-[0.85rem] text-ink outline-none transition-colors focus:border-gold";

/** Today in ISO form, for defaulting the publish date on new notes. */
function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Create/edit form for a note.
 *
 * One component serves both cases: an existing `post` supplies the default
 * values and a hidden id, whose presence is what makes the action update
 * rather than insert.
 */
export default function PostForm({ post }) {
  const [state, action, pending] = useActionState(savePost, null);

  // After a failed submit the action echoes back what was typed, so an
  // invalid save never silently discards the draft.
  const initial = state?.values ?? post ?? {};

  const [title, setTitle] = useState(initial.title ?? "");
  const [slug, setSlug] = useState(initial.slug ?? "");
  const [body, setBody] = useState((initial.body ?? []).join("\n\n"));

  const effectiveSlug = slugify(slug || title);

  const stats = useMemo(() => {
    const paragraphs = body
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
    const words = paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
    return {
      paragraphs: paragraphs.length,
      words,
      minutes: paragraphs.length ? estimateReadMinutes(paragraphs) : 0,
    };
  }, [body]);

  return (
    <form action={action} className="mt-9 max-w-4xl">
      {post?.id ? <input type="hidden" name="id" value={post.id} /> : null}

      {state?.error ? (
        <p
          role="alert"
          className="u-mono mb-8 border border-rust/40 bg-rust/10 px-4 py-3 text-[0.68rem] leading-relaxed text-ink"
        >
          {state.error}
        </p>
      ) : null}

      <div className="space-y-8">
        <Field label="Title" required htmlFor="title">
          <input
            id="title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            className={`${inputClass} u-display text-[1.4rem] leading-tight`}
          />
        </Field>

        <Field
          label="Slug"
          htmlFor="slug"
          hint={
            effectiveSlug
              ? `Publishes at /blog/${effectiveSlug}`
              : "Leave blank to derive it from the title."
          }
        >
          <input
            id="slug"
            name="slug"
            value={slug}
            placeholder={slugify(title)}
            onChange={(event) => setSlug(event.target.value)}
            className={inputClass}
          />
        </Field>

        <div className="grid gap-8 sm:grid-cols-2">
          <Field
            label="Category"
            required
            htmlFor="category"
            hint="Pick a suggestion or type a new one."
          >
            <input
              id="category"
              name="category"
              list="note-categories"
              defaultValue={initial.category ?? CATEGORIES[0]}
              required
              className={inputClass}
            />
            <datalist id="note-categories">
              {CATEGORIES.map((category) => (
                <option key={category} value={category} />
              ))}
            </datalist>
          </Field>

          <Field label="Published on" required htmlFor="publishedAt">
            <input
              id="publishedAt"
              name="publishedAt"
              type="date"
              defaultValue={initial.publishedAt ?? todayIso()}
              required
              className={inputClass}
            />
          </Field>
        </div>

        <Field
          label="Excerpt"
          required
          htmlFor="excerpt"
          hint="One or two sentences. Used on cards, and as the meta description in search results."
        >
          <textarea
            id="excerpt"
            name="excerpt"
            rows={3}
            defaultValue={initial.excerpt ?? ""}
            required
            className={`${inputClass} resize-y`}
          />
        </Field>

        <div className="grid gap-8 sm:grid-cols-2">
          <Field label="Author" required htmlFor="author">
            <input
              id="author"
              name="author"
              defaultValue={initial.author ?? ""}
              required
              className={inputClass}
            />
          </Field>

          <Field
            label="Author role"
            htmlFor="role"
            hint="Shown under the name on the article page."
          >
            <input
              id="role"
              name="role"
              defaultValue={initial.role ?? ""}
              placeholder="Lead mentor"
              className={inputClass}
            />
          </Field>
        </div>

        <ImageField
          name="image"
          label="Cover image"
          required
          defaultValue={initial.image ?? ""}
          hint="Shown on cards and at the top of the note. Landscape works best."
        />

        <ImageField
          name="avatar"
          label="Author photo"
          defaultValue={initial.avatar ?? ""}
          hint="Optional — without one, initials are generated from the author's name."
        />

        <Field
          label="Body"
          required
          htmlFor="body"
          hint="Separate paragraphs with a blank line."
        >
          <textarea
            id="body"
            name="body"
            rows={18}
            value={body}
            onChange={(event) => setBody(event.target.value)}
            required
            className={`${inputClass} resize-y leading-relaxed`}
          />
          <p className="u-mono mt-2 text-[0.58rem] text-ink-45">
            {stats.paragraphs} paragraph{stats.paragraphs === 1 ? "" : "s"} ·{" "}
            {stats.words} words · ~{stats.minutes} min read
          </p>
        </Field>

        <Field
          label="Read time override"
          htmlFor="readMinutes"
          hint="Leave blank to use the estimate above."
        >
          <input
            id="readMinutes"
            name="readMinutes"
            type="number"
            min={1}
            max={120}
            defaultValue={post?.readMinutes ?? ""}
            className={`${inputClass} max-w-[8rem]`}
          />
        </Field>
      </div>

      <div className="mt-11 flex flex-wrap items-center gap-3 border-t border-[var(--rule)] pt-7">
        <button
          type="submit"
          disabled={pending}
          className="u-btn u-btn--solid disabled:opacity-60"
        >
          <span>
            {pending ? "Saving…" : post?.id ? "Save changes" : "Publish note"}
          </span>
        </button>

        <Link href="/admin" className="u-btn u-btn--ghost">
          <span>Cancel</span>
        </Link>
      </div>
    </form>
  );
}
