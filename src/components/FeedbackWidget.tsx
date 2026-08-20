"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

type FeedbackTypeValue = "BUG" | "FEATURE" | "OTHER";

const TYPE_OPTIONS: { value: FeedbackTypeValue; label: string }[] = [
  { value: "BUG", label: "버그 제보" },
  { value: "FEATURE", label: "기능 제안" },
  { value: "OTHER", label: "기타" },
];

function BubbleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<FeedbackTypeValue>("FEATURE");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      setType("FEATURE");
      setContent("");
      setAuthor("");
      setError(null);
      setSent(false);
    }, 250);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim() || submitting) return;

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, content, author: author.trim() || undefined }),
      });
      if (!res.ok) throw new Error("failed");
      setSent(true);
    } catch {
      setError("전송에 실패했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="건의하기"
        className="fixed right-4 bottom-4 z-40 flex cursor-pointer items-center gap-1.5 rounded-full border-none px-4 py-2.5 text-[13px] font-medium text-white shadow-[0_8px_24px_rgba(20,20,30,0.22)] transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
        style={{ background: "var(--color-accent-purple)" }}
      >
        <BubbleIcon />
        건의하기
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex w-full max-w-[420px] flex-col gap-4 rounded-[16px] border bg-card p-[clamp(18px,4vw,24px)] shadow-[0_20px_60px_rgba(20,20,30,0.28)]"
              style={{ borderColor: "var(--color-border)" }}
            >
              {sent ? (
                <div className="flex flex-col items-center gap-3 py-6 text-center">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-full"
                    style={{ background: "var(--color-chip-bg)", color: "var(--color-accent-green)" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <p className="m-0 text-[15px] font-medium text-text">전달됐어요. 감사합니다!</p>
                  <button
                    type="button"
                    onClick={close}
                    className="mt-1 cursor-pointer rounded-full border-none px-4 py-2 text-[13px] font-medium text-white"
                    style={{ background: "var(--color-accent-purple)" }}
                  >
                    닫기
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="m-0 text-[17px] font-medium text-text">건의하기</h2>
                    <button
                      type="button"
                      onClick={close}
                      aria-label="닫기"
                      className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-muted-2"
                    >
                      <CloseIcon />
                    </button>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="feedback-type" className="text-[12.5px] font-medium text-muted">
                      유형
                    </label>
                    <select
                      id="feedback-type"
                      value={type}
                      onChange={(e) => setType(e.target.value as FeedbackTypeValue)}
                      className="rounded-[10px] border bg-bg px-3 py-2 text-[14px] text-text outline-none"
                      style={{ borderColor: "var(--color-border)" }}
                    >
                      {TYPE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="feedback-content" className="text-[12.5px] font-medium text-muted">
                      내용
                    </label>
                    <textarea
                      id="feedback-content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                      rows={4}
                      maxLength={2000}
                      placeholder="어떤 점이 불편했는지, 어떤 기능이 있으면 좋을지 자유롭게 적어주세요."
                      className="resize-none rounded-[10px] border bg-bg px-3 py-2 text-[14px] leading-[1.6] text-text outline-none"
                      style={{ borderColor: "var(--color-border)" }}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="feedback-author" className="text-[12.5px] font-medium text-muted">
                      이름 <span className="text-muted-2">(선택, 비워두면 익명)</span>
                    </label>
                    <input
                      id="feedback-author"
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      maxLength={60}
                      placeholder="익명"
                      className="rounded-[10px] border bg-bg px-3 py-2 text-[14px] text-text outline-none"
                      style={{ borderColor: "var(--color-border)" }}
                    />
                  </div>

                  {error && (
                    <p className="m-0 text-[13px]" style={{ color: "var(--color-accent-pink)" }}>
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={!content.trim() || submitting}
                    className="cursor-pointer rounded-full border-none px-4 py-2.5 text-[14px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ background: "var(--color-accent-purple)" }}
                  >
                    {submitting ? "보내는 중..." : "보내기"}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
