"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const THUMBNAILS = [
  "/images/product-1.png",
  "/images/product-2.png",
  "/images/product-3.png",
  "/images/product-4.png",
  "/images/product-1.png",
];

export function ProductGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex gap-3 w-full md:w-auto md:flex-1">
      {/* Thumbnails — hidden on mobile, vertical strip on desktop */}
      <div className="hidden md:flex flex-col gap-2 shrink-0">
        {THUMBNAILS.map((src, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "relative w-[58px] h-[58px] rounded-xl overflow-hidden border-2 transition-colors bg-bg-soft",
              activeIndex === i ? "border-text-900" : "border-transparent hover:border-stroke-soft"
            )}
          >
            <Image src={src} alt="" fill className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative flex-1 h-[320px] md:h-[520px] lg:h-[600px] rounded-2xl overflow-hidden bg-bg-soft">
        <Image
          src={THUMBNAILS[activeIndex]}
          alt="Product"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Mobile: dot indicators */}
      <div className="md:hidden absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {THUMBNAILS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-colors",
              activeIndex === i ? "bg-text-900" : "bg-text-300"
            )}
          />
        ))}
      </div>
    </div>
  );
}
