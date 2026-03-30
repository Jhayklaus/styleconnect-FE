"use client";

import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type RadioProps = {
  label?: string;
  description?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function Radio({ label, description, className, id, ...props }: RadioProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex items-start gap-3">
      <div className="relative flex shrink-0 mt-0.5">
        <input type="radio" id={inputId} className="peer sr-only" {...props} />
        <label
          htmlFor={inputId}
          className={cn(
            "w-5 h-5 rounded-full border-2 border-stroke-soft bg-bg-white flex items-center justify-center cursor-pointer transition-colors",
            "peer-checked:border-primary-base",
            "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
            className
          )}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-primary-base scale-0 peer-checked:scale-100 transition-transform" />
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
        </div>
      )}
    </div>
  );
}

// Card-style radio used for account type selection
type RadioCardProps = {
  label: string;
  description?: string;
  icon?: React.ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function RadioCard({ label, description, icon, id, className, ...props }: RadioCardProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="relative">
      <input type="radio" id={inputId} className="peer sr-only" {...props} />
      <label
        htmlFor={inputId}
        className={cn(
          "flex items-start gap-4 p-5 rounded-2xl border-2 border-stroke-soft bg-bg-white cursor-pointer transition-colors",
          "peer-checked:border-primary-base peer-checked:bg-beige-lighter",
          "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed hover:border-text-300",
          className
        )}
      >
        {icon && (
          <span className="shrink-0 w-10 h-10 rounded-xl bg-bg-soft flex items-center justify-center text-text-900">
            {icon}
          </span>
        )}
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <span className="font-jost font-medium text-base leading-6 tracking-[-0.176px] text-text-900">
            {label}
          </span>
          {description && (
            <span className="font-jost text-sm leading-5 tracking-[-0.084px] text-text-500">
              {description}
            </span>
          )}
        </div>
        <span className="shrink-0 w-5 h-5 rounded-full border-2 border-stroke-soft peer-checked:border-primary-base flex items-center justify-center mt-0.5 transition-colors">
          <span className="w-2.5 h-2.5 rounded-full bg-primary-base scale-0 peer-checked:scale-100 transition-transform" />
        </span>
      </label>
    </div>
  );
}
