import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import { hasLink } from "@/lib/links";
import { mdxOptions } from "@/lib/mdx";
import { outcomeOf, provenanceOf } from "@/lib/project-display";
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

function ExternalIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M3.5 2.5H9.5V8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 2.5L2.5 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
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

  const allProjects = getAllProjects();
  const related = (project.related ?? [])
    .map((s) => allProjects.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p && !p.draft))
    .slice(0, 3);

  const outcome = outcomeOf(project);
  const fileNumber = String(project.order ?? 0).padStart(2, "0");

  const spec = [
    { label: "Role", value: project.role },
    { label: "Duration", value: project.duration },
    { label: "Provenance", value: project.client },
    { label: "Industry", value: project.industry },
    { label: "Status", value: project.status ?? "Shipped" },
  ].filter((m): m is { label: string; value: string } => Boolean(m.value));

  const metaParts = [project.industry, project.date, project.status].filter(
    Boolean
  );

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
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${siteUrl}/projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${siteUrl}/projects/${project.slug}`,
      },
    ],
  };

  return (
    <div className="bg-tar text-chalk">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <section className="border-b-2 border-line-dark py-12 md:py-16">
        <div className="shell">
          <nav aria-label="Breadcrumb" className="data text-steel">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-yellow">
                  HOME
                </Link>
              </li>
              <li aria-hidden="true" className="text-orange">
                /
              </li>
              <li>
                <Link href="/projects" className="hover:text-yellow">
                  PROJECTS
                </Link>
              </li>
              <li aria-hidden="true" className="text-orange">
                /
              </li>
              <li className="max-w-[22ch] truncate text-chalk" aria-current="page">
                {project.title.toUpperCase()}
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="tag tag-ghost tag-sm">
                  {provenanceOf(project)}
                </span>
                <span className="border-2 border-line-dark px-3 py-2 data text-[10px] text-steel">
                  FILE {fileNumber}
                </span>
              </div>

              <h1 className="display-lg mt-5 max-w-[18ch] text-chalk">
                {project.title}
              </h1>

              {metaParts.length > 0 && (
                <p className="mt-4 data text-steel">
                  {metaParts.join("  /  ").toUpperCase()}
                </p>
              )}

              <p className="mt-5 max-w-[56ch] body-copy text-steel">
                {project.outcomeHeadline || project.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {hasLink(project.demo) && (
                  <a
                    href={project.demo}
                    className="tag tag-ghost"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live demo <ExternalIcon />
                  </a>
                )}
                {hasLink(project.github) && (
                  <a
                    href={project.github}
                    className="tag tag-ghost"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source code <ExternalIcon />
                  </a>
                )}
                {!hasLink(project.demo) && !hasLink(project.github) && (
                  <Link href="/contact" className="tag tag-orange">
                    Ask about this project
                  </Link>
                )}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="border-2 border-ink bg-orange p-5 text-ink">
                <div className="flex items-center justify-between border-b-2 border-ink/40 pb-2">
                  <span className="label">Outcome</span>
                  <span className="data">
                    {(project.status ?? "SHIPPED").toUpperCase()}
                  </span>
                </div>
                <p className="mt-4 text-5xl font-extrabold leading-none">
                  {outcome.value}
                </p>
                <p className="mt-2 max-w-[28ch] text-sm font-medium leading-snug">
                  {outcome.label}
                </p>
                <p className="mt-5 border-t-2 border-ink/40 pt-3 data text-[10px]">
                  {provenanceOf(project)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="paper border-b-2 border-ink">
        <div className="shell py-7">
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {spec.map((item) => (
              <div key={item.label} className="border-t-2 border-ink pt-3">
                <dt className="label text-ink-soft">{item.label}</dt>
                <dd className="mt-1 text-[15px] font-semibold leading-snug text-ink">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {project.cover && (
        <section className="paper">
          <div className="shell pb-10 pt-8">
            <figure>
              <div className="border-2 border-ink">
                <Image
                  src={project.cover}
                  alt={project.coverAlt || project.title}
                  width={1600}
                  height={900}
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  priority
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>
              <figcaption className="mt-2 data text-[10px] text-ink-soft">
                FIG. 01 / {(project.coverAlt || project.title).toUpperCase()}
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      <section className="paper py-12 text-ink md:py-16">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-12">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              {project.approach && project.approach.length > 0 && (
                <section aria-labelledby="approach-heading">
                  <h2 id="approach-heading" className="heading-sm text-ink">
                    Key decisions
                  </h2>
                  <ul className="mt-4">
                    {project.approach.map((item) => (
                      <li
                        key={item}
                        className="grid grid-cols-[1.25rem_1fr] gap-2 border-t border-ink/15 py-3 text-[15px] leading-relaxed text-ink-soft"
                      >
                        <span className="data text-orange-deep" aria-hidden="true">
                          +
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section className="mt-8 border-t-2 border-ink pt-4">
                <h2 className="label text-ink-soft">Stack</h2>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tech stack">
                  {project.tech.map((tech) => (
                    <li
                      key={tech}
                      className="border border-ink px-2 py-1 data text-[10px] text-ink"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </section>

              <div className="mt-8 border-t-2 border-ink pt-4">
                <Link
                  href="/projects"
                  className="label border-b-2 border-transparent text-ink-soft transition-colors hover:border-orange-deep hover:text-ink"
                >
                  &larr; All projects
                </Link>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <div className="prose-rig">
              <MDXRemote source={project.body} {...mdxOptions} />
            </div>

            {project.clientQuote && (
              <blockquote className="mt-12 border-t-2 border-orange-deep pt-4">
                <p className="text-xl font-medium leading-relaxed text-ink">
                  &ldquo;{project.clientQuote}&rdquo;
                </p>
                <cite className="mt-3 block data not-italic text-ink-soft">
                  {project.clientName}
                  {project.clientRole ? `, ${project.clientRole}` : ""}
                </cite>
              </blockquote>
            )}
          </div>
        </div>
      </section>

      <section className="board border-y-2 border-ink py-14 text-ink md:py-20">
        <div className="shell flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="display-md max-w-[18ch] text-ink">
              Have a similar problem?
            </h2>
            <p className="mt-4 max-w-[44ch] text-[15px] font-medium leading-relaxed text-ink">
              I design and ship full-stack products end to end. Tell me where
              this one is stuck.
            </p>
          </div>
          <Link href="/contact" className="tag tag-orange shrink-0">
            Start a conversation
          </Link>
        </div>
      </section>

      {related.length > 0 && (
        <section
          className="bg-tar py-16 text-chalk md:py-20"
          aria-labelledby="related-heading"
        >
          <div className="shell">
            <div className="flex items-end justify-between gap-6 border-b-2 border-line-dark pb-6">
              <h2 id="related-heading" className="display-sm text-chalk">
                More work
              </h2>
              <Link
                href="/projects"
                className="label border-b-2 border-transparent pb-1 text-steel transition-colors hover:border-orange hover:text-yellow"
              >
                All projects &rarr;
              </Link>
            </div>
            <ul className="grid md:grid-cols-3">
              {related.map((item) => (
                <li
                  key={item.slug}
                  className="border-b-2 border-line-dark md:border-b-0 md:border-r-2 md:last:border-r-0"
                >
                  <Link
                    href={`/projects/${item.slug}`}
                    className="group block h-full p-5 transition-colors hover:bg-tar-2"
                  >
                    <span className="data text-steel">
                      {item.industry?.toUpperCase()}
                    </span>
                    <h3 className="mt-2 heading-sm text-chalk transition-colors group-hover:text-yellow">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-steel">
                      {item.outcomeHeadline ?? item.description}
                    </p>
                    <span className="mt-4 inline-flex label text-orange">
                      Open file &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
