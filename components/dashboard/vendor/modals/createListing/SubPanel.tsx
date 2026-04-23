"use client";

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
}: {
  label?: string;
  value: string | undefined;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  return (
    <label className="relative flex flex-col gap-1 rounded-2xl border border-stroke-soft bg-white/40 px-4 py-3">
      {label && <span className="font-jost text-xs text-text-500">{label}</span>}
      <div className="flex items-center justify-between">
        <select
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent outline-none font-jost text-base text-text-900 appearance-none pr-6"
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden className="text-text-500 shrink-0 absolute right-4 bottom-3 pointer-events-none">
          <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </label>
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
