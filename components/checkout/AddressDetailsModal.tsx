"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export function AddressDetailsModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const address = searchParams.get("address") ?? "11 Akindele road, new garage, Lagos Nigeria";
  const city = searchParams.get("city") ?? "Lagos";
  const returnTo = searchParams.get("returnTo") ?? "/checkout/confirm";

  const [streetAddress, setStreetAddress] = useState(`${city}, 44 Road, A1 Close`);
  const [aptNo, setAptNo] = useState("240");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const isValid = name.trim().length > 0 && phone.trim().length > 0;

  function handleBack() {
    router.push(`${pathname}?modal=search-address&returnTo=${encodeURIComponent(returnTo)}`);
  }

  function handleClose() {
    router.push(pathname);
  }

  function handleSave() {
    if (!isValid) return;
    router.push(returnTo);
  }

  return (
    <div className="fixed inset-0 z-50 bg-[rgba(2,13,23,0.6)] flex items-end md:items-center md:justify-center md:px-4">
      <div
        className="bg-beige-lighter w-full rounded-t-[20px] md:rounded-[20px] md:max-w-[531px] shadow-[0px_16px_40px_-8px_rgba(88,92,95,0.16)] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle — mobile only */}
        <div className="md:hidden flex justify-center pt-3">
          <div className="w-10 h-1 bg-stroke-soft rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3">
          <h2 className="font-inter font-medium text-xl text-text-900">Address details</h2>
          <button
            onClick={handleClose}
            className="p-0.5 rounded-md hover:bg-bg-soft transition-colors text-text-500 hover:text-text-900"
            aria-label="Close"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Map placeholder */}
        <div className="mx-5 rounded-2xl overflow-hidden bg-[#e8eaed] h-[190px] flex items-center justify-center relative">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(#c8d0d8 1px, transparent 1px), linear-gradient(90deg, #c8d0d8 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPinIcon className="w-8 h-8 text-primary-base drop-shadow" />
          </div>
        </div>

        {/* Address label */}
        <p className="px-5 pt-3 pb-1 font-jost text-sm text-text-900">{address}</p>

        {/* Additional details */}
        <div className="px-5 pt-4 flex flex-col gap-3">
          <p className="font-jost font-medium text-sm text-text-900">Additional details</p>

          <div className="flex flex-col gap-1">
            <label className="font-jost text-xs text-text-500">Street address</label>
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              className="h-11 border border-stroke-soft rounded-xl px-3 font-jost text-sm text-text-900 bg-transparent outline-none focus:border-primary-base transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-jost text-xs text-text-500">Apartment/house no</label>
            <input
              type="text"
              value={aptNo}
              onChange={(e) => setAptNo(e.target.value)}
              className="h-11 border border-stroke-soft rounded-xl px-3 font-jost text-sm text-text-900 bg-transparent outline-none focus:border-primary-base transition-colors"
            />
          </div>
        </div>

        {/* Receiver details */}
        <div className="px-5 pt-5 flex flex-col gap-2">
          <p className="font-jost font-medium text-sm text-text-900">Receiver details</p>

          <div className="flex flex-col gap-1">
            {/* <label className="font-jost text-xs text-text-500">Name</label> */}
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 border border-stroke-soft rounded-xl px-3 font-jost text-sm text-text-900 bg-transparent outline-none focus:border-primary-base transition-colors placeholder:text-text-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            {/* <label className="font-jost text-xs text-text-500">Phone number</label> */}
            <div className="flex items-center border border-stroke-soft rounded-xl overflow-hidden bg-transparent focus-within:border-primary-base transition-colors">
              <div className="flex items-center gap-1.5 px-3 border-r border-stroke-soft h-11 shrink-0">
                <span className="text-base leading-none">🇳🇬</span>
                <span className="font-jost text-sm text-text-900">+234</span>
                <ChevronDownIcon className="w-3.5 h-3.5 text-text-400" />
              </div>
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 h-11 px-3 font-jost text-sm text-text-900 bg-transparent outline-none placeholder:text-text-400"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 pt-6 pb-6 flex gap-3">
          <button
            onClick={handleBack}
            className="flex-1 h-[52px] rounded-pill border border-stroke-soft font-jost font-medium text-base text-text-900 hover:bg-bg-soft transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleSave}
            disabled={!isValid}
            className="flex-1 h-[52px] rounded-pill bg-primary-base text-white font-jost font-medium text-base hover:bg-primary-base/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Save
          </button>
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

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 7.5l5 5 5-5" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}
