import Link from "next/link";
import { Reveal } from "@/components/dom/Reveal";
import { TiltCard } from "@/components/dom/TiltCard";
import { MagneticButton } from "@/components/dom/MagneticButton";
import { getAllProjects, type Project } from "@/lib/projects";
import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: siteUrl },
};

const caseStudies = getAllProjects()
  .filter(
    (p): p is Project & { industry: string; outcomeHeadline: string; context: string; approach: string[] } =>
      Boolean(p.outcomeHeadline && p.industry && p.context && p.approach && !p.draft)
  )
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We hop on a 30-minute call. You tell me what's broken, what you need, and what your timeline looks like. I ask questions. No pitch, just listening.",
  },
  {
    step: "02",
    title: "Proposal",
    description:
      "Within 48 hours, I send a 1-page doc: what I'd build, how long it would take, what it would cost, and what tradeoffs I'd make. You decide if it's a fit.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Weekly demos. Shared repo. No black boxes. You see progress every Friday and can redirect at any milestone.",
  },
  {
    step: "04",
    title: "Ship & Support",
    description:
      "I deploy, I document, and I stick around. 14 days of post-launch support included. If something breaks, you text me.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section
        id="hero"
        className="bg-transparent text-on-primary px-6 pointer-events-none"
        style={{ paddingTop: "clamp(4rem, 8vw, 8rem)", paddingBottom: "clamp(4rem, 8vw, 8rem)" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <Reveal>
              <p className="mb-6 type-mono-eyebrow text-signal">
                DEAIDEV · Full-Stack Developer
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="type-display-mega text-mist">
                From idea to production in 6 weeks
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 max-w-lg type-subtitle text-ash">
                I take early-stage products and turn them into deployable,
                scalable applications. React, Next.js, Node.js, PostgreSQL.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row pointer-events-auto">
                <a href="#case-studies" className="btn-primary min-h-[48px]">
                  See My Work
                </a>
                <Link href="/contact" className="btn-secondary min-h-[48px]">
                  Let&apos;s Talk
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8">
                <div>
                  <p className="type-display-md text-mist">3</p>
                  <p className="type-caption text-mute">Apps Shipped in 2026</p>
                </div>
                <div>
                  <p className="type-display-md text-mist">6wk</p>
                  <p className="type-caption text-mute">Avg. Delivery</p>
                </div>
                <div>
                  <p className="type-display-md text-mist">100%</p>
                  <p className="type-caption text-mute">On-Time</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section
        id="case-studies"
        className="bg-transparent text-on-primary px-6 pointer-events-none"
        style={{ paddingTop: "var(--spacing-section-lg)", paddingBottom: "var(--spacing-section-lg)" }}
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 md:mb-16">
              <p className="mb-2 type-mono-eyebrow text-signal">Case Studies</p>
              <h2 className="type-display-md text-mist">
                Proof, not promises
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3 pointer-events-auto">
            {caseStudies.map((study, i) => (
              <Reveal key={study.slug} delay={i * 0.1}>
                <TiltCard>
                  <Link
                    href={`/projects/${study.slug}`}
                    className="group flex flex-col h-full rounded-marketing bg-canvas-soft/80 backdrop-blur-sm border border-hairline-soft transition-all hover:-translate-y-0.5"
                    style={{ padding: "var(--spacing-xl)" }}
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="type-mono-eyebrow text-signal">
                        {study.industry}
                      </p>
                      {study.status && (
                        <span className="type-mono-micro text-mute">{study.status}</span>
                      )}
                    </div>
                    <h3 className="mb-3 type-heading-sm text-mist group-hover:text-signal transition-colors">
                      {study.outcomeHeadline}
                    </h3>
                    <p className="mb-4 type-body-sm text-ash line-clamp-2">
                      {study.context}
                    </p>

                    <ul className="mb-4 space-y-1">
                      {study.approach.map((item) => (
                        <li key={item} className="type-caption text-mute flex items-start gap-2">
                          <span className="text-signal mt-1">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    {study.clientQuote && (
                      <blockquote className="mt-auto mb-4 border-l-2 border-graphite pl-4">
                        <p className="type-body-sm text-ash italic line-clamp-2">
                          &ldquo;{study.clientQuote}&rdquo;
                        </p>
                        <cite className="type-caption text-mute not-italic">
                          — {study.clientName}, {study.clientRole}
                        </cite>
                      </blockquote>
                    )}

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {study.tech.map((t) => (
                        <span key={t} className="tech-badge">
                          {t}
                        </span>
                      ))}
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section — light mode */}
      <section
        id="process"
        className="bg-paper/90 backdrop-blur-md text-ink-dark px-6"
        style={{ paddingTop: "var(--spacing-section-lg)", paddingBottom: "var(--spacing-section-lg)" }}
      >
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="mb-12 md:mb-16">
              <p className="mb-2 type-mono-eyebrow text-mute">How I Work</p>
              <h2 className="type-display-md text-ink-dark">
                From first call to shipped product
              </h2>
            </div>
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.1}>
                <TiltCard>
                  <div>
                    <p className="mb-3 type-display-lg text-signal">{step.step}</p>
                    <h3 className="mb-2 type-heading-sm text-ink-dark">{step.title}</h3>
                    <p className="type-body-sm text-ink-soft">{step.description}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Philosophy Section — light mode */}
      <section
        id="pricing"
        className="bg-paper/90 backdrop-blur-md text-ink-dark px-6"
        style={{ paddingTop: "var(--spacing-section-lg)", paddingBottom: "var(--spacing-section-lg)" }}
      >
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="mb-2 type-mono-eyebrow text-mute">Pricing</p>
            <h2 className="mb-8 type-display-md text-ink-dark">
              How I think about cost
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-6 type-body text-ink-soft">
              <p>
                I don&apos;t use fixed packages. Every project is different, and the
                scope determines the price. Here&apos;s how I think about it.
              </p>
              <p>
                Most of my projects fall between <strong className="text-ink-dark">$5,000 and $20,000</strong>,
                depending on complexity, integrations, and timeline. A straightforward
                MVP with auth, a database, and a deployment pipeline typically lands
                around <strong className="text-ink-dark">$8,000</strong>. A more complex build with
                real-time features, payments, or AI integration will be higher.
              </p>
              <p>
                I bill either per project (fixed scope, fixed price) or monthly (for
                ongoing work). For fixed projects, I give you a detailed quote after
                our discovery call. For monthly work, my rate is <strong className="text-ink-dark">$350/day</strong>.
              </p>
              <p>
                I don&apos;t negotiate on price, but I do negotiate on scope. If your
                budget is tight, we can trim features to fit — I&apos;d rather build a
                smaller thing well than a larger thing poorly.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10">
              <Link href="/contact" className="btn-primary-on-light min-h-[48px]">
                Let&apos;s Talk About Your Project
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        id="cta"
        className="bg-transparent text-on-primary px-6 pointer-events-none"
        style={{ paddingTop: "var(--spacing-section-lg)", paddingBottom: "var(--spacing-section-lg)" }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="mb-2 type-mono-eyebrow text-spark">Get in Touch</p>
            <h2 className="mb-4 type-display-sm text-mist">
              Let&apos;s talk about your project
            </h2>
            <p className="mb-8 type-body text-ash">
              Send me a message and I&apos;ll reply within 24 hours with honest
              feedback — even if I&apos;m not the right fit.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="pointer-events-auto">
              <MagneticButton>
                <Link href="/contact" className="btn-primary min-h-[48px]">
                  Send Me Your Project
                </Link>
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 mx-auto max-w-md text-left">
              <p className="mb-3 type-mono-eyebrow text-mute">What happens next</p>
              <ol className="space-y-2 type-body-sm text-ash">
                <li className="flex items-start gap-3">
                  <span className="text-spark font-medium">1.</span>
                  I read your message within 24 hours
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-spark font-medium">2.</span>
                  I reply with honest feedback on fit and approach
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-spark font-medium">3.</span>
                  If it makes sense, we book a 30-minute call
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-spark font-medium">4.</span>
                  No pressure, no pitch — just clarity
                </li>
              </ol>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
