import Link from "next/link";
import { getAllProjects } from "@/lib/projects";

const categories = ["all", "frontend", "fullstack", "tool"];

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category || "all";
  const allProjects = getAllProjects();

  const filtered =
    category === "all"
      ? allProjects
      : allProjects.filter((p) => p.category === category);

  return (
    <div className="mx-auto max-w-[65ch] px-6 py-32">
      <h1 className="mb-8 text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight">
        Projects
      </h1>

      <div className="mb-8 flex gap-4">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={cat === "all" ? "/projects" : `/projects?category=${cat}`}
            className={`text-sm transition-colors ${
              category === cat
                ? "text-black dark:text-white"
                : "text-grey hover:text-black dark:hover:text-white"
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
                className="font-medium transition-colors hover:text-accent"
              >
                {project.title}
              </Link>
              <div className="flex gap-3">
                <Link
                  href={project.demo}
                  className="text-xs text-grey transition-colors hover:text-accent"
                >
                  demo
                </Link>
                <Link
                  href={project.github}
                  className="text-xs text-grey transition-colors hover:text-accent"
                >
                  code
                </Link>
              </div>
            </div>
            <p className="mt-1 text-sm text-grey">{project.description}</p>
            <div className="mt-2 flex gap-2">
              {project.tech.map((t: string) => (
                <span key={t} className="text-xs text-grey/60">
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
