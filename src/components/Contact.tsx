import { contact } from "@/lib/data";

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.15-.02-2.09-3.17.69-3.84-1.35-3.84-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.05-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.16a10.9 10.9 0 0 1 5.74 0c2.19-1.47 3.15-1.16 3.15-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.81 1.17 3.05 0 4.37-2.67 5.33-5.21 5.62.41.36.77 1.07.77 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.2.66.79.55 4.51-1.51 7.77-5.76 7.77-10.78C23.02 5.24 18.27.5 12 .5z" />
    </svg>
  );
}

const pillClass =
  "inline-flex items-center gap-2 self-start rounded-full border px-4 py-2 text-[13.5px] font-medium no-underline";

export default function Contact() {
  return (
    <section
      id="contact-section"
      className="border-t border-border-2 bg-bg-alt px-6 py-[clamp(50px,8vw,90px)] sm:px-10 lg:px-20"
    >
      <div className="mx-auto max-w-[1080px]">
        <h2 className="m-0 mb-[clamp(24px,4vw,36px)] text-[clamp(20px,3vw,26px)] font-medium text-text">
          Contact
        </h2>
        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${contact.email}`}
            className={pillClass}
            style={{ borderColor: "var(--color-accent-purple)", color: "var(--color-accent-purple)" }}
          >
            Email
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className={pillClass}
            style={{ borderColor: "var(--color-accent-purple)", color: "var(--color-accent-purple)" }}
          >
            <GitHubIcon />
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
