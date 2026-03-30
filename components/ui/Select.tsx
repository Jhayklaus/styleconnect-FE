"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SelectOption = {
  value: string;
  label: string;
  icon?: ReactNode;
};

type SelectProps = {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
};

export function Select({
  label,
  placeholder = "Select...",
  options,
  value,
  onChange,
  error,
  disabled,
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)} ref={ref}>
      {label && (
        <label className="font-jost font-medium text-sm leading-5 tracking-[-0.084px] text-text-900">
          {label}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center justify-between gap-2 h-[54px] px-4 rounded-2xl border bg-bg-white transition-colors text-left",
          open ? "border-text-900" : "border-stroke-soft hover:border-text-300",
          error && "border-red-500",
          disabled && "opacity-50 cursor-not-allowed bg-bg-soft"
        )}
      >
        <span
          className={cn(
            "font-jost text-sm leading-5 tracking-[-0.084px] truncate",
            selected ? "text-text-900" : "text-text-500"
          )}
        >
          {selected ? selected.label : placeholder}
        </span>
        <ChevronIcon
          className={cn(
            "w-5 h-5 text-text-500 shrink-0 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div className="absolute z-20 mt-1 w-full bg-bg-white border border-stroke-soft rounded-2xl shadow-lg overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange?.(opt.value);
                setOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 font-jost text-sm leading-5 tracking-[-0.084px] text-text-900 hover:bg-bg-soft transition-colors text-left",
                opt.value === value && "bg-beige-lighter font-medium"
              )}
            >
              {opt.icon && (
                <span className="shrink-0 w-5 h-5 text-text-500">{opt.icon}</span>
              )}
              {opt.label}
              {opt.value === value && (
                <CheckIcon className="w-4 h-4 text-primary-base ml-auto shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p className="font-jost text-xs leading-4 text-red-500">{error}</p>
      )}
    </div>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 7.5l5 5 5-5" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8l3.5 3.5 6.5-7" />
    </svg>
  );
}
