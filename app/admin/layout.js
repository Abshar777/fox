import ScrollRelease from "@/components/scroll-release";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Bare wrapper for /admin deliberately none of the marketing chrome
 * (preloader, custom cursor, smooth scroll), which would only get in the way
 * of an editing tool.
 */
export default function AdminLayout({ children }) {
  return (
    <>
      <ScrollRelease />
      <div className="min-h-screen bg-bone text-ink">{children}</div>
    </>
  );
}
