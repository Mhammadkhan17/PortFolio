import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-[65ch] px-6 py-16 md:py-32">
      <h1 className="mb-8 text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight">
        Blog
      </h1>

      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-medium transition-colors group-hover:text-accent">
                  {post.title}
                </h2>
                <span className="text-xs text-grey">{post.readingTime}</span>
              </div>
              <p className="mt-1 text-sm text-grey">{post.description}</p>
              <div className="mt-2 flex items-center gap-3">
                <time className="text-xs text-grey/60">
                  {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </time>
                {post.tags.length > 0 && (
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs text-grey/60">
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
