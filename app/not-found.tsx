import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[65ch] px-6 py-32">
      <h1 className="mb-4 type-heading-md text-on-primary">Page not found</h1>
      <p className="mb-8 type-body text-ash">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="type-body-sm text-link-blue-soft transition-opacity hover:opacity-80"
      >
        Go home
      </Link>
    </div>
  );
}
