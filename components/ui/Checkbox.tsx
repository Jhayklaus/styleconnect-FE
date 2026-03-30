"use client";

import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CheckboxProps = {
  label?: string;
  description?: string;
  error?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function Checkbox({ label, description, error, className, id, ...props }: CheckboxProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex items-start gap-3">
      <div className="relative flex shrink-0 mt-0.5">
        <input
          type="checkbox"
          id={inputId}
          className="peer sr-only"
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "w-5 h-5 rounded-md border-2 border-stroke-soft bg-bg-white flex items-center justify-center cursor-pointer transition-colors",
            "peer-checked:bg-primary-base peer-checked:border-primary-base",
            "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
            error && "border-red-500",
            className
          )}
        >
          <CheckIcon className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
        </label>
      </div>

      {(label || description) && (
        <div className="flex flex-col gap-0.5">
          {label && (
            <label
              htmlFor={inputId}
              className="font-jost font-medium text-sm leading-5 tracking-[-0.084px] text-text-900 cursor-pointer"
            >
              {label}
            </label>
          )}
          {description && (
            <p className="font-jost text-sm leading-5 tracking-[-0.084px] text-text-500">
              {description}
            </p>
          )}
          {error && (
            <p className="font-jost text-xs leading-4 text-red-500">{error}</p>
          )}
        </div>
      )}
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6l3 3 5-5" />
    </svg>
  );
}
