"use client";

const SORT_OPTIONS = [
  { value: "newest",      label: "Newest"           },
  { value: "name-asc",    label: "Name: A→Z"        },
  { value: "name-desc",   label: "Name: Z→A"        },
  { value: "price-asc",   label: "Price: Low to High" },
  { value: "price-desc",  label: "Price: High to Low" },
];

type Props = {
  open: boolean;
  value: string;
  onChange: (v: string) => void;
  onClose: () => void;
};

export function SortPanel({ open, value, onChange, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-[rgba(2,13,23,0.4)]" onClick={onClose} />

      {/* Panel */}
      <div className="w-full max-w-[320px] bg-beige-lighter flex flex-col shadow-[-8px_0px_40px_-8px_rgba(88,92,95,0.12)]">

        {/* Header */}
        <div className="px-5 pt-5 pb-4 flex items-center justify-between shrink-0">
          <button onClick={onClose} className="p-0.5 text-text-500 hover:text-text-900 transition-colors">
            <CloseIcon className="w-5 h-5" />
          </button>
          <p className="font-inter font-medium text-xl text-text-900">Sort</p>
          <div className="w-6" />
        </div>

        {/* Options */}
        <div className="flex-1 px-5 flex flex-col gap-1">
          {SORT_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex items-center gap-3 py-3 cursor-pointer border-b border-stroke-soft last:border-0">
              <div
                onClick={() => onChange(opt.value)}
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  value === opt.value ? "border-primary-base" : "border-stroke-soft"
                }`}
              >
                {value === opt.value && <div className="w-2 h-2 rounded-full bg-primary-base" />}
              </div>
              <span className={`font-jost text-sm ${value === opt.value ? "font-medium text-text-900" : "text-text-900"}`}>
                {opt.label}
              </span>
            </label>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-stroke-soft shrink-0">
          <button
            onClick={onClose}
            className="w-full h-[52px] rounded-pill bg-primary-base text-white font-jost text-sm font-medium hover:bg-primary-base/90 transition-colors"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}
