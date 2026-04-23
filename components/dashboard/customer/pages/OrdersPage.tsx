"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Status = "All" | "Pending" | "Processing" | "Completed" | "Cancelled";

const TABS: Status[] = ["All", "Pending", "Processing", "Completed", "Cancelled"];

const ORDERS = [
  { id: "3454365", name: "Senator Wear for Men, African Men's Clothi...", image: "/images/product-1.png", size: "M", color: "White", status: "Pending", date: "12/4/25 17:02AM" },
  { id: "3454366", name: "Senator Wear for Men, African Men's Clothi...", image: "/images/product-2.png", size: "M", color: "White", status: "Processing", date: "12/4/25 17:02AM" },
  { id: "3454366", name: "Senator Wear for Men, African Men's Clothi...", image: "/images/product-2.png", size: "M", color: "White", status: "Completed", date: "12/4/25 17:02AM" },
  { id: "3454366", name: "Senator Wear for Men, African Men's Clothi...", image: "/images/product-2.png", size: "M", color: "White", status: "Cancelled", date: "12/4/25 17:02AM" },
];

function StatusIcon({ status }: { status: string }) {
  if (status === "Pending")
    return (
      <svg width="10" height="10" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="7.5" />
        <path d="M10 6v4l2.5 2.5" />
      </svg>
    );
  if (status === "Processing")
    return (
      <svg width="10" height="10" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4a8 8 0 1 1 0 12" />
        <path d="M4 8V4H8" />
      </svg>
    );
  if (status === "Completed")
    return (
      <svg width="10" height="10" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="7.5" />
        <path d="M6.5 10l2.5 2.5 4.5-4.5" />
      </svg>
    );
  if (status === "Cancelled")
    return (
      <svg width="10" height="10" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
        <circle cx="10" cy="10" r="7.5" />
        <path d="M7 7l6 6M13 7l-6 6" />
      </svg>
    );
  return null;
}

const STATUS_STYLES: Record<string, string> = {
  Pending: "bg-[#ECEBEB] text-[#000]",
  Processing: "bg-blue-50 text-blue-700",
  Completed: "bg-green-50 text-green-700",
  Cancelled: "bg-red-50 text-red-500",
};

export function OrdersPage() {
  const [activeTab, setActiveTab] = useState<Status>("All");

  const filtered = activeTab === "All"
    ? ORDERS
    : ORDERS.filter((o) => o.status === activeTab);

  return (
    <div className="flex flex-col gap-4 w-2/3">

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-stroke-soft">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-3 pb-2.5 pt-1 font-jost text-sm transition-colors ${activeTab === tab ? "text-text-900 font-medium" : "text-text-500 hover:text-text-900"
              }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-base rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Order list */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <p className="font-jost text-sm text-text-500 py-8 text-center">No orders found.</p>
        ) : (
          filtered.map((order) => (
            <Link
              key={order.id}
              href={`/dashboard/orders/${order.id}`}
              className="flex items-center gap-4 bg-white rounded-2xl border border-stroke-soft px-4 py-4 hover:border-text-300 transition-colors"
            >
              <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden bg-bg-soft shrink-0">
                <Image src={order.image} alt={order.name} fill className="object-cover" />
              </div>
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <p className="font-jost font-medium text-sm text-text-900 line-clamp-1">{order.name}</p>
                <p className="font-jost text-xs text-text-500">ID: #{order.id}</p>
                <p className="font-jost text-xs text-text-500">Size: {order.size}, Color: {order.color}</p>
                <div className={`mt-5 w-fit inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-jost text-[10px] font-medium uppercase tracking-wide ${STATUS_STYLES[order.status] ?? ""}`}>
                  <StatusIcon status={order.status} />
                  {order.status}
                </div>
                <span className="font-jost text-xs text-text-500">{order.date}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
