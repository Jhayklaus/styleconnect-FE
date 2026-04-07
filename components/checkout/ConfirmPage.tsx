"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LOGO_SRC = "/images/logo.png";

const CART_ITEMS = [
  {
    id: "1",
    image: "/images/product-1.png",
    name: "Senator Wear for Men, African Men's C",
    color: "L",
    size: "White",
    price: 5000000,
  },
  {
    id: "2",
    image: "/images/product-2.png",
    name: "Senator Wear for Men, African Men's C",
    color: "L",
    size: "White",
    price: 5000000,
  },
  {
    id: "3",
    image: "/images/product-1.png",
    name: "Senator Wear for Men, African Men's C",
    color: "L",
    size: "White",
    price: 5000000,
  },
];

const DELIVERY_ADDRESS = {
  name: "Hakim Adebowale",
  phone: "234816784210",
  address: "11 Akindele road, New garage, Lagos Nigeria",
};

export function ConfirmPage() {
  const router = useRouter();
  const [discountCode, setDiscountCode] = useState("");
  const [cartOpen, setCartOpen] = useState(true);

  const subtotal = CART_ITEMS.reduce((sum, item) => sum + item.price, 0);
  const tax = Math.round(subtotal * 0.075);
  const deliveryFee = 5000000;
  const total = subtotal + tax + deliveryFee;

  function handlePlaceOrder() {
    router.push("/dashboard/orders/mock-order-1");
  }

  function handleEditAddress() {
    router.push("/checkout?step=saved-address");
  }

  return (
    <div className="min-h-screen bg-beige-lighter flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-5 md:px-10 h-16 border-b border-stroke-soft bg-beige-lighter shrink-0">
        {/* Logo */}
        <div className="flex items-center shrink-0 mr-4">
          <Image
            src={LOGO_SRC}
            alt="StylesConnect"
            width={24}
            height={31}
            className="lg:w-[31px] lg:h-[40px]"
            priority
          />
        </div>
        <div className="w-9 h-9 rounded-full bg-[#f5c842] flex items-center justify-center font-jost font-medium text-sm text-text-900">
          HA
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 flex flex-col md:flex-row gap-0 md:gap-8 px-5 md:px-10 lg:px-20 py-8 md:py-10">
        {/* Left — address + info */}
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="font-inter font-medium text-2xl md:text-[28px] text-text-900">
            Confirm checkout
          </h1>

          {/* Delivery address */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="font-jost font-medium text-sm text-text-900">Delivery address</p>
              <button
                onClick={handleEditAddress}
                className="flex items-center gap-1 font-jost text-xs text-primary-base hover:underline"
              >
                <PencilIcon className="w-3.5 h-3.5" />
                Edit
              </button>
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="font-jost font-medium text-sm text-text-900">{DELIVERY_ADDRESS.name}</p>
              <p className="font-jost text-xs text-text-500">{DELIVERY_ADDRESS.phone}</p>
              <p className="font-jost text-xs text-text-500 mt-1">{DELIVERY_ADDRESS.address}</p>
            </div>
          </div>

          {/* Delivery estimate */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full border border-stroke-soft flex items-center justify-center shrink-0">
              <ClockIcon className="w-4 h-4 text-text-500" />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="font-jost font-medium text-sm text-text-900">Delivered in 10 days</p>
              <p className="font-jost text-xs text-text-500">
                Order today to be delivered before March 27th
              </p>
            </div>
          </div>

          {/* Payment protection */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full border border-stroke-soft flex items-center justify-center shrink-0">
              <ShieldIcon className="w-4 h-4 text-text-500" />
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="font-jost font-medium text-sm text-text-900">Payment protection</p>
              <p className="font-jost text-xs text-text-500">
                Payments are protected until the store fulfills order.{" "}
                <button className="underline">Learn more</button>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px bg-stroke-soft self-stretch" />
        <div className="md:hidden h-px bg-stroke-soft my-2" />

        {/* Right — summary */}
        <div className="md:w-[420px] flex flex-col gap-4">
          {/* Summary header */}
          <div className="flex items-center justify-between">
            <p className="font-inter font-medium text-xl text-text-900">Summary</p>
          </div>

          {/* Cart items toggle */}
          <div className="border border-stroke-soft rounded-2xl overflow-hidden">
            <button
              onClick={() => setCartOpen((v) => !v)}
              className="w-full flex items-center justify-between px-4 py-3"
            >
              <p className="font-jost font-medium text-sm text-text-900">
                Cart items ({CART_ITEMS.length})
              </p>
              <ChevronUpIcon className={`w-4 h-4 text-text-500 transition-transform ${cartOpen ? "" : "rotate-180"}`} />
            </button>

            {cartOpen && (
              <div className="border-t border-stroke-soft divide-y divide-stroke-soft">
                {CART_ITEMS.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 px-4 py-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-bg-soft shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-jost text-xs text-text-900 line-clamp-1">{item.name}</p>
                      <p className="font-jost text-xs text-text-500">
                        Color: {item.color}, Size: {item.size}
                      </p>
                    </div>
                    <p className="font-jost font-medium text-sm text-text-900 shrink-0">
                      ₦{item.price.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Discount code */}
          <div className="flex items-center gap-2 border border-stroke-soft rounded-xl overflow-hidden">
            <input
              type="text"
              placeholder="Discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="flex-1 h-11 px-3 bg-transparent font-jost text-sm text-text-900 placeholder:text-text-400 outline-none"
            />
            <button className="shrink-0 h-11 px-4 font-jost text-sm font-medium text-text-500 hover:text-text-900 transition-colors">
              Apply
            </button>
          </div>

          {/* Line items */}
          <div className="flex flex-col gap-2">
            {[
              { label: "Sub total", value: subtotal },
              { label: "Tax (VAT)", value: tax },
              { label: "Delivery fee", value: deliveryFee },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="font-jost text-sm text-text-500">{label}</span>
                <span className="font-jost text-sm text-text-900">₦{value.toLocaleString()}</span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2 border-t border-stroke-soft">
              <span className="font-jost font-medium text-base text-text-900">Total</span>
              <span className="font-jost font-medium text-base text-text-900">₦{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Place order */}
          <button
            onClick={handlePlaceOrder}
            className="w-full h-[52px] rounded-pill bg-primary-base text-white font-jost font-medium text-base hover:bg-primary-base/90 transition-colors"
          >
            Place order
          </button>
        </div>
      </main>
    </div>
  );
}

function PencilIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2.5l3 3L6 17H3v-3L14.5 2.5z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="7.5" />
      <path d="M10 6v4l2.5 2.5" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2L3 5v5c0 4 3.1 7.7 7 8.9C17 17.7 17 14 17 10V5l-7-3z" />
    </svg>
  );
}

function ChevronUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l5-5 5 5" />
    </svg>
  );
}
