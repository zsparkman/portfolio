"use client";

import Link from "next/link";
import posthog from "posthog-js";

const NAVY = "#1F3A5F";

type Tab = "resume" | "portfolio";

const tabBase =
  "inline-flex items-center justify-center gap-2 rounded border px-3 py-1.5 text-[13px] font-medium shadow-sm transition";
const tabInactive =
  "border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:text-slate-900";
const tabActive = "border-[#1F3A5F] bg-[#1F3A5F] text-white";

export function PageShell({
  activeTab,
  children,
}: {
  activeTab: Tab;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto min-h-screen max-w-[880px] bg-white px-8 py-12 text-[15px] leading-[1.5] text-slate-800 shadow-sm sm:px-12 sm:py-14 print:shadow-none">
      <header className="mb-7 border-b border-slate-300 pb-5 text-center">
        <h1
          className="text-[34px] font-bold uppercase tracking-[0.04em]"
          style={{ color: NAVY }}
        >
          Zachary E. Sparkman
        </h1>
        <p className="mt-2 text-[14px] text-slate-600">
          Los Angeles, CA
          <Sep />
          <a
            href="mailto:zesparkman@gmail.com"
            className="text-slate-600 hover:text-[#1F3A5F]"
            onClick={() => posthog.capture("email_clicked")}
          >
            zesparkman@gmail.com
          </a>
          <Sep />
          <a
            href="https://linkedin.com/in/zachsparkman"
            className="text-blue-700 underline underline-offset-2 hover:text-blue-900"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture("linkedin_clicked")}
          >
            linkedin.com/in/zachsparkman
          </a>
        </p>
        <div className="no-print mt-4 grid grid-cols-3 gap-2">
          <Link
            href="/"
            className={`${tabBase} ${activeTab === "resume" ? tabActive : tabInactive}`}
            onClick={() => posthog.capture("tab_clicked", { tab: "resume" })}
          >
            Resume
          </Link>
          <Link
            href="/portfolio"
            className={`${tabBase} ${activeTab === "portfolio" ? tabActive : tabInactive}`}
            onClick={() => posthog.capture("tab_clicked", { tab: "portfolio" })}
          >
            Portfolio
          </Link>
          <a
            href="/Zach_Sparkman_Resume.pdf"
            className={`${tabBase} ${tabInactive}`}
            download
            onClick={() => posthog.capture("resume_downloaded")}
          >
            <DownloadIcon />
            Download PDF
          </a>
        </div>
      </header>
      {children}
    </main>
  );
}

function Sep() {
  return <span className="mx-2 text-slate-400">•</span>;
}

function DownloadIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
