"use client";

import Link from "next/link";

type TimelineStep = "confirmed" | "processing" | "completed" | "delivered";

type OrderDetail = {
  id: string;
  displayId: string;
  productTitle: string;
  size: string;
  color: string;
  total: string;
  status: "pending" | TimelineStep;
  timeline: { step: TimelineStep; label: string; timestamp?: string }[];
  customer: { name: string; address: string; phone: string };
  productImage?: string;
};

const MOCK: OrderDetail = {
  id: "ord-001",
  displayId: "#3454586",
  productTitle: "Senator Wear for Men, African Men's Clothing",
  size: "Medium",
  color: "White",
  total: "95,000",
  status: "pending",
  timeline: [
    { step: "confirmed", label: "Confirmed", timestamp: "18-04 05:00AM" },
    { step: "processing", label: "Processing", timestamp: "18-04 05:00AM" },
    { step: "completed", label: "Completed", timestamp: "18-04 05:00AM" },
    { step: "delivered", label: "Delivered", timestamp: "18-04 05:00AM" },
  ],
  customer: {
    name: "Adesewa Akinwunmi",
    address:
      "Tesmot House, 3 Abdulrahman Okene Close, Off Ligali Ayorinde Street, Victoria Island, Lagos, Nigeria",
    phone: "081467852121010",
  },
};

export function VendorOrderDetailPage({ orderId }: { orderId: string }) {
  // TODO: replace with real lookup when API wires up
  const order = { ...MOCK, id: orderId };

  return (
    <div className="flex flex-col gap-6 max-w-[640px]">
      <Link
        href="/dashboard/vendor/orders"
        className="inline-flex items-center gap-1.5 font-jost font-medium text-base text-text-900 hover:text-primary-base transition-colors w-fit"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="m12.5 5-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </Link>

      <header className="flex flex-col gap-2">
        <h1 className="font-jost font-medium text-base leading-6 tracking-[-0.011em] text-text-900 truncate">
          {order.productTitle}
        </h1>
        <p className="font-jost text-sm leading-5 text-text-500 tracking-[-0.006em]">
          ID: {order.displayId}
        </p>
      </header>

      {order.status === "pending" && (
        <div className="flex items-center gap-2">
          <button className="bg-beige-lighter border border-stroke-soft rounded-full px-3 py-2.5 font-jost font-medium text-sm text-text-900 shadow-sm hover:bg-beige-base/30 transition-colors">
            Confirm order
          </button>
          <button className="bg-beige-lighter border border-stroke-soft rounded-full px-3 py-2.5 font-jost font-medium text-sm text-text-900 shadow-sm hover:bg-beige-base/30 transition-colors min-w-[111px]">
            Reject
          </button>
        </div>
      )}

      <section className="flex flex-col gap-4">
        <h2 className="font-jost font-medium text-lg leading-6 tracking-[-0.015em] text-text-900">
          Timeline
        </h2>
        <Timeline steps={order.timeline} currentStep={order.status === "pending" ? undefined : order.status} />
      </section>

      <section className="flex items-center gap-7 pt-2">
        <div className="w-20 h-20 rounded-[7px] bg-bg-soft overflow-hidden shrink-0" aria-hidden>
          {order.productImage && (
            <img src={order.productImage} alt="" className="w-full h-full object-cover" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-jost text-sm text-text-500 tracking-[-0.006em]">
            Size:{" "}
            <span className="text-text-900 underline">{order.size}</span>, Color: {order.color}
          </p>
          <p className="font-jost text-base text-text-500 tracking-[-0.011em]">
            Total:{" "}
            <span className="font-medium text-text-900">{order.total}</span>
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4 pt-4">
        <h2 className="font-jost font-medium text-lg leading-6 tracking-[-0.015em] text-text-900">
          Customer information
        </h2>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-bg-soft" aria-hidden />
            <p className="font-jost text-base text-text-900 tracking-[-0.011em]">
              {order.customer.name}
            </p>
          </div>
          <button className="inline-flex items-center gap-1 font-jost font-medium text-sm text-text-900 hover:text-primary-base transition-colors">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M3.333 5a1.667 1.667 0 0 1 1.667-1.667h10A1.667 1.667 0 0 1 16.667 5v7.5A1.667 1.667 0 0 1 15 14.167h-5L6.667 17.5v-3.333H5A1.667 1.667 0 0 1 3.333 12.5V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            Contact buyer
          </button>
        </div>

        <MapPlaceholder />

        <div className="flex flex-col gap-3">
          <p className="font-jost text-base text-text-900 tracking-[-0.011em]">
            {order.customer.address}
          </p>
          <div className="flex items-center gap-2">
            <p className="font-jost text-base text-text-900 tracking-[-0.011em]">
              Contact:
            </p>
            <div className="flex items-center gap-1">
              <p className="font-jost text-base text-text-900 tracking-[-0.011em]">
                {order.customer.phone}
              </p>
              <CopyButton value={order.customer.phone} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Timeline({
  steps,
  currentStep,
}: {
  steps: OrderDetail["timeline"];
  currentStep?: TimelineStep;
}) {
  const currentIndex = currentStep
    ? steps.findIndex((s) => s.step === currentStep)
    : -1;

  return (
    <div className="relative pt-2 pb-1">
      <div className="absolute left-3 right-3 top-5 h-[5px] bg-[#efeeec] rounded-full" aria-hidden />
      {currentIndex >= 0 && steps.length > 1 && (
        <div
          className="absolute left-3 top-5 h-[5px] bg-primary-base rounded-full"
          style={{
            width: `calc((100% - 24px) * ${currentIndex / (steps.length - 1)})`,
          }}
          aria-hidden
        />
      )}
      <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
        {steps.map((s, i) => {
          const reached = currentIndex >= 0 && i <= currentIndex;
          return (
            <li key={s.step} className="flex flex-col items-center gap-1">
              <span
                className={`w-6 h-6 rounded-full border-2 ${
                  reached ? "bg-primary-base border-primary-base" : "bg-white border-[#d6d3d1]"
                }`}
                aria-hidden
              />
              <span className="font-jost text-sm text-text-900 tracking-[-0.006em]">
                {s.label}
              </span>
              {s.timestamp && (
                <span className="font-jost text-xs text-text-500">{s.timestamp}</span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function MapPlaceholder() {
  return (
    <div
      className="relative h-[265px] w-full rounded-lg overflow-hidden bg-[#e6eaef]"
      aria-label="Delivery location map"
      role="img"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 570 265"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <path d="M0 80 Q 140 50 285 100 T 570 120" stroke="#3b82f6" strokeWidth="3" fill="none" opacity="0.5" />
        <path d="M0 180 Q 200 140 400 170 T 570 200" stroke="#93c5fd" strokeWidth="2" fill="none" />
        <path d="M100 0 L 140 265" stroke="#ffffff" strokeWidth="6" />
        <path d="M280 0 L 320 265" stroke="#ffffff" strokeWidth="4" />
        <path d="M420 0 L 460 265" stroke="#ffffff" strokeWidth="3" />
        <path d="M0 60 L 570 80" stroke="#ffffff" strokeWidth="3" />
        <path d="M0 220 L 570 210" stroke="#ffffff" strokeWidth="2" />
      </svg>
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full w-6 h-6 rounded-full bg-primary-base border-4 border-white shadow-lg"
        aria-hidden
      />
    </div>
  );
}

function CopyButton({ value }: { value: string }) {
  function handleCopy() {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(value).catch(() => {});
    }
  }
  return (
    <button
      onClick={handleCopy}
      aria-label="Copy phone number"
      className="p-0.5 rounded hover:bg-beige-lighter transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <rect x="4.67" y="4.67" width="8" height="8" rx="1.33" stroke="#585251" strokeWidth="1.2" />
        <path d="M3.33 10V4a1.33 1.33 0 0 1 1.33-1.33h6" stroke="#585251" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </button>
  );
}
