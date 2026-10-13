import Link from "next/link";
import { Reveal } from "@/components/dom/Reveal";
import { TiltCard } from "@/components/dom/TiltCard";
import { MagneticButton } from "@/components/dom/MagneticButton";

const caseStudies: {
  industry: string;
  outcomeHeadline: string;
  context: string;
  approach: string[];
  metric: string;
  metricLabel: string;
  techStack: string[];
  slug: string;
  status?: string;
  clientQuote?: string;
  clientName?: string;
  clientRole?: string;
}[] = [
  {
    industry: "Productivity",
    outcomeHeadline:
      "Built an AI-native task manager with RAG document chat and MCP integration",
    context:
      "Task managers store tasks but don't help you think about them. Tasks, documents, and AI assistants live in separate tools that don't talk to each other — you end up manually copying context between systems.",
    approach: [
      "RAG document chat with Qdrant vector store and ONNX embeddings",
      "MCP server exposing tasks and documents to external AI agents",
      "Chat interface with context on your actual task data",
    ],
    metric: "RAG + MCP",
    metricLabel: "AI-native architecture",
    techStack: ["FastAPI", "Next.js", "Qdrant", "ONNX"],
    slug: "todoflow",
  },
  {
    industry: "E-Commerce",
    outcomeHeadline:
      "Built a zero-fee B2C + B2B liquidation platform with atomic checkout",
    context:
      "Computer liquidators lose 10–15% to marketplace fees per transaction. They needed a platform that facilitates sales without skimming them — with lot-based inventory that serves both bulk business buyers and individual consumers without overselling.",
    approach: [
      "Atomic checkout with reservation-based inventory to prevent overselling",
      "Dual B2C/B2B workflows sharing one product catalog",
      "WhatsApp Business fulfillment with zero payment-processor fees",
    ],
    metric: "0%",
    metricLabel: "platform transaction fees",
    techStack: ["Next.js 15", "FastAPI", "Supabase", "PostgreSQL"],
    slug: "computer-lot",
  },
  {
    industry: "Operations",
    outcomeHeadline:
      "Real-time ERP for cloud kitchens — one kitchen, many brands, shared inventory",
    context:
      "Cloud kitchens run multiple restaurant brands from a single kitchen with orders arriving from delivery marketplaces and no dine-in service. Generic tooling breaks down — orders arrive from everywhere, ingredients are shared across brands, and every brand reports into the same P&L.",
    approach: [
      "Live Kanban KDS with Socket.IO real-time order feed",
      "Recipe-linked inventory — every dish resolves to ingredient-level quantities",
      "Brand performance analytics and customer order tracking pages",
    ],
    metric: "5",
    metricLabel: "modules wired by real-time feed",
    techStack: ["Vue 3", "TypeScript", "PrimeVue", "Socket.IO", "TanStack Query"],
    slug: "cloud-kitchen-erp",
    status: "In progress",
  },
  {
    industry: "AI / Education",
    outcomeHeadline:
      "AI-native textbook with a selection-aware RAG tutor and streamed answers",
    context:
      "Physical AI and humanoid robotics is hard to learn from static text. Readers need to ask questions about what they're reading — not just skim and hope. The textbook needed a built-in tutor that answers from the book's own content, not generic LLM responses.",
    approach: [
      "Selection-aware RAG — highlight any passage, ask about it, get a chapter-scoped answer",
      "Fully local retrieval with ONNX embeddings and Qdrant vector store",
      "Streaming responses, personalization quiz, and Urdu translation",
    ],
    metric: "Live",
    metricLabel: "deployed on Vercel",
    techStack: ["Docusaurus", "React 19", "FastAPI", "Qdrant", "ONNX"],
    slug: "physical-ai-textbook",
    status: "Live",
  },
  {
    industry: "Marketplace",
    outcomeHeadline:
      "Built a two-sided car rental marketplace with payments and identity verification",
    context:
      "P2P car rental requires trust between strangers — owners need to verify drivers, renters need secure payments, and both need a booking system that won't double-book. Existing solutions were either a Google Sheet or enterprise fleet software.",
    approach: [
      "Stripe Connect escrow — renter pays, owner gets paid after trip",
      "Identity verification flow before booking",
      "Database-level date-conflict prevention for availability",
    ],
    metric: "MVP",
    metricLabel: "deployed to production on Vercel",
    techStack: ["Next.js 14", "Prisma", "Stripe", "NextAuth"],
    slug: "morent",
  },
];

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
                Full-Stack Developer
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
                      {study.techStack.map((t) => (
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
