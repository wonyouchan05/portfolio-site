import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import ProjectNav from "@/components/ProjectNav";

export const metadata: Metadata = {
  title: "흐르는 물과 고인 물의 수질 비교 탐구 — 원유찬",
  description: "장재천 수계 정체수 구간을 중심으로, 흐르는 물과 고인 물의 수질을 직접 측정해 비교한 과학 동아리 탐구 케이스 스터디.",
};

const STACK = ["Arduino", "자작 센서", "가설 검증", "현장 측정"];

const POINTS = [
  { label: "물총새공원", sub: "상류" },
  { label: "징검다리", sub: "호수 유입부" },
  { label: "호수공원", sub: "고인 물" },
  { label: "천안천 합류부", sub: "하류" },
];

const HYPOTHESES = [
  "고인 물이 흐르는 물보다 수온·TDS가 더 높을 것이다.",
  "고인 물은 부유물이 가라앉아 흐르는 물보다 탁도가 더 낮을 것이다.",
  "고인 물에는 흐르는 물보다 미생물이 더 많을 것이다.",
];

const RELIABILITY_STEPS = [
  {
    title: "이동 시간 문제",
    desc: "혼자 4개 지점을 순서대로 돌면 이동에만 2~3시간이 걸려, 장소 차이와 시간 차이를 구분할 수 없다는 걸 깨달음. 동아리원 4명이 각 지점에 흩어져 동시에 측정하는 방식으로 전환.",
  },
  {
    title: "측정기 간 오차",
    desc: "매 측정 전 4대의 휴대용 측정기를 같은 물에 담가 기준기 대비 편차를 기록. 이후 그 편차보다 클 때만 지점 간 의미 있는 차이로 판단.",
  },
  {
    title: "미생물 관찰 실패와 재설계",
    desc: "1차 측정 때 루골 용액으로 시료를 고정했더니 48시간 뒤 생물이 가라앉고 배경만 진해져 관찰에 실패. 2차에서는 고정 없이 채취 당일 바로 관찰하는 방식으로 바꿈.",
  },
];

const RESULTS = [
  {
    title: "수온 — 예상과 반대로",
    desc: "고인 물이 더 따뜻할 거라 예상했지만, 1차 측정에서 호수공원이 4지점 중 가장 낮은 수온(24.0℃)이었음. 원인은 그 지점이 다리 아래라 애초에 햇빛이 거의 안 드는 곳이었기 때문 — \"고여있는지\"보다 \"햇빛이 드는지\"가 더 큰 변수였다는 걸 발견. 실제로 날씨가 맑았던 2차 측정에서는 같은 지점의 수온이 26.5℃로 순위가 바뀜.",
  },
  {
    title: "TDS — 통념과 반대",
    desc: "두 차례 모두 상류(물총새공원)가 가장 높고 하류로 갈수록 낮아짐 — \"도심을 지날수록 오염된다\"는 통념과 반대. 상류에 이끼·수초가 유독 많았다는 현장 관찰을 근거로, 식물성 유기물이 원인일 가능성을 추론.",
  },
  {
    title: "탁도 — 가설과 반대",
    desc: "두 차례 모두 호수가 유입부보다 탁하게 나와 가설과 반대. 다만 센서를 표준 용액으로 보정하지 않아 절대값은 신뢰할 수 없다고 스스로 판단, 관계만 기록하고 원인은 추정으로 남김.",
  },
  {
    title: "자작 센서 검증",
    desc: "2차 측정에서 아두이노 센서와 휴대용 측정기를 나란히 비교한 결과, 아두이노 값이 모든 지점에서 더 높게 나왔고 그 배율도 1.32배~2.43배로 지점마다 달랐음 — 지점 간 순서(크기 관계)는 일치했지만 절대값은 못 믿는다는 결론.",
  },
  {
    title: "미생물 — 검증 미완",
    desc: "호수공원에서 윤충을 확인했지만 개체수를 셀 계수판이 없어 정량 비교는 하지 못해, 가설 3은 검증하지 못한 채로 남음.",
  },
];

const LIMITATIONS = [
  "고인 물 지점이 하나뿐이라 값의 차이가 \"정체\" 때문인지 \"그 호수만의 특수성\" 때문인지 구분할 수 없음 → 근처 다른 고인 물 지점 추가 필요.",
  "탁도 센서를 보정하지 않음 → 다음엔 농도별 표준 용액으로 기준을 잡고 측정.",
  "1차(비 온 날)와 2차(맑은 날)의 날씨 조건이 달라 절대값을 직접 비교하기 어려움 → 같은 날씨 조건에서 반복측정 필요.",
];

function StackChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center whitespace-nowrap rounded-full bg-chip-bg px-3 py-[5px] text-[12.5px] font-medium text-chip-text">
      {label}
    </span>
  );
}

function DiagramBox({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-0.5 rounded-[10px] border border-border bg-card px-4 py-2.5 text-center">
      <span className="text-[13px] font-medium text-text">{label}</span>
      {sub && <span className="text-[11px] text-muted-2">{sub}</span>}
    </div>
  );
}

function DiagramArrow() {
  return (
    <span className="shrink-0 text-[15px] text-muted-2" aria-hidden="true">
      →
    </span>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="m-0 mb-[clamp(20px,3.4vw,28px)] text-[clamp(19px,2.6vw,23px)] font-medium text-text">
      {children}
    </h2>
  );
}

export default function WaterQualityStudyCaseStudy() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <ProjectNav />

      {/* Header */}
      <header className="px-6 pt-[clamp(48px,8vw,80px)] pb-[clamp(40px,7vw,64px)] sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-[880px] flex-col gap-4">
          <h1 className="m-0 text-[clamp(28px,4.5vw,42px)] font-bold tracking-[-0.4px]">
            흐르는 물과 고인 물의 수질 비교 탐구
          </h1>

          <p className="m-0 text-[15px] font-medium text-muted-2">
            장재천 수계의 정체수 구간을 중심으로
          </p>

          <div className="flex items-center gap-2 text-[13.5px] font-medium">
            <span className="inline-flex items-center gap-1.5" style={{ color: "var(--color-accent-green)" }}>
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--color-accent-green)" }}
              />
              완성
            </span>
            <span className="text-muted-2">·</span>
            <span className="text-muted">과학 동아리 활동 (2026.07)</span>
          </div>

          <p className="m-0 max-w-[560px] text-[15.5px] leading-[1.7] text-body">
            장재천 네 지점(상류→호수 유입부→고인 물→하류)에서 수질을 직접 측정해, &ldquo;고인
            물이 더 오염됐을 것&rdquo;이라는 예상이 실제로는 맞지 않다는 걸 확인한 탐구.
          </p>

          <p className="m-0 max-w-[560px] text-[13.5px] leading-[1.7] text-muted">
            원유찬 외 6명(윤성빈, 문준영, 하도형, 최성민, 김민준, 최지후) · 지도교사 이재은 선생님
          </p>

          <div className="flex flex-wrap gap-1.5">
            {STACK.map((item) => (
              <StackChip key={item} label={item} />
            ))}
          </div>
        </div>
      </header>

      {/* Problem */}
      <section className="border-t border-border-2 bg-bg-alt px-6 py-[clamp(50px,8vw,90px)] sm:px-10 lg:px-20">
        <div className="mx-auto max-w-[880px]">
          <SectionHeading>Problem</SectionHeading>
          <div className="flex max-w-[640px] flex-col gap-3.5">
            <p className="m-0 text-[15.5px] leading-[1.75] text-body">
              2학년 때 교내 생물 서식지 지도를 만들며 &ldquo;장소마다 사는 생물이 다르다&rdquo;는
              걸 발견했고, 무엇이 그 차이를 만드는지 궁금해져 하천 수질 탐구로 이어갔습니다.
            </p>
            <p className="m-0 text-[15.5px] leading-[1.75] text-body">
              원래는 상류·하류를 비교할 계획이었지만, &ldquo;하류로 갈수록 오염된다&rdquo;는 건
              이미 알려진 결론이라는 걸 자료 조사로 알게 됐습니다. 구간 중간의 호수공원(고인
              물)을 발견하면서, 질문을 &ldquo;같은 수계 안에서 흐르는 물과 고인 물은 수질에 어떤
              차이가 있는가?&rdquo;로 재설정했습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Study design */}
      <section className="border-t border-border-2 px-6 py-[clamp(50px,8vw,90px)] sm:px-10 lg:px-20">
        <div className="mx-auto max-w-[880px]">
          <SectionHeading>탐구 설계</SectionHeading>

          <div className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-3">
            {POINTS.map((point, i) => (
              <span key={point.label} className="flex items-center gap-2">
                <DiagramBox label={point.label} sub={point.sub} />
                {i < POINTS.length - 1 && <DiagramArrow />}
              </span>
            ))}
          </div>

          <div className="flex max-w-[640px] flex-col gap-3.5">
            <p className="m-0 text-[15.5px] leading-[1.75] text-body">
              TDS·수온은 휴대용 측정기 4대로 동시 측정하고, 탁도·pH는 아두이노로 직접 만든
              센서로 4개 지점을 순회하며 측정했습니다.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-2.5">
            <h3 className="m-0 text-[15px] font-medium text-text">세운 가설 3가지</h3>
            <ol className="m-0 flex flex-col gap-2 pl-5 text-[14.5px] leading-[1.7] text-muted">
              {HYPOTHESES.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Reliability process */}
      <section className="border-t border-border-2 bg-bg-alt px-6 py-[clamp(50px,8vw,90px)] sm:px-10 lg:px-20">
        <div className="mx-auto max-w-[880px]">
          <SectionHeading>측정 신뢰도를 위해 한 것</SectionHeading>
          <div className="flex flex-col gap-[clamp(20px,3vw,28px)]">
            {RELIABILITY_STEPS.map((step, i) => (
              <div key={step.title} className="flex gap-4">
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[13px] font-medium"
                  style={{ background: "var(--color-chip-bg)", color: "var(--color-accent-purple-text)" }}
                >
                  {i + 1}
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1.5 pt-0.5">
                  <h3 className="m-0 text-[16px] font-medium text-text">{step.title}</h3>
                  <p className="m-0 text-[14.5px] leading-[1.7] text-muted">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="border-t border-border-2 px-6 py-[clamp(50px,8vw,90px)] sm:px-10 lg:px-20">
        <div className="mx-auto max-w-[880px]">
          <SectionHeading>결과 — 예상과 다르게 나온 것들</SectionHeading>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {RESULTS.map((item) => (
              <div
                key={item.title}
                className="flex flex-col gap-2 rounded-[14px] border bg-card p-[clamp(14px,2.2vw,20px)] shadow-[0_2px_10px_rgba(20,20,30,0.04)]"
                style={{ borderColor: "var(--color-border)" }}
              >
                <h3 className="m-0 text-[15px] font-medium text-text">{item.title}</h3>
                <p className="m-0 text-[13.5px] leading-[1.65] text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Limitations */}
      <section className="border-t border-border-2 bg-bg-alt px-6 py-[clamp(50px,8vw,90px)] sm:px-10 lg:px-20">
        <div className="mx-auto max-w-[880px]">
          <SectionHeading>한계와 개선점</SectionHeading>
          <div className="flex max-w-[640px] flex-col gap-3">
            {LIMITATIONS.map((item) => (
              <div key={item} className="flex gap-3">
                <span
                  className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: "var(--color-accent-purple)" }}
                />
                <p className="m-0 text-[14.5px] leading-[1.7] text-muted">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Retrospective */}
      <section className="border-t border-border-2 px-6 py-[clamp(50px,8vw,90px)] sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-[880px] flex-col gap-6">
          <SectionHeading>결론 및 회고</SectionHeading>
          <div className="flex max-w-[640px] flex-col gap-3.5">
            <p
              className="m-0 border-l-2 pl-4 text-[15.5px] leading-[1.85] italic text-body"
              style={{ borderColor: "var(--color-accent-purple)" }}
            >
              &ldquo;이번 탐구에서 세운 가설은 대부분 그대로 확인되지 않았다. 처음에는 측정을
              잘못한 게 아닌지 의심했지만, 현장 기록을 다시 살펴보면서 흐름이라는 변수만
              생각하고 일조량이나 수초의 양 같은 다른 조건을 고려하지 못했다는 걸 알게 됐다.
              값이 예상과 다르게 나온 것보다, 그 이유를 찾는 과정에서 배운 것이 더 많았다. 또한
              측정값을 믿을 수 있게 만드는 일이 측정 자체보다 어렵다는 걸 느꼈다. 지점을
              순회하면 시간 차이가 생기고, 측정기를 여러 대 쓰면 기기 차이가 생긴다. 보정하지
              않은 센서는 숫자를 보여주지만 그 숫자가 무엇을 뜻하는지는 알려주지
              않는다.&rdquo;
            </p>
          </div>

          <Link
            href="/#timeline-section"
            className="inline-flex w-fit items-center gap-1.5 text-[13.5px] font-medium no-underline"
            style={{ color: "var(--color-accent-purple-text)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            Timeline로 돌아가기
          </Link>
        </div>
      </section>
    </div>
  );
}
