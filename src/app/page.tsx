// Single-page resume rendering matching the layout of
// public/Zach_Sparkman_Resume.pdf as closely as the web allows.
"use client";

import posthog from "posthog-js";

const NAVY = "text-[#1F3A5F]";

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-[880px] bg-white px-8 py-12 text-[15px] leading-[1.5] text-slate-800 shadow-sm sm:px-12 sm:py-14 print:shadow-none">
      <Header />
      <Summary />
      <ProfessionalExperience />
      <ProductPortfolio />
      <EducationAndCertifications />
      <Skills />
    </main>
  );
}

function Header() {
  return (
    <header className="mb-7 border-b border-slate-300 pb-5 text-center">
      <h1 className={`${NAVY} text-[34px] font-bold uppercase tracking-[0.04em]`}>
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
      <div className="no-print mt-4 flex justify-center">
        <a
          href="/Zach_Sparkman_Resume.pdf"
          className="inline-flex items-center gap-2 rounded border border-slate-300 bg-white px-3 py-1.5 text-[13px] font-medium text-slate-700 shadow-sm hover:border-slate-400 hover:text-slate-900"
          download
          onClick={() => posthog.capture("resume_downloaded")}
        >
          <DownloadIcon />
          Download PDF
        </a>
      </div>
    </header>
  );
}

function Sep() {
  return <span className="mx-2 text-slate-400">•</span>;
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

function Summary() {
  return (
    <Section title="Summary">
      <p>
        Monetization strategist and product builder with 10+ years driving
        revenue across streaming, CTV, and linear TV platforms. Proven track
        record architecting yield optimization strategies, pricing frameworks,
        and cross-platform inventory systems for $190MM in combined annual ad
        revenue across premium live sports properties. Experienced people leader
        who builds high-performing teams and cross-functional alignment between
        Sales, Ad Ops, Engineering, and Product. Independently designs and ships
        web-based data products that solve real business problems, from internal
        sales tools to public-facing advertising intelligence platforms. Deep
        domain expertise in FreeWheel, programmatic activation, addressable
        advertising, FCC compliance, and live sports ad monetization.
      </p>
    </Section>
  );
}

interface JobProps {
  title: string;
  company: string;
  dates: string;
  bullets: string[];
}

function Job({ title, company, dates, bullets }: JobProps) {
  return (
    <article className="mt-4 first:mt-0">
      <h3 className={`${NAVY} text-[15px] font-bold`}>{title}</h3>
      <div className="mt-0.5 flex flex-col items-start justify-between gap-x-3 sm:flex-row sm:items-baseline">
        <p className="text-[14px] italic text-slate-600">{company}</p>
        <p className="text-[14px] italic text-slate-600">{dates}</p>
      </div>
      <ul className="mt-1.5 list-outside list-disc space-y-1 pl-5 marker:text-slate-400">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </article>
  );
}

function ProfessionalExperience() {
  return (
    <Section title="Professional Experience">
      <Job
        title="Manager, Yield & Inventory | RSNs & National Multi-Market"
        company="Spectrum Reach"
        dates="March 2025 – Present"
        bullets={[
          "Own end-to-end yield strategy, pricing architecture, and inventory management for Lakers & Dodgers RSNs plus LA and Dallas Interconnects across streaming, CTV, and linear platforms, representing $190MM in combined annual revenue and managing a team with two direct reports in LA and Dallas markets",
          "Define rate card frameworks, dynamic floor pricing, and yield optimization rules across FreeWheel and Wide Orbit, partnering with Ad Ops, Engineering, and national sales leadership (Home Team Sports, Playfly, Optimum Sports) to set KPIs (fill rate, sell-through, eCPM, makegood liability) and prioritize inventory initiatives across programmatic CTV and linear scheduling",
          "Built and shipped the Live Sports CTV Package Builder, a full-stack internal product (HTML/JS, SharePoint REST API, embedded PPTX generation) used by 50+ sales reps to configure streaming ad packages across 10+ sports properties, automating CPM calculations, rate class toggling, and branded deck generation that previously required manual assembly",
          "Manage FCC political broadcasting compliance across $34MM+ in on-cycle political revenue, including LUR thresholds, equal access obligations, and inventory allocation across federal and state election windows; domain expertise directly informed development of PoliticalWindow.com (see Product Portfolio)",
        ]}
      />
      <Job
        title="Pricing and Planning Manager | Regional Sports Networks"
        company="Spectrum Reach"
        dates="January 2020 – February 2025"
        bullets={[
          "Operated as deal desk for Sales, reviewing and approving proposals against rate card, clearing inventory in coordination with Ad Ops, and serving as the primary pricing and planning interface between Sales and Operations across the Regional Sports Networks portfolio (Spectrum SportsNet and SportsNet LA)",
          "Designed and shipped a multi-property analytics and inventory tracking platform for Spectrum SportsNet (Lakers) and Spectrum SportsNet LA (Dodgers). Built on a 10-view product framework over a 21-query Power Query data pipeline that consolidates booked spots, schedules, and inventory into a unified decision-support layer used daily by yield, sales, and revenue assurance teams to manage allocation across $57MM in annual ad revenue",
          "Architected pricing and inventory segmentation strategy for live sports streaming and CTV ad pods in partnership with Sales, Ad Ops, and Product teams, delivering +74% CPM growth in premium live in-game inventory while pioneering addressable and programmatic activation across connected devices",
          "Built bottom-up RSN revenue planning model that replaced flat top-down budget targets with a unit-economics framework, deriving revenue capacity from game count, inventory volume per game, impression delivery, ratings, and monetized CPM; informs annual budget and forecast cycles for Spectrum SportsNet (Lakers) and Spectrum SportsNet LA (Dodgers)",
        ]}
      />
      <Job
        title="Senior Account Manager | Agencies"
        company="Nexstar Media Group"
        dates="February 2017 – January 2020"
        bullets={[
          "Identified revenue gap in Fox NFL ad packaging, redesigned the DMA-level pricing and inventory bundling strategy, and launched a revised advertising package that delivered +78% growth in average order value, a product-driven pricing initiative later adopted across the station group",
          "Managed a 100+ account portfolio spanning national brands (Nissan, Mercedes-Benz, Ford, Subway, McDonald’s) and agency relationships with Initiative, OMD, Carat, and Litha/Media Access Group, developing integrated cross-platform proposals across digital, OTT, and linear inventory",
          "Built pricing strategy frameworks for premium sports and local programming inventory, establishing rate card structures and sell-through optimization practices that informed early programmatic and CTV monetization strategies",
        ]}
      />
      <Job
        title="Digital Account Executive | New Business Development"
        company="Coastal Television Broadcasting Company"
        dates="July 2015 – February 2017"
        bullets={[
          "Launched the station group’s first digital advertising division from the ground up. Defined go-to-market strategy, built pricing models, and established sales operations across 3 DMAs, functioning as a 0-to-1 product owner for a new revenue line",
          "Generated $200K+ in new digital revenue within 6 months by pioneering video pre-roll and display ad monetization on station O&O properties alongside SEM, SEO, and social media services",
          "Partnered with linear sales teams across 5 broadcast stations to develop integrated cross-platform advertising solutions, bridging $7MM in traditional spot business with emerging digital inventory, an early cross-platform monetization model",
        ]}
      />
    </Section>
  );
}

interface ProjectProps {
  name: string;
  link?: { label: string; href: string };
  tag: string;
  subtitle: string;
  bullets: string[];
}

function Project({ name, link, tag, subtitle, bullets }: ProjectProps) {
  return (
    <article className="mt-4 first:mt-0">
      <h3 className={`${NAVY} text-[15px] font-bold`}>
        {name}
        {link && (
          <>
            <span className="mx-1.5 font-normal text-slate-400">|</span>
            <a
              href={link.href}
              className="font-bold text-blue-700 underline underline-offset-2 hover:text-blue-900"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => posthog.capture("project_link_clicked", { project: name, label: link.label, href: link.href })}
            >
              {link.label}
            </a>
          </>
        )}
        {!link && tag && (
          <>
            <span className="mx-1.5 font-normal text-slate-400">|</span>
            <span className={`${NAVY} font-bold`}>{tag}</span>
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
        tag=""
        subtitle="Political advertising intelligence platform • Solo founder & developer"
        bullets={[
          "Designed and built a full-stack web application that parses FCC public file PDFs into structured data, enabling political media buyers to identify Lowest Unit Rate violations, track candidate ad spending, and navigate FCC compliance windows across all 210 U.S. DMAs",
          "Architecture: Neon PostgreSQL → Express/Node.js API (Railway) → JavaScript frontend (GitHub Pages) with Claude Sonnet-powered PDF extraction pipeline, JWT/bcrypt authentication, and FEC + FollowTheMoney API integrations",
          "Features include a 50-state interactive election map with FCC window countdowns, an FCC rate explorer, LUR violation detection engine (the platform’s core strategic differentiator), and a multi-source candidate ad spend tracker",
        ]}
      />
      <Project
        name="Live Sports CTV Package Platform"
        tag="Internal Tool • Spectrum Reach"
        subtitle="Sales enablement product for streaming ad packages • Sole developer"
        bullets={[
          "Built a single-file web application that calculates streaming ad packages for sales reps based on live sports event, DMA, budget, and rate class inputs, then auto-generates branded PowerPoint decks via embedded PPTX templates and SharePoint REST API sync",
          "Eliminated manual package assembly workflow for 50+ reps across 10+ sports properties, reducing proposal turnaround from hours to minutes while enforcing pricing accuracy and brand consistency",
        ]}
      />
    </Section>
  );
}

interface CertProps {
  title: string;
  org: string;
  date: string;
}

function Cert({ title, org, date }: CertProps) {
  return (
    <div className="mt-3 first:mt-0">
      <div className="flex flex-col items-start justify-between gap-x-3 sm:flex-row sm:items-baseline">
        <h3 className={`${NAVY} text-[15px] font-bold`}>{title}</h3>
        <p className="text-[14px] italic text-slate-600">{date}</p>
      </div>
      <p className="mt-0.5 text-[14px] italic text-slate-600">{org}</p>
    </div>
  );
}

function EducationAndCertifications() {
  return (
    <Section title="Education & Certifications">
      <Cert
        title="Bachelor of Business Administration, Accounting"
        org="University of Alaska Anchorage"
        date="December 2018"
      />
      <Cert
        title="Digital Media Sales Certification"
        org="Interactive Advertising Bureau (IAB)"
        date="March 2023"
      />
      <Cert
        title="The Trade Desk Edge Academy Certified: Data-Driven Planning"
        org="The Trade Desk"
        date="April 2026"
      />
    </Section>
  );
}

function SkillRow({ category, body }: { category: string; body: string }) {
  return (
    <li>
      <strong className="font-semibold text-slate-900">{category}:</strong> {body}
    </li>
  );
}

function Skills() {
  return (
    <Section title="Skills & Technical Proficiency">
      <ul className="list-outside list-disc space-y-1 pl-5 marker:text-slate-400">
        <SkillRow
          category="Ad Tech & Platforms"
          body="FreeWheel MRM, Wide Orbit (Traffic & Media Sales), Google Ad Manager, Operative AOS, programmatic SSP/DSP ecosystems, HudsonMX"
        />
        <SkillRow
          category="Data & Analytics"
          body="SQL, PowerBI, ComScore, Nielsen, Salesforce; experienced building analytical dashboards and yield reporting pipelines"
        />
        <SkillRow
          category="Technical / Product Building"
          body="PostgreSQL, Node.js, REST API design, Git/GitHub, Railway, AWS S3/CloudFront, SharePoint API"
        />
        <SkillRow
          category="AI Development Tools"
          body="Claude (API, Claude Code, claude.ai), OpenAI (Codex, ChatGPT), LM Studio for local LLM inference, LangChain for agent workflows, Apple Vision (pyobjc) for on-device OCR; integrate AI into production data pipelines and ship features end-to-end with AI-assisted development"
        />
        <SkillRow
          category="Domain Expertise"
          body="CTV/OTT ad monetization, live sports inventory strategy, ad pod optimization, addressable advertising, FCC regulatory compliance, cross-platform yield management, programmatic supply-side strategy, inventory governance & rate card design, revenue planning & unit-economics modeling"
        />
        <SkillRow
          category="Languages"
          body="Fluent in Spanish with full professional proficiency"
        />
      </ul>
    </Section>
  );
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
