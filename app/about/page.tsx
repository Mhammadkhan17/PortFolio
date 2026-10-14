import Link from "next/link";
import { Reveal } from "@/components/dom/Reveal";
import { ogImage } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Full-stack developer building MVPs and production apps for early-stage startups. React, Next.js, Node.js, PostgreSQL.",
  alternates: { canonical: "https://dearidev.dev/about" },
  openGraph: {
    title: "About | DEAIDEV",
    description:
      "Full-stack developer building MVPs and production apps for early-stage startups. React, Next.js, Node.js, PostgreSQL.",
    url: "https://dearidev.dev/about",
    siteName: "DEAIDEV Portfolio",
    images: [ogImage],
  },
};

export default function About() {
  return (
    <div>
      {/* Opening */}
      <section
        id="about"
        className="bg-transparent text-on-primary px-6 pointer-events-none"
        style={{ paddingTop: "clamp(4rem, 8vw, 8rem)", paddingBottom: "var(--spacing-section-lg)" }}
      >
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="mb-2 type-mono-eyebrow text-signal">About</p>
            <h1 className="mb-8 type-display-md text-mist">
              I build things that work.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-4 type-body text-ash">
              <p>
                I&apos;ve seen too many projects stall in the &ldquo;almost done&rdquo;
                phase. The backend works but the frontend is broken. The demo
                works but production doesn&apos;t. The code works but nobody can
                maintain it.
              </p>
              <p>
                My job is to get you from &ldquo;almost done&rdquo; to
                &ldquo;shipped&rdquo; — with code that won&apos;t break in ways
                you didn&apos;t see coming. I take early-stage products and turn
                them into deployable, scalable applications.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section
        className="bg-paper/90 backdrop-blur-md text-ink-dark px-6"
        style={{ paddingTop: "var(--spacing-section-lg)", paddingBottom: "var(--spacing-section-lg)" }}
      >
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="mb-8 type-display-sm text-ink-dark">
              How I think about software
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-6 type-body text-ink-soft">
              <p>
                <strong className="text-ink-dark">Most MVPs are over-built.</strong>{" "}
                The best version of your product is version 1.1, not version 1.0.
                Ship the smallest thing that solves the real problem, then iterate
                based on what users actually do — not what you think they&apos;ll do.
              </p>
              <p>
                <strong className="text-ink-dark">Every line of code I write is for the person who inherits it,</strong>{" "}
                not for the person who writes it. That means clear naming, simple
                abstractions, and documentation that explains the why — not just the
                what. I think about the developer who joins six months from now, picks
                up the file, and needs to understand it without asking me. Your future
                self (or your next developer) will thank me.
              </p>
              <p>
                <strong className="text-ink-dark">The best technical decision is usually the boring one.</strong>{" "}
                The shiny new framework won&apos;t save a project, but a well-chosen
                database index will. I reach for proven tools and patterns, not
                whatever is trending on Hacker News.
              </p>
              <p>
                <strong className="text-ink-dark">I&apos;m honest about tradeoffs.</strong>{" "}
                Every technical decision is a tradeoff. I&apos;ll tell you what I
                recommend, why I recommend it, and what we&apos;re giving up. You
                make the final call — it&apos;s your product.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tools */}
      <section
        className="bg-transparent text-on-primary px-6 pointer-events-none"
        style={{ paddingTop: "var(--spacing-section-lg)", paddingBottom: "var(--spacing-section-lg)" }}
      >
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="mb-8 type-display-sm text-mist">
              Tools I use
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-4">
              <div>
                <p className="mb-2 type-mono-eyebrow text-signal">Frontend</p>
                <p className="type-body text-ash">
                  React, Next.js, TypeScript, Tailwind CSS
                </p>
              </div>
              <div>
                <p className="mb-2 type-mono-eyebrow text-signal">Backend</p>
                <p className="type-body text-ash">
                  Node.js, PostgreSQL, Prisma, REST APIs
                </p>
              </div>
              <div>
                <p className="mb-2 type-mono-eyebrow text-signal">Infrastructure</p>
                <p className="type-body text-ash">
                  Vercel, Docker, AWS, Cloudflare
                </p>
              </div>
              <div>
                <p className="mb-2 type-mono-eyebrow text-signal">Tools</p>
                <p className="type-body text-ash">
                  Git, Figma, Linux, VS Code
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Experience */}
      <section
        className="bg-paper/90 backdrop-blur-md text-ink-dark px-6"
        style={{ paddingTop: "var(--spacing-section-lg)", paddingBottom: "var(--spacing-section-lg)" }}
      >
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="mb-8 type-display-sm text-ink-dark">
              Where I&apos;ve been
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-8">
              <div>
                <div className="mb-2 flex items-baseline justify-between gap-4">
                  <h3 className="type-heading-sm text-ink-dark">Frontend Developer</h3>
                  <span className="type-caption text-mute">2023 — Present</span>
                </div>
                <p className="mb-2 type-body-sm text-ink-soft">Company Name</p>
                <p className="type-body text-ink-soft">
                  Rebuilt the frontend from legacy React to Next.js App Router,
                  cutting page load from 4 seconds to 1.2 seconds. Built a
                  component library used across 3 product teams.
                </p>
              </div>
              <div>
                <div className="mb-2 flex items-baseline justify-between gap-4">
                  <h3 className="type-heading-sm text-ink-dark">Junior Developer</h3>
                  <span className="type-caption text-mute">2021 — 2023</span>
                </div>
                <p className="mb-2 type-body-sm text-ink-soft">Company Name</p>
                <p className="type-body text-ink-soft">
                  Developed a customer-facing dashboard serving 10k+ daily users.
                  Reduced API response times by 35% through query optimization
                  and caching.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section
        className="bg-transparent text-on-primary px-6 pointer-events-none"
        style={{ paddingTop: "var(--spacing-section-lg)", paddingBottom: "var(--spacing-section-lg)" }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="mb-4 type-display-sm text-mist">
              Think we&apos;d work well together?
            </h2>
            <p className="mb-8 type-body text-ash">
              I&apos;m always interested in projects that need to ship.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="pointer-events-auto">
              <Link href="/contact" className="btn-primary min-h-[48px]">
                Let&apos;s Talk
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
