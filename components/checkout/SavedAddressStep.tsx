"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SAVED_ADDRESSES = [
  {
    id: "1",
    name: "Hakim Adebowale",
    phone: "234816784210",
    address: "11 Akindele road, new garage, Ilgos Nigeria",
  },
  {
    id: "2",
    name: "Hakim Adebowale",
    phone: "234816784210",
    address: "11 Akindele road, new garage, Ilgos Nigeria",
  },
];

export function SavedAddressStep() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? SAVED_ADDRESSES.filter(
        (a) =>
          a.name.toLowerCase().includes(query.toLowerCase()) ||
          a.address.toLowerCase().includes(query.toLowerCase())
      )
    : SAVED_ADDRESSES;

  function handleSelect() {
    router.push("/checkout/confirm");
  }

  function handleClose() {
    router.back();
  }

  return (
    <div className="fixed inset-0 z-50 bg-[rgba(2,13,23,0.19)] flex items-end md:items-center md:justify-center md:px-4">
      <div
        className="bg-beige-lighter w-full rounded-t-[20px] md:rounded-[20px] md:max-w-[531px] shadow-[0px_16px_40px_-8px_rgba(88,92,95,0.16)]"
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
        <div className="px-5 pb-4">
          <div className="flex items-center gap-2 border border-stroke-soft rounded-xl px-3 h-11 bg-white">
            <SearchIcon className="w-4 h-4 text-text-400 shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent font-jost text-sm text-text-900 placeholder:text-text-400 outline-none"
            />
          </div>
        </div>

        {/* Saved addresses */}
        <div className="px-5 pb-6 flex flex-col gap-2">
          <p className="font-jost font-medium text-sm text-text-900 mb-1">Saved addresses</p>
          {filtered.map((addr) => (
            <button
              key={addr.id}
              onClick={handleSelect}
              className="w-full flex items-center justify-between gap-3 bg-white rounded-2xl px-4 py-3 hover:bg-beige-lighter transition-colors text-left"
            >
              <div className="flex flex-col gap-0.5">
                <p className="font-jost font-medium text-sm text-text-900">
                  {addr.name}{" "}
                  <span className="font-normal text-text-500">({addr.phone})</span>
                </p>
                <p className="font-jost text-xs text-text-500">{addr.address}</p>
              </div>
              <ChevronRightIcon className="w-4 h-4 text-text-400 shrink-0" />
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

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.5 5l5 5-5 5" />
    </svg>
  );
}
