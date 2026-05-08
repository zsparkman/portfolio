import Link from "next/link";

const VIEWS: ReadonlyArray<{
  href: string;
  name: string;
  desc: string;
}> = [
  {
    href: "/inventory",
    name: "Inventory",
    desc: "Capacity, units sold, avails, sellout & net revenue by date, matchup, and inventory type.",
  },
  {
    href: "/rates",
    name: "Rates",
    desc: "Open avails and current resolved rate per inventory type, grouped by week.",
  },
  {
    href: "/heatmap",
    name: "Heatmap",
    desc: "Per-game sellout percentage by inventory type, monthly groupings.",
  },
  {
    href: "/booking-matrix",
    name: "Booking Matrix",
    desc: "Top advertisers × dates matrix of EQ30 by spot status and inventory type.",
  },
  {
    href: "/yield-summary",
    name: "Yield Summary",
    desc: "LOB × spot-group decomposition with EUR (Net), AUR, and sellout per game.",
  },
];

export default function Landing() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <section className="border-b border-[#E5E7EB] pt-6 pb-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/rsn-yield-wordmark.svg"
          alt="RSN Yield Platform"
          className="h-[52px] w-auto"
        />
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-600">
          A sanitized portfolio version of a production yield-management tool
          for an MLB-team regional sports network. The pipeline mirrors a
          real-world Wide Orbit + Excel chain at a 170-game-per-season scale
          and a roughly $30–60 MM annual ad-revenue range. All data shown is
          synthetic.{" "}
          <Link href="/about" className="text-[#1F3A5F] hover:underline">
            More
          </Link>
          .
        </p>
      </section>

      {/* View cards */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {VIEWS.map((v) => (
          <Link
            key={v.href}
            href={v.href}
            className="group flex flex-col gap-2 rounded-md border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all hover:-translate-y-0.5 hover:border-[#1F3A5F] hover:shadow-[0_4px_16px_rgba(31,58,95,0.10)]"
          >
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-block h-2 w-2 rounded-full bg-slate-400 transition-colors group-hover:bg-[#1F3A5F]"
              />
              <span className="font-mont text-[11px] font-bold uppercase tracking-[0.1em] text-slate-900 group-hover:text-[#1F3A5F]">
                {v.name}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-600">{v.desc}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
