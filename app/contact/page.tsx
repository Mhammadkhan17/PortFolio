import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { ogImage } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about your project. I reply within 24 hours with honest feedback — even if I'm not the right fit.",
  alternates: { canonical: "https://dearidev.dev/contact" },
  openGraph: {
    title: "Contact | DEAIDEV",
    description:
      "Get in touch about your project. I reply within 24 hours with honest feedback — even if I'm not the right fit.",
    url: "https://dearidev.dev/contact",
    siteName: "DEAIDEV Portfolio",
    images: [ogImage],
  },
};

export default function ContactPage() {
  return (
    <div className="bg-canvas text-on-primary">
      <section
        className="px-6"
        style={{ paddingTop: "clamp(4rem, 8vw, 8rem)", paddingBottom: "clamp(4rem, 8vw, 8rem)" }}
      >
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 type-mono-eyebrow text-ash">Contact</p>
          <h1 className="mb-4 type-display-sm text-on-primary">
            Let&apos;s talk about your project
          </h1>
          <p className="mb-10 type-body text-ash">
            Send me a message and I&apos;ll reply within 24 hours with honest
            feedback — even if I&apos;m not the right fit.
          </p>

          <ContactForm />

          <div className="mt-12 border-t border-hairline-soft pt-8">
            <p className="mb-4 type-mono-eyebrow text-mute">What happens next</p>
            <ol className="space-y-3 type-body-sm text-ash">
              <li className="flex items-start gap-3">
                <span className="text-brand font-medium">1.</span>
                I read your message within 24 hours
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand font-medium">2.</span>
                I reply with honest feedback on fit and approach
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand font-medium">3.</span>
                If it makes sense, we book a 30-minute call
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand font-medium">4.</span>
                No pressure, no pitch — just clarity
              </li>
            </ol>
          </div>

          <div className="mt-8 border-t border-hairline-soft pt-8">
            <p className="mb-4 type-mono-eyebrow text-mute">Elsewhere</p>
            <div className="flex gap-6">
              <Link
                href="https://github.com/dearidev"
                target="_blank"
                rel="noopener noreferrer"
                className="type-body-sm text-ash transition-colors hover:text-on-primary"
              >
                GitHub
              </Link>
              <Link
                href="https://linkedin.com/in/dearidev"
                target="_blank"
                rel="noopener noreferrer"
                className="type-body-sm text-ash transition-colors hover:text-on-primary"
              >
                LinkedIn
              </Link>
              <Link
                href="mailto:hello@dearidev.dev"
                className="type-body-sm text-ash transition-colors hover:text-on-primary"
              >
                Email
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
