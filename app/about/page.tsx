export default function About() {
  return (
    <div className="mx-auto max-w-[65ch] px-6 py-16 md:py-32">
      <section className="mb-16">
        <h1 className="mb-8 text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight">
          About
        </h1>
        <div className="space-y-4 text-base leading-relaxed">
          <p>
            I build things for the web. Most of my work involves frontend
            development with React and TypeScript, though I enjoy working across
            the full stack when a project demands it.
          </p>
          <p>
            I care about writing code that other people can read. Clean
            abstractions, clear naming, and documentation that explains the why
            rather than the what. I think the best software is built
            incrementally, with frequent feedback and honest conversation about
            tradeoffs.
          </p>
          <p>
            When I&apos;m not coding, I&apos;m usually reading about design
            systems, exploring new tools, or writing about what I&apos;ve
            learned.
          </p>
        </div>
      </section>

      <section className="mb-16 border-t border-border pt-16">
        <h2 className="mb-6 text-sm text-grey">Skills</h2>
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-sm font-medium">Frontend</h3>
            <p className="text-sm text-grey">
              React, Next.js, TypeScript, Tailwind CSS, HTML/CSS
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium">Backend</h3>
            <p className="text-sm text-grey">
              Node.js, PostgreSQL, Prisma, REST APIs
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium">Tools</h3>
            <p className="text-sm text-grey">
              Git, VS Code, Figma, Linux, Docker
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium">Cloud</h3>
            <p className="text-sm text-grey">
              Vercel, AWS, Cloudflare
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border pt-16">
        <h2 className="mb-6 text-sm text-grey">Experience</h2>
        <div className="space-y-8">
          <div>
            <div className="mb-2 flex items-baseline justify-between gap-4">
              <h3 className="font-medium">Frontend Developer</h3>
              <span className="text-xs text-grey">2023 — Present</span>
            </div>
            <p className="mb-2 text-sm text-grey">Company Name</p>
            <ul className="list-inside list-disc space-y-1 text-sm text-grey">
              <li>
                Led migration from legacy React to Next.js App Router, improving
                page load performance by 40%
              </li>
              <li>
                Built a component library used across 3 product teams, reducing
                duplicated UI code by 60%
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-2 flex items-baseline justify-between gap-4">
              <h3 className="font-medium">Junior Developer</h3>
              <span className="text-xs text-grey">2021 — 2023</span>
            </div>
            <p className="mb-2 text-sm text-grey">Company Name</p>
            <ul className="list-inside list-disc space-y-1 text-sm text-grey">
              <li>
                Developed and maintained customer-facing dashboard serving 10k+
                daily active users
              </li>
              <li>
                Reduced API response times by 35% through query optimization
                and caching strategies
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
