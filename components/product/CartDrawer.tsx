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
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-7">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              {/* Image */}
              <div className="relative w-[80px] h-[80px] rounded-xl overflow-hidden bg-bg-soft shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-3 flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-2">
                    <p className="font-jost font-medium text-sm text-text-900">{item.storeName}</p>
                    <p className="font-jost text-xs text-text-500 line-clamp-2">{item.name}</p>
                    <p className="font-jost text-xs text-text-500">
                      Color: {item.color}, Size: {item.size}
                    </p>
                  </div>
                  <p className="font-jost font-medium text-sm text-text-900">
                    ₦{(item.price * item.qty).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  {/* Qty */}
                  <div className="flex items-center gap-2 border border-stroke-soft rounded-2xl px-2 h-8">
                    <button onClick={() => updateQty(item.id, -1)} className="text-text-500 hover:text-text-900">
                      <MinusIcon className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-jost text-sm text-text-900 w-10 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="text-text-500 hover:text-text-900">
                      <PlusIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="shrink-0 text-text-500 hover:text-red-500 transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>

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

          <div className="flex items-center gap-2">
            <InfoIcon className="w-4 h-4" />
            <p className="font-jost text-[10px] text-text-500">Shipping fee is totally excluded from final fee. Contact the store for delivery information </p>
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
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.28 2C14.6998 2.00011 15.1088 2.13229 15.4493 2.37781C15.7898 2.62333 16.0444 2.96975 16.177 3.368L16.72 5H20C20.2652 5 20.5196 5.10536 20.7071 5.29289C20.8946 5.48043 21 5.73478 21 6C21 6.26522 20.8946 6.51957 20.7071 6.70711C20.5196 6.89464 20.2652 7 20 7L19.997 7.071L19.13 19.214C19.0759 19.9706 18.7372 20.6786 18.182 21.1956C17.6269 21.7125 16.8965 21.9999 16.138 22H7.862C7.10346 21.9999 6.37311 21.7125 5.81797 21.1956C5.26283 20.6786 4.92411 19.9706 4.87 19.214L4.003 7.07C4.00119 7.04671 4.00019 7.02336 4 7C3.73478 7 3.48043 6.89464 3.29289 6.70711C3.10536 6.51957 3 6.26522 3 6C3 5.73478 3.10536 5.48043 3.29289 5.29289C3.48043 5.10536 3.73478 5 4 5H7.28L7.823 3.368C7.9557 2.96959 8.21043 2.62305 8.5511 2.37752C8.89176 2.13198 9.30107 1.9999 9.721 2H14.28ZM17.997 7H6.003L6.865 19.071C6.88295 19.3232 6.99577 19.5592 7.18076 19.7316C7.36574 19.904 7.60916 19.9999 7.862 20H16.138C16.3908 19.9999 16.6343 19.904 16.8192 19.7316C17.0042 19.5592 17.117 19.3232 17.135 19.071L17.997 7ZM10 10C10.2449 10 10.4813 10.09 10.6644 10.2527C10.8474 10.4155 10.9643 10.6397 10.993 10.883L11 11V16C10.9997 16.2549 10.9021 16.5 10.7272 16.6854C10.5522 16.8707 10.313 16.9822 10.0586 16.9972C9.80416 17.0121 9.55362 16.9293 9.35817 16.7657C9.16271 16.6021 9.0371 16.3701 9.007 16.117L9 16V11C9 10.7348 9.10536 10.4804 9.29289 10.2929C9.48043 10.1054 9.73478 10 10 10ZM14 10C14.2652 10 14.5196 10.1054 14.7071 10.2929C14.8946 10.4804 15 10.7348 15 11V16C15 16.2652 14.8946 16.5196 14.7071 16.7071C14.5196 16.8946 14.2652 17 14 17C13.7348 17 13.4804 16.8946 13.2929 16.7071C13.1054 16.5196 13 16.2652 13 16V11C13 10.7348 13.1054 10.4804 13.2929 10.2929C13.4804 10.1054 13.7348 10 14 10ZM14.28 4H9.72L9.387 5H14.613L14.28 4Z" fill="#585251" />
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

function InfoIcon ({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4 9.8V11H8.6V9.8H7.4ZM7.4 5V8.6H8.6V5H7.4Z" fill="#9C9998" />
    </svg>

  );
}
