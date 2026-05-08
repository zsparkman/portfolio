"use client";

import Link from "next/link";
import posthog from "posthog-js";

const INDIGO = "#4F46E5";

type Tab = "resume" | "portfolio";

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition";

// Solid indigo, white text — current page indicator
const btnActive = "bg-[#4F46E5] text-white shadow-sm hover:bg-[#4338CA]";

// Translucent indigo tint — inactive tab + download button
const btnSoft =
  "bg-[rgba(79,70,229,0.08)] text-[#4F46E5] hover:bg-[rgba(79,70,229,0.16)]";

export function PageShell({
  activeTab,
  children,
}: {
  activeTab: Tab;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto min-h-screen max-w-[880px] bg-white px-8 py-12 text-[15px] leading-[1.6] text-slate-800 shadow-sm sm:px-12 sm:py-14 print:shadow-none">
      <header className="mb-8 border-b border-slate-200 pb-6 text-center">
        <h1
          className="font-mont text-[32px] font-extrabold uppercase tracking-[0.04em] text-slate-900"
        >
          Zachary E. Sparkman
        </h1>
        <p className="mt-2 text-[14px] text-slate-500">
          Los Angeles, CA
          <Sep />
          <a
            href="mailto:zesparkman@gmail.com"
            className="text-slate-500 hover:text-[#4F46E5]"
            onClick={() => posthog.capture("email_clicked")}
          >
            zesparkman@gmail.com
          </a>
          <Sep />
          <a
            href="https://linkedin.com/in/zachsparkman"
            className="text-[#4F46E5] underline underline-offset-2 hover:text-[#4338CA]"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => posthog.capture("linkedin_clicked")}
          >
            linkedin.com/in/zachsparkman
          </a>
        </p>
        <div className="no-print mt-5 grid grid-cols-3 gap-2.5">
          <Link
            href="/"
            className={`${btnBase} ${activeTab === "resume" ? btnActive : btnSoft}`}
            onClick={() => posthog.capture("tab_clicked", { tab: "resume" })}
          >
            Resume
          </Link>
          <Link
            href="/portfolio"
            className={`${btnBase} ${activeTab === "portfolio" ? btnActive : btnSoft}`}
            onClick={() => posthog.capture("tab_clicked", { tab: "portfolio" })}
          >
            Portfolio
          </Link>
          <a
            href="/Zach_Sparkman_Resume.pdf"
            className={`${btnBase} ${btnSoft}`}
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
  return <span className="mx-2 text-slate-300">•</span>;
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
