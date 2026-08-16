"use client";

function ExternalArrowIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M17 7H9M17 7V15" />
    </svg>
  );
}

export default function LiveBadge({ href, className }: { href: string; className?: string }) {
  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 ${className ?? ""}`}>
      <span
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-[3px] text-[11px] font-medium tracking-wide"
        style={{
          color: "var(--color-accent-green)",
          backgroundColor: "color-mix(in srgb, var(--color-accent-green) 18%, transparent)",
        }}
      >
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full"
          style={{ background: "var(--color-accent-green)" }}
          aria-hidden="true"
        />
        LIVE
      </span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-[3px] text-[11px] font-medium no-underline"
        style={{ borderColor: "var(--color-accent-green)", color: "var(--color-accent-green)" }}
      >
        <span className="hidden sm:inline">바로가기</span>
        <ExternalArrowIcon />
      </a>
    </span>
  );
}
