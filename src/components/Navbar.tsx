"use client";

import { useState } from "react";
import ThemeToggleButton from "./ThemeToggleButton";

const NAV_LINKS = [
  { href: "#timeline-section", label: "Timeline" },
  { href: "#stack-section", label: "Stack" },
  { href: "#about-section", label: "About" },
  { href: "#contact-section", label: "Contact" },
];

function MenuIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-20">
      <nav
        className="flex items-center justify-between gap-4 border-b border-border-2 bg-nav-bg px-5 py-3 backdrop-blur-md sm:px-10 sm:py-3.5"
        aria-label="주요 내비게이션"
      >
        <a
          href="#site-top"
          onClick={() => setMobileMenuOpen(false)}
          className="shrink-0 text-[13.5px] font-semibold text-text no-underline"
        >
          원유찬
        </a>

        <div className="hidden min-[680px]:flex items-center gap-5 lg:gap-6.5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-muted no-underline transition-colors hover:text-accent-purple"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <ThemeToggleButton />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="메뉴"
            aria-expanded={mobileMenuOpen}
            className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-text min-[680px]:hidden"
          >
            <MenuIcon />
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="sticky top-[52px] z-[19] flex flex-col gap-1 border-b border-border-2 bg-nav-bg px-5 pt-2.5 pb-4 backdrop-blur-md min-[680px]:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-[13px] font-medium text-muted no-underline transition-colors hover:text-accent-purple"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
