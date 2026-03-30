"use client";

import { InputHTMLAttributes, forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

type FloatingInputProps = {
  label: string;
  error?: string;
  rightElement?: React.ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  function FloatingInput({ label, error, rightElement, className, id, type, ...props }, ref) {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    const isPassword = type === "password";
    const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="flex flex-col gap-1 w-full">
        <div
          className={cn(
            "bg-beige-lighter border rounded-xl px-3 py-1.5 shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)] transition-colors",
            error ? "border-red-400" : "border-stroke-soft focus-within:border-text-900"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <label
                htmlFor={inputId}
                className="font-jost text-xs leading-4 text-text-500 cursor-text"
              >
                {label}
              </label>
              <input
                ref={ref}
                id={inputId}
                type={resolvedType}
                className={cn(
                  "bg-transparent font-jost text-sm leading-5 tracking-[-0.084px] text-text-900 outline-none w-full placeholder:text-text-300",
                  className
                )}
                {...props}
              />
            </div>

            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="shrink-0 ml-2 text-text-500 hover:text-text-900 transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOpenIcon className="w-5 h-5" /> : <EyeClosedIcon className="w-5 h-5" />}
              </button>
            )}

            {rightElement && !isPassword && (
              <span className="shrink-0 ml-2">{rightElement}</span>
            )}
          </div>
        </div>

        {error && (
          <p className="font-jost text-xs leading-4 text-red-500 px-1">{error}</p>
        )}
      </div>
    );
  }
);

function EyeClosedIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3l14 14M10.586 10.586A2 2 0 018.414 8.414M7.362 7.362C5.68 8.26 4.266 9.5 3.168 10c1.042.834 3.925 3.5 6.832 3.5a6.84 6.84 0 003.638-1.138M10.5 6.537C10.336 6.513 10.17 6.5 10 6.5c-2.907 0-5.79 2.666-6.832 3.5.35.28.793.603 1.307.934" />
      <path d="M8.68 4.644A7.3 7.3 0 0110 4.5c2.907 0 5.79 2.666 6.832 3.5-.42.336-1.03.767-1.793 1.18" />
    </svg>
  );
}

function EyeOpenIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.168 10C4.21 10.834 7.093 13.5 10 13.5s5.79-2.666 6.832-3.5C15.79 9.166 12.907 6.5 10 6.5S4.21 9.166 3.168 10z" />
      <circle cx="10" cy="10" r="2" />
    </svg>
  );
}
