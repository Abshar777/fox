"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Section switcher; highlights the section currently being edited. */
export default function SectionNav({ sections }) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 border-l border-[var(--rule)] pl-4">
      {sections.map((section) => {
        const on =
          pathname === section.href || pathname.startsWith(`${section.href}/`);
        return (
          <Link
            key={section.href}
            href={section.href}
            className={`u-eyebrow rounded-full px-3 py-2 transition-colors ${
              on ? "bg-sand text-ink" : "text-ink-45 hover:text-ink"
            }`}
          >
            {section.label}
          </Link>
        );
      })}
    </nav>
  );
}
