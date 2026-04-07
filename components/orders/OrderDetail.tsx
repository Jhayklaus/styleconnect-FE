"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const ORDER = {
  id: "#414X386",
  status: "Pending",
  date: "Placed on Jan 10, 2026 03:15 AM",
  deliveryDate: "Jan 4 2026",
  item: {
    image: "/images/product-1.png",
    name: "Senator Wear for Men, African Men's Clothing",
    orderNo: "#414X386",
    size: "M",
    color: "White",
  },
  summary: {
    subtotal: 2100000,
    discount: 0,
    total: 2100000,
  },
  shipping: {
    name: "Dave Jones",
    contact: "08175129025",
    address: "11 Commercial Avenue, Isiw, Lagos, Nigeria",
  },
  payment: "Debit card, Mastercard .... 2654",
  orderInfo: {
    orderNo: "NO.00260192829121-1",
    placed: "Apr 2, 2025 00:24",
  },
  rating: 4,
};

export function OrderDetail() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
        {/* Back */}
        <button
          onClick={() => router.push("/dashboard/orders")}
          className="flex items-center gap-1.5 font-jost text-sm text-text-500 hover:text-text-900 transition-colors self-start"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          Order details
        </button>

        {/* Status */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#fff4e5] font-jost text-xs font-medium text-[#b45309]">
              {ORDER.status}
            </span>
          </div>
          <p className="font-jost text-xs text-text-500">{ORDER.date}</p>

          {/* Contact seller */}
          <div className="flex items-center justify-end mt-1">
            <button className="flex items-center gap-1.5 font-jost text-xs text-text-500 border border-stroke-soft rounded-xl px-3 py-2 hover:bg-beige-lighter transition-colors">
              Contact seller
              <ChevronRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} filled={i < ORDER.rating} className="w-4 h-4" />
          ))}
        </div>

        {/* Delivery info */}
        <div className="bg-[#fef7ec] rounded-2xl px-4 py-3 flex items-start gap-3">
          <DeliveryIcon className="w-5 h-5 text-[#b45309] shrink-0 mt-0.5" />
          <div>
            <p className="font-jost font-medium text-sm text-text-900">
              Expecting delivery on {ORDER.deliveryDate}
            </p>
            <p className="font-jost text-xs text-text-500 mt-0.5">
              Starting out ready. Waiting for store to accept your order
            </p>
          </div>
        </div>

        {/* Product */}
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-bg-soft shrink-0">
            <Image src={ORDER.item.image} alt={ORDER.item.name} fill className="object-cover" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-jost font-medium text-sm text-text-900">{ORDER.item.name}</p>
            <p className="font-jost text-xs text-text-500">{ORDER.item.orderNo}</p>
            <p className="font-jost text-xs text-text-500">
              Size: {ORDER.item.size}, Color: {ORDER.item.color}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="h-10 px-5 rounded-pill border border-stroke-soft font-jost text-sm text-text-900 hover:bg-beige-lighter transition-colors">
            Order again
          </button>
          <button className="h-10 px-5 rounded-pill border border-stroke-soft font-jost text-sm text-text-500 hover:bg-beige-lighter transition-colors">
            Cancel
          </button>
        </div>

        {/* Summary */}
        <Section title="Summary">
          <div className="flex flex-col gap-2">
            <Row label="Sub total" value={`₦${ORDER.summary.subtotal.toLocaleString()}`} />
            <Row label="Discount" value={`₦${ORDER.summary.discount.toLocaleString()}`} />
            <div className="pt-2 border-t border-stroke-soft">
              <Row label="Total" value={`₦${ORDER.summary.total.toLocaleString()}`} bold />
            </div>
          </div>
        </Section>

        {/* Shipping address */}
        <Section title="Shipping address">
          <div className="flex flex-col gap-0.5 font-jost text-sm text-text-500">
            <p>Name: {ORDER.shipping.name}</p>
            <p>Contact: {ORDER.shipping.contact}</p>
            <p>Address: {ORDER.shipping.address}</p>
          </div>
        </Section>

        {/* Payment method */}
        <Section title="Payment method">
          <p className="font-jost text-sm text-text-500">{ORDER.payment}</p>
        </Section>

        {/* Order information */}
        <Section title="Order information">
          <div className="flex flex-col gap-0.5 font-jost text-sm text-text-500">
            <p>Order No: {ORDER.orderInfo.orderNo}</p>
            <p>Order placed on: {ORDER.orderInfo.placed}</p>
          </div>
        </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-jost font-medium text-sm text-text-900">{title}</p>
      {children}
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`font-jost text-sm ${bold ? "font-medium text-text-900" : "text-text-500"}`}>
        {label}
      </span>
      <span className={`font-jost text-sm ${bold ? "font-medium text-text-900" : "text-text-500"}`}>
        {value}
      </span>
    </div>
  );
}

function StarIcon({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill={filled ? "#f59e0b" : "none"} stroke="#f59e0b" strokeWidth={1.5}>
      <path d="M10 2l2.4 5 5.6.8-4 3.9.9 5.5L10 14.5l-4.9 2.7.9-5.5L2 7.8l5.6-.8L10 2z" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.5 5l-5 5 5 5" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.5 5l5 5-5 5" />
    </svg>
  );
}

function DeliveryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function MenuIcon({ type, className }: { type: string; className?: string }) {
  if (type === "person") return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="6" r="3.5" />
      <path d="M2.5 18c0-4.14 3.36-7.5 7.5-7.5s7.5 3.36 7.5 7.5" />
    </svg>
  );
  if (type === "order") return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="14" height="14" rx="2" />
      <path d="M7 7h6M7 10h6M7 13h4" />
    </svg>
  );
  if (type === "location") return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2C7.24 2 5 4.24 5 7c0 4.25 5 11 5 11s5-6.75 5-11c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 1110 5a1.5 1.5 0 010 3.5z" />
    </svg>
  );
  if (type === "wallet") return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="16" height="12" rx="2" />
      <path d="M2 9h16" />
      <circle cx="14.5" cy="13" r="1" fill="currentColor" />
    </svg>
  );
  if (type === "ruler") return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="16" height="6" rx="1" transform="rotate(-45 10 10)" />
      <path d="M7 13l1.5-1.5M10 10l1.5-1.5M13 7l1.5-1.5" />
    </svg>
  );
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10h14M10 3l7 7-7 7" />
    </svg>
  );
}
