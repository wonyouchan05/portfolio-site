import { timeline } from "@/lib/data";
import TimelineItem from "./TimelineItem";

export default function Timeline() {
  return (
    <section id="timeline-section" className="border-t border-border-2 bg-bg-alt px-6 py-[clamp(50px,8vw,90px)] sm:px-10 lg:px-20">
      <div className="mx-auto max-w-[1080px]">
        <h2 className="m-0 mb-[clamp(24px,4vw,36px)] text-[clamp(20px,3vw,26px)] font-medium text-text">
          Timeline
        </h2>
        <div className="flex flex-col">
          {timeline.map((entry, i) => (
            <TimelineItem key={entry.title} entry={entry} isLast={i === timeline.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
