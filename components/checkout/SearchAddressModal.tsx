"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const MOCK_RESULTS = [
  { id: "1", name: "Tertiary education trust fund, Zambezi crescent, Abuja", sub: "Zambezi Crescent, Abuja" },
  { id: "2", name: "Okota", sub: "Lagos" },
  { id: "3", name: "Amuwo Odofin", sub: "Lagos" },
  { id: "4", name: "Amuwo Odofin", sub: "Lagos" },
  { id: "3", name: "Amuwo Odofin", sub: "Lagos" },
  { id: "4", name: "Amuwo Odofin", sub: "Lagos" },
  { id: "3", name: "Amuwo Odofin", sub: "Lagos" },
  { id: "4", name: "Amuwo Odofin", sub: "Lagos" },
];

export function SearchAddressModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") ?? "/checkout/confirm";

  const [query, setQuery] = useState("");

  const results = query.trim()
    ? MOCK_RESULTS.filter(
        (r) =>
          r.name.toLowerCase().includes(query.toLowerCase()) ||
          r.sub.toLowerCase().includes(query.toLowerCase())
      )
    : MOCK_RESULTS;

  function handleSelect(result: (typeof MOCK_RESULTS)[number]) {
    router.push(
      `${pathname}?modal=address-details&address=${encodeURIComponent(result.name)}&city=${encodeURIComponent(result.sub)}&returnTo=${encodeURIComponent(returnTo)}`
    );
  }

  function handleClose() {
    router.push(pathname);
  }

  return (
    <div className="fixed inset-0 z-50 bg-[rgba(2,13,23,0.19)] flex items-end md:items-center md:justify-center md:px-4">
      <div
        className="bg-beige-lighter w-full rounded-t-[20px] h-[45vh] md:rounded-[20px] md:max-w-[531px] shadow-[0px_16px_40px_-8px_rgba(88,92,95,0.16)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle — mobile only */}
        <div className="md:hidden flex justify-center pt-3">
          <div className="w-10 h-1 bg-stroke-soft rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3">
          <h2 className="font-inter font-medium text-xl text-text-900">Delivery address</h2>
          <button
            onClick={handleClose}
            className="p-0.5 rounded-md hover:bg-bg-soft transition-colors text-text-500 hover:text-text-900"
            aria-label="Close"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-5 pb-3">
          <div className="flex items-center gap-2 border border-stroke-soft rounded-full px-3 h-11 bg-transaparent">
            <SearchIcon className="w-4 h-4 text-text-400 shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent font-jost text-sm text-text-900 placeholder:text-text-400 outline-none"
              autoFocus
            />
          </div>
        </div>

        {/* Results */}
        <div className="overflow-y-auto max-h-[30vh] pb-6 mx-5 shadow-md rounded-2xl">
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => handleSelect(result)}
              className="w-full text-left px-5 py-3 hover:bg-white transition-colors"
            >
              <p className="font-jost font-medium text-sm text-text-900">{result.name}</p>
              <p className="font-jost text-xs text-text-500 mt-0.5">{result.sub}</p>
            </button>
          ))}
        </div>
      </div>
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

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="5.5" />
      <path d="M13.5 13.5L17 17" />
    </svg>
  );
}
