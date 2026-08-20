import Link from "next/link";
import ThemeToggleButton from "./ThemeToggleButton";
import FeedbackWidget from "./FeedbackWidget";

export default function ProjectNav() {
  return (
    <>
      <nav
        className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-border-2 bg-nav-bg px-5 py-3 backdrop-blur-md sm:px-10 sm:py-3.5"
        aria-label="프로젝트 페이지 내비게이션"
      >
        <Link
          href="/#timeline-section"
          className="inline-flex shrink-0 items-center gap-1.5 text-[13.5px] font-medium text-muted no-underline transition-colors hover:text-accent-purple-text"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          원유찬
        </Link>
        <ThemeToggleButton />
      </nav>
      <FeedbackWidget />
    </>
  );
}
