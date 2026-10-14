import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import { ogImage } from "@/lib/metadata";
import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies and projects: MVPs, full-stack apps, and tools built with React, Next.js, Node.js, and PostgreSQL for real client and startup work.",
  alternates: { canonical: `${siteUrl}/projects` },
  openGraph: {
    title: "Projects | DEAIDEV",
    description:
      "Case studies and projects: MVPs, full-stack apps, and tools built with React, Next.js, Node.js, and PostgreSQL for real client and startup work.",
    url: `${siteUrl}/projects`,
    siteName: "DEAIDEV Portfolio",
    images: [ogImage],
  },
};

const categories = ["all", "frontend", "fullstack", "tool"];

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category || "all";
  const allProjects = getAllProjects().filter((p) => !p.draft);

  const filtered =
    category === "all"
      ? allProjects
      : allProjects.filter((p) => p.category === category);

  return (
    <div className="mx-auto max-w-[65ch] px-6 py-16 md:py-32">
      <p className="mb-2 type-mono-eyebrow text-ash">Projects</p>
      <h1 className="mb-8 type-display-sm text-on-primary">
        Projects
      </h1>

      <div className="mb-8 flex gap-4">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={cat === "all" ? "/projects" : `/projects?category=${cat}`}
            className={`type-body-sm transition-colors ${
              category === cat
                ? "text-on-primary"
                : "text-mute hover:text-on-primary"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      <ul className="space-y-6">
        {filtered.map((project) => (
          <li key={project.slug}>
            <div className="flex items-baseline justify-between gap-4">
              <Link
                href={`/projects/${project.slug}`}
                className="type-body-sm font-medium text-on-primary transition-colors hover:text-brand"
              >
                {project.title}
              </Link>
              <div className="flex gap-3">
                <Link
                  href={project.demo}
                  className="type-meta text-mute transition-colors hover:text-on-primary"
                >
                  demo
                </Link>
                <Link
                  href={project.github}
                  className="type-meta text-mute transition-colors hover:text-on-primary"
                >
                  code
                </Link>
              </div>
            </div>
            <p className="mt-1 type-body-sm text-ash">{project.description}</p>
            <div className="mt-2 flex gap-2">
              {project.tech.map((t: string) => (
                <span key={t} className="type-mono-micro text-mute">
                  {t}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
