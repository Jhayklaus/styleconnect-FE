"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const TABS = ["Top", "Bottom"] as const;
type Tab = (typeof TABS)[number];

const COLUMNS = ["Size UK", "Shoulder", "Chest", "Sleeve", "Length"];
const SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const MEASUREMENTS: Record<Tab, number[][]> = {
  Top: SIZES.map(() => [26.0, 26.0, 26.8, 26.0, 26.0]),
  Bottom: SIZES.map(() => [28.0, 28.0, 30.0, 28.0, 28.0]),
};

export function SizeGuideModal({ productId }: { productId: string }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("Top");

  function handleClose() {
    router.push(`/product/${productId}`);
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-[rgba(2,13,23,0.19)]" onClick={handleClose} />
      <div className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-[440px] bg-beige-lighter flex flex-col shadow-[-8px_0px_40px_-8px_rgba(88,92,95,0.12)]">
        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-stroke-soft shrink-0">
          <button onClick={handleClose} className="p-0.5 text-text-500 hover:text-text-900 transition-colors">
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="font-inter font-medium text-2xl text-text-900">Size guide</h2>
            <p className="font-jost text-sm text-text-500">All measurements are in centimeters (CM)</p>
          </div>

          {/* Tabs */}
          <div className="flex items-center border border-stroke-soft rounded-xl p-1 w-fit">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-5 py-1.5 rounded-lg font-jost font-medium text-sm transition-colors",
                  activeTab === tab ? "bg-primary-base text-white" : "text-text-500 hover:text-text-900"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-jost">
              <thead>
                <tr className="border-b border-stroke-soft">
                  {COLUMNS.map((col) => (
                    <th key={col} className="text-left py-2 pr-4 font-medium text-text-900 whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZES.map((size, i) => (
                  <tr key={size} className="border-b border-stroke-soft">
                    <td className="py-2.5 pr-4 font-medium text-text-900">{size}</td>
                    {MEASUREMENTS[activeTab][i].map((val, j) => (
                      <td key={j} className="py-2.5 pr-4 text-text-500">{val.toFixed(1)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
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
