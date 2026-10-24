"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const navLinks = [
  { href: "/#case-studies", label: "Work", index: "01" },
  { href: "/projects", label: "Projects", index: "02" },
  { href: "/about", label: "About", index: "03" },
  { href: "/blog", label: "Blog", index: "04" },
];

function isLinkActive(href: string, pathname: string) {
  if (href === "/#case-studies") return false;
  if (href === "/projects") return pathname.startsWith("/projects");
  if (href === "/blog") return pathname.startsWith("/blog");
  return pathname === href;
}

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-line-dark bg-tar">
      <div className="shell flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const isActive = isLinkActive(link.href, pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`group inline-flex min-h-11 items-center gap-2 border-b-2 pt-1 transition-colors ${
                  isActive
                    ? "border-orange text-yellow"
                    : "border-transparent text-chalk hover:border-orange hover:text-yellow"
                }`}
              >
                <span className="data text-[10px] text-steel">{link.index}</span>
                <span className="label text-[12px]">{link.label}</span>
              </Link>
            );
          })}
          <Link href="/contact" className="tag tag-orange">
            Let&apos;s talk
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex min-h-11 min-w-11 items-center justify-center border-2 border-chalk text-chalk md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t-2 border-line-dark bg-tar md:hidden"
      >
        <nav aria-label="Mobile" className="shell py-4">
          {navLinks.map((link) => {
            const isActive = isLinkActive(link.href, pathname);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={`flex min-h-14 items-center gap-4 border-b border-line-dark transition-colors ${
                  isActive ? "text-yellow" : "text-chalk hover:text-yellow"
                }`}
              >
                <span className="data text-steel">{link.index}</span>
                <span className="label text-[13px]">{link.label}</span>
                <span className="ml-auto text-orange" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="tag tag-orange mt-5 w-full"
          >
            Let&apos;s talk
          </Link>
        </nav>
      </div>
    </header>
  );
}
