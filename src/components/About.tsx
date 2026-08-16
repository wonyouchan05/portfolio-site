import { about } from "@/lib/data";

export default function About() {
  return (
    <section id="about-section" className="border-t border-border-2 px-6 py-[clamp(50px,8vw,90px)] sm:px-10 lg:px-20">
      <div className="mx-auto max-w-[1080px]">
        <h2 className="m-0 mb-[clamp(24px,4vw,36px)] text-[clamp(20px,3vw,26px)] font-medium text-text">
          About
        </h2>
        <div className="flex max-w-[640px] flex-col gap-3.5">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph} className="m-0 text-[15.5px] leading-[1.75] text-body">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
