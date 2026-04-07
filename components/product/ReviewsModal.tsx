"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = ["Newest", "Purchases", "Unread"] as const;
type Tab = (typeof TABS)[number];

const REVIEWS = [
  {
    id: "1",
    name: "Josephine Clarkson",
    avatar: "/images/store-logo.png",
    rating: 2,
    date: "Jul 1, 2025",
    text: "This is a unique classy outfit. Meticulously tailored with high quality fabrics. It comes with a top and a matching pant. Tailored to fit.",
  },
  {
    id: "2",
    name: "Josephine Clarkson",
    avatar: "/images/store-logo.png",
    rating: 2,
    date: "Jul 1, 2025",
    text: "This is a unique classy outfit. Meticulously tailored with high quality fabrics. It comes with a top and a matching pant. Tailored to fit.",
    images: ["/images/product-1.png", "/images/product-2.png", "/images/product-3.png", "/images/product-4.png"],
  },
];

const RATING_BARS = [
  { stars: 5, count: 180 },
  { stars: 4, count: 120 },
  { stars: 3, count: 60 },
  { stars: 2, count: 20 },
  { stars: 1, count: 10 },
];
const MAX_COUNT = 180;

export function ReviewsModal({ productId }: { productId: string }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("Newest");

  function handleClose() {
    router.push(`/product/${productId}`);
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-[rgba(2,13,23,0.19)]" onClick={handleClose} />
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[480px] bg-beige-lighter flex flex-col shadow-[-8px_0px_40px_-8px_rgba(88,92,95,0.12)]">
        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-stroke-soft shrink-0">
          <button onClick={handleClose} className="p-0.5 text-text-500 hover:text-text-900 transition-colors">
            <CloseIcon className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-inter font-medium text-lg text-text-900">Reviews and ratings</h2>
            <p className="font-jost text-xs text-text-500">All ratings are from people who purchased this items</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5">
          {/* Overall rating */}
          <div className="flex items-start gap-6">
            <div className="flex flex-col items-center gap-1">
              <span className="font-inter font-medium text-4xl text-text-900">4.5</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className={`w-3.5 h-3.5 ${i < 4 ? "text-amber-400" : "text-stroke-soft"}`} />
                ))}
              </div>
              <span className="font-jost text-xs text-text-500">5000 ratings</span>
            </div>

            <div className="flex flex-col gap-1.5 flex-1">
              {RATING_BARS.map(({ stars, count }) => (
                <div key={stars} className="flex items-center gap-2">
                  <span className="font-jost text-xs text-text-500 w-3">{stars}</span>
                  <div className="flex-1 h-1.5 bg-stroke-soft rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{ width: `${(count / MAX_COUNT) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "flex items-center gap-1 px-4 py-1.5 rounded-pill border font-jost text-sm transition-colors",
                  activeTab === tab
                    ? "border-text-900 bg-text-900 text-white"
                    : "border-stroke-soft text-text-500 hover:border-text-300"
                )}
              >
                {tab}
                {tab === "Newest" && <ChevronDownIcon className="w-3 h-3" />}
              </button>
            ))}
          </div>

          {/* Reviews list */}
          <div className="flex flex-col gap-6">
            {REVIEWS.map((review) => (
              <div key={review.id} className="flex flex-col gap-3 pb-6 border-b border-stroke-soft last:border-0">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden bg-bg-soft shrink-0">
                    <Image src={review.avatar} alt={review.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="font-jost font-medium text-sm text-text-900">{review.name}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} className={`w-3 h-3 ${i < review.rating ? "text-amber-400" : "text-stroke-soft"}`} />
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto font-jost text-xs text-text-500">{review.date}</span>
                </div>

                <p className="font-jost text-sm text-text-500 leading-5">{review.text}</p>

                {review.images && (
                  <div className="flex gap-2">
                    {review.images.map((img, i) => (
                      <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden bg-bg-soft shrink-0">
                        <Image src={img} alt="" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1l1.76 3.57L14 5.24l-3 2.92.71 4.13L8 10.25l-3.71 2.04.71-4.13-3-2.92 4.24-.67L8 1z" />
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
