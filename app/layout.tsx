import type { Metadata } from "next";
import { Fraunces, Geist_Mono, Outfit } from "next/font/google";
import { DisclaimerBar } from "@/components/disclaimer-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const sans = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const display = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const description =
  "A free educational board of what is pulling eyes. Attention moves first. Price is late. Attention is not guaranteed money.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "Viral Attention Map",
    template: "%s · Viral Attention Map",
  },
  description,
  openGraph: {
    title: "Attention moves first. Price is late.",
    description,
    siteName: "Viral Attention Map",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Attention moves first. Price is late.",
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-tape focus:px-3 focus:py-2 focus:text-tape-ink"
        >
          Skip to content
        </a>
        <DisclaimerBar />
        <SiteHeader />
        <main id="content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
