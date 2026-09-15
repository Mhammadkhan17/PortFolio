import Link from "next/link";

const caseStudies = [
  {
    industry: "SaaS",
    outcomeHeadline: "Shipped a production MVP in 6 weeks for a fintech startup",
    context:
      "The client had a React frontend hitting a Node.js API that was taking 800ms per request. Users were dropping off during onboarding because the experience felt slow and unreliable.",
    approach: [
      "Migrated to connection pooling and added Redis caching",
      "Optimized N+1 queries and added database indexes",
      "Implemented optimistic UI updates for instant feedback",
    ],
    metric: "60%",
    metricLabel: "faster API response time",
    clientQuote:
      "Working with them was exactly what we needed. They took a messy codebase and turned it into something we could actually build on.",
    clientName: "Sarah Chen",
    clientRole: "CTO, TechFlow Inc.",
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis"],
    slug: "fintech-mvp",
  },
  {
    industry: "E-Commerce",
    outcomeHeadline: "Reduced checkout drop-off by 23% for an online retailer",
    context:
      "The client's checkout flow had a 68% drop-off rate. Users were adding items to cart but abandoning before payment. The existing checkout was a single monolithic page with 12 form fields.",
    approach: [
      "Broke checkout into 3 steps with progress indicator",
      "Added guest checkout option (previously required signup)",
      "Implemented Stripe Checkout for PCI compliance without complexity",
    ],
    metric: "23%",
    metricLabel: "fewer checkout abandonments",
    clientQuote:
      "The new checkout paid for itself in the first week. We went from losing 7 out of 10 customers to losing 5.",
    clientName: "Marcus Rodriguez",
    clientRole: "Head of Product, ShopLayer",
    techStack: ["React", "Node.js", "Stripe", "PostgreSQL"],
    slug: "ecommerce-checkout",
  },
  {
    industry: "Analytics",
    outcomeHeadline: "Built a real-time dashboard serving 10k daily users",
    context:
      "The client needed an analytics dashboard that could handle real-time data ingestion and display. The existing solution was a spreadsheet that took 20 minutes to refresh.",
    approach: [
      "Designed a WebSocket-based architecture for live data updates",
      "Built reusable D3.js chart components with smooth transitions",
      "Implemented data pagination and virtual scrolling for large datasets",
    ],
    metric: "20min→2s",
    metricLabel: "data refresh time",
    clientQuote:
      "They turned our spreadsheet into a real product. Our team checks this dashboard every hour now.",
    clientName: "Emily Watson",
    clientRole: "Founder, MetricsLab",
    techStack: ["React", "D3.js", "WebSocket", "Node.js"],
    slug: "analytics-dashboard",
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
        className="bg-canvas text-on-primary px-6"
        style={{ paddingTop: "clamp(4rem, 8vw, 8rem)", paddingBottom: "clamp(4rem, 8vw, 8rem)" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-6 type-mono-eyebrow text-ash">
              Full-Stack Developer
            </p>

            <h1 className="type-display-mega text-on-primary">
              From idea to production in 6 weeks
            </h1>

            <p className="mt-6 max-w-lg type-subtitle text-ash">
              I take early-stage products and turn them into deployable,
              scalable applications. React, Next.js, Node.js, PostgreSQL.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href="#work" className="btn-primary min-h-[48px]">
                See My Work
              </a>
              <Link href="/contact" className="btn-secondary min-h-[48px]">
                Let&apos;s Talk
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8">
              <div>
                <p className="type-display-md text-on-primary">3</p>
                <p className="type-caption text-mute">Apps Shipped in 2026</p>
              </div>
              <div>
                <p className="type-display-md text-on-primary">6wk</p>
                <p className="type-caption text-mute">Avg. Delivery</p>
              </div>
              <div>
                <p className="type-display-md text-on-primary">100%</p>
                <p className="type-caption text-mute">On-Time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section
        id="work"
        className="bg-canvas text-on-primary px-6"
        style={{ paddingTop: "var(--spacing-section-lg)", paddingBottom: "var(--spacing-section-lg)" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 md:mb-16">
            <p className="mb-2 type-mono-eyebrow text-ash">Case Studies</p>
            <h2 className="type-display-md text-on-primary">
              Proof, not promises
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/projects/${study.slug}`}
                className="group flex flex-col rounded-marketing bg-canvas-soft border border-hairline-soft transition-all hover:-translate-y-0.5"
                style={{ padding: "var(--spacing-xl)" }}
              >
                <p className="mb-3 type-mono-eyebrow text-brand">
                  {study.industry}
                </p>
                <h3 className="mb-3 type-heading-sm text-on-primary group-hover:text-brand transition-colors">
                  {study.outcomeHeadline}
                </h3>
                <p className="mb-4 type-body-sm text-ash line-clamp-2">
                  {study.context}
                </p>

                <ul className="mb-4 space-y-1">
                  {study.approach.map((item) => (
                    <li key={item} className="type-caption text-mute flex items-start gap-2">
                      <span className="text-brand mt-1">→</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <blockquote className="mt-auto mb-4 border-l-2 border-graphite pl-4">
                  <p className="type-body-sm text-ash italic line-clamp-2">
                    &ldquo;{study.clientQuote}&rdquo;
                  </p>
                  <cite className="type-caption text-mute not-italic">
                    — {study.clientName}, {study.clientRole}
                  </cite>
                </blockquote>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {study.techStack.map((t) => (
                    <span key={t} className="tech-badge">
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section — light mode (polarity flip) */}
      <section
        className="bg-canvas-light text-ink px-6"
        style={{ paddingTop: "var(--spacing-section-lg)", paddingBottom: "var(--spacing-section-lg)" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 md:mb-16">
            <p className="mb-2 type-mono-eyebrow text-mute">How I Work</p>
            <h2 className="type-display-md text-ink">
              From first call to shipped product
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div key={step.step}>
                <p className="mb-3 type-display-lg text-brand">{step.step}</p>
                <h3 className="mb-2 type-heading-sm text-ink">{step.title}</h3>
                <p className="type-body-sm text-ink-soft">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Philosophy Section — light mode */}
      <section
        className="bg-canvas-light text-ink px-6"
        style={{ paddingTop: "var(--spacing-section-lg)", paddingBottom: "var(--spacing-section-lg)" }}
      >
        <div className="mx-auto max-w-3xl">
          <p className="mb-2 type-mono-eyebrow text-mute">Pricing</p>
          <h2 className="mb-8 type-display-md text-ink">
            How I think about cost
          </h2>

          <div className="space-y-6 type-body text-ink-soft">
            <p>
              I don&apos;t use fixed packages. Every project is different, and the
              scope determines the price. Here&apos;s how I think about it.
            </p>
            <p>
              Most of my projects fall between <strong className="text-ink">$5,000 and $20,000</strong>,
              depending on complexity, integrations, and timeline. A straightforward
              MVP with auth, a database, and a deployment pipeline typically lands
              around <strong className="text-ink">$8,000</strong>. A more complex build with
              real-time features, payments, or AI integration will be higher.
            </p>
            <p>
              I bill either per project (fixed scope, fixed price) or monthly (for
              ongoing work). For fixed projects, I give you a detailed quote after
              our discovery call. For monthly work, my rate is <strong className="text-ink">$350/day</strong>.
            </p>
            <p>
              I don&apos;t negotiate on price, but I do negotiate on scope. If your
              budget is tight, we can trim features to fit — I&apos;d rather build a
              smaller thing well than a larger thing poorly.
            </p>
          </div>

          <div className="mt-10">
            <Link href="/contact" className="btn-primary-on-light min-h-[48px]">
              Let&apos;s Talk About Your Project
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        className="bg-canvas text-on-primary px-6"
        style={{ paddingTop: "var(--spacing-section-lg)", paddingBottom: "var(--spacing-section-lg)" }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-2 type-mono-eyebrow text-ash">Get in Touch</p>
          <h2 className="mb-4 type-display-sm text-on-primary">
            Let&apos;s talk about your project
          </h2>
          <p className="mb-8 type-body text-ash">
            Send me a message and I&apos;ll reply within 24 hours with honest
            feedback — even if I&apos;m not the right fit.
          </p>

          <Link href="/contact" className="btn-primary min-h-[48px]">
            Send Me Your Project
          </Link>

          <div className="mt-10 mx-auto max-w-md text-left">
            <p className="mb-3 type-mono-eyebrow text-mute">What happens next</p>
            <ol className="space-y-2 type-body-sm text-ash">
              <li className="flex items-start gap-3">
                <span className="text-brand font-medium">1.</span>
                I read your message within 24 hours
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand font-medium">2.</span>
                I reply with honest feedback on fit and approach
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand font-medium">3.</span>
                If it makes sense, we book a 30-minute call
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand font-medium">4.</span>
                No pressure, no pitch — just clarity
              </li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
