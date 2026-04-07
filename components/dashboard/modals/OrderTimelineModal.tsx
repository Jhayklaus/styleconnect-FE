"use client";

type TimelineStep = {
  label: string;
  description: string;
  date: string;
  completed: boolean;
};

const TIMELINE: TimelineStep[] = [
  { label: "Delivered",             description: "Your item has been delivered",                        date: "Apr 3, 2025 09:24", completed: true  },
  { label: "Shipped",               description: "Your order is ready and shipped to your address.",    date: "Apr 3, 2025 09:24", completed: false },
  { label: "Processing/in production", description: "Your order is being prepared",                    date: "Apr 3, 2025 09:24", completed: false },
  { label: "Pending confirmation",  description: "Awaiting order confirmation by seller",              date: "Apr 2, 2025 09:24", completed: false },
  { label: "Order placed",          description: "Your payment has been confirmed",                    date: "Apr 3, 2025 09:24", completed: false },
];

type Props = {
  open: boolean;
  onClose: () => void;
  estimatedDelivery?: string;
};

export function OrderTimelineModal({ open, onClose, estimatedDelivery = "Apr 15, 2025" }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-[rgba(2,13,23,0.4)]" onClick={onClose} />

      {/* Panel — slides from right */}
      <div className="w-full max-w-[480px] bg-beige-lighter flex flex-col shadow-[-8px_0px_40px_-8px_rgba(88,92,95,0.12)] overflow-y-auto">

        {/* Close */}
        <div className="px-5 pt-5 pb-3 shrink-0">
          <button
            onClick={onClose}
            className="p-0.5 rounded-md hover:bg-bg-soft transition-colors text-text-500 hover:text-text-900"
            aria-label="Close"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Estimated delivery */}
        <div className="px-5 pb-6 shrink-0">
          <p className="font-jost text-sm text-text-500">Estimated Delivery:</p>
          <p className="font-inter font-medium text-2xl text-text-900 mt-0.5">{estimatedDelivery}</p>
        </div>

        {/* Timeline */}
        <div className="px-5 pb-8 flex flex-col gap-0">
          <p className="font-jost font-medium text-sm text-text-900 mb-4">Timeline</p>

          <div className="relative flex flex-col">
            {TIMELINE.map((step, i) => (
              <div key={i} className="flex gap-3 relative">
                {/* Line */}
                {i < TIMELINE.length - 1 && (
                  <div className="absolute left-[9px] top-5 bottom-0 w-px bg-stroke-soft" />
                )}

                {/* Dot */}
                <div className={`relative z-10 mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  step.completed
                    ? "border-green-500 bg-green-500"
                    : "border-stroke-soft bg-white"
                }`}>
                  {step.completed && (
                    <CheckIcon className="w-3 h-3 text-white" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-6">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-jost font-medium text-sm text-text-900">{step.label}</p>
                    <p className="font-jost text-xs text-text-500 shrink-0">{step.date}</p>
                  </div>
                  <p className="font-jost text-xs text-text-500 mt-0.5">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
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

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6l3 3 5-5" />
    </svg>
  );
}
