import Link from "next/link";
import { getAllProjects, type Project } from "@/lib/projects";
import { outcomeOf, provenanceOf } from "@/lib/project-display";
import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: siteUrl },
};

const caseStudies = getAllProjects()
  .filter(
    (
      project
    ): project is Project & {
      industry: string;
      outcomeHeadline: string;
      context: string;
      approach: string[];
    } =>
      Boolean(
        project.outcomeHeadline &&
          project.industry &&
          project.context &&
          project.approach &&
          !project.draft
      )
  )
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

const processSteps = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We talk for 30 minutes. You describe what is broken, what you need, and what your deadline looks like. I ask questions. No pitch.",
  },
  {
    step: "02",
    title: "Proposal",
    description:
      "I send a one-page document: what I would build, how long it would take, what it would cost, and which tradeoffs I would make.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Weekly demos, a shared repository, and no black boxes. You can redirect at any milestone instead of waiting for a reveal.",
  },
  {
    step: "04",
    title: "Ship and support",
    description:
      "I deploy, document the system, and hand it over. Post-launch support is scoped into the proposal so it is not an afterthought.",
  },
];

const handoverItems = [
  "Working software",
  "Weekly demos",
  "Shared repository",
  "Handover docs",
];

const nextSteps = [
  "You send the project details through the contact form.",
  "I reply with questions, honest feedback, or a clear no.",
  "If it fits, we book a 30-minute discovery call.",
  "You receive a one-page proposal with scope, timeline, and cost.",
];

export default function Home() {
  return (
    <div>
      <section id="hero" className="board border-b-2 border-ink">
        <div className="shell">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b-2 border-ink/70 py-3">
            <p className="data text-ink">RIGGING PLAN / 2026</p>
            <p className="data text-ink">DEAIDEV / FULL-STACK</p>
            <p className="data hidden text-ink sm:block">
              PROVENANCE STATED
            </p>
          </div>

          <div className="grid gap-12 py-10 md:py-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <h1 className="display-xl max-w-[12ch] text-ink">
                I build the product you&apos;ve been planning.
              </h1>
              <p className="mt-7 max-w-[54ch] text-[1.0625rem] font-medium leading-relaxed text-ink">
                I&apos;m Hammad Khan, a solo full-stack developer. I take
                early-stage products from an idea or a half-built MVP to a
                deployed, maintainable application with React, Next.js, Node.js,
                and PostgreSQL.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#case-studies" className="tag tag-orange">
                  See the work <span aria-hidden="true">&darr;</span>
                </a>
                <Link href="/contact" className="tag tag-ghost">
                  Start a conversation
                </Link>
              </div>

              <dl className="mt-10 grid max-w-2xl gap-4 border-t-2 border-ink/70 pt-5 sm:grid-cols-3">
                <div>
                  <dt className="label text-ink">Scope</dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">
                    Idea to deploy
                  </dd>
                </div>
                <div>
                  <dt className="label text-ink">Stack</dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">
                    React / Next.js / Node
                  </dd>
                </div>
                <div>
                  <dt className="label text-ink">Build</dt>
                  <dd className="mt-1 text-sm font-semibold text-ink">
                    Solo, end to end
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-5">
              <div className="border-2 border-ink bg-tar text-chalk">
                <div className="flex items-center justify-between border-b-2 border-ink bg-orange px-4 py-3 text-ink">
                  <span className="label">Work register</span>
                  <span className="data">05 FILES</span>
                </div>

                <ol className="hero-register relative">
                  <span
                    className="absolute bottom-0 left-[1.4rem] top-0 w-0.5 bg-steel/40"
                    aria-hidden="true"
                  />
                  {caseStudies.slice(0, 3).map((study, index) => {
                    const outcome = outcomeOf(study);
                    return (
                      <li
                        key={study.slug}
                        className="border-b border-line-dark last:border-b-0"
                      >
                        <Link
                          href={`/projects/${study.slug}`}
                          className="register-row grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4 pl-12 pr-4"
                        >
                          <span className="data text-steel">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>
                            <span className="block text-[15px] font-semibold leading-snug text-chalk">
                              {study.title}
                            </span>
                            <span className="mt-1 block data text-[10px] text-steel">
                              {provenanceOf(study)}
                            </span>
                          </span>
                          <span className="text-right">
                            <span className="block text-lg font-extrabold leading-none text-orange">
                              {outcome.value}
                            </span>
                            <span className="mt-1 block data text-[9px] uppercase text-steel">
                              {outcome.label}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ol>

                <div className="border-t border-line-dark p-4">
                  <Link
                    href="#case-studies"
                    className="tag tag-ghost w-full"
                  >
                    Open the full register{" "}
                    <span aria-hidden="true">&darr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-ink bg-tar text-chalk">
          <div className="shell flex flex-col gap-3 py-4 md:flex-row md:items-center md:gap-8">
            <p className="label shrink-0 text-yellow">Inspection note</p>
            <p className="max-w-[86ch] text-sm leading-relaxed text-steel">
              Five documented projects: personal tools, a team-built
              marketplace, and confidential client systems. Each case study
              states its provenance, the problem, the decisions, and the
              tradeoffs. No invented metrics.
            </p>
          </div>
        </div>
      </section>

      <section id="case-studies" className="bg-tar py-20 text-chalk md:py-28">
        <div className="shell">
          <div className="flex flex-col gap-6 border-b-2 border-line-dark pb-8 md:flex-row md:items-end md:justify-between">
            <h2 className="display-md max-w-[16ch] text-chalk">
              Selected work
            </h2>
            <p className="max-w-[44ch] body-copy text-steel">
              Real projects, documented with the problem they solve and the
              technical decisions behind them. Provenance is stated plainly.
            </p>
          </div>

          <ol>
            {caseStudies.map((study, index) => {
              const outcome = outcomeOf(study);
              return (
                <li
                  key={study.slug}
                  className="border-b-2 border-line-dark last:border-b-0"
                >
                  <Link
                    href={`/projects/${study.slug}`}
                    className="load-row group grid gap-6 py-8 md:grid-cols-12 md:gap-6 md:py-10"
                  >
                    <div className="flex items-start justify-between md:col-span-1 md:block">
                      <span className="data text-steel transition-colors group-hover:text-orange">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="data text-steel md:hidden">
                        {provenanceOf(study)}
                      </span>
                    </div>

                    <div className="md:col-span-6">
                      <h3
                        className={`max-w-[28ch] text-chalk transition-colors group-hover:text-yellow ${
                          index === 0 ? "display-sm" : "heading-md"
                        }`}
                      >
                        {study.outcomeHeadline}
                      </h3>
                      <p className="mt-3 max-w-[58ch] text-[15px] leading-relaxed text-steel">
                        {study.context}
                      </p>

                      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                        {study.approach.slice(0, 3).map((item) => (
                          <li
                            key={item}
                            className="flex max-w-full items-start gap-2 data text-[11px] text-steel"
                          >
                            <span className="text-orange" aria-hidden="true">
                              +
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <p className="mt-5 data text-[10px] text-steel">
                        TECH / {study.tech.slice(0, 4).join(" · ")}
                      </p>
                    </div>

                    <div className="md:col-span-3">
                      <div
                        className={`border-2 p-4 ${
                          index === 0
                            ? "border-ink bg-orange text-ink"
                            : "border-line-dark text-chalk"
                        }`}
                      >
                        <span
                          className={`label ${
                            index === 0 ? "text-ink" : "text-steel"
                          }`}
                        >
                          Outcome
                        </span>
                        <p
                          className={`mt-2 text-3xl font-extrabold leading-none ${
                            index === 0 ? "text-ink" : "text-orange"
                          }`}
                        >
                          {outcome.value}
                        </p>
                        <p
                          className={`mt-2 text-[13px] leading-snug ${
                            index === 0 ? "text-ink" : "text-steel"
                          }`}
                        >
                          {outcome.label}
                        </p>
                      </div>
                      <p className="mt-3 data text-[10px] text-steel">
                        {provenanceOf(study)}
                      </p>
                    </div>

                    <div className="flex items-start md:col-span-2 md:justify-end">
                      <span className="tag tag-ghost w-full group-hover:border-ink group-hover:bg-yellow group-hover:text-ink md:w-auto">
                        Open job file <span aria-hidden="true">&rarr;</span>
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>

          <div className="mt-8 flex justify-end">
            <Link href="/projects" className="tag tag-ghost">
              View all projects <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <section
        id="process"
        className="paper border-b-2 border-ink py-20 text-ink md:py-28"
      >
        <div className="shell">
          <div className="grid gap-6 border-b-2 border-ink/20 pb-8 md:grid-cols-12 md:items-end">
            <h2 className="display-md max-w-[16ch] text-ink md:col-span-7">
              From first call to shipped product
            </h2>
            <p className="max-w-[44ch] body-copy text-ink-soft md:col-span-5">
              A small, fixed process so you always know what happens next, and
              what you are paying for.
            </p>
          </div>

          <ol className="relative mt-12 grid gap-10 md:grid-cols-4 md:gap-6">
            <div
              className="process-line absolute left-0 right-0 top-[18px] hidden h-0.5 bg-ink md:block"
              aria-hidden="true"
            />
            {processSteps.map((step) => (
              <li key={step.step} className="relative">
                <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-orange text-[12px] font-extrabold text-ink">
                  {step.step}
                </span>
                <h3 className="mt-4 heading-sm text-ink">{step.title}</h3>
                <p className="mt-2 max-w-[34ch] text-[15px] leading-relaxed text-ink-soft">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>

          <ul className="mt-12 flex flex-wrap gap-2 border-t-2 border-ink/20 pt-6">
            {handoverItems.map((item) => (
              <li
                key={item}
                className="border-2 border-ink px-3 py-2 label text-[10px] text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="pricing"
        className="border-b-2 border-line-dark bg-tar-2 py-20 text-chalk md:py-28"
      >
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <h2 className="display-md text-chalk">How I price work</h2>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="tag tag-orange tag-sm">Fixed scope</span>
              <span className="tag tag-ghost tag-sm">Monthly</span>
            </div>

            <div className="mt-7 max-w-[52ch] space-y-5 body-copy text-steel">
              <p>
                I do not publish rates, because a number without a scope is a
                guess. After a discovery call I send a one-page proposal: what I
                would build, how long it would take, what it would cost, and what
                I would leave out.
              </p>
              <p>
                Fixed-scope projects are quoted as a fixed price. Ongoing work is
                billed monthly. Either way, you see the number before any work
                starts.
              </p>
              <p>
                I do not negotiate the rate, but scope is always negotiable. If
                the budget is tight, we cut features instead of quality. A
                smaller thing built well beats a larger thing built badly.
              </p>
            </div>

            <Link href="/contact" className="tag tag-solid mt-8">
              Tell me about your project
            </Link>
          </div>

          <div className="lg:col-span-7">
            <div className="border-2 border-chalk bg-chalk p-6 text-ink md:p-8">
              <div className="flex items-center justify-between border-b-2 border-ink pb-3">
                <h3 className="heading-sm text-ink">The proposal</h3>
                <span className="data text-ink">ONE PAGE</span>
              </div>
              <dl className="mt-3 divide-y divide-ink/15">
                {[
                  ["Scope", "What I would build"],
                  ["Timeline", "How long it would take"],
                  ["Cost", "What it would cost"],
                  ["Exclusions", "What I would leave out"],
                ].map(([term, description]) => (
                  <div
                    key={term}
                    className="grid grid-cols-[6.5rem_1fr] gap-4 py-3"
                  >
                    <dt className="label pt-0.5 text-ink">{term}</dt>
                    <dd className="text-[15px] font-medium text-ink">
                      {description}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 border-t-2 border-ink pt-4 text-[15px] leading-relaxed text-ink-soft">
                The number comes before the work. If the scope changes, the
                proposal changes with it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="board py-20 text-ink md:py-28">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h2 className="display-lg max-w-[15ch] text-ink">
              Tell me what you&apos;re building.
            </h2>
            <p className="mt-6 max-w-[54ch] text-[1.0625rem] font-medium leading-relaxed text-ink-soft">
              I read every message myself. If I&apos;m not the right fit, I will
              say so and point you somewhere better.
            </p>
            <Link href="/contact" className="tag tag-dark mt-8">
              Start a conversation
            </Link>
          </div>

          <div className="lg:col-span-5">
            <div className="border-2 border-ink bg-orange p-6 text-ink">
              <div className="flex items-center justify-between border-b-2 border-ink/40 pb-3">
                <h3 className="heading-sm text-ink">What happens next</h3>
                <span className="data text-ink">01—04</span>
              </div>
              <ol className="mt-4">
                {nextSteps.map((step, index) => (
                  <li
                    key={step}
                    className="grid grid-cols-[1.75rem_1fr] gap-3 border-b border-ink/25 py-3 last:border-0 last:pb-0"
                  >
                    <span className="data text-ink">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-ink-2">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
