"use client";

import { useEffect, useRef, useState } from "react";

export function SubPanel({
  title,
  subtitle,
  onClose,
  footer,
  children,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="absolute inset-0 bg-beige-lighter flex flex-col">
      <div className="px-6 pt-6">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="p-1 -ml-1 text-text-900 hover:opacity-70"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </button>
        <h2 className="mt-4 font-inter font-medium text-2xl leading-8 text-text-900 tracking-[-0.011em]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-3 font-jost text-base text-text-900 leading-6">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-6">{children}</div>

      <div className="border-t border-stroke-soft px-6 py-5 bg-beige-lighter">{footer}</div>
    </div>
  );
}

export function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
  disabled,
}: {
  label?: string;
  value: string | undefined;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className="w-full flex flex-col gap-1 rounded-2xl border border-stroke-soft bg-white/40 px-4 py-3 text-left disabled:opacity-50"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {label && <span className="font-jost text-xs text-text-500">{label}</span>}
        <div className="flex items-center justify-between gap-2">
          <span className={`font-jost text-base ${selected ? "text-text-900" : "text-text-500"}`}>
            {selected?.label ?? placeholder}
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden
            className={`text-text-500 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          >
            <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      {open && options.length > 0 && (
        <ul
          role="listbox"
          className="absolute z-20 left-0 right-0 mt-2 max-h-60 overflow-y-auto rounded-2xl border border-stroke-soft bg-white shadow-lg py-1"
        >
          {options.map((o) => {
            const active = o.value === value;
            return (
              <li key={o.value} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 font-jost text-base hover:bg-beige-lighter ${
                    active ? "text-primary-darker font-medium" : "text-text-900"
                  }`}
                >
                  {o.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full h-12 rounded-pill bg-primary-darker text-white font-jost font-medium text-base hover:opacity-95 transition-opacity disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
