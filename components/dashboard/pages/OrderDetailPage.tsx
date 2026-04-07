"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { OrderTimelineModal } from "@/components/dashboard/modals/OrderTimelineModal";

const ORDER = {
  id: "#3454586",
  status: "Delivered",
  date: "Placed on Jan 25, 2026 03:15 AM",
  deliveryDate: "Jan. 26th",
  estimatedDelivery: "Apr 15, 2025",
  item: {
    image: "/images/product-1.png",
    name: "Senator Wear for Men, African Men's Clothing",
    orderNo: "#3454586",
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
    placed: "Apr 2, 2025 09:24",
  },
  rating: 4,
};

// const STATUS_STYLES: Record<string, string> = {
//   Delivered: "bg-green-50 text-green-700",
//   Pending: "bg-[#fff4e5] text-[#b45309]",
//   Processing: "bg-blue-50 text-blue-700",
//   Cancelled: "bg-red-50 text-red-500",
// };

export function OrderDetailPage() {
  const [timelineOpen, setTimelineOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-5 max-w-[600px]">

        {/* Back */}
        <Link
          href="/dashboard/orders"
          className="flex items-center gap-1.5 font-jost text-sm text-text-500 hover:text-text-900 transition-colors self-start"
        >
          <ChevronLeftIcon className="w-4 h-4" />
          Order details
        </Link>

        {/* Status + date */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-3">
            <span className={`inline-flex items-center font-jost font-medium `}>
              {ORDER.status}
            </span>
            <button className="flex items-center gap-1.5 font-jost text-xs text-text-500 transition-colors">
              <ChatIcon />
              Contact seller
              <ChevronRightIcon className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="font-jost text-xs text-text-500">{ORDER.date}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} filled={i < ORDER.rating} className="w-4 h-4" />
          ))}
        </div>

        {/* Delivery banner */}
        <div className="bg-gray-200 rounded-2xl px-4 py-3 flex items-end gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-jost font-medium text-sm text-text-900">
              Delivered {ORDER.deliveryDate}
            </p>
            <div className="flex mt-5 gap-2">
              <DeliveryIcon className="w-5 h-5 text-[#b45309] shrink-0" />
              <div>
                <p className="font-jost text-xs text-text-500 mt-0.5">
                  Your order has been sent to the store
                </p>
                <p className="font-jost text-xs text-text-500 mt-0.5">
                  Apr 3, 2025 09:26
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setTimelineOpen(true)}
            className="shrink-0 h-8 px-3 rounded-pill bg-[#F2AE40] text-white font-jost text-xs font-medium hover:bg-[#F2AE40]/90 transition-colors"
          >
            View timeline
          </button>
        </div>

        {/* Product */}
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-bg-soft shrink-0">
            <Image src={ORDER.item.image} alt={ORDER.item.name} fill className="object-cover" />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="font-jost font-medium text-sm text-text-900">{ORDER.item.name}</p>
            <p className="font-jost text-xs text-text-500">{ORDER.item.orderNo}</p>
            <p className="font-jost text-xs text-text-500">Size: {ORDER.item.size}, Color: {ORDER.item.color}</p>

            <div className="flex items-center gap-3 mt-5">
              <button className="h-10 px-5 rounded-pill border border-stroke-soft font-jost text-sm text-text-900 hover:bg-beige-lighter transition-colors">
                Order again
              </button>
              <button className="h-10 px-5 rounded-pill border border-stroke-soft font-jost text-sm text-text-500 hover:bg-beige-lighter transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}


        <div className="h-px bg-stroke-soft" />

        <Section title="Summary">
          <Row label="Sub total" value={`₦${ORDER.summary.subtotal.toLocaleString()}`} />
          <Row label="Discount" value={`₦${ORDER.summary.discount.toLocaleString()}`} />
          <div className="pt-2 border-t border-stroke-soft mt-1">
            <Row label="Total" value={`₦${ORDER.summary.total.toLocaleString()}`} bold />
          </div>
        </Section>

        <div className="h-px bg-stroke-soft" />

        <Section title="Shipping address">
          <p className="font-jost text-sm text-text-500">Name: {ORDER.shipping.name}</p>
          <p className="font-jost text-sm text-text-500">Contact: {ORDER.shipping.contact}</p>
          <p className="font-jost text-sm text-text-500">Address: {ORDER.shipping.address}</p>
        </Section>

        <div className="h-px bg-stroke-soft" />

        <Section title="Payment method">
          <p className="font-jost text-sm text-text-500">{ORDER.payment}</p>
        </Section>

        <div className="h-px bg-stroke-soft" />

        <Section title="Order information">
          <p className="font-jost text-sm text-text-500">Order No: {ORDER.orderInfo.orderNo}</p>
          <p className="font-jost text-sm text-text-500">Order placed on: {ORDER.orderInfo.placed}</p>
        </Section>
      </div>

      <OrderTimelineModal
        open={timelineOpen}
        onClose={() => setTimelineOpen(false)}
        estimatedDelivery={ORDER.estimatedDelivery}
      />
    </>
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
      <span className={`font-jost text-sm ${bold ? "font-medium text-text-900" : "text-text-500"}`}>{label}</span>
      <span className={`font-jost text-sm ${bold ? "font-medium text-text-900" : "text-text-500"}`}>{value}</span>
    </div>
  );
}

function StarIcon({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill={filled ? "#E8C5A5" : "none"} stroke="#E8C5A5" strokeWidth={1.5}>
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

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.8334 2.5C16.4965 2.5 17.1323 2.76339 17.6012 3.23223C18.07 3.70107 18.3334 4.33696 18.3334 5V13.3333C18.3334 13.9964 18.07 14.6323 17.6012 15.1011C17.1323 15.5699 16.4965 15.8333 15.8334 15.8333H6.11091L3.33341 17.9167C2.64675 18.4317 1.66675 17.9417 1.66675 17.0833V5C1.66675 4.33696 1.93014 3.70107 2.39898 3.23223C2.86782 2.76339 3.50371 2.5 4.16675 2.5H15.8334ZM15.8334 4.16667H4.16675C3.94573 4.16667 3.73377 4.25446 3.57749 4.41074C3.42121 4.56702 3.33341 4.77899 3.33341 5V15.8333L5.11091 14.5C5.39941 14.2836 5.7503 14.1667 6.11091 14.1667H15.8334C16.0544 14.1667 16.2664 14.0789 16.4227 13.9226C16.579 13.7663 16.6667 13.5543 16.6667 13.3333V5C16.6667 4.77899 16.579 4.56702 16.4227 4.41074C16.2664 4.25446 16.0544 4.16667 15.8334 4.16667ZM9.16675 10C9.37915 10.0002 9.58344 10.0816 9.73789 10.2274C9.89234 10.3732 9.98528 10.5725 9.99772 10.7845C10.0102 10.9965 9.94119 11.2053 9.80486 11.3682C9.66854 11.5311 9.47516 11.6357 9.26425 11.6608L9.16675 11.6667H6.66675C6.45435 11.6664 6.25005 11.5851 6.09561 11.4393C5.94116 11.2935 5.84822 11.0942 5.83577 10.8822C5.82332 10.6701 5.89231 10.4614 6.02864 10.2985C6.16496 10.1356 6.35833 10.0309 6.56925 10.0058L6.66675 10H9.16675ZM13.3334 6.66667C13.5544 6.66667 13.7664 6.75446 13.9227 6.91074C14.079 7.06703 14.1667 7.27899 14.1667 7.5C14.1667 7.72101 14.079 7.93298 13.9227 8.08926C13.7664 8.24554 13.5544 8.33333 13.3334 8.33333H6.66675C6.44573 8.33333 6.23377 8.24554 6.07749 8.08926C5.92121 7.93298 5.83341 7.72101 5.83341 7.5C5.83341 7.27899 5.92121 7.06703 6.07749 6.91074C6.23377 6.75446 6.44573 6.66667 6.66675 6.66667H13.3334Z" fill="#585251" />
    </svg>

  );
}

function DeliveryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="12" fill="#140B0A" />
      <path d="M10.0499 17.1993C10.2223 17.1993 10.3876 17.2678 10.5095 17.3897C10.6314 17.5116 10.6999 17.677 10.6999 17.8493C10.6999 18.0217 10.6314 18.1871 10.5095 18.309C10.3876 18.4309 10.2223 18.4993 10.0499 18.4993C9.87753 18.4993 9.7122 18.4309 9.5903 18.309C9.4684 18.1871 9.39992 18.0217 9.39992 17.8493C9.39992 17.677 9.4684 17.5116 9.5903 17.3897C9.7122 17.2678 9.87753 17.1993 10.0499 17.1993ZM14.5999 17.1993C14.7723 17.1993 14.9376 17.2678 15.0595 17.3897C15.1814 17.5116 15.2499 17.677 15.2499 17.8493C15.2499 18.0217 15.1814 18.1871 15.0595 18.309C14.9376 18.4309 14.7723 18.4993 14.5999 18.4993C14.4275 18.4993 14.2622 18.4309 14.1403 18.309C14.0184 18.1871 13.9499 18.0217 13.9499 17.8493C13.9499 17.677 14.0184 17.5116 14.1403 17.3897C14.2622 17.2678 14.4275 17.1993 14.5999 17.1993ZM6.47167 5.90949L6.53992 5.95499L7.65012 6.78699C7.83905 6.92875 7.98579 7.11931 8.07457 7.33819L8.11357 7.44934H16.4635C16.6397 7.4493 16.8141 7.48508 16.976 7.55452C17.138 7.62395 17.2842 7.72559 17.4056 7.85326C17.5271 7.98093 17.6213 8.13196 17.6826 8.29717C17.7439 8.46239 17.771 8.63834 17.7622 8.81434L17.7537 8.91054L17.4567 11.2863C17.3675 12.0012 17.0433 12.6663 16.535 13.1769C16.0268 13.6876 15.3632 14.0148 14.6487 14.1073L14.5018 14.1222L9.74832 14.5187L9.91732 15.2493H15.5749C15.7406 15.2495 15.8999 15.313 16.0204 15.4267C16.1409 15.5404 16.2134 15.6959 16.2231 15.8612C16.2328 16.0266 16.179 16.1895 16.0726 16.3165C15.9663 16.4436 15.8155 16.5252 15.651 16.5448L15.5749 16.5493H9.91732C9.64146 16.5494 9.37274 16.4617 9.15002 16.2989C8.92731 16.1361 8.76214 15.9067 8.67842 15.6439L8.65047 15.5418L6.86947 7.82634L5.75992 6.99434C5.6331 6.89929 5.54538 6.76118 5.51325 6.60599C5.48113 6.4508 5.5068 6.28921 5.58546 6.15162C5.66412 6.01403 5.79033 5.90992 5.94036 5.85887C6.0904 5.80782 6.25392 5.81333 6.40017 5.87439L6.47167 5.90949ZM16.4635 8.74934H8.41647L9.45322 13.2382L14.3932 12.8268C14.8391 12.7897 15.2586 12.6004 15.5815 12.2907C15.9043 11.981 16.1108 11.5697 16.1664 11.1257L16.4635 8.74934Z" fill="white" />
    </svg>

  );
}
