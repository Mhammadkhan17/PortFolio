"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-[65ch] px-6 py-32">
      <h1 className="mb-4 type-heading-md text-on-primary">Something went wrong</h1>
      <p className="mb-8 type-body text-ash">{error.message}</p>
      <button
        onClick={() => reset()}
        className="type-body-sm text-link-blue-soft transition-opacity hover:opacity-80"
      >
        Try again
      </button>
    </div>
  );
}
