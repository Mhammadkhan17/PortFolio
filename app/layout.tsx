import type { Metadata, Viewport } from "next";
import { Archivo, DM_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OfflineBanner } from "@/components/layout/OfflineBanner";
import { ogImage } from "@/lib/metadata";
import { githubUrl, linkedinUrl, siteUrl } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DEAIDEV — Full-Stack Developer",
    template: "%s | DEAIDEV",
  },
  description:
    "Solo full-stack developer building MVPs and production apps for early-stage startups. React, Next.js, Node.js, PostgreSQL, TypeScript, and AI integrations.",
  keywords: [
    "full-stack developer",
    "web developer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "portfolio",
    "frontend",
    "backend",
    "cloud",
  ],
  openGraph: {
    title: "DEAIDEV — Full-Stack Developer",
    description:
      "Solo full-stack developer building MVPs and production apps for early-stage startups. React, Next.js, Node.js, PostgreSQL, TypeScript, and AI integrations.",
    type: "website",
    locale: "en_US",
    siteName: "DEAIDEV Portfolio",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#121314",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Hammad Khan",
    alternateName: "DEAIDEV",
    jobTitle: "Full-Stack Developer",
    url: siteUrl,
    sameAs: [githubUrl, linkedinUrl],
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "TypeScript",
    ],
  };

  return (
    <html
      lang="en"
      className={`${archivo.variable} ${dmMono.variable} h-full`}
    >
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-tar text-chalk">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:border-2 focus:border-ink focus:bg-yellow focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-ink"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <OfflineBanner />
      </body>
    </html>
  );
}
