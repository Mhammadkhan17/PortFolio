import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { ogImage } from "@/lib/metadata";
import { contactEmail, githubUrl, linkedinUrl, siteUrl } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell me about your project. I read every message myself and reply with honest feedback on fit and approach, even if I'm not the right person for the job.",
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: "Contact | DEAIDEV",
    description:
      "Tell me about your project. I read every message myself and reply with honest feedback on fit and approach, even if I'm not the right person for the job.",
    url: `${siteUrl}/contact`,
    siteName: "DEAIDEV Portfolio",
    images: [ogImage],
  },
};

const includeItems = [
  "What the product is",
  "What is stuck",
  "Timeline",
  "Budget range",
];

const nextSteps = [
  "I read your message and look at whether the project fits.",
  "I reply with questions or honest feedback on the approach.",
  "If it makes sense, we book a 30-minute discovery call.",
  "You get a one-page proposal with scope, timeline, and cost.",
];

export default function ContactPage() {
  return (
    <div className="bg-tar text-chalk">
      <section className="border-b-2 border-line-dark py-12 md:py-16">
        <div className="shell">
          <nav aria-label="Breadcrumb" className="data text-steel">
            <Link href="/" className="hover:text-yellow">
              HOME
            </Link>
            <span className="mx-2 text-orange">/</span>
            <span className="text-chalk">CONTACT</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <h1 className="display-lg max-w-[14ch] text-chalk">
                Let&apos;s talk about your project
              </h1>
              <p className="mt-5 max-w-[56ch] body-copy text-steel">
                Tell me what you are building and where it is stuck. I read
                every message myself and reply with honest feedback — even if I
                am not the right fit.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                <span className="border-2 border-line-dark px-3 py-2 data text-[10px] text-steel">
                  EMAIL DRAFT
                </span>
                <span className="border-2 border-line-dark px-3 py-2 data text-[10px] text-steel">
                  NOTHING SENT UNTIL YOU SEND
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="border-2 border-line-dark p-5">
                <h2 className="label text-yellow">What to include</h2>
                <ul className="mt-4">
                  {includeItems.map((item) => (
                    <li
                      key={item}
                      className="grid grid-cols-[1.25rem_1fr] gap-2 border-t border-line-dark py-3 text-[15px] font-medium text-chalk"
                    >
                      <span className="data text-orange" aria-hidden="true">
                        +
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="paper py-14 text-ink md:py-20">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="border-2 border-ink bg-white p-5 md:p-8">
              <div className="flex items-center justify-between border-b-2 border-ink pb-3">
                <h2 className="heading-sm text-ink">Work order</h2>
                <span className="data text-ink">FORM / 01</span>
              </div>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="border-2 border-ink bg-tar p-5 text-chalk md:p-6">
              <div className="flex items-center justify-between border-b border-line-dark pb-3">
                <h2 className="heading-sm text-chalk">What happens next</h2>
                <span className="data text-steel">01—04</span>
              </div>
              <ol className="mt-2">
                {nextSteps.map((step, index) => (
                  <li
                    key={step}
                    className="grid grid-cols-[1.75rem_1fr] gap-3 border-b border-line-dark py-3 last:border-0 last:pb-0"
                  >
                    <span className="data text-orange">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-steel">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 border-t-2 border-ink pt-5">
              <h2 className="label text-ink-soft">Elsewhere</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tag tag-ghost tag-sm"
                >
                  GitHub <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tag tag-ghost tag-sm"
                >
                  LinkedIn <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={`mailto:${contactEmail}`}
                  className="tag tag-ghost tag-sm"
                >
                  Email
                </a>
              </div>
            </div>

            <p className="mt-6 border-t-2 border-orange-deep pt-3 text-sm leading-relaxed text-ink-soft">
              I read every message myself. If I am not the right fit, I will say
              so and point you somewhere better.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
