import { about } from "@/lib/data";

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
      </div>
    </section>
  );
}
