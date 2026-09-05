"use client";

import { useId, useRef, useState } from "react";

/** Images already shipped in /public, offered as one-click choices. */
const BUNDLED = [
  { label: "Founders", src: "/founders/02.webp" },
  { label: "Adhil", src: "/founders/Mr-Adhil1.webp" },
  { label: "Nincy", src: "/founders/NINCY1.webp" },
  { label: "OG card", src: "/og.png" },
  { label: "Crest", src: "/logo-mark.png" },
];

/**
 * Cover / avatar picker: upload a file, paste a URL, or choose a bundled
 * image. The chosen value is mirrored into a hidden input so the surrounding
 * form posts it like any other field.
 *
 * Uploads go to a Route Handler rather than through the form action because
 * Server Actions cap request bodies at 1MB.
 */
export default function ImageField({
  name,
  label,
  defaultValue = "",
  hint,
  required = false,
}) {
  const [value, setValue] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const fileInput = useRef(null);
  const fieldId = useId();

  async function upload(file) {
    if (!file) return;

    setBusy(true);
    setError(null);

    try {
      const body = new FormData();
      body.append("file", file);

      const response = await fetch("/api/admin/images", {
        method: "POST",
        body,
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error || "Upload failed.");
      }
      setValue(payload.url);
    } catch (uploadError) {
      setError(uploadError.message);
    } finally {
      setBusy(false);
      // Allow re-picking the same file after a failure.
      if (fileInput.current) fileInput.current.value = "";
    }
  }

  return (
    <div>
      <label htmlFor={fieldId} className="u-eyebrow block text-ink-45">
        {label}
        {required ? <span className="ml-1 text-rust">*</span> : null}
      </label>

      <input type="hidden" name={name} value={value} />

      <div className="mt-3 flex flex-wrap items-start gap-4">
        <div className="grid h-20 w-28 shrink-0 place-items-center overflow-hidden border border-[var(--rule)] bg-sand">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={value}
              alt=""
              className="h-full w-full object-cover"
              onLoad={() => setError(null)}
              onError={() => setError("That image URL did not load.")}
            />
          ) : (
            <span className="u-mono text-[0.55rem] text-ink-45">NO IMAGE</span>
          )}
        </div>

        <div className="min-w-[16rem] flex-1">
          <input
            id={fieldId}
            type="text"
            inputMode="url"
            required={required}
            value={value}
            placeholder="https://… or /api/images/…"
            onChange={(event) => {
              setValue(event.target.value);
              setError(null);
            }}
            className="w-full border border-[var(--rule)] bg-paper px-3 py-2.5 text-[0.8rem] outline-none transition-colors focus:border-gold"
          />

          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => fileInput.current?.click()}
              className="u-mono border border-[var(--rule)] px-3 py-1.5 text-[0.6rem] tracking-[0.14em] transition-colors hover:border-gold hover:text-gold disabled:opacity-60"
            >
              {busy ? "UPLOADING…" : "UPLOAD"}
            </button>

            {value ? (
              <button
                type="button"
                onClick={() => {
                  setValue("");
                  setError(null);
                }}
                className="u-mono border border-[var(--rule)] px-3 py-1.5 text-[0.6rem] tracking-[0.14em] transition-colors hover:border-rust hover:text-rust"
              >
                CLEAR
              </button>
            ) : null}

            <input
              ref={fileInput}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
              className="hidden"
              onChange={(event) => upload(event.target.files?.[0])}
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {BUNDLED.map((option) => (
              <button
                key={option.src}
                type="button"
                onClick={() => {
                  setValue(option.src);
                  setError(null);
                }}
                className={`u-mono border px-2 py-1 text-[0.55rem] tracking-[0.12em] transition-colors ${
                  value === option.src
                    ? "border-gold text-gold"
                    : "border-[var(--rule)] text-ink-45 hover:text-ink"
                }`}
              >
                {option.label.toUpperCase()}
              </button>
            ))}
          </div>

          {hint ? (
            <p className="u-mono mt-2.5 text-[0.58rem] leading-relaxed text-ink-45">
              {hint}
            </p>
          ) : null}

          {error ? (
            <p role="alert" className="u-mono mt-2 text-[0.6rem] text-rust">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
