import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
};

export default function NotFound() {
  return (
    <div className="board flex min-h-[calc(100vh-72px)] items-center border-b-2 border-ink py-20 text-ink">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h1 className="display-xl max-w-[12ch] text-ink">
            No such job file.
          </h1>
          <p className="mt-6 max-w-[52ch] text-[1.0625rem] font-medium leading-relaxed text-ink">
            The page you are looking for does not exist or has moved. The work
            and the writing are still where you left them.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/" className="tag tag-orange">
              Go home
            </Link>
            <Link href="/projects" className="tag">
              See the work
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="border-2 border-ink bg-tar p-5 text-chalk">
            <div className="flex items-center justify-between border-b border-line-dark pb-3">
              <span className="label text-yellow">Register</span>
              <span className="data text-steel">404 / NOT FOUND</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-steel">
              The requested file is not in the register. Try the project index
              or the logbook.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/projects" className="tag tag-ghost tag-sm">
                Projects
              </Link>
              <Link href="/blog" className="tag tag-ghost tag-sm">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
