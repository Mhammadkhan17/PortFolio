import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Scripts } from "@/components/layout/Scripts";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { SceneWrapper } from "@/components/dom/SceneWrapper";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dearidev.dev"),
  title: {
    default: "DEAIDEV — Full-Stack Developer",
    template: "%s | DEAIDEV",
  },
  description:
    "Full-stack developer specializing in MVPs and production apps for early-stage startups. React, Next.js, Node.js, PostgreSQL.",
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
      "Full-stack developer specializing in MVPs and production apps for early-stage startups.",
    type: "website",
    locale: "en_US",
    siteName: "DEAIDEV Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "DEAIDEV — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DEAIDEV — Full-Stack Developer",
    description:
      "Full-stack developer specializing in MVPs and production apps for early-stage startups.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://dearidev.dev",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "DEAIDEV",
    jobTitle: "Full-Stack Developer",
    url: "https://dearidev.dev",
    sameAs: ["https://github.com/dearidev", "https://linkedin.com/in/dearidev"],
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "TypeScript",
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable} h-full antialiased`} suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Scripts />
          <LenisProvider>
            <SceneWrapper />
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-marketing focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:text-on-primary focus:outline-none"
            >
              Skip to content
            </a>
            <Header />
            <main id="main-content" className="relative z-10 flex-1">{children}</main>
            <Footer />
            <div id="offline-banner" className="offline-banner">
              You are currently offline
            </div>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
