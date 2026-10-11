"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX;

      if (diff > 50) {
        setMenuOpen(false);
      }
    };

    menu.addEventListener("touchstart", handleTouchStart);
    menu.addEventListener("touchend", handleTouchEnd);

    return () => {
      menu.removeEventListener("touchstart", handleTouchStart);
      menu.removeEventListener("touchend", handleTouchEnd);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [menuOpen]);

  return (
    <header
      className="sticky top-0 bg-canvas"
      style={{ zIndex: "var(--z-header)", height: "64px" }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Brand: brand-dot + wordmark */}
        <Link href="/" className="flex items-center gap-2 text-on-primary">
          <span
            className="inline-block rounded-full bg-brand"
            style={{ width: "12px", height: "12px" }}
          />
          <span className="type-heading-sm text-on-primary">DE&lt;<span className="text-signal">AI</span>&gt;DEV</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="type-button-lg text-on-primary transition-colors hover:text-ash"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary">
            Let&apos;s Talk
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-on-primary md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ zIndex: "var(--z-menu)" }}
      >
        <nav className="bg-canvas px-6 py-4 border-t border-hairline-soft">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 min-h-[44px] flex items-center type-button-lg text-on-primary transition-colors hover:text-ash"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="btn-primary mt-4 block w-full text-center min-h-[48px]"
          >
            Let&apos;s Talk
          </Link>
        </nav>
      </div>
    </header>
  );
}
