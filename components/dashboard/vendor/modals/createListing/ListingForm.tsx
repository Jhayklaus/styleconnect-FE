"use client";

import { useState } from "react";
import { TypePanel, formatType } from "./TypePanel";
import { SizesPanel, formatSizes } from "./SizesPanel";
import { ColorsPanel, formatColors } from "./ColorsPanel";
import { PhotosPanel } from "./PhotosPanel";
import { Select } from "./SubPanel";
import type { Photo, SizesValue, TypeValue } from "./types";

export type ListingFormValue = {
  title: string;
  description: string;
  timeline: string;
  cost: string;
  quantity: number;
  alwaysAvailable: boolean;
  photos: Photo[];
  type: TypeValue;
  sizes: SizesValue;
  colors: string[];
};

export const EMPTY_LISTING: ListingFormValue = {
  title: "",
  description: "",
  timeline: "",
  cost: "",
  quantity: 0,
  alwaysAvailable: false,
  photos: [],
  type: {},
  sizes: { category: undefined, options: [], ageRanges: [] },
  colors: [],
};

const TIMELINE_OPTIONS = [
  { value: "1-2", label: "1–2 business days" },
  { value: "3-5", label: "3–5 business days" },
  { value: "1w", label: "Within a week" },
  { value: "2w", label: "Within two weeks" },
];

type SubView = null | "photos" | "type" | "sizes" | "colors";

export function useListingForm(initial: ListingFormValue = EMPTY_LISTING) {
  const [value, setValue] = useState<ListingFormValue>(initial);
  const [subView, setSubView] = useState<SubView>(null);

  const set = <K extends keyof ListingFormValue>(k: K, v: ListingFormValue[K]) =>
    setValue((prev) => ({ ...prev, [k]: v }));

  const closeSubView = () => setSubView(null);
  const onSubViewBackdrop = () => {
    if (subView) {
      setSubView(null);
      return true;
    }
    return false;
  };
  const onEscape = () => {
    if (subView) {
      setSubView(null);
      return true;
    }
    return false;
  };

  const body = (
    <ListingFormBody value={value} set={set} openSubView={setSubView} />
  );

  const panels = (
    <>
      {subView === "photos" && (
        <PhotosPanel
          value={value.photos}
          onClose={closeSubView}
          onSave={(v) => {
            set("photos", v);
            closeSubView();
          }}
        />
      )}
      {subView === "type" && (
        <TypePanel
          value={value.type}
          onClose={closeSubView}
          onSave={(v) => {
            set("type", v);
            closeSubView();
          }}
        />
      )}
      {subView === "sizes" && (
        <SizesPanel
          value={value.sizes}
          onClose={closeSubView}
          onSave={(v) => {
            set("sizes", v);
            closeSubView();
          }}
        />
      )}
      {subView === "colors" && (
        <ColorsPanel
          value={value.colors}
          onClose={closeSubView}
          onSave={(v) => {
            set("colors", v);
            closeSubView();
          }}
        />
      )}
    </>
  );

  return { value, setValue, body, panels, onEscape, onSubViewBackdrop };
}

function ListingFormBody({
  value,
  set,
  openSubView,
}: {
  value: ListingFormValue;
  set: <K extends keyof ListingFormValue>(k: K, v: ListingFormValue[K]) => void;
  openSubView: (v: Exclude<SubView, null>) => void;
}) {
  const { title, description, timeline, cost, quantity, alwaysAvailable, photos, type, sizes, colors } = value;

  return (
    <>
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="font-jost font-medium text-base text-text-900">
            Upload photos <span className="font-normal text-text-500">(up to 6)</span>
          </p>
          {photos.length > 0 && (
            <button
              type="button"
              onClick={() => openSubView("photos")}
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
            onClick={() => openSubView("photos")}
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
                className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-beige-base/40"
              >
                <img src={p.url} alt={p.name ?? ""} className="absolute inset-0 w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => set("photos", photos.filter((x) => x.id !== p.id))}
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
          onChange={(e) => set("title", e.target.value)}
          placeholder="Title"
          className="w-full bg-transparent outline-none font-jost text-base text-text-900 placeholder:text-text-500"
        />
      </Field>

      <Field>
        <textarea
          value={description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Describe your listing"
          rows={3}
          className="w-full bg-transparent outline-none resize-none font-jost text-base text-text-900 placeholder:text-text-500"
        />
      </Field>

      <Select
        label={timeline ? "Timeline" : undefined}
        placeholder="Timeline"
        value={timeline}
        onChange={(v) => set("timeline", v)}
        options={TIMELINE_OPTIONS}
      />

      <section className="flex flex-col gap-3">
        <p className="font-jost font-medium text-base text-text-900">Inventory</p>
        <Field>
          <div className="flex items-center gap-2">
            <span className="font-jost text-base text-text-500">₦</span>
            <input
              type="text"
              inputMode="numeric"
              value={cost}
              onChange={(e) => set("cost", e.target.value.replace(/[^\d,]/g, ""))}
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
              onClick={() => set("quantity", Math.max(0, quantity - 1))}
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
              onClick={() => set("quantity", quantity + 1)}
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
        <Toggle checked={alwaysAvailable} onChange={(v) => set("alwaysAvailable", v)} />
      </section>

      <div className="flex flex-col">
        <ChevronRow label="Type" summary={formatType(type)} onClick={() => openSubView("type")} />
        <ChevronRow label="Sizes" summary={formatSizes(sizes)} onClick={() => openSubView("sizes")} />
        <ChevronRow label="Colors" summary={formatColors(colors)} onClick={() => openSubView("colors")} />
      </div>
    </>
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
        {summary && <span className="font-jost text-sm text-text-500">{summary}</span>}
      </div>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden className="text-text-500 shrink-0">
        <path d="m7.5 5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

export function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
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
