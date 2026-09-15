import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { mdxOptions } from "@/lib/mdx";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
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

  return (
    <div className="mx-auto max-w-[65ch] px-6 py-32">
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
