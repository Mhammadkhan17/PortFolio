import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import { Terminal } from "@/components/layout/Terminal";

const features = [
  {
    eyebrow: "Frontend",
    title: "Engineering",
    description:
      "Crafting responsive, accessible interfaces with React, Next.js, and TypeScript. Pixel-perfect implementations that scale.",
    icon: (
      <svg className="h-8 w-8 text-on-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    eyebrow: "Backend",
    title: "Architecture",
    description:
      "Designing robust REST and GraphQL APIs with Node.js, Python, and PostgreSQL. Scalable architectures that handle real-world load.",
    icon: (
      <svg className="h-8 w-8 text-on-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
  },
  {
    eyebrow: "Cloud",
    title: "Infrastructure",
    description:
      "Deploying and monitoring applications on AWS, Vercel, and Docker. CI/CD pipelines that keep your team shipping fast.",
    icon: (
      <svg className="h-8 w-8 text-on-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    quote: "An exceptional developer who consistently delivers high-quality work. Their attention to detail and problem-solving skills are outstanding.",
    author: "Sarah Chen",
    role: "CTO, TechFlow Inc.",
    avatar: "SC",
  },
  {
    quote: "Working with them was a game-changer for our product. They brought both technical expertise and creative solutions to the table.",
    author: "Marcus Rodriguez",
    role: "Product Lead, DataSync",
    avatar: "MR",
  },
  {
    quote: "Their ability to translate complex requirements into clean, maintainable code is remarkable. Highly recommend for any serious project.",
    author: "Emily Watson",
    role: "Founder, CloudBase",
    avatar: "EW",
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "2,500",
    description: "Perfect for MVPs and small projects",
    features: [
      "Landing page or single-page app",
      "Responsive design",
      "Basic SEO setup",
      "2 revision rounds",
      "14-day delivery",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Professional",
    price: "7,500",
    description: "For growing products that need more",
    features: [
      "Full-stack web application",
      "Custom API development",
      "Database design & optimization",
      "Authentication & authorization",
      "Deployment & CI/CD setup",
      "30-day support",
    ],
    cta: "Start Building",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "15,000+",
    description: "Complex systems at scale",
    features: [
      "Microservices architecture",
      "Cloud infrastructure setup",
      "Performance optimization",
      "Security audit & hardening",
      "Documentation & training",
      "90-day priority support",
    ],
    cta: "Contact Us",
    featured: false,
  },
];

export default function Home() {
  const allProjects = getAllProjects();
  const featuredProjects = allProjects.slice(0, 6);

  return (
    <div>
      {/* Hero Section — marketing-section-dark */}
      <section
        className="bg-canvas text-on-primary px-6"
        style={{ paddingTop: "clamp(4rem, 8vw, 8rem)", paddingBottom: "clamp(4rem, 8vw, 8rem)" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            {/* Left: Text Content */}
            <div>
              <div className="mb-6 type-mono-eyebrow text-ash">
                Full-Stack Developer
              </div>

              <h1 className="type-display-mega text-on-primary">
                Structure powers intelligence
              </h1>

              <p className="mt-6 max-w-lg type-subtitle text-ash">
                From concept to deployment, I craft solutions that are fast,
                scalable, and beautifully engineered.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a href="#projects" className="btn-primary min-h-[48px]">
                  View My Work
                </a>
                <a href="#contact" className="btn-secondary min-h-[48px]">
                  Let&apos;s Talk
                </a>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8">
                <div>
                  <p className="type-display-md text-on-primary">5+</p>
                  <p className="type-caption text-mute">Years Experience</p>
                </div>
                <div>
                  <p className="type-display-md text-on-primary">50+</p>
                  <p className="type-caption text-mute">Projects Delivered</p>
                </div>
                <div>
                  <p className="type-display-md text-on-primary">30+</p>
                  <p className="type-caption text-mute">Happy Clients</p>
                </div>
              </div>
            </div>

            {/* Right: Terminal Visual */}
            <div className="block w-full max-w-full overflow-hidden">
              <Terminal />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section — marketing-section-dark with feature-card-dark */}
      <section
        id="features"
        className="bg-canvas text-on-primary px-6"
        style={{ paddingTop: "var(--spacing-section-lg)", paddingBottom: "var(--spacing-section-lg)" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 md:mb-16">
            <p className="mb-2 type-mono-eyebrow text-ash">Capabilities</p>
            <h2 className="type-display-md text-on-primary">
              Services & Expertise
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col rounded-marketing bg-canvas-soft p-xl border border-hairline-soft"
                style={{ padding: "var(--spacing-xl)" }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-graphite">
                  {feature.icon}
                </div>
                <p className="mb-2 type-mono-eyebrow text-mute">{feature.eyebrow}</p>
                <h3 className="mb-3 type-heading-sm text-on-primary">
                  {feature.title}
                </h3>
                <p className="type-body text-ash">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section — marketing-section-dark */}
      <section
        id="projects"
        className="bg-canvas text-on-primary px-6"
        style={{ paddingTop: "var(--spacing-section-lg)", paddingBottom: "var(--spacing-section-lg)" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <p className="mb-2 type-mono-eyebrow text-ash">Portfolio</p>
            <h2 className="type-display-md text-on-primary">
              Featured Projects
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group rounded-marketing border border-hairline-soft bg-canvas-soft p-xl transition-all hover:-translate-y-0.5"
                style={{ padding: "var(--spacing-xl)" }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="type-mono-micro rounded-full bg-canvas px-sm py-xxs text-ash border border-hairline-soft">
                    {project.category}
                  </span>
                  <svg
                    className="h-5 w-5 text-mute transition-colors group-hover:text-on-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>

                <h3 className="mb-2 type-heading-sm text-on-primary transition-colors group-hover:text-brand">
                  {project.title}
                </h3>
                <p className="mb-4 type-body-sm text-ash line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 4).map((t: string) => (
                    <span key={t} className="tech-badge">
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/projects"
              className="underline-animated type-button-sm text-ash transition-colors hover:text-on-primary"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section — marketing-section-dark */}
      <section
        id="testimonials"
        className="bg-canvas text-on-primary px-6"
        style={{ paddingTop: "var(--spacing-section-lg)", paddingBottom: "var(--spacing-section-lg)" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 md:mb-16">
            <p className="mb-2 type-mono-eyebrow text-ash">Testimonials</p>
            <h2 className="type-display-md text-on-primary">
              What Clients Say
            </h2>
          </div>

          <div className="flex gap-4 overflow-x-auto scroll-snap-type-x mandatory pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.author}
                className="flex-none w-[85%] snap-start md:w-auto rounded-marketing border border-hairline-soft bg-canvas-soft p-xl md:p-8"
                style={{ padding: "var(--spacing-xl)" }}
              >
                <div className="mb-4">
                  <svg
                    className="h-8 w-8 text-graphite"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
                  </svg>
                </div>

                <p className="mb-6 type-body text-ash italic line-clamp-4 md:line-clamp-none">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-graphite text-sm font-semibold text-on-primary">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="type-body-sm font-medium text-on-primary">{testimonial.author}</p>
                    <p className="type-caption text-mute">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section — marketing-section-light (polarity flip) */}
      <section
        id="pricing"
        className="bg-canvas-light text-ink px-6"
        style={{ paddingTop: "var(--spacing-section-lg)", paddingBottom: "var(--spacing-section-lg)" }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 md:mb-16">
            <p className="mb-2 type-mono-eyebrow text-mute">Pricing</p>
            <h2 className="type-display-md text-ink">
              Transparent Pricing
            </h2>
            <p className="mt-4 type-body text-ink-soft">
              Choose the plan that fits your project needs
            </p>
          </div>

          <div className="flex gap-4 overflow-x-auto scroll-snap-type-x mandatory pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`flex-none w-[85%] snap-start md:w-auto relative flex flex-col rounded-marketing p-xl md:p-8 ${
                  tier.featured
                    ? "bg-ink text-on-primary"
                    : "bg-canvas-light text-ink border border-hairline"
                }`}
                style={{ padding: "var(--spacing-xl)" }}
              >
                <h3 className="mb-2 type-heading-md">{tier.name}</h3>
                <p className="mb-4 type-body-sm text-mute">{tier.description}</p>

                <div className="mb-8">
                  <span className="type-display-md">${tier.price}</span>
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 type-body-sm">
                      <svg
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-success"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={tier.featured ? "btn-primary-on-light mt-auto w-full min-h-[44px]" : "btn-primary mt-auto w-full min-h-[44px]"}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section — marketing-section-dark */}
      <section
        id="contact"
        className="bg-canvas text-on-primary px-6"
        style={{ paddingTop: "var(--spacing-section-lg)", paddingBottom: "var(--spacing-section-lg)" }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-2 type-mono-eyebrow text-ash">Get in Touch</p>
          <h2 className="mb-4 type-display-sm text-on-primary">
            Let&apos;s Talk
          </h2>
          <p className="mb-8 type-body text-ash">
            Have a project in mind? I&apos;d love to hear about it. Send me a message
            and let&apos;s discuss how we can bring your ideas to life.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="mailto:hello@yourname.dev" className="btn-primary min-h-[48px] w-full sm:w-auto">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              hello@yourname.dev
            </a>
            <a
              href="https://calendly.com/yourname"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary min-h-[48px] w-full sm:w-auto"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Schedule a Call
            </a>
          </div>

          <p className="mt-8 type-caption text-mute">
            Typical response time: within 24 hours
          </p>
        </div>
      </section>
    </div>
  );
}
