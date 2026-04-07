"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";


const COLORS = [
  { label: "White",  value: "white"  },
  { label: "Purple", value: "purple" },
  { label: "Wine",   value: "wine"   },
  { label: "Black",  value: "black"  },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const SIZE_DESCRIPTION =
  "Senator Wear for Men, Black, Wine, Spare, Slate, Gray, White, C:S, C: Afton";

type Product = {
  id: string;
  name: string;
  price: string;
  rating: number;
  reviewCount: number;
  store: { name: string; logo: string };
};

export function ProductInfo({ product }: { product: Product }) {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedSize, setSelectedSize]   = useState("M");
  const [quantity, setQuantity]           = useState(1);
  const [paymentOpen, setPaymentOpen]     = useState(false);
  const [shippingOpen, setShippingOpen]   = useState(false);
  const [added, setAdded]                 = useState(false);

  function handleAddToCart() {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="flex flex-col gap-4 flex-1 min-w-0">
      {/* Rating + wishlist */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarFilledIcon
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? "text-amber-400"
                    : "text-stroke-soft"
                }`}
              />
            ))}
          </div>
          <span className="font-jost text-sm text-text-500">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
        <button className="flex items-center gap-1.5 font-jost text-sm text-text-500 hover:text-primary-base transition-colors">
          <HeartIcon className="w-4 h-4" />
          Add to wishlist
        </button>
      </div>

      {/* Name */}
      <h1 className="font-inter font-medium text-xl lg:text-[22px] leading-7 lg:leading-8 text-text-900">
        {product.name}
      </h1>

      {/* Price */}
      <p className="font-jost font-medium text-xl text-text-900">{product.price}</p>

      {/* Store */}
      <div className="flex items-center gap-2">
        <span className="font-jost text-sm text-text-500">Sold by:</span>
        <Link
          href="#"
          className="flex items-center gap-1.5 group"
        >
          {/* <div className="relative w-5 h-5 rounded-full overflow-hidden bg-bg-soft shrink-0">
            <Image
              src={product.store.logo}
              alt={product.store.name}
              fill
              className="object-cover"
            />
          </div> */}
          <span className="font-jost font-medium text-sm text-text-900 group-hover:text-primary-base transition-colors">
            {product.store.name}
          </span>
          <ChevronRightIcon className="w-4 h-4 text-text-500" />
        </Link>
      </div>

      <div className="h-px bg-stroke-soft" />

      {/* Colors */}
      <div className="flex flex-col gap-3">
        <p className="font-jost font-medium text-sm text-text-900">Colors</p>
        <div className="flex items-center gap-2 flex-wrap">
          {COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() => setSelectedColor(color.value)}
              className={cn(
                "px-8 h-10 rounded-lg border font-jost text-sm transition-colors",
                selectedColor === color.value
                  ? "border-primary-base bg-primary-base/20 text-primary font-medium"
                  : "border-stroke-soft text-text-500 hover:border-text-300"
              )}
            >
              {color.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <p className="font-jost font-medium text-sm text-text-900">Sizes</p>
          <button
            onClick={() => router.push(`/product/${product.id}?modal=size-guide`)}
            className="font-jost text-xs text-text-500 underline hover:text-primary-base transition-colors"
          >
            size guide
          </button>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={cn(
                "w-10 h-10 rounded-lg border font-jost font-medium text-sm transition-colors",
                selectedSize === size
                  ? "border-primary-base bg-primary-base/20 text-primary"
                  : "border-stroke-soft text-text-900 hover:border-text-300"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Custom size dropdown */}
      <button className="flex items-center justify-between h-[46px] px-4 rounded-xl border border-stroke-soft hover:border-text-300 transition-colors text-left w-full">
        <span className="font-jost text-sm text-text-500">Custom size</span>
        <ChevronRightIcon className="w-4 h-4 text-text-500 shrink-0" />
      </button>

      {/* Size/attribute description */}
      <p className="font-jost text-xs text-text-500 leading-5">
        {SIZE_DESCRIPTION}
      </p>

      {/* Quantity + Add to cart */}
      <div className="flex items-center gap-3">
        {/* Qty */}
        <div className="flex items-center gap-3 border border-stroke-soft rounded-xl px-3 h-[52px] shrink-0">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="text-text-900 hover:text-primary-base transition-colors"
          >
            <MinusIcon className="w-4 h-4" />
          </button>
          <span className="font-jost font-medium text-base text-text-900 w-5 text-center select-none">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="text-text-900 hover:text-primary-base transition-colors"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          className="flex-1 h-[52px] rounded-pill bg-primary-base text-white font-jost font-medium text-base hover:bg-primary-base/90 transition-colors"
        >
          {added ? "Added!" : "Add to cart"}
        </button>
      </div>

      <div className="h-px bg-stroke-soft" />

      {/* Delivery */}
      <div className="flex items-start gap-3">
        <TruckIcon className="w-5 h-5 text-text-500 shrink-0 mt-0.5" />
        <div className="flex flex-col gap-0.5">
          <p className="font-jost font-medium text-sm text-text-900">
            Delivered in 10 days
          </p>
          <p className="font-jost text-xs text-text-500">
            Order today to be delivered before{" "}
            {new Date(Date.now() + 10 * 86400000).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Payment protection */}
      <Accordion
        title="Payment protection"
        open={paymentOpen}
        onToggle={() => setPaymentOpen((v) => !v)}
      >
        Payments are protected and we issue a full refund if your order never comes.
      </Accordion>

      {/* Shipping & returns */}
      <Accordion
        title="Shipping & returns"
        open={shippingOpen}
        onToggle={() => setShippingOpen((v) => !v)}
      >
        Free returns within 30 days of delivery. Standard shipping takes 5–10 business days.
      </Accordion>
    </div>
  );
}

function Accordion({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-stroke-soft">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-jost font-medium text-sm text-text-900">{title}</span>
        <ChevronDownIcon
          className={cn(
            "w-4 h-4 text-text-500 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <p className="pb-4 font-jost text-sm text-text-500 leading-5">{children}</p>
      )}
    </div>
  );
}

// Icons
function StarFilledIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1l1.76 3.57L14 5.24l-3 2.92.71 4.13L8 10.25l-3.71 2.04.71-4.13-3-2.92 4.24-.67L8 1z" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M10 17s-7-4.5-7-9a4 4 0 018 0 4 4 0 018 0c0 4.5-7 9-7 9z" strokeLinejoin="round" />
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

function TruckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 3h11v10H1zM12 7h3.5L18 10v3h-6V7z" />
      <circle cx="4.5" cy="15.5" r="1.5" />
      <circle cx="14.5" cy="15.5" r="1.5" />
    </svg>
  );
}
