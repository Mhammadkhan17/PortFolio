import Link from "next/link";

export default function ContactPage() {
  const email = "hello@example.com";
  const subject = encodeURIComponent("Hello from your portfolio");
  const body = encodeURIComponent(
    "Hi,\n\nI came across your portfolio and wanted to reach out.\n\n"
  );

  return (
    <div className="mx-auto max-w-[65ch] px-6 py-16 md:py-32">
      <p className="mb-2 type-mono-eyebrow text-ash">Contact</p>
      <h1 className="mb-8 type-display-sm text-on-primary">
        Contact
      </h1>

      <div className="space-y-8">
        <section>
          <p className="mb-6 type-body text-ash">
            Want to work together or just say hello? The best way to reach me is
            via email. I try to respond within a day or two.
          </p>
          <Link
            href={`mailto:${email}?subject=${subject}&body=${body}`}
            className="type-heading-sm text-link-blue-soft transition-opacity hover:opacity-80"
          >
            {email}
          </Link>
        </section>

        <section className="border-t border-hairline-soft pt-8">
          <p className="mb-4 type-mono-eyebrow text-mute">Elsewhere</p>
          <div className="flex gap-6">
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="type-body-sm text-ash transition-colors hover:text-on-primary"
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="type-body-sm text-ash transition-colors hover:text-on-primary"
            >
              LinkedIn
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
