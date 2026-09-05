import { initialsOf, colorsOf } from "@/lib/avatar";

/**
 * Author avatar: the photo when there is one, otherwise deterministic
 * initials on a palette swatch. Deliberately hook-free so it renders inside
 * prerendered server components.
 *
 * Photos use a plain <img> rather than next/image because the source is
 * arbitrary operator input — an uploaded blob served from /api/images, or a
 * pasted third-party URL — and next/image would reject any remote host not
 * listed in remotePatterns.
 */
export default function Avatar({ name, src, size = 40, className = "" }) {
  const dimension = { width: size, height: size };

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- src is operator-supplied
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        style={dimension}
        className={`shrink-0 rounded-full object-cover ring-1 ring-[var(--rule)] ${className}`}
      />
    );
  }

  const { bg, fg } = colorsOf(name);

  return (
    <span
      aria-hidden="true"
      style={{
        ...dimension,
        background: bg,
        color: fg,
        fontSize: Math.max(9, Math.round(size * 0.36)),
      }}
      className={`grid shrink-0 place-items-center rounded-full font-mono font-medium leading-none tracking-wider ${className}`}
    >
      {initialsOf(name)}
    </span>
  );
}
