"use client";

import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ToggleProps = {
  label?: string;
  description?: string;
  labelPosition?: "right" | "left";
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function Toggle({
  label,
  description,
  labelPosition = "right",
  className,
  id,
  ...props
}: ToggleProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  const track = (
    <div className="relative flex shrink-0">
      <input type="checkbox" id={inputId} className="peer sr-only" {...props} />
      <label
        htmlFor={inputId}
        className={cn(
          "w-11 h-6 rounded-full bg-bg-soft border-2 border-transparent cursor-pointer transition-colors",
          "peer-checked:bg-primary-base",
          "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
          className
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform",
            "peer-checked:translate-x-5"
          )}
        />
      </label>
    </div>
  );

  if (!label && !description) return track;

  return (
    <div
      className={cn(
        "flex items-center gap-3",
        labelPosition === "left" && "flex-row-reverse justify-end"
      )}
    >
      {track}
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
    </div>
  );
}
