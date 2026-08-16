import { stackGroups } from "@/lib/data";
import SectionTitle from "./SectionTitle";

function StackChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center whitespace-nowrap rounded-full bg-chip-bg px-3 py-[5px] text-[12.5px] font-medium text-chip-text">
      {label}
    </span>
  );
}

export default function Stack() {
  return (
    <section id="stack-section" className="border-t border-border-2 px-6 py-[clamp(50px,8vw,90px)] sm:px-10 lg:px-20">
      <div className="mx-auto max-w-[1080px]">
        <SectionTitle number="03">Stack</SectionTitle>
        <div className="grid grid-cols-1 gap-[clamp(20px,3vw,32px)] min-[680px]:grid-cols-2 lg:grid-cols-4">
          {stackGroups.map((group) => (
            <div key={group.label}>
              <div className="mb-2.5 text-[13px] font-medium text-muted-2">{group.label}</div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <StackChip key={item} label={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
