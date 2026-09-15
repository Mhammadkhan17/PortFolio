import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import { Terminal } from "@/components/layout/Terminal";

const features = [
  {
    title: "Frontend Engineering",
    description:
      "Crafting responsive, accessible interfaces with React, Next.js, and TypeScript. Pixel-perfect implementations that scale.",
    icon: (
      <svg className="h-8 w-8 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Backend & APIs",
    description:
      "Designing robust REST and GraphQL APIs with Node.js, Python, and PostgreSQL. Scalable architectures that handle real-world load.",
    icon: (
      <svg className="h-8 w-8 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
  },
  {
    title: "Cloud & DevOps",
    description:
      "Deploying and monitoring applications on AWS, Vercel, and Docker. CI/CD pipelines that keep your team shipping fast.",
    icon: (
      <svg className="h-8 w-8 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    highlighted: false,
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
    highlighted: true,
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
    highlighted: false,
  },
];

export default function Home() {
  const allProjects = getAllProjects();
  const featuredProjects = allProjects.slice(0, 6);

  return (
    <div className="grid-pattern">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6" style={{ paddingTop: 'clamp(4rem, 8vw, 8rem)', paddingBottom: 'clamp(4rem, 8vw, 8rem)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            {/* Left: Text Content */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-medium text-cyan">
                <span className="h-2 w-2 rounded-full bg-cyan"></span>
                Available for new projects
              </div>

              <h1 className="font-bold leading-tight text-white" style={{ fontSize: 'clamp(2rem, 6vw, 4rem)' }}>
                Building digital
                <span className="block text-cyan">experiences</span> that matter
              </h1>

              <p className="mt-6 max-w-lg text-base md:text-lg text-light-grey">
                Full-stack developer specializing in modern web applications.
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
                  <p className="text-2xl sm:text-3xl font-bold text-cyan">5+</p>
                  <p className="text-xs sm:text-sm text-grey">Years Experience</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-cyan">50+</p>
                  <p className="text-xs sm:text-sm text-grey">Projects Delivered</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-cyan">30+</p>
                  <p className="text-xs sm:text-sm text-grey">Happy Clients</p>
                </div>
              </div>
            </div>

            {/* Right: Terminal Visual */}
            <div className="block">
              <Terminal />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section — zig-zag per DESIGN.md */}
      <section id="features" className="border-t border-border px-6" style={{ paddingTop: 'clamp(4rem, 8vw, 8rem)', paddingBottom: 'clamp(4rem, 8vw, 8rem)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 md:mb-16 text-center">
            <p className="mb-2 text-sm font-medium text-cyan">What I Do</p>
            <h2 className="text-2xl font-bold text-white">
              Services & Expertise
            </h2>
          </div>

          <div className="space-y-8 md:space-y-16">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`card-hover flex flex-col items-center gap-6 md:gap-8 rounded-lg border border-border bg-dark-bg p-6 md:p-8 md:flex-row ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 md:h-20 md:w-20 items-center justify-center rounded border border-cyan/30 bg-cyan/10">
                    {feature.icon}
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="mb-2 md:mb-3 text-lg md:text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-light-grey">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="border-t border-border px-6" style={{ paddingTop: 'clamp(4rem, 8vw, 8rem)', paddingBottom: 'clamp(4rem, 8vw, 8rem)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="mb-2 text-sm font-medium text-cyan">Portfolio</p>
            <h2 className="text-2xl font-bold text-white">
              Featured Projects
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="card-hover group rounded-lg border border-border bg-dark-bg p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded bg-cyan/10 px-2 py-1 text-xs text-cyan">
                    {project.category}
                  </span>
                  <svg
                    className="h-5 w-5 text-grey transition-colors group-hover:text-cyan"
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

                <h3 className="mb-2 text-lg font-semibold text-white transition-colors group-hover:text-cyan">
                  {project.title}
                </h3>
                <p className="mb-4 text-sm text-grey line-clamp-2">
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

          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="underline-animated text-cyan transition-colors hover:text-cyan-light"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="border-t border-border px-6" style={{ paddingTop: 'clamp(4rem, 8vw, 8rem)', paddingBottom: 'clamp(4rem, 8vw, 8rem)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 md:mb-16 text-center">
            <p className="mb-2 text-sm font-medium text-cyan">Testimonials</p>
            <h2 className="text-2xl font-bold text-white">
              What Clients Say
            </h2>
          </div>

          {/* Responsive: Carousel on mobile, Grid on desktop */}
          <div className="flex gap-4 overflow-x-auto scroll-snap-type-x mandatory pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.author}
                className="flex-none w-[85%] snap-start md:w-auto card-hover rounded-lg border border-border bg-dark-bg p-6 md:p-8"
              >
                <div className="mb-4">
                  <svg
                    className="h-6 w-6 md:h-8 md:w-8 text-cyan/30"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
                  </svg>
                </div>

                <p className="mb-4 md:mb-6 text-sm md:text-base text-light-grey italic line-clamp-4 md:line-clamp-none">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 md:gap-4">
                  <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-cyan/30 bg-cyan/10 text-xs md:text-sm font-semibold text-cyan">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm md:text-base">{testimonial.author}</p>
                    <p className="text-xs md:text-sm text-grey">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="border-t border-border px-6" style={{ paddingTop: 'clamp(4rem, 8vw, 8rem)', paddingBottom: 'clamp(4rem, 8vw, 8rem)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 md:mb-16 text-center">
            <p className="mb-2 text-sm font-medium text-cyan">Pricing</p>
            <h2 className="text-2xl font-bold text-white">
              Transparent Pricing
            </h2>
            <p className="mt-4 text-light-grey">
              Choose the plan that fits your project needs
            </p>
          </div>

          {/* Responsive: Carousel on mobile, Grid on desktop */}
          <div className="flex gap-4 overflow-x-auto scroll-snap-type-x mandatory pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`flex-none w-[85%] snap-start md:w-auto card-hover relative flex flex-col rounded-lg border p-6 md:p-8 ${
                  tier.highlighted
                    ? "border-cyan bg-dark-bg"
                    : "border-border bg-dark-bg"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 rounded bg-cyan px-3 md:px-4 py-1 text-xs font-semibold text-black">
                    Most Popular
                  </div>
                )}

                <h3 className="mb-2 text-lg md:text-xl font-bold text-white">{tier.name}</h3>
                <p className="mb-3 md:mb-4 text-xs md:text-sm text-grey">{tier.description}</p>

                <div className="mb-6 md:mb-8">
                  <span className="text-3xl md:text-4xl font-bold text-white">${tier.price}</span>
                </div>

                <ul className="mb-6 md:mb-8 flex-1 space-y-2 md:space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-light-grey">
                      <svg
                        className="mt-0.5 h-3 w-3 md:h-4 md:w-4 flex-shrink-0 text-cyan"
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
                  className={tier.highlighted ? "btn-primary mt-auto w-full min-h-[44px]" : "btn-secondary mt-auto w-full min-h-[44px]"}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contact" className="border-t border-border px-6" style={{ paddingTop: 'clamp(4rem, 8vw, 8rem)', paddingBottom: 'clamp(4rem, 8vw, 8rem)' }}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="rounded-lg border border-border bg-dark-bg p-8 md:p-12 lg:p-16">
            <h2 className="mb-4 text-xl md:text-2xl font-bold text-white">
              Let&apos;s Talk
            </h2>
            <p className="mb-6 md:mb-8 text-sm md:text-base text-light-grey">
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

            <p className="mt-6 md:mt-8 text-xs md:text-sm text-grey">
              Typical response time: within 24 hours
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
