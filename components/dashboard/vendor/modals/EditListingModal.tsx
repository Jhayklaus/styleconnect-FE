"use client";

import { useEffect } from "react";
import { useVendorModals } from "../VendorModalsContext";
import { useListingForm, Toggle } from "./createListing/ListingForm";

export function EditListingModal() {
  const { editListingId, closeEditListing } = useVendorModals();
  const open = editListingId !== null;
  const form = useListingForm();

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (form.onEscape()) return;
      closeEditListing();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeEditListing, form]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  if (!open) return null;

  const live = form.value.alwaysAvailable;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Edit Listing">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={() => {
          if (!form.onSubViewBackdrop()) closeEditListing();
        }}
        aria-hidden
      />

      <div className="absolute inset-y-0 right-0 w-full max-w-[510px] bg-beige-lighter shadow-xl flex flex-col">
        <div className="px-6 pt-6">
          <button
            onClick={closeEditListing}
            aria-label="Close"
            className="p-1 -ml-1 text-text-900 hover:opacity-70"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </button>
          <h2 className="mt-4 font-inter font-medium text-2xl leading-8 text-text-900 tracking-[-0.011em]">
            Edit Listing
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pt-6 pb-6 flex flex-col gap-6">
          <section className="flex items-center justify-between gap-4 rounded-2xl border border-stroke-soft bg-white/40 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="font-jost font-medium text-base text-text-900">Listing status</span>
              {live && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-pill bg-green-100 text-green-700 font-jost text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-600" aria-hidden />
                  LIVE
                </span>
              )}
              <p className="sr-only">Anyone can discover or order this item</p>
            </div>
            <Toggle
              checked={live}
              onChange={(v) => form.setValue((prev) => ({ ...prev, alwaysAvailable: v }))}
            />
          </section>

          {form.body}
        </div>

        <div className="border-t border-stroke-soft px-6 py-5 flex items-center gap-3 bg-beige-lighter">
          <button
            type="button"
            className="flex-1 h-12 rounded-pill bg-red-50 text-red-600 font-jost font-medium text-base hover:bg-red-100 transition-colors"
          >
            Delete
          </button>
          <button
            type="button"
            className="flex-1 h-12 rounded-pill bg-primary-darker text-white font-jost font-medium text-base hover:opacity-95 transition-opacity"
          >
            Update listing
          </button>
        </div>

        {form.panels}
      </div>
    </div>
  );
}
