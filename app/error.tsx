"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-tar py-20 text-chalk md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h1 className="display-lg max-w-[14ch] text-chalk">
            Something went wrong.
          </h1>
          <p className="mt-6 max-w-[52ch] body-copy text-steel">
            This page failed to load. Try again, or head back to the home page
            and start from there.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="tag tag-orange"
            >
              Try again
            </button>
            <Link href="/" className="tag tag-ghost">
              Go home
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="border-2 border-line-dark bg-tar-2 p-5 text-chalk">
            <div className="flex items-center justify-between border-b border-line-dark pb-3">
              <span className="label text-yellow">Recovery</span>
              <span className="data text-steel">ERR / PAGE</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-steel">
              The page could not be rendered. Retrying usually clears a
              temporary failure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
