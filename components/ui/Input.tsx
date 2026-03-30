"use client";

import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

type InputProps = {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, hint, leftIcon, rightIcon, className, id, ...props },
  ref
) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="font-jost font-medium text-sm leading-5 tracking-[-0.084px] text-text-900"
        >
          {label}
        </label>
      )}

      <div
        className={cn(
          "flex items-center gap-2 h-[54px] px-4 rounded-2xl border transition-colors bg-bg-white",
          error
            ? "border-red-500 focus-within:border-red-500"
            : "border-stroke-soft focus-within:border-text-900",
          props.disabled && "opacity-50 cursor-not-allowed bg-bg-soft"
        )}
      >
        {leftIcon && (
          <span className="shrink-0 text-text-500 w-5 h-5 flex items-center justify-center">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "flex-1 bg-transparent font-jost text-sm leading-5 tracking-[-0.084px] text-text-900 placeholder:text-text-500 outline-none min-w-0",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <span className="shrink-0 text-text-500 w-5 h-5 flex items-center justify-center">
            {rightIcon}
          </span>
        )}
      </div>

      {(error || hint) && (
        <p
          className={cn(
            "font-jost text-xs leading-4 tracking-[-0.084px]",
            error ? "text-red-500" : "text-text-500"
          )}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
});

// OTP / digit input used in onboarding verification
type DigitInputProps = {
  value: string;
  onChange: (val: string) => void;
  length?: number;
  error?: boolean;
};

export function DigitInput({ value, onChange, length = 5, error = false }: DigitInputProps) {
  // Build a fixed-length array from the current value string
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  function handleChange(i: number, char: string) {
    if (!/^\d?$/.test(char)) return;
    const next = digits.map((d, idx) => (idx === i ? char : d)).join("");
    onChange(next);
    if (char && i < length - 1) {
      document.getElementById(`digit-${i + 1}`)?.focus();
    }
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      if (!digits[i] && i > 0) {
        // move back and clear previous
        const next = digits.map((d, idx) => (idx === i - 1 ? "" : d)).join("");
        onChange(next);
        document.getElementById(`digit-${i - 1}`)?.focus();
      } else if (digits[i]) {
        const next = digits.map((d, idx) => (idx === i ? "" : d)).join("");
        onChange(next);
      }
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    const next = Array.from({ length }, (_, i) => pasted[i] ?? "").join("");
    onChange(next);
    const lastFilled = Math.min(pasted.length, length - 1);
    document.getElementById(`digit-${lastFilled}`)?.focus();
  }

  return (
    <div className="flex gap-3">
      {digits.map((d, i) => (
        <input
          key={i}
          id={`digit-${i}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          className={cn(
            "w-[54px] h-[54px] text-center rounded-2xl border font-jost font-medium text-base leading-6 tracking-[-0.176px] text-text-900 outline-none transition-colors bg-bg-white",
            error
              ? "border-red-500"
              : d
              ? "border-text-900"
              : "border-stroke-soft focus:border-text-900"
          )}
        />
      ))}
    </div>
  );
}
