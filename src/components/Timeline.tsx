import { timeline } from "@/lib/data";
import TimelineItem from "./TimelineItem";
import SectionTitle from "./SectionTitle";

export default function Timeline() {
  return (
    <section id="timeline-section" className="border-t border-border-2 bg-bg-alt px-6 py-[clamp(50px,8vw,90px)] sm:px-10 lg:px-20">
      <div className="mx-auto max-w-[1080px]">
        <SectionTitle number="02">Timeline</SectionTitle>
        <div className="flex flex-col">
          {timeline.map((entry, i) => (
            <TimelineItem key={entry.title} entry={entry} isLast={i === timeline.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
