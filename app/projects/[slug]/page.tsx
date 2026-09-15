import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import { mdxOptions } from "@/lib/mdx";

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-[65ch] px-6 py-32">
      <Link
        href="/projects"
        className="mb-8 inline-block type-body-sm text-ash transition-colors hover:text-on-primary"
      >
        ← All Projects
      </Link>

      <article>
        <p className="mb-2 type-mono-eyebrow text-mute">Project</p>
        <h1 className="mb-2 type-display-sm text-on-primary">
          {project.title}
        </h1>
        <p className="mb-4 type-body text-ash">{project.description}</p>

        <div className="mb-8 flex gap-3">
          <Link
            href={project.demo}
            className="type-body-sm text-link-blue-soft transition-opacity hover:opacity-80"
          >
            Live Demo
          </Link>
          <Link
            href={project.github}
            className="type-body-sm text-link-blue-soft transition-opacity hover:opacity-80"
          >
            Source Code
          </Link>
        </div>

        <div className="mb-8 flex gap-2">
          {project.tech.map((t: string) => (
            <span key={t} className="type-mono-micro text-mute">
              {t}
            </span>
          ))}
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXRemote source={project.body} {...mdxOptions} />
        </div>
      </article>
    </div>
  );
}
