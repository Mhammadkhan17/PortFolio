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

  const isCaseStudy = !!project.outcomeHeadline;

  return (
    <div className="mx-auto max-w-[65ch] px-6 py-32">
      <Link
        href="/#work"
        className="mb-8 inline-block type-body-sm text-ash transition-colors hover:text-on-primary"
      >
        ← Back to Work
      </Link>

      <article>
        {isCaseStudy ? (
          <>
            <p className="mb-2 type-mono-eyebrow text-mute">{project.industry}</p>
            <h1 className="mb-4 type-display-sm text-on-primary">
              {project.outcomeHeadline}
            </h1>
            <p className="mb-8 type-body text-ash">{project.description}</p>

            <div className="mb-8 flex gap-2">
              {project.tech.map((t: string) => (
                <span key={t} className="type-mono-micro text-mute">
                  {t}
                </span>
              ))}
            </div>

            {project.duration && (
              <p className="mb-8 type-caption text-mute">
                {project.duration}{project.date ? ` · ${project.date}` : ""}
              </p>
            )}

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <MDXRemote source={project.body} {...mdxOptions} />
            </div>

            {project.clientQuote && (
              <blockquote className="mt-8 border-l-2 border-brand pl-6">
                <p className="type-body italic text-ash">&ldquo;{project.clientQuote}&rdquo;</p>
                <cite className="mt-2 block type-caption text-mute not-italic">
                  {project.clientName}{project.clientRole ? `, ${project.clientRole}` : ""}
                </cite>
              </blockquote>
            )}

            {project.metric && (
              <div className="mt-8 rounded-marketing border border-hairline-soft bg-canvas-soft p-lg text-center">
                <p className="type-display-md text-brand">{project.metric}</p>
                <p className="type-body-sm text-ash">{project.metricLabel}</p>
              </div>
            )}

            <div className="mt-8 flex gap-4">
              {project.demo && project.demo !== "#" && (
                <Link
                  href={project.demo}
                  className="btn-primary"
                >
                  Live Demo
                </Link>
              )}
              {project.github && project.github !== "#" && (
                <Link
                  href={project.github}
                  className="btn-secondary"
                >
                  Source Code
                </Link>
              )}
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </article>
    </div>
  );
}
