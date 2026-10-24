import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import { hasLink } from "@/lib/links";
import { outcomeOf, provenanceOf } from "@/lib/project-display";
import { ogImage } from "@/lib/metadata";
import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies from personal, team, and confidential client work: MVPs, full-stack apps, and AI tools built with React, Next.js, Node.js, and PostgreSQL.",
  alternates: { canonical: `${siteUrl}/projects` },
  openGraph: {
    title: "Projects | DEAIDEV",
    description:
      "Case studies from personal, team, and confidential client work: MVPs, full-stack apps, and AI tools built with React, Next.js, Node.js, and PostgreSQL.",
    url: `${siteUrl}/projects`,
    siteName: "DEAIDEV Portfolio",
    images: [ogImage],
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects()
    .filter((project) => !project.draft)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

  return (
    <div className="bg-tar text-chalk">
      <section className="border-b-2 border-line-dark py-12 md:py-16">
        <div className="shell">
          <nav aria-label="Breadcrumb" className="data text-steel">
            <Link href="/" className="hover:text-yellow">
              HOME
            </Link>
            <span className="mx-2 text-orange">/</span>
            <span className="text-chalk">PROJECTS</span>
          </nav>

          <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <h1 className="display-lg text-chalk">Projects</h1>
              <p className="mt-5 max-w-[56ch] body-copy text-steel">
                Five documented builds. Each one states whether it is personal,
                team, or client work, and links only to live demos and source
                that exist.
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="flex flex-wrap gap-2 md:justify-end">
                <span className="border-2 border-line-dark px-3 py-2 data text-[10px] text-steel">
                  05 FILES
                </span>
                <span className="border-2 border-line-dark px-3 py-2 data text-[10px] text-steel">
                  PERSONAL / TEAM / CLIENT
                </span>
                <span className="border-2 border-orange px-3 py-2 data text-[10px] text-yellow">
                  PROVENANCE STATED
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 md:py-10">
        <div className="shell">
          <ol>
            {projects.map((project, index) => {
              const outcome = outcomeOf(project);
              return (
                <li
                  key={project.slug}
                  className="load-row grid gap-6 border-b-2 border-line-dark py-8 md:grid-cols-12 md:gap-6 md:py-10"
                >
                  <div className="flex items-start justify-between md:col-span-1 md:block">
                    <span className="data text-steel">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="data text-steel md:hidden">
                      {provenanceOf(project)}
                    </span>
                  </div>

                  <div className="md:col-span-6">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <h2 className="heading-md max-w-[28ch]">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="text-chalk transition-colors hover:text-yellow"
                        >
                          {project.title}
                        </Link>
                      </h2>
                      <span className="tag tag-ghost tag-sm">
                        {provenanceOf(project)}
                      </span>
                    </div>

                    <p className="mt-3 max-w-[58ch] text-[15px] leading-relaxed text-steel">
                      {project.outcomeHeadline ?? project.description}
                    </p>

                    <p className="mt-4 data text-[10px] text-steel">
                      TECH / {project.tech.slice(0, 5).join(" · ")}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                      {hasLink(project.demo) && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="label border-b-2 border-transparent text-steel transition-colors hover:border-orange hover:text-yellow"
                        >
                          Live demo <span aria-hidden="true">↗</span>
                        </a>
                      )}
                      {hasLink(project.github) && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="label border-b-2 border-transparent text-steel transition-colors hover:border-orange hover:text-yellow"
                        >
                          Source <span aria-hidden="true">↗</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-3">
                    <div className="border-2 border-line-dark p-4">
                      <span className="label text-steel">Outcome</span>
                      <p className="mt-2 text-3xl font-extrabold leading-none text-orange">
                        {outcome.value}
                      </p>
                      <p className="mt-2 text-[13px] leading-snug text-steel">
                        {outcome.label}
                      </p>
                    </div>
                    <p className="mt-3 data text-[10px] text-steel">
                      {project.status?.toUpperCase() ?? "SHIPPED"}
                    </p>
                  </div>

                  <div className="flex items-start md:col-span-2 md:justify-end">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="tag tag-ghost w-full md:w-auto"
                    >
                      Open file <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="board border-t-2 border-ink py-14 text-ink md:py-20">
        <div className="shell flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="display-md max-w-[18ch] text-ink">
              Have a project that belongs here?
            </h2>
            <p className="mt-4 max-w-[46ch] text-[15px] font-medium leading-relaxed text-ink">
              Tell me what you are building and where it is stuck. I will tell
              you honestly whether I can help.
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
