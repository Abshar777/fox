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
  openGraph: {
    title: "Wolfpack Wealth Academy | Forex Trading Academy in Kochi",
    description:
      "Structured Forex education, live mentorship and real time market analysis in Kochi, Kerala.",
    type: "website",
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
