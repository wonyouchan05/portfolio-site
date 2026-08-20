import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import ProjectNav from "@/components/ProjectNav";

export const metadata: Metadata = {
  title: "청소년의 개인정보, 우리는 스스로 지키고 있는가? — 원유찬",
  description: "충청남도 통계포스터대회 출품작, 청소년 177명 3차 추적조사로 개인정보 보호의 인식-행동 격차를 증명한 통계 탐구 케이스 스터디.",
};

const STACK = ["통계", "설문설계", "3차 추적조사"];

const STAGES = [
  {
    title: "① 사전조사",
    desc: "개인정보 보호가 중요하다는 응답 95.0% vs 실제로 약관 동의 내용을 확인한다는 응답 37.4%. 인식과 행동의 격차를 먼저 확인.",
  },
  {
    title: "② 1차 설문",
    desc: "88.1%가 이용약관을 읽지 않고 동의한다고 응답. 이유 1위는 \"너무 길고 복잡해서\"(58.8%). 비밀번호는 66.7%가 \"내 비밀번호는 안전하다\"고 답했지만, 88.1%는 여러 사이트에서 같은 비밀번호를 재사용 중이었음.",
  },
  {
    title: "③ 카드뉴스 개입 → 2차 설문",
    desc: "팀이 직접 만든 카드뉴스(약관의 중요성, 비밀번호 취약성)를 본 뒤 재조사. \"약관을 읽지 않는다\" 응답 43%→6%로 감소, \"항상 읽는다\"는 12%→46%로 증가. 비밀번호 취약성 인식도 6%→15%로 상승.",
  },
  {
    title: "④ 3차 추적조사 (2주 후)",
    desc: "이 탐구의 핵심 발견: 83.1%가 비밀번호를 바꾸겠다고 답했지만, 2주 뒤 실제로 바꾼 사람은 12.5%(4명)뿐이었음. 안 바꾼 이유 대부분은 \"귀찮아서\". \"인식은 바뀌어도 행동은 잘 안 바뀐다\"는 것을 실측으로 확인.",
  },
];

const LIMITATIONS = [
  {
    title: "인과관계 특정의 어려움",
    desc: "카드뉴스에 피해사례와 해결책이 함께 담겨 있어, 정확히 어떤 요소 때문에 인식이 바뀌었는지 구분하기 어려워 '효과'가 아닌 '변화'로 표현.",
  },
  {
    title: "표본 불일치",
    desc: "2차 설문 그래프는 응답자의 사전·사후 비교이지만, 3차 추가설문은 별도 표본이라 일대일로 매칭되지 않음.",
  },
  {
    title: "표본의 한계",
    desc: "응답자 대다수가 중학생이라 모든 청소년으로 일반화하기 어려움.",
  },
];

function StackChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center whitespace-nowrap rounded-full bg-chip-bg px-3 py-[5px] text-[12.5px] font-medium text-chip-text">
      {label}
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

export default function StatsPosterCaseStudy() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <ProjectNav />

      {/* Header */}
      <header className="px-6 pt-[clamp(48px,8vw,80px)] pb-[clamp(40px,7vw,64px)] sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-[880px] flex-col gap-4">
          <h1 className="m-0 text-[clamp(28px,4.5vw,42px)] font-bold tracking-[-0.4px]">
            청소년의 개인정보, 우리는 스스로 지키고 있는가?
          </h1>

          <div className="flex items-center gap-2 text-[13.5px] font-medium">
            <span className="inline-flex items-center gap-1.5" style={{ color: "var(--color-accent-gray)" }}>
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--color-accent-gray)" }}
              />
              활동 완료
            </span>
            <span className="text-muted-2">·</span>
            <span className="text-muted">도대회 결과 발표 대기 (2026.09.01)</span>
          </div>

          <p className="m-0 max-w-[560px] text-[15.5px] leading-[1.7] text-body">
            청소년 177명을 3차에 걸쳐 추적 조사해, &ldquo;지켜야 한다는 걸 알면서도 왜 실제로는
            안 지키는지&rdquo; 인식과 행동 사이의 격차를 데이터로 증명한 통계 탐구.
          </p>

          <p className="m-0 max-w-[560px] text-[13.5px] leading-[1.7] text-muted">
            원유찬 · 최진우 (2인 팀)
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
              앱·사이트 가입 시 뜨는 약관 동의를 귀찮다는 이유로 넘긴 경험, 여러 사이트에 같은
              비밀번호를 써온 습관, 그러다 친구가 계정 해킹을 당한 일을 계기로 &ldquo;우리는
              정말 개인정보를 스스로 지키고 있는가&rdquo;라는 질문을 갖게 됐습니다.
            </p>
            <p className="m-0 text-[15.5px] leading-[1.75] text-body">
              조사 대상은 중학생 177명, 조사 기간은 2026.6.1~6.12, 구글 설문지로 진행했습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Survey design & results */}
      <section className="border-t border-border-2 px-6 py-[clamp(50px,8vw,90px)] sm:px-10 lg:px-20">
        <div className="mx-auto max-w-[880px]">
          <SectionHeading>조사 설계 및 결과 — 4단계</SectionHeading>
          <div className="flex flex-col gap-[clamp(20px,3vw,28px)]">
            {STAGES.map((stage, i) => (
              <div key={stage.title} className="flex gap-4">
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[13px] font-medium"
                  style={{ background: "var(--color-chip-bg)", color: "var(--color-accent-purple-text)" }}
                >
                  {i + 1}
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1.5 pt-0.5">
                  <h3 className="m-0 text-[16px] font-medium text-text">{stage.title}</h3>
                  <p className="m-0 text-[14.5px] leading-[1.7] text-muted">{stage.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Follow-up: AI tool */}
      <section className="border-t border-border-2 bg-bg-alt px-6 py-[clamp(50px,8vw,90px)] sm:px-10 lg:px-20">
        <div className="mx-auto max-w-[880px]">
          <SectionHeading>후속 활동 — AI 도구 제작</SectionHeading>
          <div className="flex max-w-[640px] flex-col gap-3.5">
            <p className="m-0 text-[15.5px] leading-[1.75] text-body">
              이 격차를 줄이기 위해 AI 요약기 &lsquo;약관 지킴이&rsquo;를 직접 제작했습니다.
              약관에서 필수 동의 항목과 선택 항목을 구분해 보여주며, 95.5%의 학생이 이런
              도구가 있으면 사용하겠다고 응답했습니다(이유 1위: &ldquo;핵심 내용을 빠르게
              파악할 수 있어서&rdquo; 85.9%).
            </p>
            <p className="m-0 text-[15.5px] leading-[1.75] text-body">
              비밀번호는 &ldquo;공통 비밀번호 앞에 사이트별 접두어를 붙이는&rdquo; 방식을
              대안으로 제시했습니다(예: 네이버 Na+공통번호, 유튜브 Yo+공통번호).
            </p>
          </div>
        </div>
      </section>

      {/* Limitations */}
      <section className="border-t border-border-2 px-6 py-[clamp(50px,8vw,90px)] sm:px-10 lg:px-20">
        <div className="mx-auto max-w-[880px]">
          <SectionHeading>스스로 인정한 한계</SectionHeading>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {LIMITATIONS.map((item) => (
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

      {/* Retrospective */}
      <section className="border-t border-border-2 bg-bg-alt px-6 py-[clamp(50px,8vw,90px)] sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-[880px] flex-col gap-6">
          <SectionHeading>결론 및 회고</SectionHeading>
          <div className="flex max-w-[640px] flex-col gap-3.5">
            <p
              className="m-0 border-l-2 pl-4 text-[15.5px] leading-[1.85] italic text-body"
              style={{ borderColor: "var(--color-accent-purple)" }}
            >
              &ldquo;무심코 한 번 누른 동의, 무심코 돌려쓴 비밀번호 하나가 개인정보 유출의
              시작이 될 수 있다는 것을 알게 되었다. 조사 결과, 청소년 대부분은 약관을 읽지
              않고 비밀번호를 재사용하는 습관을 가지고 있었다. 교육을 통해 인식은 변화했지만
              행동 변화는 아직 부족한 것 같다. 개인정보를 지키는 좋은 방법은 누구나 쉽게
              실천할 수 있도록 돕는 환경과 AI 기술을 함께 만드는 것이라고 생각한다.&rdquo;
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
