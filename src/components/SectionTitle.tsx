import type { ReactNode } from "react";

export default function SectionTitle({ number, children }: { number: string; children: ReactNode }) {
  return (
    <h2 className="m-0 mb-[clamp(24px,4vw,36px)] flex items-baseline gap-2.5 text-[clamp(20px,3vw,26px)] font-medium text-text">
      <span className="text-[12px] font-medium tracking-wide text-muted-2">{number}</span>
      {children}
    </h2>
  );
}
