import Link from "next/link";

export default function ContactPage() {
  const email = "hello@example.com";
  const subject = encodeURIComponent("Hello from your portfolio");
  const body = encodeURIComponent(
    "Hi,\n\nI came across your portfolio and wanted to reach out.\n\n"
  );

  return (
    <div className="mx-auto max-w-[65ch] px-6 py-32">
      <h1 className="mb-8 text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight">
        Contact
      </h1>

      <div className="space-y-8">
        <section>
          <p className="mb-6 text-base leading-relaxed">
            Want to work together or just say hello? The best way to reach me is
            via email. I try to respond within a day or two.
          </p>
          <Link
            href={`mailto:${email}?subject=${subject}&body=${body}`}
            className="text-lg text-accent transition-opacity hover:opacity-80"
          >
            {email}
          </Link>
        </section>

        <section className="border-t border-border pt-8">
          <h2 className="mb-4 text-sm text-grey">Elsewhere</h2>
          <div className="flex gap-6">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-grey transition-colors hover:text-black dark:hover:text-white"
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-grey transition-colors hover:text-black dark:hover:text-white"
            >
              LinkedIn
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
