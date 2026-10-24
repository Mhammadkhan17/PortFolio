import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { mdxOptions } from "@/lib/mdx";
import { ogImage } from "@/lib/metadata";
import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${siteUrl}/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | DEAIDEV`,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${siteUrl}/blog/${post.slug}`,
      siteName: "DEAIDEV Portfolio",
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: `${siteUrl}/blog/${post.slug}`,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Hammad Khan",
      alternateName: "DEAIDEV",
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "DEAIDEV",
    },
  };

  return (
    <div className="bg-tar text-chalk">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
                <Link href="/blog" className="hover:text-yellow">
                  BLOG
                </Link>
              </li>
              <li aria-hidden="true" className="text-orange">
                /
              </li>
              <li
                className="max-w-[24ch] truncate text-chalk"
                aria-current="page"
              >
                {post.title.toUpperCase()}
              </li>
            </ol>
          </nav>

          <div className="mt-8 max-w-4xl">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <time dateTime={post.date} className="data text-orange">
                {new Date(post.date)
                  .toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                  .toUpperCase()}
              </time>
              <span className="data text-steel">
                {post.readingTime.toUpperCase()}
              </span>
            </div>

            <h1 className="display-lg mt-4 max-w-[20ch] text-chalk">
              {post.title}
            </h1>
            <p className="mt-5 max-w-[58ch] body-copy text-steel">
              {post.description}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <li
                  key={tag}
                  className="border border-line-dark px-2 py-1 data text-[10px] text-steel"
                >
                  {tag.toUpperCase()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="paper py-12 text-ink md:py-16">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-12">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <h2 className="label text-ink-soft">Log entry</h2>
              <dl className="mt-4 border-t-2 border-ink">
                <div className="border-b border-ink/15 py-3">
                  <dt className="data text-[10px] text-ink-soft">Date</dt>
                  <dd className="mt-1 text-[13px] font-semibold text-ink">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </dd>
                </div>
                <div className="border-b border-ink/15 py-3">
                  <dt className="data text-[10px] text-ink-soft">Reading time</dt>
                  <dd className="mt-1 text-[13px] font-semibold text-ink">
                    {post.readingTime}
                  </dd>
                </div>
                <div className="border-b border-ink/15 py-3">
                  <dt className="data text-[10px] text-ink-soft">Filed under</dt>
                  <dd className="mt-1 text-[13px] font-semibold text-ink">
                    {post.tags.join(" / ")}
                  </dd>
                </div>
              </dl>

              <Link
                href="/blog"
                className="mt-6 inline-flex label border-b-2 border-transparent text-ink-soft transition-colors hover:border-orange-deep hover:text-ink"
              >
                &larr; All entries
              </Link>
            </div>
          </aside>

          <article className="lg:col-span-9">
            <div className="prose-rig">
              <MDXRemote source={post.body} {...mdxOptions} />
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-3 border-t-2 border-ink pt-6">
              <Link href="/blog" className="tag tag-solid">
                &larr; Back to the logbook
              </Link>
              <Link href="/projects" className="tag tag-ghost">
                See the work
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="border-t-2 border-line-dark bg-tar py-12">
        <div className="shell flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="label text-steel">Continue</p>
            <p className="mt-1 heading-sm text-chalk">
              The case studies carry the longer version.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/projects" className="tag tag-orange">
              Read the case studies
            </Link>
            <Link href="/contact" className="tag tag-ghost">
              Start a conversation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
