import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[65ch] px-6 py-32">
      <h1 className="mb-4 text-2xl font-bold">Page not found</h1>
      <p className="mb-8 text-grey">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="text-sm text-accent transition-opacity hover:opacity-80"
      >
        Go home
      </Link>
    </div>
  );
}
