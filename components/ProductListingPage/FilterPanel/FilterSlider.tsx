"use client";

import { useRef, useCallback } from "react";

type Props = {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
};

function fmt(n: number) {
  if (n >= 1000000) return `₦${(n / 1000000).toFixed(0)}M`;
  if (n >= 1000) return `₦${(n / 1000).toFixed(0)}k`;
  return `₦${n}`;
}

export function FilterSlider({ min, max, value, onChange }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  const pct = useCallback(
    (v: number) => ((v - min) / (max - min)) * 100,
    [min, max]
  );

  const leftPct  = pct(value[0]);
  const rightPct = pct(value[1]);

  return (
    <div className="flex flex-col gap-3">
      {/* Track */}
      <div ref={trackRef} className="relative h-1 rounded-full bg-stroke-soft">
        {/* Active range */}
        <div
          className="absolute h-full rounded-full bg-primary-base"
          style={{ left: `${leftPct}%`, width: `${rightPct - leftPct}%` }}
        />

        {/* Two overlapping range inputs */}
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={(e) => {
            const v = Math.min(Number(e.target.value), value[1] - 1);
            onChange([v, value[1]]);
          }}
          className="absolute inset-0 w-full opacity-0 h-1 cursor-pointer"
          style={{ zIndex: value[0] > max - 100 ? 5 : 3 }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={(e) => {
            const v = Math.max(Number(e.target.value), value[0] + 1);
            onChange([value[0], v]);
          }}
          className="absolute inset-0 w-full opacity-0 h-1 cursor-pointer"
          style={{ zIndex: 4 }}
        />

        {/* Thumbs */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary-base border-2 border-white shadow -translate-x-1/2 pointer-events-none"
          style={{ left: `${leftPct}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary-base border-2 border-white shadow -translate-x-1/2 pointer-events-none"
          style={{ left: `${rightPct}%` }}
        />
      </div>

      {/* Labels */}
      <div className="flex items-center gap-2">
        <span className="font-jost text-xs text-text-500">Min</span>
        <div className="flex-1 h-8 border border-stroke-soft rounded-lg flex items-center px-2">
          <span className="font-jost text-xs text-text-900">{fmt(value[0])}</span>
        </div>
        <span className="text-text-300">→</span>
        <div className="flex-1 h-8 border border-stroke-soft rounded-lg flex items-center px-2">
          <span className="font-jost text-xs text-text-900">
            {value[1] >= max ? `${fmt(max)}+` : fmt(value[1])}
          </span>
        </div>
      </div>
    </div>
  );
}
