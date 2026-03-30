"use client";

import { cn } from "@/lib/utils";

type CounterProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
};

export function Counter({
  value,
  onChange,
  min = 1,
  max = 99,
  disabled,
  className,
}: CounterProps) {
  function decrement() {
    if (value > min) onChange(value - 1);
  }

  function increment() {
    if (value < max) onChange(value + 1);
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 border border-stroke-soft rounded-pill px-2 h-[46px]",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      <button
        type="button"
        onClick={decrement}
        disabled={disabled || value <= min}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-bg-soft transition-colors text-text-900 disabled:text-text-300"
        aria-label="Decrease"
      >
        <MinusIcon className="w-4 h-4" />
      </button>

      <span className="font-jost font-medium text-base leading-6 tracking-[-0.176px] text-text-900 min-w-[24px] text-center select-none">
        {value}
      </span>

      <button
        type="button"
        onClick={increment}
        disabled={disabled || value >= max}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-bg-soft transition-colors text-text-900 disabled:text-text-300"
        aria-label="Increase"
      >
        <PlusIcon className="w-4 h-4" />
      </button>
    </div>
  );
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M3 8h10" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}
