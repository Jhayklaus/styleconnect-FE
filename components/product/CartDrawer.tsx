"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";

const CART_ITEMS = [
  {
    id: "1",
    image: "/images/product-1.png",
    storeName: "Roda Enterprise",
    name: "Senator Wear for Men, African Men's Clothing, Nigerian Native Attire",
    color: "L",
    size: "Gray White",
    price: 5000000,
  },
  {
    id: "2",
    image: "/images/product-2.png",
    storeName: "Roda Enterprise",
    name: "Senator Wear for Men, African Men's Clothing, Fatima Attire",
    color: "L",
    size: "Gray White",
    price: 5000000,
  },
];

export function CartDrawer() {
  const router = useRouter();
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  const [items, setItems] = useState(
    CART_ITEMS.map((item) => ({ ...item, qty: 1 }))
  );
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  function updateQty(id: string, delta: number) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function handleClose() {
    router.push(pathname);
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-[rgba(2,13,23,0.19)]"
        onClick={handleClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[440px] bg-beige-lighter flex flex-col shadow-[-8px_0px_40px_-8px_rgba(88,92,95,0.12)]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stroke-soft shrink-0">
          <p className="font-jost font-medium text-base text-text-900">
            Cart ({items.length})
          </p>
          <button
            onClick={handleClose}
            className="p-0.5 rounded-md hover:bg-bg-soft transition-colors text-text-500 hover:text-text-900"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              {/* Image */}
              <div className="relative w-[80px] h-[80px] rounded-xl overflow-hidden bg-bg-soft shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-0.5">
                    <p className="font-jost font-medium text-sm text-text-900">{item.storeName}</p>
                    <p className="font-jost text-xs text-text-500 line-clamp-2">{item.name}</p>
                    <p className="font-jost text-xs text-text-500">
                      Color: {item.color}, Size: {item.size}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="shrink-0 text-text-500 hover:text-red-500 transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <p className="font-jost font-medium text-sm text-text-900">
                    ₦{(item.price * item.qty).toLocaleString()}
                  </p>
                  {/* Qty */}
                  <div className="flex items-center gap-2 border border-stroke-soft rounded-xl px-2 h-8">
                    <button onClick={() => updateQty(item.id, -1)} className="text-text-500 hover:text-text-900">
                      <MinusIcon className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-jost text-sm text-text-900 w-4 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="text-text-500 hover:text-text-900">
                      <PlusIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="shrink-0 px-5 pb-6 flex flex-col gap-4 border-t border-stroke-soft pt-4">
          <div className="flex items-center justify-between">
            <span className="font-jost text-sm text-text-500">Sub total</span>
            <span className="font-jost font-medium text-base text-text-900">
              ₦{subtotal.toLocaleString()}
            </span>
          </div>

          <button
            onClick={() => {
              if (isSignedIn) {
                router.push("/checkout?step=saved-address");
              } else {
                const returnTo = encodeURIComponent("/?modal=search-address&returnTo=/checkout/confirm");
                router.push(`/?modal=onboarding&step=create-account&returnTo=${returnTo}`);
              }
            }}
            className="w-full h-[52px] rounded-pill bg-primary-base text-white font-jost font-medium text-base hover:bg-primary-base/90 transition-colors"
          >
            Checkout
          </button>

          <Accordion title="Payment protection" open={paymentOpen} onToggle={() => setPaymentOpen((v) => !v)}>
            Payments are protected and we issue a full refund if your order never comes.
          </Accordion>
          <Accordion title="Shipping & returns" open={shippingOpen} onToggle={() => setShippingOpen((v) => !v)}>
            Free returns within 30 days of delivery. Standard shipping takes 5–10 business days.
          </Accordion>
        </div>
      </div>
    </>
  );
}

function Accordion({ title, open, onToggle, children }: { title: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="border-t border-stroke-soft">
      <button onClick={onToggle} className="w-full flex items-center justify-between py-3 text-left">
        <span className="font-jost font-medium text-sm text-text-900">{title}</span>
        <ChevronDownIcon className={cn("w-4 h-4 text-text-500 transition-transform", open && "rotate-180")} />
      </button>
      {open && <p className="pb-3 font-jost text-xs text-text-500 leading-5">{children}</p>}
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

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 5h14M8 5V3h4v2M6 5l1 12h6l1-12" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 7.5l5 5 5-5" />
    </svg>
  );
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
      <path d="M4 10h12" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
      <path d="M10 4v12M4 10h12" />
    </svg>
  );
}
