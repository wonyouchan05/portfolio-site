export type TimelineStatus = "제출" | "수상" | "진행중" | "완성" | "이용약관 테마";

export type TimelineLeaf = {
  date: string;
  title: string;
  status: TimelineStatus;
  note?: string;
  desc: string;
  tags: string[];
  link?: string;
  caseStudyHref?: string;
  liveUrl?: string;
};

export type TimelineGroup = {
  date: string;
  title: string;
  status: TimelineStatus;
  isGroup: true;
  children: TimelineLeaf[];
};

export type TimelineEntry = (TimelineLeaf & { isGroup?: false }) | TimelineGroup;

export const timeline: TimelineEntry[] = [
  {
    date: "2025.05–06",
    title: "교내 수학 통계포스터",
    status: "제출",
    desc: '"청소년 불법 사이트 이용 실태"를 주제로 쌍용중 104명 대상 직접 설문조사 수행. 원유찬·최진우 2인 팀. 가설을 세우고 데이터로 검증하는 이 경험이, 이후 개발한 서비스들에서 사용자 문제를 파악하는 방식의 출발점이 됨.',
    tags: ["통계", "설문조사"],
  },
  {
    isGroup: true,
    date: "2025.07 – 진행중",
    title: "이용약관 문제를 계속 파고든 프로젝트들",
    status: "이용약관 테마",
    children: [
      {
        date: "2025.07–09",
        title: "AWS PartyRock 경진대회",
        status: "수상",
        desc: "최우수상 수상. 'Terms Guardian' — 이용약관의 위험 조항을 자동으로 분석해주는 AI 앱 제작.",
        tags: ["PartyRock", "AWS", "최우수상"],
      },
      {
        date: "2025.07–09",
        title: "LG AI Youth Camp",
        status: "수상",
        desc: "인재상 수상. 이용약관을 드래그+우클릭으로 요약해주는 크롬 확장 프로그램 제작(Node.js/Express + OpenAI API). 우수 성과로 LG 홍보영상 나레이션 참여. Global Innovation Race(UC Berkeley)에 참가해 'AI Nurse' 프로토타입 제작.",
        tags: ["인재상", "Chrome Extension", "Node.js"],
      },
      {
        date: "2026.03–현재",
        title: "충청남도 통계포스터대회",
        status: "완성",
        desc: "청소년 개인정보 보호와 이용약관 확인 습관을 주제로 177명 설문, 사전/사후 카드뉴스 개입 설계, 대응표본 t검정으로 분석. 이용약관이라는 관심사를 앱으로 만드는 데서 그치지 않고, 실제로 사람들의 습관이 바뀌는지까지 데이터로 검증한 프로젝트. 천안 예선 통과 후 현재 도대회 결과 대기 중.",
        tags: ["통계", "대응표본 t검정"],
      },
    ],
  },
  {
    date: "2025.08–09",
    title: "순천 AI 아이디어 공모전",
    status: "제출",
    desc: "3인 팀으로 '잡월드 진로 도우미 AI(Career Quest Field)' 기획. 진로 체험 후 탐색이 단절되는 문제를 AI로 해결하는 서비스 제안, 제출 완료.",
    tags: ["기획", "AI Ideation"],
  },
  {
    date: "2025.09",
    title: "공주대학교 총장상",
    status: "수상",
    desc: "정보 관련 대회에서 수상.",
    tags: ["수상"],
  },
  {
    date: "2026.04–07",
    title: "수질 비교 프로젝트",
    status: "완성",
    desc: "아두이노 자율동아리를 결성해 TDS·탁도 센서를 직접 제작, 흐르는 물과 고인 물의 수질을 비교하는 프로젝트 진행 중. 소프트웨어뿐 아니라 하드웨어로 직접 측정하고 검증하는 실행력을 보여주는 프로젝트.",
    tags: ["Arduino", "센서", "자율동아리"],
  },
  {
    date: "2026.06–08",
    title: "suhaeng-app",
    status: "완성",
    desc: "수행평가 크라우드소싱 웹앱. 학생들이 서로의 수행평가 자료를 공유하고 참고할 수 있는 서비스.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Prisma", "Railway"],
    link: "https://github.com/wonyouchan05/suhaeng-app",
    caseStudyHref: "/projects/suhaeng-app",
    liveUrl: "https://suhaeng-app-production.up.railway.app/",
  },
];

function flattenTimeline(entries: TimelineEntry[]): TimelineLeaf[] {
  return entries.flatMap((entry) => ("isGroup" in entry && entry.isGroup ? entry.children : [entry]));
}

export const timelineLeaves: TimelineLeaf[] = flattenTimeline(timeline);

export const timelineStats = {
  projectCount: timelineLeaves.length,
  awardCount: timelineLeaves.filter((leaf) => leaf.status === "수상").length,
  liveCount: timelineLeaves.filter((leaf) => !!leaf.liveUrl).length,
};

export type StackGroup = {
  label: string;
  items: string[];
};

export const stackGroups: StackGroup[] = [
  { label: "Frontend", items: ["Next.js", "TypeScript", "Tailwind"] },
  { label: "Backend / DB", items: ["Prisma"] },
  { label: "Infra", items: ["Railway"] },
  { label: "Tools", items: ["Claude Code", "Git"] },
];

export const about = {
  name: "원유찬",
  shortName: "원유찬",
  avatarInitial: "원",
  role: "AI/SW 창업 준비생",
  heroTitle: "안녕하세요, 원유찬입니다",
  heroSubtitle: "AI/SW 창업을 준비하는 중3 개발자입니다",
  paragraphs: [
    "중학교 3학년이며, 충청남도과학고등학교 입시를 준비하고 있습니다. 장래희망은 AI/소프트웨어 분야 창업이고, 스스로 문제를 정의하고 직접 만드는 과정에 관심이 많습니다. Claude Code로 바이브코딩을 하며 Next.js, TypeScript, Tailwind 등 실제 서비스 개발 스택을 익혔습니다.",
    "이용약관·개인정보라는 하나의 문제의식을 PartyRock, LG AI Youth Camp, 통계포스터대회까지 여러 방식으로 계속 파고들어 온 것처럼, 관심 있는 문제를 여러 각도로 탐구하는 걸 좋아합니다.",
    "코딩뿐 아니라 통계·설문조사 같은 데이터 기반 접근도 함께 병행하며, 아이디어를 검증하는 과정 자체를 중요하게 생각합니다.",
  ],
};

export const contact = {
  email: "wonchan@example.com",
  github: "https://github.com/wonyouchan05",
};

export const statusColor: Record<TimelineStatus, string> = {
  수상: "var(--color-accent-gold)",
  진행중: "var(--color-accent-blue)",
  완성: "var(--color-accent-green)",
  "이용약관 테마": "var(--color-accent-purple)",
  제출: "var(--color-accent-gray)",
};
