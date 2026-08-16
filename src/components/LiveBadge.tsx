"use client";

export default function LiveBadge({ href, className }: { href: string; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-[3px] text-[11px] font-medium tracking-wide no-underline ${className ?? ""}`}
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
    </a>
  );
}
