import Link from "next/link";
import { getAllProjects } from "@/lib/projects";

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

              <h1 className="font-bold leading-tight text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                Building digital
                <span className="block text-cyan">experiences</span> that matter
              </h1>

              <p className="mt-6 max-w-lg text-lg text-light-grey">
                Full-stack developer specializing in modern web applications.
                From concept to deployment, I craft solutions that are fast,
                scalable, and beautifully engineered.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#projects" className="btn-primary">
                  View My Work
                </a>
                <a href="#contact" className="btn-secondary">
                  Let&apos;s Talk
                </a>
              </div>

              <div className="mt-12 flex gap-8">
                <div>
                  <p className="text-3xl font-bold text-cyan">5+</p>
                  <p className="text-sm text-grey">Years Experience</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-cyan">50+</p>
                  <p className="text-sm text-grey">Projects Delivered</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-cyan">30+</p>
                  <p className="text-sm text-grey">Happy Clients</p>
                </div>
              </div>
            </div>

            {/* Right: Terminal Visual */}
            <div className="hidden md:block">
              <div className="rounded-lg border border-border bg-dark-bg p-6">
                {/* Terminal Header */}
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500"></span>
                  <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
                  <span className="h-3 w-3 rounded-full bg-green-500"></span>
                  <span className="ml-4 text-xs text-grey">terminal</span>
                </div>

                {/* Terminal Content */}
                <div className="font-mono text-sm">
                  <p className="text-grey">
                    <span className="text-cyan">$</span> whoami
                  </p>
                  <p className="mt-1 text-white">full-stack-developer</p>

                  <p className="mt-4 text-grey">
                    <span className="text-cyan">$</span> cat skills.json
                  </p>
                  <pre className="mt-1 overflow-x-auto text-light-grey">
{`{
  "frontend": ["React", "Next.js", "TypeScript"],
  "backend": ["Node.js", "Python", "PostgreSQL"],
  "devops": ["Docker", "AWS", "CI/CD"]
}`}
                  </pre>

                  <p className="mt-4 text-grey">
                    <span className="text-cyan">$</span> echo $STATUS
                  </p>
                  <p className="mt-1 text-cyan">
                    Building something amazing...<span className="cursor-blink">_</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section — zig-zag per DESIGN.md */}
      <section id="features" className="border-t border-border px-6" style={{ paddingTop: 'clamp(4rem, 8vw, 8rem)', paddingBottom: 'clamp(4rem, 8vw, 8rem)' }}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <p className="mb-2 text-sm font-medium text-cyan">What I Do</p>
            <h2 className="text-2xl font-bold text-white">
              Services & Expertise
            </h2>
          </div>

          <div className="space-y-16">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`card-hover flex flex-col items-center gap-8 rounded-lg border border-border bg-dark-bg p-8 md:flex-row ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-shrink-0">
                  <div className="flex h-20 w-20 items-center justify-center rounded border border-cyan/30 bg-cyan/10">
                    {feature.icon}
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="mb-3 text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-light-grey">{feature.description}</p>
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
          <div className="mb-16 text-center">
            <p className="mb-2 text-sm font-medium text-cyan">Testimonials</p>
            <h2 className="text-2xl font-bold text-white">
              What Clients Say
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.author}
                className="card-hover rounded-lg border border-border bg-dark-bg p-8"
              >
                <div className="mb-4">
                  <svg
                    className="h-8 w-8 text-cyan/30"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H0z" />
                  </svg>
                </div>

                <p className="mb-6 text-light-grey italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan/30 bg-cyan/10 text-sm font-semibold text-cyan">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    <p className="text-sm text-grey">{testimonial.role}</p>
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
          <div className="mb-16 text-center">
            <p className="mb-2 text-sm font-medium text-cyan">Pricing</p>
            <h2 className="text-2xl font-bold text-white">
              Transparent Pricing
            </h2>
            <p className="mt-4 text-light-grey">
              Choose the plan that fits your project needs
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`card-hover relative flex flex-col rounded-lg border p-8 ${
                  tier.highlighted
                    ? "border-cyan bg-dark-bg"
                    : "border-border bg-dark-bg"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded bg-cyan px-4 py-1 text-xs font-semibold text-black">
                    Most Popular
                  </div>
                )}

                <h3 className="mb-2 text-xl font-bold text-white">{tier.name}</h3>
                <p className="mb-4 text-sm text-grey">{tier.description}</p>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-white">${tier.price}</span>
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-light-grey">
                      <svg
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan"
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
                  className={tier.highlighted ? "btn-primary mt-auto w-full" : "btn-secondary mt-auto w-full"}
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
          <div className="rounded-lg border border-border bg-dark-bg p-12 md:p-16">
            <h2 className="mb-4 text-2xl font-bold text-white">
              Let&apos;s Talk
            </h2>
            <p className="mb-8 text-light-grey">
              Have a project in mind? I&apos;d love to hear about it. Send me a message
              and let&apos;s discuss how we can bring your ideas to life.
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a href="mailto:hello@yourname.dev" className="btn-primary">
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
                className="btn-secondary"
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

            <p className="mt-8 text-sm text-grey">
              Typical response time: within 24 hours
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
