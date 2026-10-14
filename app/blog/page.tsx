import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on development, building products, and lessons learned shipping real software.",
  alternates: { canonical: "https://dearidev.dev/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-[65ch] px-6 py-16 md:py-32">
      <p className="mb-2 type-mono-eyebrow text-ash">Blog</p>
      <h1 className="mb-8 type-display-sm text-on-primary">
        Blog
      </h1>

      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="type-body-sm font-medium text-on-primary transition-colors group-hover:text-brand">
                  {post.title}
                </h2>
                <span className="type-meta text-mute">{post.readingTime}</span>
              </div>
              <p className="mt-1 type-body-sm text-ash">{post.description}</p>
              <div className="mt-2 flex items-center gap-3">
                <time className="type-meta text-mute">
                  {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </time>
                {post.tags.length > 0 && (
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="type-mono-micro text-mute">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
