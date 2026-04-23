"use client";

import { useEffect, useState } from "react";
import { useVendorModals } from "../VendorModalsContext";
import { TypePanel, formatType } from "./createListing/TypePanel";
import { SizesPanel, formatSizes } from "./createListing/SizesPanel";
import { ColorsPanel, formatColors } from "./createListing/ColorsPanel";
import { PhotosPanel } from "./createListing/PhotosPanel";
import type { Photo, SizesValue, TypeValue } from "./createListing/types";

type SubView = null | "photos" | "type" | "sizes" | "colors";

const INITIAL_SIZES: SizesValue = { category: undefined, options: [], ageRanges: [] };

export function CreateListingModal() {
  const { createListingOpen, closeCreateListing } = useVendorModals();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeline, setTimeline] = useState("");
  const [cost, setCost] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [alwaysAvailable, setAlwaysAvailable] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [type, setType] = useState<TypeValue>({});
  const [sizes, setSizes] = useState<SizesValue>(INITIAL_SIZES);
  const [colors, setColors] = useState<string[]>([]);
  const [subView, setSubView] = useState<SubView>(null);

  useEffect(() => {
    if (!createListingOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (subView) setSubView(null);
      else closeCreateListing();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [createListingOpen, subView, closeCreateListing]);

  useEffect(() => {
    if (createListingOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [createListingOpen]);

  if (!createListingOpen) return null;

  const typeSummary = formatType(type);
  const sizesSummary = formatSizes(sizes);
  const colorsSummary = formatColors(colors);

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="List design">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={() => (subView ? setSubView(null) : closeCreateListing())}
        aria-hidden
      />

      <div className="absolute inset-y-0 right-0 w-full max-w-[510px] bg-beige-lighter shadow-xl flex flex-col">
        <div className="px-6 pt-6">
          <button
            onClick={closeCreateListing}
            aria-label="Close"
            className="p-1 -ml-1 text-text-900 hover:opacity-70"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </button>
          <h2 className="mt-4 font-inter font-medium text-2xl leading-8 text-text-900 tracking-[-0.011em]">
            List design
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pt-6 pb-6 flex flex-col gap-6">
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="font-jost font-medium text-base text-text-900">
                Upload photos <span className="font-normal text-text-500">(up to 6)</span>
              </p>
              {photos.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSubView("photos")}
                  className="inline-flex items-center gap-1 font-jost text-sm text-text-900 hover:underline"
                >
                  Manage photos
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path d="m6 4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </div>

            {photos.length === 0 ? (
              <button
                type="button"
                onClick={() => setSubView("photos")}
                className="w-20 h-20 rounded-xl border border-dashed border-stroke-soft bg-white/40 flex items-center justify-center text-text-500 hover:bg-white/70 transition-colors"
                aria-label="Upload photo"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M3 7a2 2 0 0 1 2-2h2l1.5-2h7L17 5h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            ) : (
              <div className="flex items-center gap-2 overflow-x-auto">
                {photos.map((p) => (
                  <div
                    key={p.id}
                    className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0"
                    style={{ background: p.swatch }}
                  >
                    <button
                      type="button"
                      onClick={() => setPhotos(photos.filter((x) => x.id !== p.id))}
                      aria-label="Remove photo"
                      className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-white/90 flex items-center justify-center text-text-900"
                    >
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                        <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <Field label={title ? "Title" : undefined}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full bg-transparent outline-none font-jost text-base text-text-900 placeholder:text-text-500"
            />
          </Field>

          <Field>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your listing"
              rows={3}
              className="w-full bg-transparent outline-none resize-none font-jost text-base text-text-900 placeholder:text-text-500"
            />
          </Field>

          <Field label={timeline ? "Timeline" : undefined}>
            <div className="flex items-center justify-between">
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full bg-transparent outline-none font-jost text-base text-text-900 appearance-none"
              >
                <option value="">Timeline</option>
                <option value="1-2">1–2 business days</option>
                <option value="3-5">3–5 business days</option>
                <option value="1w">Within a week</option>
                <option value="2w">Within two weeks</option>
              </select>
              <Chevron down />
            </div>
          </Field>

          <section className="flex flex-col gap-3">
            <p className="font-jost font-medium text-base text-text-900">Inventory</p>
            <Field>
              <div className="flex items-center gap-2">
                <span className="font-jost text-base text-text-500">₦</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={cost}
                  onChange={(e) => setCost(e.target.value.replace(/[^\d,]/g, ""))}
                  placeholder="Item cost"
                  className="w-full bg-transparent outline-none font-jost text-base text-text-900 placeholder:text-text-500"
                />
              </div>
            </Field>
          </section>

          <section className="flex flex-col gap-3">
            <p className="font-jost font-medium text-base text-text-900">Quantity</p>
            <Field>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(0, q - 1))}
                  aria-label="Decrease quantity"
                  className="text-text-900 hover:opacity-70 w-6 h-6 flex items-center justify-center"
                >
                  <svg width="16" height="2" viewBox="0 0 16 2" aria-hidden>
                    <path d="M0 1h16" stroke="currentColor" strokeWidth="1.75" />
                  </svg>
                </button>
                <span className="font-jost text-base text-text-900 tabular-nums">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="text-text-900 hover:opacity-70 w-6 h-6 flex items-center justify-center"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                    <path d="M8 0v16M0 8h16" stroke="currentColor" strokeWidth="1.75" />
                  </svg>
                </button>
              </div>
            </Field>
          </section>

          <section className="flex items-start justify-between gap-4">
            <div>
              <p className="font-jost font-medium text-base text-text-900">Always available</p>
              <p className="font-jost text-sm text-text-500 mt-0.5">
                Your items will remain available for order
              </p>
            </div>
            <Toggle checked={alwaysAvailable} onChange={setAlwaysAvailable} />
          </section>

          <div className="flex flex-col">
            <ChevronRow label="Type" summary={typeSummary} onClick={() => setSubView("type")} />
            <ChevronRow label="Sizes" summary={sizesSummary} onClick={() => setSubView("sizes")} />
            <ChevronRow label="Colors" summary={colorsSummary} onClick={() => setSubView("colors")} />
          </div>
        </div>

        <div className="border-t border-stroke-soft px-6 py-5 flex items-center gap-3 bg-beige-lighter">
          <button
            type="button"
            onClick={closeCreateListing}
            className="flex-1 h-12 rounded-pill border border-stroke-soft bg-white font-jost font-medium text-base text-text-900 hover:bg-beige-base/30 transition-colors"
          >
            Save to Draft
          </button>
          <button
            type="button"
            className="flex-1 h-12 rounded-pill bg-primary-darker text-white font-jost font-medium text-base hover:opacity-95 transition-opacity"
          >
            Publish listing
          </button>
        </div>

        {subView === "photos" && (
          <PhotosPanel
            value={photos}
            onClose={() => setSubView(null)}
            onSave={(v) => {
              setPhotos(v);
              setSubView(null);
            }}
          />
        )}
        {subView === "type" && (
          <TypePanel
            value={type}
            onClose={() => setSubView(null)}
            onSave={(v) => {
              setType(v);
              setSubView(null);
            }}
          />
        )}
        {subView === "sizes" && (
          <SizesPanel
            value={sizes}
            onClose={() => setSubView(null)}
            onSave={(v) => {
              setSizes(v);
              setSubView(null);
            }}
          />
        )}
        {subView === "colors" && (
          <ColorsPanel
            value={colors}
            onClose={() => setSubView(null)}
            onSave={(v) => {
              setColors(v);
              setSubView(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 rounded-2xl border border-stroke-soft bg-white/40 px-4 py-3">
      {label && <span className="font-jost text-xs text-text-500">{label}</span>}
      {children}
    </label>
  );
}

function Chevron({ down }: { down?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden className="text-text-500 shrink-0">
      <path
        d={down ? "m5 7.5 5 5 5-5" : "m7.5 5 5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRow({
  label,
  summary,
  onClick,
}: {
  label: string;
  summary: string | null;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-between py-4 border-b border-stroke-soft last:border-0 text-left hover:opacity-80"
    >
      <div className="flex flex-col gap-0.5">
        <span className="font-jost font-medium text-base text-text-900">{label}</span>
        {summary && (
          <span className="font-jost text-sm text-text-500">{summary}</span>
        )}
      </div>
      <Chevron />
    </button>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
        checked ? "bg-primary-darker" : "bg-text-300"
      }`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
