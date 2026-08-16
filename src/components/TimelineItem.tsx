"use client";

import { useId, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { TimelineEntry, TimelineLeaf } from "@/lib/data";
import { statusColor } from "@/lib/data";

function StatusBadge({ status }: { status: TimelineLeaf["status"] }) {
  const color = statusColor[status];
  return (
    <span
      className="inline-flex shrink-0 items-center rounded-full px-2.5 py-[3px] text-[11px] font-medium tracking-wide"
      style={{ color, backgroundColor: `color-mix(in srgb, ${color} 18%, transparent)` }}
    >
      {status}
    </span>
  );
}

function Chevron({ expanded }: { expanded: boolean }) {
  return (
    <svg
      className={`ml-auto shrink-0 text-muted-2 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function TagChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center whitespace-nowrap rounded-full bg-chip-bg px-3 py-[5px] text-[12.5px] font-medium text-chip-text">
      {label}
    </span>
  );
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.15-.02-2.09-3.17.69-3.84-1.35-3.84-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.05-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.16a10.9 10.9 0 0 1 5.74 0c2.19-1.47 3.15-1.16 3.15-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.81 1.17 3.05 0 4.37-2.67 5.33-5.21 5.62.41.36.77 1.07.77 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.2.66.79.55 4.51-1.51 7.77-5.76 7.77-10.78C23.02 5.24 18.27.5 12 .5z" />
    </svg>
  );
}

const expandTransition = { duration: 0.25, ease: [0.4, 0, 0.2, 1] as const };

function ExpandBody({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={expandTransition}
      className="overflow-hidden"
    >
      {children}
    </motion.div>
  );
}

function LeafRow({ leaf, nested = false }: { leaf: TimelineLeaf; nested?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const bodyId = useId();
  const HeadingTag = nested ? "h4" : "h3";

  return (
    <div
      className={
        nested
          ? "flex min-w-0 flex-1 flex-col gap-2 pt-0.5"
          : "flex min-w-0 flex-1 flex-col gap-2.5 rounded-[14px] border bg-card p-[clamp(14px,2.2vw,20px)] shadow-[0_2px_10px_rgba(20,20,30,0.04)]"
      }
      style={nested ? undefined : { borderColor: "var(--color-border)" }}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={bodyId}
        className="flex w-full min-w-0 cursor-pointer select-none items-center gap-2.5 border-none bg-transparent p-0 text-left"
      >
        <StatusBadge status={leaf.status} />
        {leaf.note && <span className="shrink-0 text-[11.5px] italic text-muted-2">{leaf.note}</span>}
        <HeadingTag className={`m-0 min-w-0 flex-1 truncate font-medium text-text ${nested ? "text-[15px]" : "text-[17px]"}`}>
          {leaf.title}
        </HeadingTag>
        <Chevron expanded={expanded} />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <ExpandBody>
            <div id={bodyId} className="flex flex-col gap-2.5 pb-0.5">
              <p className="m-0 text-[14px] leading-[1.6] text-muted">{leaf.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {leaf.tags.map((tag) => (
                  <TagChip key={tag} label={tag} />
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {leaf.caseStudyHref && (
                  <Link
                    href={leaf.caseStudyHref}
                    className="inline-flex w-fit items-center gap-1.5 self-start rounded-full px-4 py-2 text-[13.5px] font-medium text-white no-underline"
                    style={{ background: "var(--color-accent-purple)" }}
                  >
                    자세히 보기
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                )}
                {leaf.link && (
                  <a
                    href={leaf.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-2 self-start rounded-full border px-4 py-2 text-[13.5px] font-medium no-underline"
                    style={{ borderColor: "var(--color-accent-purple)", color: "var(--color-accent-purple)" }}
                  >
                    <GitHubIcon />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </ExpandBody>
        )}
      </AnimatePresence>
    </div>
  );
}

function GroupRow({ entry }: { entry: Extract<TimelineEntry, { isGroup: true }> }) {
  const [expanded, setExpanded] = useState(false);
  const bodyId = useId();

  return (
    <div
      className="flex min-w-0 flex-1 flex-col gap-2.5 rounded-[14px] border p-[clamp(14px,2.2vw,20px)] shadow-[0_2px_10px_rgba(20,20,30,0.04)]"
      style={{
        background: "var(--color-card)",
        borderColor: "rgba(130,80,223,0.33)",
        borderLeftColor: "var(--color-accent-purple)",
        borderLeftWidth: "3px",
      }}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={bodyId}
        className="flex w-full min-w-0 cursor-pointer select-none items-center gap-2.5 border-none bg-transparent p-0 text-left"
      >
        <StatusBadge status={entry.status} />
        <h3 className="m-0 min-w-0 flex-1 truncate text-[17px] font-medium text-text">{entry.title}</h3>
        <Chevron expanded={expanded} />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <ExpandBody>
            <div
              id={bodyId}
              className="flex flex-col gap-3.5 border-l-2 pb-0.5 pl-[clamp(10px,2vw,16px)]"
              style={{ borderColor: "rgba(130,80,223,0.2)" }}
            >
              {entry.children.map((child) => (
                <LeafRow key={child.title} leaf={child} nested />
              ))}
            </div>
          </ExpandBody>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TimelineItem({ entry, isLast }: { entry: TimelineEntry; isLast: boolean }) {
  const isGroup = "isGroup" in entry && entry.isGroup === true;

  return (
    <div className="mb-[clamp(14px,2.2vw,20px)] flex min-w-0 gap-3 sm:gap-5">
      <div className="w-14 shrink-0 pt-[3px] text-right text-[11px] leading-snug font-medium text-muted-2 sm:w-24 sm:text-[13px] sm:whitespace-nowrap lg:w-28">
        {entry.date}
      </div>

      <div className="flex w-3.5 shrink-0 flex-col items-center pt-1">
        <span
          className="box-border shrink-0 rounded-full"
          style={{
            width: isGroup ? "12px" : "10px",
            height: isGroup ? "12px" : "10px",
            background: isGroup ? "var(--color-accent-purple)" : "var(--color-bg)",
            border: `2px solid ${isGroup ? "var(--color-accent-purple)" : "var(--color-dot-border)"}`,
          }}
        />
        {!isLast && <span className="mt-0.5 w-0.5 flex-1 bg-line" />}
      </div>

      {isGroup ? (
        <GroupRow entry={entry as Extract<TimelineEntry, { isGroup: true }>} />
      ) : (
        <LeafRow leaf={entry as TimelineLeaf} />
      )}
    </div>
  );
}
