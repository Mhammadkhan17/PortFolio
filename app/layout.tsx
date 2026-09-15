import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Scripts } from "@/components/layout/Scripts";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-dev",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yourname.dev"),
  title: {
    default: "Your Name — Full-Stack Developer",
    template: "%s | Your Name",
  },
  description:
    "Full-stack developer portfolio showcasing projects in frontend, backend, and cloud infrastructure. Building modern web applications with cutting-edge technologies.",
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
    title: "Your Name — Full-Stack Developer",
    description:
      "Full-stack developer portfolio showcasing projects in frontend, backend, and cloud infrastructure.",
    type: "website",
    locale: "en_US",
    siteName: "Your Name Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Your Name — Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name — Full-Stack Developer",
    description:
      "Full-stack developer portfolio showcasing projects in frontend, backend, and cloud infrastructure.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://yourname.dev",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Your Name",
    jobTitle: "Full-Stack Developer",
    url: "https://yourname.dev",
    sameAs: ["https://github.com/yourname", "https://linkedin.com/in/yourname"],
    knowsAbout: [
      "Web Development",
      "Frontend Engineering",
      "Backend Development",
      "Cloud Infrastructure",
    ],
  };

  return (
    <html lang="en" className={`${jetbrainsMono.variable} h-full antialiased`} suppressHydrationWarning>
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
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <div id="offline-banner" className="offline-banner">
            You are currently offline
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
