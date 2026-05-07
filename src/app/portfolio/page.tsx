"use client";

import posthog from "posthog-js";
import { PageShell } from "@/components/PageShell";

const NAVY = "text-[#1F3A5F]";

export default function PortfolioPage() {
  return (
    <PageShell activeTab="portfolio">
      <ProductPortfolio />
    </PageShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7">
      <h2 className={`${NAVY} text-[13px] font-bold uppercase tracking-[0.06em]`}>
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

interface ProjectProps {
  name: string;
  tag?: string;
  link?: { label: string; href: string };
  subtitle: string;
  bullets: string[];
}

function Project({ name, tag, link, subtitle, bullets }: ProjectProps) {
  return (
    <article className="mt-4 first:mt-0">
      <h3 className={`${NAVY} text-[15px] font-bold`}>
        {name}
        {tag && (
          <>
            <span className="mx-1.5 font-normal text-slate-400">|</span>
            <span className={`${NAVY} font-bold`}>{tag}</span>
          </>
        )}
        {link && (
          <>
            <span className="mx-1.5 font-normal text-slate-400">|</span>
            <a
              href={link.href}
              className="font-bold text-blue-700 underline underline-offset-2 hover:text-blue-900"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                posthog.capture("project_link_clicked", {
                  project: name,
                  label: link.label,
                  href: link.href,
                })
              }
            >
              {link.label}
            </a>
          </>
        )}
      </h3>
      <p className="mt-0.5 text-[14px] italic text-slate-600">{subtitle}</p>
      <ul className="mt-1.5 list-outside list-disc space-y-1 pl-5 marker:text-slate-400">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </article>
  );
}

function ProductPortfolio() {
  return (
    <Section title="Product Portfolio">
      <Project
        name="Political Window"
        link={{ label: "PoliticalWindow.com", href: "https://politicalwindow.com" }}
        subtitle="Political advertising intelligence platform • Solo founder & developer"
        bullets={[
          "Designed and built a full-stack web application that parses FCC public file PDFs into structured data, enabling political media buyers to identify Lowest Unit Rate violations, track candidate ad spending, and navigate FCC compliance windows across all 210 U.S. DMAs",
          "Architecture: Neon PostgreSQL → Express/Node.js API (Railway) → JavaScript frontend (GitHub Pages) with Claude Sonnet-powered PDF extraction pipeline, JWT/bcrypt authentication, and FEC + FollowTheMoney API integrations",
          "Features include a 50-state interactive election map with FCC window countdowns, an FCC rate explorer, LUR violation detection engine (the platform’s core strategic differentiator), and a multi-source candidate ad spend tracker",
        ]}
      />
      <Project
        name="Live Sports CTV Package Platform"
        tag="Spectrum Reach"
        link={{
          label: "Demo: ctv-builder.zachsparkman.com",
          href: "https://ctv-builder.zachsparkman.com",
        }}
        subtitle="Sales enablement product for streaming ad packages • Sole developer"
        bullets={[
          "Designed and built a Next.js web application that calculates streaming ad packages for live sports inventory, enabling 50+ sales reps across 10+ properties to configure rate-class, DMA, date window, and budget inputs and produce branded proposal decks in under a minute",
          "Architecture: Next.js single-page application with embedded PPTX template engine, dynamic xlsx data ingestion (packages, dates, live CPMs, DMAs, max live impressions), client-side PowerPoint generation via JSZip, and SharePoint REST API sync for centralized asset distribution",
          "Features include a multi-property package builder with real-time CPM calculation, rate-class toggling, max-impression enforcement against live inventory caps, embedded base64 master template for branded PPTX deck generation, bulk template upload via the browser File System Access API, and one-click export to .pptx",
        ]}
      />
      <Project
        name="RSN Yield Platform"
        tag="Spectrum Reach"
        link={{
          label: "Demo: rsn-yield.zachsparkman.com",
          href: "https://rsn-yield.zachsparkman.com",
        }}
        subtitle="Inventory, rate, and yield management platform for live sports RSNs • Sole developer"
        bullets={[
          "Designed and built a Next.js web application that consolidates booked spots, schedules, and inventory data into a unified decision-support layer used daily by yield, sales, and revenue assurance teams to manage allocation across $57MM in annual ad revenue for the Lakers and Dodgers RSNs",
          "Architecture: Next.js single-page application with a server-driven data layer feeding a six-view product framework — Inventory, Rates, Heatmap, Booking Matrix, Yield Summary, and About — covering every angle of yield decisioning from per-game capacity to portfolio-level revenue decomposition",
          "Features include a per-game inventory view with capacity, units sold, avails, sellout, and net revenue by date, matchup, and inventory type; a weekly rate explorer of open avails and current resolved rates; a per-game sellout heatmap; a top-advertiser × dates booking matrix of EQ30 by spot status; and a line-of-business × spot-group yield summary with EUR (Net), AUR, and sellout per game",
        ]}
      />
    </Section>
  );
}
