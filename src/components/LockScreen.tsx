"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { about } from "@/lib/data";

const BLOCK_COLORS = ["#8250df", "#0891b2", "#16a34a", "#d97706", "#db2777"];

type CodeBlock = {
  top: string;
  left: string;
  width: string;
  background: string;
};

function buildCodeBlocks(): CodeBlock[] {
  const rows = 26;
  return Array.from({ length: rows }, (_, i) => ({
    top: `${2 + i * 3.6}%`,
    left: `${(i % 5) * 3.2}%`,
    width: `${14 + ((i * 37) % 40)}%`,
    background: BLOCK_COLORS[i % BLOCK_COLORS.length],
  }));
}

export default function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [unlocking, setUnlocking] = useState(false);
  const codeBlocks = useMemo(() => buildCodeBlocks(), []);

  const triggerUnlock = () => {
    if (unlocking) return;
    setUnlocking(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") triggerUnlock();
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-[#eceef1] to-[#dcdee3] p-4 sm:p-8 md:p-12">
      <motion.div
        className="flex w-[min(920px,94vw,90vh)] origin-center flex-col items-center"
        style={{ filter: "drop-shadow(0 40px 70px rgba(20,20,30,0.28))" }}
        animate={
          unlocking
            ? { opacity: 0, scale: 2.1, filter: "blur(10px)" }
            : { opacity: 1, scale: 1, filter: "blur(0px)" }
        }
        transition={{ duration: 0.7, ease: "easeOut" }}
        onAnimationComplete={() => {
          if (unlocking) onUnlock();
        }}
      >
        {/* laptop lid */}
        <div
          className="relative w-full rounded-[clamp(10px,1.6vw,20px)] p-[clamp(9px,1.6vw,16px)]"
          style={{
            aspectRatio: "16 / 10.1",
            background: "linear-gradient(155deg, #f1f1f3, #cfd0d4 45%, #bcbdc2)",
            boxShadow:
              "inset 0 0 0 1px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.08)",
          }}
        >
          {/* camera notch */}
          <div
            className="absolute top-0 left-1/2 z-10 h-[clamp(14px,2vw,20px)] w-[clamp(60px,11vw,100px)] -translate-x-1/2 rounded-b-[clamp(8px,1.4vw,12px)]"
            style={{ background: "#0c0c0e" }}
          />

          {/* screen */}
          <div className="relative h-full w-full overflow-hidden rounded-[clamp(4px,0.8vw,10px)] bg-black [container-type:size]">
            <div className="absolute inset-0 font-[var(--font-inter)]" style={{ background: "#f5f5f7" }}>
              {/* blurred background code pattern */}
              <div className="absolute -inset-[5%] opacity-90 blur-[9px]">
                {codeBlocks.map((block, i) => (
                  <div
                    key={i}
                    className="absolute h-[9px] rounded"
                    style={{
                      top: block.top,
                      left: block.left,
                      width: block.width,
                      background: block.background,
                      opacity: 0.8,
                    }}
                  />
                ))}
              </div>

              {/* lock content */}
              <div className="relative z-[2] flex h-full flex-col items-center justify-center gap-[clamp(1px,1cqh,5px)] overflow-hidden p-0.5 text-center">
                <div
                  className="flex h-[clamp(20px,11cqh,42px)] w-[clamp(20px,11cqh,42px)] shrink-0 items-center justify-center rounded-full text-white"
                  style={{
                    background: "linear-gradient(135deg, #8250df, #db2777)",
                    fontSize: "clamp(9px, 5.5cqh, 15px)",
                    fontWeight: 500,
                    boxShadow: "0 12px 28px rgba(20,20,30,0.18)",
                  }}
                >
                  {about.avatarInitial}
                </div>

                <div
                  className="shrink-0 text-[#1a1a1a]"
                  style={{ fontSize: "clamp(10px, 4.4cqh, 14px)", fontWeight: 500, letterSpacing: "0.2px" }}
                >
                  {about.shortName}
                </div>

                <div
                  className="shrink-0 font-light"
                  style={{ fontSize: "clamp(10px, 2.6cqh, 12px)", color: "rgba(26,26,26,0.55)" }}
                >
                  {about.role}
                </div>

                <div
                  className="flex shrink-0 items-center gap-1 rounded-full border border-black/[0.08] pl-3"
                  style={{
                    width: "min(190px, 66%)",
                    padding: "2px 3px 2px 12px",
                    background: "rgba(255,255,255,0.6)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    boxShadow: "0 4px 16px rgba(20,20,30,0.08)",
                  }}
                >
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="암호"
                    aria-label="암호 입력"
                    className="min-w-0 flex-1 border-none bg-transparent p-0 text-[#1a1a1a] outline-none"
                    style={{ fontSize: "clamp(8px, 4cqh, 12px)", lineHeight: 1 }}
                  />
                  <button
                    type="button"
                    onClick={triggerUnlock}
                    aria-label="잠금 해제"
                    className="flex shrink-0 cursor-pointer items-center justify-center rounded-full border-none text-white focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
                    style={{
                      width: "clamp(14px, 8cqh, 20px)",
                      height: "clamp(14px, 8cqh, 20px)",
                      background: "#8250df",
                    }}
                  >
                    <svg
                      width="60%"
                      height="60%"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 15l6-6 6 6" />
                    </svg>
                  </button>
                </div>

                <div
                  className="shrink-0 font-light"
                  style={{ fontSize: "clamp(8px, 1.8cqh, 9px)", color: "rgba(26,26,26,0.4)" }}
                >
                  아무 값이나 입력 후 Enter
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* hinge */}
        <div
          className="h-[clamp(3px,0.5vw,6px)] w-[96%] rounded-sm"
          style={{ background: "linear-gradient(180deg, #a9aaae, #d8d9dc)" }}
        />

        {/* base */}
        <div
          className="flex w-full items-start justify-center rounded-b-[clamp(14px,2.4vw,22px)]"
          style={{
            height: "clamp(12px, 2.4vw, 22px)",
            background: "linear-gradient(180deg, #dcdde1, #b7b8bd)",
            boxShadow:
              "inset 0 -3px 6px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.5)",
          }}
        >
          <div
            className="-mt-px h-[clamp(3px,0.6vw,5px)] w-[clamp(90px,18vw,180px)] rounded-b-md"
            style={{ background: "rgba(0,0,0,0.14)" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
