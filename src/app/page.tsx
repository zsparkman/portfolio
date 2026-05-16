"use client";

import { PageShell } from "@/components/PageShell";

const NAVY = "text-[#1F3A5F]";

export default function HomePage() {
  return (
    <PageShell activeTab="resume">
      <Summary />
      <ProfessionalExperience />
      <EducationAndCertifications />
      <Skills />
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

function Summary() {
  return (
    <Section title="Summary">
      <p>
        Monetization strategist and product builder with 10+ years driving
        revenue across streaming, CTV, and linear TV platforms. Proven track
        record architecting yield optimization strategies, pricing frameworks,
        and cross-platform inventory systems for $190MM in combined annual ad
        revenue across premium live sports properties. Manages a two-person
        yield team across LA and Dallas markets, with cross-functional
        leadership across Sales, Ad Ops, Engineering, and Product.
        Independently designs and ships web-based data products that solve
        real business problems, from internal sales tools to public-facing
        advertising intelligence platforms. Domain expertise in FreeWheel,
        Salesforce, addressable advertising, FCC compliance, and live sports
        ad monetization.
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
        title="Manager, Yield & Inventory | National & Multi-Market"
        company="Spectrum Reach"
        dates="March 2025 – Present"
        bullets={[
          "Lead end-to-end yield strategy, pricing architecture, and ad inventory management partnering with the LA & Dallas national sales teams across streaming, CTV, and linear TV — overseeing $190MM in combined annual ad revenue across owned-and-operated inventory (LA & Dallas Interconnects, Lakers and Dodgers RSNs, Spectrum TV app, VOD) plus acquired inventory partnerships. Manage two direct reports across LA and Dallas markets",
          "Define rate card frameworks, dynamic floor pricing, and yield optimization rules across FreeWheel, Operative AOS and Wide Orbit; own deal-desk approval governance over order activation pipeline in Salesforce and ShowSeeker Pilot, with team members executing day-to-day clearance against pricing and inventory rules; partner with Ad Ops, Engineering, and national sales leadership to set KPIs (fill rate, sell-through, eCPM, makegood liability) across CTV and linear scheduling",
          "Drive yield optimization across acquired inventory spanning MVPD affiliate inventory, FAST/DTC app partnerships, FreeWheel Marketplace, and DSP supply, extending reach and diversifying revenue across MVPD, addressable, and programmatic channels",
          "Manage FCC political broadcasting compliance across $34MM in on-cycle political ad revenue, Lowest Unit Rate (LUR) thresholds, equal access obligations, candidate offer management, and political inventory allocation across federal and state election windows",
        ]}
      />
      <Job
        title="Pricing and Planning Manager | Spectrum SportsNet & SportsNet LA"
        company="Spectrum Reach"
        dates="January 2020 – February 2025"
        bullets={[
          "Designed and implemented pricing and inventory segmentation strategy for live sports streaming and CTV ad pods in partnership with Sales, Ad Ops, and Product, delivering +74% CPM growth in premium live in-game inventory; supported the cutover to full DAI across both RSNs, enabling addressable monetization on connected devices",
          "Operated as deal desk for Sales, reviewing and approving proposals, clearing inventory with Ad Ops as primary Sales/Ops liaison",
          "Designed and shipped a multi-property analytics and inventory platform for both RSNs, built on a 10-view product framework over a Power Query data pipeline used daily by yield, sales, and revenue assurance to manage $57MM in annual ad revenue",
          "Helped design bottom-up RSN revenue planning model that replaced flat top-down budget targets with a unit-economics framework, deriving revenue capacity from game count, inventory volume per game, impression delivery, ratings, and monetized CPM; informs annual budget and forecast cycles for both RSNs",
        ]}
      />
      <Job
        title="Senior Account Manager | Agency Sales"
        company="Nexstar Media Group"
        dates="February 2017 – January 2020"
        bullets={[
          "Managed a 100+ account portfolio spanning national brands (Nissan, Mercedes-Benz, Ford, Subway, McDonald’s) and agency relationships with Initiative/IPG, OMD, PHD, Carat, and Litha/Media Access Group, developing integrated cross-platform proposals across digital, OTT, and linear inventory",
          "Identified a gap in Fox NFL ad packaging, redesigned the DMA-level pricing and inventory bundling strategy, and launched a revised package that delivered +78% growth in average order value",
          "Built pricing strategy frameworks for premium sports and local programming inventory, establishing rate card structures and sell-through optimization practices that informed early programmatic and CTV monetization strategies",
        ]}
      />
      <Job
        title="Digital Account Executive | New Business Development"
        company="Coastal Television Broadcasting Company"
        dates="July 2015 – February 2017"
        bullets={[
          "Launched the station group’s first digital advertising division from the ground up — defined go-to-market strategy, built pricing models, and established sales operations across 3 DMAs, functioning as a 0-to-1 product owner for a new revenue line",
          "Generated $200K+ in new digital revenue within 6 months by pioneering video pre-roll and display ad monetization on station O&O properties alongside SEM, SEO, and social media services",
          "Partnered with linear sales teams across 5 broadcast stations to develop integrated cross-platform advertising solutions, bridging $7MM in traditional broadcast spot business with emerging digital inventory in an early cross-platform monetization model",
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
          body="FreeWheel MRM, Wide Orbit (Traffic & Media Sales), Google Ad Manager, Operative AOS, programmatic SSP/DSP ecosystems, Hudson MX, Mediaocean Prisma for Sellers"
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
          body="Claude (API, Claude Code), OpenAI (Codex, ChatGPT), LM Studio for local LLM inference, LangChain, Apple Vision (pyobjc) for on-device OCR; integrate AI into production data pipelines and ship features end-to-end with AI-assisted development"
        />
        <SkillRow
          category="Domain Expertise"
          body="CTV/OTT ad monetization, live sports inventory strategy, addressable advertising, FCC regulatory compliance, programmatic supply-side strategy, rate card design, unit-economics modeling"
        />
        <SkillRow
          category="Languages"
          body="Fluent in Spanish with full professional proficiency"
        />
      </ul>
    </Section>
  );
}
