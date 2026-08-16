import { about, timelineStats } from "@/lib/data";

const summaryStats = [
  { count: timelineStats.projectCount, label: "프로젝트" },
  { count: timelineStats.awardCount, label: "수상" },
  { count: timelineStats.liveCount, label: "서비스 배포" },
].filter((stat) => stat.count > 0);

export default function Hero() {
  return (
    <section className="px-6 pt-[clamp(80px,16vw,160px)] pb-[clamp(50px,8vw,90px)] sm:px-10 lg:px-20">
      <div className="mx-auto max-w-[1080px]">
        <h1 className="m-0 text-[clamp(30px,5.5vw,52px)] font-bold tracking-[-0.5px] text-text">
          {about.heroTitle}
        </h1>
        <p className="m-0 mt-3 text-[clamp(15px,2.4vw,19px)] font-normal text-muted">
          {about.heroSubtitle}
        </p>
        {summaryStats.length > 0 && (
          <p className="m-0 mt-4 text-[13px] text-muted-2">
            {summaryStats.map((stat) => `${stat.count}개 ${stat.label}`).join(" · ")}
          </p>
        )}
      </div>
    </section>
  );
}
