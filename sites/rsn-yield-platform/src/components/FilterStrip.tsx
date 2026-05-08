// Generic filter strip building blocks. Each filter is a small labeled
// segmented control rendered as a horizontal flex row. Filter state lives
// in the parent client component.

"use client";

import clsx from "clsx";

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
}

export function Segment<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: ReadonlyArray<SegmentOption<T>>;
  onChange: (next: T) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </span>
      <div className="flex overflow-hidden rounded-md border border-[#E5E7EB] bg-white">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={clsx(
              "px-2.5 py-1 text-xs transition-colors",
              o.value === value
                ? "bg-[#1F3A5F] text-white"
                : "text-slate-600 hover:bg-[rgba(31,58,95,0.08)] hover:text-[#1F3A5F]",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function DateRangeFilter({
  startDate,
  endDate,
  onStart,
  onEnd,
  min,
  max,
}: {
  startDate: string;
  endDate: string;
  onStart: (next: string) => void;
  onEnd: (next: string) => void;
  min: string;
  max: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
        Dates
      </span>
      <input
        type="date"
        value={startDate}
        min={min}
        max={max}
        onChange={(e) => onStart(e.target.value)}
        className="rounded-md border border-[#E5E7EB] bg-white px-2 py-1 text-xs text-slate-700 transition-colors focus:border-[#1F3A5F] focus:outline-none focus:ring-2 focus:ring-[rgba(31,58,95,0.16)]"
      />
      <span className="text-xs text-slate-400">–</span>
      <input
        type="date"
        value={endDate}
        min={min}
        max={max}
        onChange={(e) => onEnd(e.target.value)}
        className="rounded-md border border-[#E5E7EB] bg-white px-2 py-1 text-xs text-slate-700 transition-colors focus:border-[#1F3A5F] focus:outline-none focus:ring-2 focus:ring-[rgba(31,58,95,0.16)]"
      />
    </div>
  );
}
