import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { mdxOptions } from "@/lib/mdx";
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
    alternates: { canonical: `https://dearidev.dev/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | DEAIDEV`,
      description: post.description,
      type: "article",
      publishedTime: post.date,
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
    url: `https://dearidev.dev/blog/${post.slug}`,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "DEAIDEV",
      url: "https://dearidev.dev",
    },
    publisher: {
      "@type": "Person",
      name: "DEAIDEV",
    },
  };

  return (
    <div className="mx-auto max-w-[65ch] px-6 py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/blog"
        className="mb-8 inline-block type-body-sm text-ash transition-colors hover:text-on-primary"
      >
        ← All Posts
      </Link>

      <article>
        <header className="mb-8">
          <p className="mb-2 type-mono-eyebrow text-mute">Blog Post</p>
          <h1 className="type-display-sm text-on-primary">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 type-body-sm text-mute">
            <time>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
            <span>{post.readingTime}</span>
          </div>
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXRemote source={post.body} {...mdxOptions} />
        </div>
      </article>
    </div>
  );
}
