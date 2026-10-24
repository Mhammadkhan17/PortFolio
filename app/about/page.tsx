import Link from "next/link";
import { ogImage } from "@/lib/metadata";
import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hammad Khan, a solo full-stack developer building MVPs and production apps for early-stage startups with React, Next.js, Node.js, and PostgreSQL.",
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: "About | DEAIDEV",
    description:
      "Hammad Khan, a solo full-stack developer building MVPs and production apps for early-stage startups with React, Next.js, Node.js, and PostgreSQL.",
    url: `${siteUrl}/about`,
    siteName: "DEAIDEV Portfolio",
    images: [ogImage],
  },
};

const toolGroups = [
  {
    label: "Frontend",
    tools: "React, Next.js, TypeScript, Tailwind CSS",
  },
  {
    label: "Backend",
    tools: "Node.js, PostgreSQL, FastAPI, REST APIs",
  },
  {
    label: "AI",
    tools: "RAG pipelines, Qdrant, ONNX",
  },
  {
    label: "Delivery",
    tools: "Vercel, Git",
  },
];

const principles = [
  {
    title: "Most MVPs are over-built.",
    body: "The best version of your product is version 1.1, not version 1.0. Ship the smallest thing that solves the real problem, then iterate based on what users actually do — not what you think they will do.",
  },
  {
    title: "Every line of code is for the person who inherits it.",
    body: "Not for the person who writes it. That means clear naming, simple abstractions, and documentation that explains the why — not just the what. I think about the developer who joins six months from now, picks up the file, and needs to understand it without asking me.",
  },
  {
    title: "The best technical decision is usually the boring one.",
    body: "The shiny new framework will not save a project, but a well-chosen database index will. I reach for proven tools and patterns, not whatever is trending.",
  },
  {
    title: "I am honest about tradeoffs.",
    body: "Every technical decision is a tradeoff. I will tell you what I recommend, why I recommend it, and what we are giving up. You make the final call — it is your product.",
  },
];

export default function About() {
  return (
    <div className="bg-tar text-chalk">
      <section className="border-b-2 border-line-dark py-12 md:py-16">
        <div className="shell">
          <nav aria-label="Breadcrumb" className="data text-steel">
            <Link href="/" className="hover:text-yellow">
              HOME
            </Link>
            <span className="mx-2 text-orange">/</span>
            <span className="text-chalk">ABOUT</span>
          </nav>

          <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <h1 className="display-lg max-w-[12ch] text-chalk">
                I build things that work.
              </h1>

              <div className="mt-7 max-w-[56ch] space-y-4 body-copy text-steel">
                <p>
                  I have seen too many projects stall in the &ldquo;almost
                  done&rdquo; phase. The backend works but the frontend is
                  broken. The demo works but production does not. The code works
                  but nobody can maintain it.
                </p>
                <p>
                  My job is to get you from &ldquo;almost done&rdquo; to
                  &ldquo;shipped&rdquo; — with code that will not break in ways
                  you did not see coming. I take early-stage products and turn
                  them into deployable, maintainable applications.
                </p>
              </div>

              <Link href="/projects" className="tag tag-ghost mt-8">
                See the projects <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>

            <div className="lg:col-span-5">
              <div className="border-2 border-chalk bg-tar-2">
                <div className="flex items-center justify-between border-b-2 border-chalk bg-orange px-4 py-3 text-ink">
                  <span className="label">Operator ID</span>
                  <span className="data">DEAIDEV / 01</span>
                </div>

                <div className="grid grid-cols-[5rem_1fr] gap-4 p-4">
                  <div className="flex aspect-[3/4] items-center justify-center border-2 border-chalk bg-tar">
                    <span className="text-4xl font-extrabold tracking-[-0.04em] text-orange">
                      HK
                    </span>
                  </div>

                  <dl className="space-y-3">
                    <div>
                      <dt className="label text-steel">Name</dt>
                      <dd className="text-sm font-semibold text-chalk">
                        Hammad Khan
                      </dd>
                    </div>
                    <div>
                      <dt className="label text-steel">Role</dt>
                      <dd className="text-sm font-semibold text-chalk">
                        Full-stack developer
                      </dd>
                    </div>
                    <div>
                      <dt className="label text-steel">Scope</dt>
                      <dd className="text-sm font-semibold text-chalk">
                        Idea to deploy
                      </dd>
                    </div>
                    <div>
                      <dt className="label text-steel">Mode</dt>
                      <dd className="text-sm font-semibold text-chalk">
                        Solo, end to end
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="flex items-center justify-between border-t border-line-dark px-4 py-2">
                  <span className="data text-steel">NO INVENTED METRICS</span>
                  <span
                    className="h-2 w-2 rounded-full bg-yellow"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="paper py-20 text-ink md:py-28">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h2 className="display-md max-w-[12ch] text-ink">
              How I think about software
            </h2>
          </div>

          <div className="grid gap-x-10 gap-y-10 md:grid-cols-2 lg:col-span-8">
            {principles.map((principle) => (
              <section
                key={principle.title}
                className="border-t-2 border-ink pt-4"
              >
                <h3 className="heading-sm text-ink">{principle.title}</h3>
                <p className="mt-2 max-w-[44ch] text-[15px] leading-relaxed text-ink-soft">
                  {principle.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-tar-2 py-20 text-chalk md:py-28">
        <div className="shell">
          <h2 className="display-md text-chalk">Tools I use</h2>
          <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {toolGroups.map((group) => (
              <div
                key={group.label}
                className="border-t-2 border-line-dark pt-4"
              >
                <dt className="label text-orange">{group.label}</dt>
                <dd className="mt-2 max-w-[28ch] text-[15px] leading-relaxed text-steel">
                  {group.tools}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="paper py-20 text-ink md:py-28">
        <div className="shell grid gap-8 lg:grid-cols-12">
          <h2 className="display-md max-w-[12ch] text-ink lg:col-span-4">
            A note on the work
          </h2>
          <div className="lg:col-span-8">
            <p className="max-w-[58ch] border-t-2 border-orange-deep pt-4 text-[1.0625rem] leading-relaxed text-ink-soft">
              The case studies here are not padded with invented logos or client
              quotes. Some are personal or educational projects, one was built
              with a team, and two are client systems I cannot name. Each case
              study says which — because proof you cannot trust is worse than no
              proof at all.
            </p>
            <Link href="/projects" className="tag tag-solid mt-8">
              See the projects
            </Link>
          </div>
        </div>
      </section>

      <section className="board border-y-2 border-ink py-16 text-ink md:py-20">
        <div className="shell flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="display-md max-w-[18ch] text-ink">
              Think we would work well together?
            </h2>
            <p className="mt-4 max-w-[46ch] text-[15px] font-medium leading-relaxed text-ink">
              I am always interested in projects that need to ship.
            </p>
          </div>
          <Link href="/contact" className="tag tag-orange shrink-0">
            Start a conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
