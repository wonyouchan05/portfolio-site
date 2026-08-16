import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import ProjectNav from "@/components/ProjectNav";

export const metadata: Metadata = {
  title: "suhaeng-app — 원유찬",
  description: "수행평가 크라우드소싱 웹앱 suhaeng-app 케이스 스터디.",
};

const STACK = ["Next.js", "TypeScript", "Tailwind", "Prisma", "Railway", "Claude API"];

const STEPS = [
  {
    title: "크라우드소싱 등록 구조 설계",
    desc: "학생이 직접 수행평가 정보(과목, 날짜, 채점기준)를 등록하면 같은 학년/반 학생들이 조회할 수 있는 구조. 관리자 코드 기반 인증으로 악용 방지.",
  },
  {
    title: "AI 기반 채점기준 자동 추출",
    desc: "채점기준표 사진을 찍어 올리면 Claude API(Vision)로 텍스트를 인식하고, 구조화된 JSON으로 변환해 카드뉴스 형태로 보기 좋게 정리. 이미지 인식 정확도 문제로 Haiku에서 Sonnet으로 모델을 교체해 개선.",
  },
  {
    title: "배포 및 운영",
    desc: "Railway에 Next.js + PostgreSQL 배포, GitHub 연동으로 자동 배포 파이프라인 구성.",
  },
];

const ISSUES = [
  {
    title: "DATABASE_URL 설정 오류",
    desc: "placeholder 값과 실제 참조 값을 혼동해서 발생한 문제. Railway 환경변수를 다시 설정해 해결.",
  },
  {
    title: "Prisma 7 설정 이슈",
    desc: "새 config 파일 방식이 datasource URL에 명시적인 env() 헬퍼를 요구한다는 걸 확인하고 수정.",
  },
  {
    title: "포트 불일치",
    desc: "앱은 8080에서 실행 중인데 도메인은 3000으로 설정되어 있던 문제. 포트 설정을 일치시켜 해결.",
  },
  {
    title: "이미지 인식 정확도",
    desc: "채점기준표의 체크박스 인식 오류. Claude Haiku에서 Sonnet으로 모델을 교체해 정확도 개선.",
  },
];

function StackChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center whitespace-nowrap rounded-full bg-chip-bg px-3 py-[5px] text-[12.5px] font-medium text-chip-text">
      {label}
    </span>
  );
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.15-.02-2.09-3.17.69-3.84-1.35-3.84-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.05-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.16a10.9 10.9 0 0 1 5.74 0c2.19-1.47 3.15-1.16 3.15-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.81 1.17 3.05 0 4.37-2.67 5.33-5.21 5.62.41.36.77 1.07.77 2.15 0 1.55-.01 2.8-.01 3.18 0 .3.2.66.79.55 4.51-1.51 7.77-5.76 7.77-10.78C23.02 5.24 18.27.5 12 .5z" />
    </svg>
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

function DiagramArrow({ vertical = false }: { vertical?: boolean }) {
  return (
    <span className="shrink-0 text-[15px] text-muted-2" aria-hidden="true">
      {vertical ? "↓" : "→"}
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

export default function SuhaengAppCaseStudy() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <ProjectNav />

      {/* Header */}
      <header className="px-6 pt-[clamp(48px,8vw,80px)] pb-[clamp(40px,7vw,64px)] sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-[880px] flex-col gap-4">
          <h1 className="m-0 text-[clamp(28px,4.5vw,42px)] font-bold tracking-[-0.4px]">
            suhaeng-app
          </h1>

          <div className="flex items-center gap-2 text-[13.5px] font-medium">
            <span className="inline-flex items-center gap-1.5" style={{ color: "var(--color-accent-green)" }}>
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--color-accent-green)" }}
              />
              완성
            </span>
            <span className="text-muted-2">·</span>
            <span className="text-muted">Railway 배포됨</span>
          </div>

          <p className="m-0 max-w-[560px] text-[15.5px] leading-[1.7] text-body">
            수행평가 크라우드소싱 웹앱. 학생들이 서로의 수행평가 자료를 공유하고 참고할 수 있는
            서비스.
          </p>

          <div className="flex flex-wrap gap-1.5">
            {STACK.map((item) => (
              <StackChip key={item} label={item} />
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="https://github.com/wonyouchan05/suhaeng-app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13.5px] font-medium no-underline"
              style={{ borderColor: "var(--color-accent-purple)", color: "var(--color-accent-purple)" }}
            >
              <GitHubIcon />
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Problem */}
      <section className="border-t border-border-2 bg-bg-alt px-6 py-[clamp(50px,8vw,90px)] sm:px-10 lg:px-20">
        <div className="mx-auto max-w-[880px]">
          <SectionHeading>Problem</SectionHeading>
          <p className="m-0 max-w-[640px] text-[15.5px] leading-[1.75] text-body">
            학교에서 수행평가 날짜와 채점 기준을 매번 헷갈리고 놓치는 문제를 직접 겪었습니다.
            선생님이 직접 입력해주는 구조는 현실적으로 기대하기 어려워서, 학생들이 스스로 정보를
            등록하고 공유하는 크라우드소싱 방식으로 접근했습니다.
          </p>
        </div>
      </section>

      {/* Solution process */}
      <section className="border-t border-border-2 px-6 py-[clamp(50px,8vw,90px)] sm:px-10 lg:px-20">
        <div className="mx-auto max-w-[880px]">
          <SectionHeading>해결 과정</SectionHeading>
          <div className="flex flex-col gap-[clamp(20px,3vw,28px)]">
            {STEPS.map((step, i) => (
              <div key={step.title} className="flex gap-4">
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[13px] font-medium"
                  style={{ background: "var(--color-chip-bg)", color: "var(--color-accent-purple)" }}
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

      {/* Architecture */}
      <section className="border-t border-border-2 bg-bg-alt px-6 py-[clamp(50px,8vw,90px)] sm:px-10 lg:px-20">
        <div className="mx-auto max-w-[880px]">
          <SectionHeading>아키텍처</SectionHeading>
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
              <DiagramBox label="Next.js" sub="App Router" />
              <DiagramArrow />
              <DiagramBox label="API Routes" />
              <DiagramArrow />
              <DiagramBox label="Prisma" />
              <DiagramArrow />
              <DiagramBox label="PostgreSQL" />
            </div>

            <div className="flex flex-wrap items-center gap-x-2 gap-y-3 pl-0 sm:pl-[calc(clamp(14px,2.2vw,20px)*4.4)]">
              <DiagramArrow vertical />
              <DiagramBox label="Claude API" sub="Vision — 채점기준 OCR + 학습가이드 생성" />
            </div>

            <div className="pt-1">
              <DiagramBox label="Railway" sub="호스팅 + DB + 자동배포" />
            </div>
          </div>
        </div>
      </section>

      {/* Issues */}
      <section className="border-t border-border-2 px-6 py-[clamp(50px,8vw,90px)] sm:px-10 lg:px-20">
        <div className="mx-auto max-w-[880px]">
          <SectionHeading>운영 중 겪은 문제</SectionHeading>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ISSUES.map((issue) => (
              <div
                key={issue.title}
                className="flex flex-col gap-2 rounded-[14px] border bg-card p-[clamp(14px,2.2vw,20px)] shadow-[0_2px_10px_rgba(20,20,30,0.04)]"
                style={{ borderColor: "var(--color-border)" }}
              >
                <h3 className="m-0 text-[15px] font-medium text-text">{issue.title}</h3>
                <p className="m-0 text-[13.5px] leading-[1.65] text-muted">{issue.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Retrospective */}
      <section className="border-t border-border-2 bg-bg-alt px-6 py-[clamp(50px,8vw,90px)] sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-[880px] flex-col gap-6">
          <SectionHeading>회고</SectionHeading>
          <p className="m-0 max-w-[640px] text-[15.5px] leading-[1.75] text-body">
            &ldquo;AI가 다 짜준 코드&rdquo;가 아니라, 에러 로그를 직접 읽고 원인을 좁혀가는
            과정을 배운 프로젝트입니다. 특히 배포 환경(Railway)과 로컬 환경의 차이에서 오는
            문제들을 하나씩 진단하고 고치면서 실제 서비스 운영 감각을 익혔습니다.
          </p>

          <Link
            href="/#timeline-section"
            className="inline-flex w-fit items-center gap-1.5 text-[13.5px] font-medium no-underline"
            style={{ color: "var(--color-accent-purple)" }}
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
