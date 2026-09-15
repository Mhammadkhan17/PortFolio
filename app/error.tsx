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
      <h1 className="mb-4 text-2xl font-bold">Something went wrong</h1>
      <p className="mb-8 text-grey">{error.message}</p>
      <button
        onClick={() => reset()}
        className="text-sm text-accent transition-opacity hover:opacity-80"
      >
        Try again
      </button>
    </div>
  );
}
