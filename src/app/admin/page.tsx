"use client";

import { useEffect, useState, type FormEvent } from "react";
import ThemeToggleButton from "@/components/ThemeToggleButton";

type FeedbackTypeValue = "BUG" | "FEATURE" | "OTHER";

type FeedbackItem = {
  id: string;
  type: FeedbackTypeValue;
  content: string;
  author: string | null;
  createdAt: string;
};

const TYPE_META: Record<FeedbackTypeValue, { label: string; color: string }> = {
  BUG: { label: "버그 제보", color: "var(--color-accent-pink)" },
  FEATURE: { label: "기능 제안", color: "var(--color-accent-purple-text)" },
  OTHER: { label: "기타", color: "var(--color-accent-gray)" },
};

const FILTER_OPTIONS: { value: FeedbackTypeValue | "ALL"; label: string }[] = [
  { value: "ALL", label: "전체" },
  { value: "BUG", label: "버그 제보" },
  { value: "FEATURE", label: "기능 제안" },
  { value: "OTHER", label: "기타" },
];

const STORAGE_KEY = "admin_code";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function TypeBadge({ type }: { type: FeedbackTypeValue }) {
  const meta = TYPE_META[type];
  return (
    <span
      className="inline-flex shrink-0 items-center rounded-full px-2.5 py-[3px] text-[11px] font-medium tracking-wide"
      style={{ color: meta.color, backgroundColor: `color-mix(in srgb, ${meta.color} 18%, transparent)` }}
    >
      {meta.label}
    </span>
  );
}

function CodeGate({ onVerified }: { onVerified: (code: string) => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!code.trim() || checking) return;
    setChecking(true);
    setError(null);
    try {
      const res = await fetch("/api/feedback", { headers: { "x-admin-code": code } });
      if (res.status === 401) {
        setError("코드가 올바르지 않아요.");
        return;
      }
      if (!res.ok) throw new Error("failed");
      sessionStorage.setItem(STORAGE_KEY, code);
      onVerified(code);
    } catch {
      setError("확인 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-6 text-text">
      <form onSubmit={handleSubmit} className="flex w-full max-w-[340px] flex-col gap-4">
        <div className="flex flex-col gap-1.5 text-center">
          <h1 className="m-0 text-[19px] font-medium text-text">관리자 확인</h1>
          <p className="m-0 text-[13.5px] text-muted">관리자 코드를 입력해주세요.</p>
        </div>
        <input
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="관리자 코드"
          aria-label="관리자 코드"
          autoFocus
          className="rounded-[10px] border bg-card px-3 py-2.5 text-[14px] text-text outline-none"
          style={{ borderColor: "var(--color-border)" }}
        />
        {error && (
          <p className="m-0 text-center text-[13px]" style={{ color: "var(--color-accent-pink)" }}>
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={!code.trim() || checking}
          className="cursor-pointer rounded-full border-none px-4 py-2.5 text-[14px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          style={{ background: "var(--color-accent-purple)" }}
        >
          {checking ? "확인 중..." : "확인"}
        </button>
      </form>
    </div>
  );
}

function FeedbackInbox({ code, onLogout }: { code: string; onLogout: () => void }) {
  const [items, setItems] = useState<FeedbackItem[] | null>(null);
  const [filter, setFilter] = useState<FeedbackTypeValue | "ALL">("ALL");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/feedback", { headers: { "x-admin-code": code } });
      if (!res.ok) throw new Error("failed");
      const data = (await res.json()) as { feedback: FeedbackItem[] };
      setItems(data.feedback);
    } catch {
      setError("피드백을 불러오지 못했어요.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = items?.filter((item) => filter === "ALL" || item.type === filter) ?? [];

  return (
    <div className="min-h-screen bg-bg text-text">
      <nav className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-border-2 bg-nav-bg px-5 py-3 backdrop-blur-md sm:px-10 sm:py-3.5">
        <span className="text-[13.5px] font-medium text-text">관리자</span>
        <div className="flex items-center gap-2">
          <ThemeToggleButton />
          <button
            type="button"
            onClick={onLogout}
            className="cursor-pointer rounded-full border-none bg-transparent text-[13px] font-medium text-muted"
          >
            로그아웃
          </button>
        </div>
      </nav>

      <div className="mx-auto flex max-w-[880px] flex-col gap-6 px-6 py-[clamp(32px,6vw,56px)] sm:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="m-0 text-[clamp(20px,3vw,26px)] font-medium text-text">피드백함</h1>
          <button
            type="button"
            onClick={load}
            className="cursor-pointer rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium text-muted"
            style={{ borderColor: "var(--color-border)" }}
          >
            새로고침
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {FILTER_OPTIONS.map((opt) => {
            const active = filter === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setFilter(opt.value)}
                className="cursor-pointer rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium"
                style={
                  active
                    ? { borderColor: "var(--color-accent-purple)", background: "var(--color-chip-bg)", color: "var(--color-accent-purple-text)" }
                    : { borderColor: "var(--color-border)", color: "var(--color-muted)" }
                }
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {loading && <p className="m-0 text-[14px] text-muted">불러오는 중...</p>}
        {error && (
          <p className="m-0 text-[14px]" style={{ color: "var(--color-accent-pink)" }}>
            {error}
          </p>
        )}
        {!loading && !error && filtered.length === 0 && (
          <p className="m-0 text-[14px] text-muted">아직 피드백이 없어요.</p>
        )}

        <div className="flex flex-col gap-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2.5 rounded-[14px] border bg-card p-[clamp(14px,2.2vw,20px)] shadow-[0_2px_10px_rgba(20,20,30,0.04)]"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div className="flex flex-wrap items-center gap-2">
                <TypeBadge type={item.type} />
                <span className="text-[12px] text-muted-2">{formatDate(item.createdAt)}</span>
                <span className="text-[12px] text-muted-2">·</span>
                <span className="text-[12px] text-muted-2">{item.author || "익명"}</span>
              </div>
              <p className="m-0 whitespace-pre-wrap text-[14.5px] leading-[1.7] text-body">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [code, setCode] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    setCode(sessionStorage.getItem(STORAGE_KEY));
  }, []);

  if (code === undefined) return null;

  if (!code) {
    return <CodeGate onVerified={(c) => setCode(c)} />;
  }

  return (
    <FeedbackInbox
      code={code}
      onLogout={() => {
        sessionStorage.removeItem(STORAGE_KEY);
        setCode(null);
      }}
    />
  );
}
