import Link from "next/link";
import { Logo } from "./Logo";
import { contactEmail, githubUrl, linkedinUrl } from "@/lib/site";

const navLinks = [
  { href: "/#case-studies", label: "Work", index: "01" },
  { href: "/projects", label: "Projects", index: "02" },
  { href: "/about", label: "About", index: "03" },
  { href: "/blog", label: "Blog", index: "04" },
  { href: "/contact", label: "Contact", index: "05" },
];

const socialLinks = [
  { href: githubUrl, label: "GitHub" },
  { href: linkedinUrl, label: "LinkedIn" },
  { href: `mailto:${contactEmail}`, label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t-2 border-orange bg-tar text-chalk">
      <div className="shell py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-[38ch] body-copy text-steel">
              Solo full-stack development for founders who need a working
              product, not another planning document.
            </p>
            <p className="mt-6 max-w-[34ch] border-t-2 border-orange pt-3 data text-steel">
              PROVENANCE STATED
              <br />
              NO INVENTED METRICS
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="label text-steel">Navigation</h2>
            <ul className="mt-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex min-h-11 items-center gap-3 border-b border-line-dark text-chalk transition-colors hover:text-yellow"
                  >
                    <span className="data text-[10px] text-steel">
                      {link.index}
                    </span>
                    <span className="label text-[12px]">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="label text-steel">Connect</h2>
            <ul className="mt-4">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={
                      social.href.startsWith("mailto") ? undefined : "_blank"
                    }
                    rel={
                      social.href.startsWith("mailto")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="group flex min-h-11 items-center justify-between gap-4 border-b border-line-dark text-chalk transition-colors hover:text-yellow"
                  >
                    <span className="label text-[12px]">{social.label}</span>
                    <span className="data text-[10px] text-steel group-hover:text-yellow">
                      {social.href.startsWith("mailto") ? "MAIL" : "EXT"}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[30ch] small text-steel">
              Have a product in mind? The fastest way to start is a short note
              about the problem.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line-dark pt-5 md:flex-row md:items-center md:justify-between">
          <p className="data text-steel">
            &copy; {new Date().getFullYear()} DEAIDEV
          </p>
          <p className="data text-steel">
            BUILT WITH NEXT.JS / DEPLOYED ON VERCEL
          </p>
        </div>
      </div>
    </footer>
  );
}
