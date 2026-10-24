import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { ogImage } from "@/lib/metadata";
import { siteUrl } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on building software, making technical tradeoffs, and shipping real products for early-stage startups.",
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    title: "Blog | DEAIDEV",
    description:
      "Notes on building software, making technical tradeoffs, and shipping real products for early-stage startups.",
    url: `${siteUrl}/blog`,
    siteName: "DEAIDEV Portfolio",
    images: [ogImage],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="bg-tar text-chalk">
      <section className="border-b-2 border-line-dark py-12 md:py-16">
        <div className="shell">
          <nav aria-label="Breadcrumb" className="data text-steel">
            <Link href="/" className="hover:text-yellow">
              HOME
            </Link>
            <span className="mx-2 text-orange">/</span>
            <span className="text-chalk">BLOG</span>
          </nav>

          <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <h1 className="display-lg text-chalk">Blog</h1>
              <p className="mt-5 max-w-[56ch] body-copy text-steel">
                Notes on building software, making tradeoffs, and the parts of
                the process that do not fit in a case study.
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="flex flex-wrap gap-2 md:justify-end">
                <span className="border-2 border-line-dark px-3 py-2 data text-[10px] text-steel">
                  {String(posts.length).padStart(2, "0")} ENTRIES
                </span>
                <span className="border-2 border-orange px-3 py-2 data text-[10px] text-yellow">
                  LOGBOOK
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 md:py-10">
        <div className="shell">
          {posts.length === 0 ? (
            <div className="paper border-2 border-ink p-6 text-ink md:p-8">
              <h2 className="heading-sm text-ink">No posts yet</h2>
              <p className="mt-2 max-w-[50ch] text-[15px] leading-relaxed text-ink-soft">
                Writing is in progress. The case studies are the best place to
                start.
              </p>
              <Link href="/projects" className="tag tag-solid mt-6">
                Read the case studies
              </Link>
            </div>
          ) : (
            <ol>
              {posts.map((post) => (
                <li
                  key={post.slug}
                  className="border-b-2 border-line-dark last:border-b-0"
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="load-row group grid gap-5 py-8 md:grid-cols-12 md:gap-6 md:py-10"
                  >
                    <div className="md:col-span-2">
                      <time
                        dateTime={post.date}
                        className="block data text-orange"
                      >
                        {new Date(post.date)
                          .toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          })
                          .toUpperCase()}
                      </time>
                      <p className="mt-1 data text-[10px] text-steel">
                        {post.readingTime.toUpperCase()}
                      </p>
                    </div>

                    <div className="md:col-span-8">
                      <h2 className="heading-md max-w-[28ch] text-chalk transition-colors group-hover:text-yellow">
                        {post.title}
                      </h2>
                      <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-steel">
                        {post.description}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <li
                            key={tag}
                            className="border border-line-dark px-2 py-1 data text-[10px] text-steel"
                          >
                            {tag.toUpperCase()}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-start md:col-span-2 md:justify-end">
                      <span className="tag tag-ghost w-full group-hover:border-ink group-hover:bg-yellow group-hover:text-ink md:w-auto">
                        Read entry <span aria-hidden="true">&rarr;</span>
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          )}

          <div className="mt-10 border-t-2 border-line-dark pt-6">
            <p className="max-w-[60ch] text-sm leading-relaxed text-steel">
              The case studies carry the longer version: the problem, the
              decisions, and the tradeoffs behind each build.
            </p>
            <Link href="/projects" className="tag tag-ghost mt-5">
              Read the case studies <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="board border-t-2 border-ink py-14 text-ink md:py-20">
        <div className="shell flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="display-md max-w-[18ch] text-ink">
              Building something worth writing about?
            </h2>
            <p className="mt-4 max-w-[46ch] text-[15px] font-medium leading-relaxed text-ink">
              Tell me what you are building and where it is stuck.
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
