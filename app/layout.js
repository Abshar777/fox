import { Instrument_Serif, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Instrument_Serif({
  variable: "--font-display-f",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Archivo({
  variable: "--font-sans-f",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-f",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://wolfpackwealthacademy.com"),
  title: {
    default:
      "Wolfpack Wealth Academy | Best Forex Trading Academy in Kochi, Kerala",
    template: "%s · Wolfpack Wealth Academy",
  },
  description:
    "Wolfpack Wealth Academy is a leading Forex trading academy in Kochi, Kerala. Structured trading education, live mentorship, real time market analysis and professional risk management.",
  keywords: [
    "forex trading academy Kochi",
    "forex academy Kerala",
    "trading course Kochi",
    "gold trading education",
    "price action",
    "risk management",
    "trading mentorship",
  ],
  applicationName: "Wolfpack Wealth Academy",
  authors: [{ name: "Wolfpack Wealth Academy" }],
  creator: "Wolfpack Wealth Academy",
  publisher: "Wolfpack Wealth Academy",
  category: "education",
  alternates: { canonical: "/" },
  // app/icon.png and app/apple-icon.png are picked up automatically; this adds
  // the explicit sizes some crawlers and Android launchers look for.
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
    shortcut: ["/icon.png"],
  },
  openGraph: {
    type: "website",
    siteName: "Wolfpack Wealth Academy",
    locale: "en_IN",
    url: "/",
    title: "Wolfpack Wealth Academy | Forex Trading Academy in Kochi",
    description:
      "Structured Forex education, live mentorship and real time market analysis in Kochi, Kerala.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Wolfpack Wealth Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wolfpack Wealth Academy | Forex Trading Academy in Kochi",
    description:
      "Structured Forex education, live mentorship and real time market analysis in Kochi, Kerala.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport = {
  themeColor: "#f4efe4",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks that JS is running, so the reveal styles that hide content
            before animating it only apply when something can un-hide it.
            This runs before hydration, hence suppressHydrationWarning above. */}
        <script
          dangerouslySetInnerHTML={{
            __html: 'document.documentElement.setAttribute("data-js","")',
          }}
        />
      </head>
      <body className="is-loading">{children}</body>
    </html>
  );
}
