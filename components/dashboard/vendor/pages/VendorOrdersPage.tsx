"use client";

import Link from "next/link";
import { useState } from "react";

type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

type VendorOrder = {
  id: string;
  productTitle: string;
  variant: string;
  status: OrderStatus;
  placedAt: string;
  image: string;
};

const MOCK_ORDERS: VendorOrder[] = [
  {
    id: "ord-001",
    productTitle: "Senator Wear for Men, African Men's Clothing",
    variant: "Size: M, Color: White",
    status: "pending",
    placedAt: "12/4/25 17:05AM",
    image: "",
  },
];

const TABS: { key: "all" | OrderStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "processing", label: "Processing" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

const STATUS_STYLE: Record<OrderStatus, string> = {
  pending: "bg-bg-soft text-text-900",
  processing: "bg-yellow-light text-text-900",
  completed: "bg-primary-lighter text-primary-base",
  cancelled: "bg-bg-soft text-text-500",
};

export function VendorOrdersPage() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["key"]>("all");

  const orders =
    activeTab === "all"
      ? MOCK_ORDERS
      : MOCK_ORDERS.filter((o) => o.status === activeTab);

  return (
    <div className="flex flex-col">
      <nav
        aria-label="Order status"
        className="flex items-center gap-6 border-b border-stroke-soft pl-2 md:pl-12 py-3.5 -mx-5 md:-mx-8 lg:-mx-12 px-5 md:px-8 lg:px-12 mb-6"
      >
        {TABS.map(({ key, label }) => {
          const active = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`relative pb-3.5 -mb-3.5 font-jost font-medium text-base leading-6 tracking-[-0.011em] transition-colors ${
                active ? "text-text-900" : "text-text-500 hover:text-text-900"
              }`}
            >
              {label}
              {active && (
                <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-text-900 rounded-full" />
              )}
            </button>
          );
        })}
      </nav>

      {orders.length === 0 ? (
        <EmptyState tab={activeTab} />
      ) : (
        <ul className="flex flex-col gap-3">
          {orders.map((order) => (
            <li key={order.id}>
              <OrderCard order={order} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function OrderCard({ order }: { order: VendorOrder }) {
  return (
    <Link
      href={`/dashboard/vendor/orders/${order.id}`}
      className="flex items-center gap-4 bg-white rounded-xl p-4 hover:shadow-sm transition-shadow max-w-[546px]"
    >
      <div
        className="w-[100px] h-[100px] rounded-2xl bg-beige-base/40 shrink-0 overflow-hidden"
        aria-hidden
      >
        {order.image && (
          <img src={order.image} alt="" className="w-full h-full object-cover" />
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-6">
        <div className="flex items-start gap-2">
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            <p className="font-jost font-medium text-base leading-6 tracking-[-0.011em] text-text-900 truncate">
              {order.productTitle}
            </p>
            <p className="font-jost text-sm leading-5 text-text-500 tracking-[-0.006em]">
              {order.variant}
            </p>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            aria-label="More actions"
            className="p-2.5 rounded-full bg-beige-lighter hover:bg-beige-base/30 transition-colors shrink-0"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <circle cx="5" cy="10" r="1.5" fill="#140b0a" />
              <circle cx="10" cy="10" r="1.5" fill="#140b0a" />
              <circle cx="15" cy="10" r="1.5" fill="#140b0a" />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={order.status} />
          <span className="font-jost text-xs leading-4 text-text-500">
            {order.placedAt}
          </span>
        </div>
      </div>
    </Link>
  );
}

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 pl-1 pr-2 py-0.5 rounded font-jost font-medium text-[11px] leading-3 tracking-[0.22px] uppercase ${STATUS_STYLE[status]}`}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
        <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M6 3.5V6l1.5 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      {status}
    </span>
  );
}

function EmptyState({ tab }: { tab: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <p className="font-jost font-medium text-base text-text-900 mb-1">
        No {tab === "all" ? "" : tab} orders yet
      </p>
      <p className="font-jost text-sm text-text-500 max-w-xs">
        Orders you receive from customers will appear here.
      </p>
    </div>
  );
}
