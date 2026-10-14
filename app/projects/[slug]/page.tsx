import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import { mdxOptions } from "@/lib/mdx";
import { ogImage } from "@/lib/metadata";
import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const title = project.seoTitle || project.title;
  const isThin = !project.outcomeHeadline;
  const noindex = project.draft === true || project.noindex === true || isThin;

  return {
    title,
    description: project.description,
    alternates: { canonical: `${siteUrl}/projects/${project.slug}` },
    ...(noindex && { robots: { index: false, follow: false } }),
    openGraph: {
      title: `${title} | DEAIDEV`,
      description: project.problem || project.description,
      type: "article",
      url: `${siteUrl}/projects/${project.slug}`,
      siteName: "DEAIDEV Portfolio",
      images: [ogImage],
    },
  };
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

  const allProjects = getAllProjects();
  const related = (project.related ?? [])
    .map((s) => allProjects.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p && !p.draft))
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.problem || project.description,
    url: `${siteUrl}/projects/${project.slug}`,
    author: {
      "@type": "Person",
      name: "DEAIDEV",
      url: siteUrl,
    },
    ...(project.date && { datePublished: project.date }),
    keywords: project.tech.join(", "),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Projects", item: `${siteUrl}/projects` },
      { "@type": "ListItem", position: 3, name: project.title, item: `${siteUrl}/projects/${project.slug}` },
    ],
  };

  return (
    <div className="mx-auto max-w-[65ch] px-6 py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 type-caption text-mute">
          <li><Link href="/" className="transition-colors hover:text-on-primary">Home</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/projects" className="transition-colors hover:text-on-primary">Projects</Link></li>
          <li aria-hidden="true">/</li>
          <li className="text-ash" aria-current="page">{project.title}</li>
        </ol>
      </nav>

      <article>
        {isCaseStudy ? (
          <>
            <p className="mb-2 type-mono-eyebrow text-mute">{project.industry}</p>
            <h1 className="mb-4 type-display-sm text-on-primary">
              {project.title}
            </h1>
            <p className="mb-8 type-body text-ash">{project.outcomeHeadline}</p>

            <dl className="mb-8 grid grid-cols-2 gap-4 border-y border-hairline-soft py-6 sm:grid-cols-4">
              {project.role && (
                <div>
                  <dt className="type-mono-micro text-mute">Role</dt>
                  <dd className="mt-1 type-caption text-ash">{project.role}</dd>
                </div>
              )}
              {project.duration && (
                <div>
                  <dt className="type-mono-micro text-mute">Duration</dt>
                  <dd className="mt-1 type-caption text-ash">{project.duration}</dd>
                </div>
              )}
              {project.industry && (
                <div>
                  <dt className="type-mono-micro text-mute">Industry</dt>
                  <dd className="mt-1 type-caption text-ash">{project.industry}</dd>
                </div>
              )}
              {project.client && (
                <div>
                  <dt className="type-mono-micro text-mute">Client</dt>
                  <dd className="mt-1 type-caption text-ash">{project.client}</dd>
                </div>
              )}
            </dl>

            <div className="mb-8 flex flex-wrap gap-2">
              {project.tech.map((t: string) => (
                <span key={t} className="type-mono-micro text-mute">
                  {t}
                </span>
              ))}
            </div>

            {project.metric && (
              <div className="mb-8 rounded-marketing border border-hairline-soft bg-canvas-soft p-lg text-center">
                <p className="type-display-md text-brand">{project.metric}</p>
                <p className="type-body-sm text-ash">{project.metricLabel}</p>
              </div>
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

            <div className="mt-8 flex flex-wrap gap-4">
              {project.demo && project.demo !== "#" && (
                <Link href={project.demo} className="btn-secondary">
                  Live Demo
                </Link>
              )}
              {project.github && project.github !== "#" && (
                <Link href={project.github} className="btn-secondary">
                  Source Code
                </Link>
              )}
              <Link href="/contact" className="btn-primary">
                Book a Discovery Call
              </Link>
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

      {related.length > 0 && (
        <section className="mt-16 border-t border-hairline-soft pt-12" aria-labelledby="related-heading">
          <h2 id="related-heading" className="mb-6 type-heading-sm text-on-primary">
            Similar work
          </h2>
          <ul className="space-y-4">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/projects/${r.slug}`}
                  className="group block rounded-marketing border border-hairline-soft bg-canvas-soft/60 p-lg transition-all hover:-translate-y-0.5 hover:border-brand/40"
                >
                  <p className="type-mono-micro text-mute">{r.industry}</p>
                  <p className="mt-1 type-heading-sm text-on-primary group-hover:text-brand transition-colors">
                    {r.title}
                  </p>
                  <p className="mt-1 type-body-sm text-ash line-clamp-2">
                    {r.problem || r.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
