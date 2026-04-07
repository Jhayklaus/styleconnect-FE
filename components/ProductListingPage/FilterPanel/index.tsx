"use client";

import { useState } from "react";
import { FilterSlider } from "./FilterSlider";
import { FilterSearch } from "./FilterSearch";

const CATEGORIES = ["Men", "Women", "Unisex", "Kids"];

const TYPES_ALL = [
  "Shirts", "Coats or Jackets", "Hoodie & Cardigan", "Tank top",
  "Skirts", "Trouser pants", "Shorts", "Dress",
  "Suits", "Kaftan or Senator", "Jumpsuit", "Robes",
];
const TYPES_COLLAPSED = TYPES_ALL.slice(0, 5);

const COLORS_ALL   = ["White", "Black", "Red", "Blue", "Yellow", "Green", "Purple", "Others"];
const COLORS_COLLAPSED = COLORS_ALL.slice(0, 5);

const RATINGS = ["4.0+", "3.0+", "2.0+", "1.0+"];

// TODO: replace with real filter state / context when API is integrated
type FilterState = {
  location: string;
  price: [number, number];
  rating: string;
  categories: string[];
  types: string[];
  colors: string[];
};

type Props = {
  open: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
};

export function FilterPanel({ open, onClose, onApply }: Props) {
  // --- filter values ---
  const [location, setLocation] = useState("");
  const [locationFocused, setLocationFocused] = useState(false);
  const [price, setPrice]       = useState<[number, number]>([0, 500000]);
  const [rating, setRating]     = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [types, setTypes]           = useState<string[]>([]);
  const [colors, setColors]         = useState<string[]>([]);

  // --- show-more toggles (collapsed state) ---
  const [showMoreTypes,  setShowMoreTypes]  = useState(false);
  const [showMoreColors, setShowMoreColors] = useState(false);

  const visibleTypes  = showMoreTypes  ? TYPES_ALL        : TYPES_COLLAPSED;
  const visibleColors = showMoreColors ? COLORS_ALL       : COLORS_COLLAPSED;

  // --- state 3: location search active ---
  const searchActive = locationFocused && true;

  function toggle<T>(arr: T[], val: T): T[] {
    return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
  }

  function handleClear() {
    setLocation(""); setPrice([0, 500000]); setRating("");
    setCategories([]); setTypes([]); setColors([]);
  }

  function handleApply() {
    onApply({ location, price, rating, categories, types, colors });
    onClose();
  }

  const activeCount = categories.length + types.length + colors.length + (rating ? 1 : 0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-[rgba(2,13,23,0.4)]" onClick={onClose} />

      {/* Panel */}
      <div className="w-full max-w-[320px] bg-beige-lighter flex flex-col shadow-[-8px_0px_40px_-8px_rgba(88,92,95,0.12)]">

        {/* Header */}
        <div className="px-5 pt-5 pb-4 flex items-center justify-between shrink-0">
          <button onClick={onClose} className="p-0.5 text-text-500 hover:text-text-900 transition-colors">
            <CloseIcon className="w-5 h-5" />
          </button>
          <p className="font-inter font-medium text-xl text-text-900">Filter</p>
          <div className="w-6" />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-5 pb-4">

          {/* Location */}
          <Section label="Location">
            <div className="relative">
              <div className="flex items-center gap-2 border border-stroke-soft rounded-xl px-3 h-10 bg-white">
                <SearchIcon className="w-4 h-4 text-text-400 shrink-0" />
                <input
                  type="text"
                  placeholder="e.g. Ikeja, Lagos"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onFocus={() => setLocationFocused(true)}
                  onBlur={() => setLocationFocused(false)}
                  className="flex-1 bg-transparent font-jost text-sm text-text-900 placeholder:text-text-400 outline-none"
                />
              </div>
              {/* State 3: search active — autocomplete */}
              {searchActive && (
                <div className="mt-1">
                  <FilterSearch
                    value={location}
                    onChange={setLocation}
                    onSelect={(name) => { setLocation(name); setLocationFocused(false); }}
                  />
                </div>
              )}
            </div>
          </Section>

          {/* Price */}
          <Section label="Price(₦)">
            <FilterSlider min={0} max={500000} value={price} onChange={setPrice} />
          </Section>

          {/* Category */}
          <Section label="Category">
            {CATEGORIES.map((cat) => (
              <CheckRow
                key={cat}
                label={cat}
                checked={categories.includes(cat)}
                onChange={() => setCategories(toggle(categories, cat))}
              />
            ))}
          </Section>

          {/* Type */}
          <Section label="Type">
            {visibleTypes.map((t) => (
              <CheckRow
                key={t}
                label={t}
                checked={types.includes(t)}
                onChange={() => setTypes(toggle(types, t))}
              />
            ))}
            <ShowMoreBtn
              expanded={showMoreTypes}
              onToggle={() => setShowMoreTypes((v) => !v)}
            />
          </Section>

          {/* Ratings */}
          <Section label="Ratings">
            {RATINGS.map((r) => (
              <RadioRow
                key={r}
                label={r}
                checked={rating === r}
                onChange={() => setRating(rating === r ? "" : r)}
              />
            ))}
          </Section>

          {/* Colors */}
          <Section label="Colors">
            {visibleColors.map((c) => (
              <CheckRow
                key={c}
                label={c}
                checked={colors.includes(c)}
                onChange={() => setColors(toggle(colors, c))}
              />
            ))}
            <ShowMoreBtn
              expanded={showMoreColors}
              onToggle={() => setShowMoreColors((v) => !v)}
            />
          </Section>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 flex gap-3 border-t border-stroke-soft shrink-0">
          <button
            onClick={handleClear}
            className="flex-1 h-[52px] rounded-pill border border-stroke-soft font-jost text-sm text-text-900 hover:bg-bg-soft transition-colors"
          >
            Clear all
          </button>
          <button
            onClick={handleApply}
            className="flex-1 h-[52px] rounded-pill bg-primary-base text-white font-jost text-sm font-medium hover:bg-primary-base/90 transition-colors"
          >
            View items {activeCount > 0 ? `(${activeCount})` : ""}
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-jost font-medium text-sm text-text-900">{label}</p>
      {children}
    </div>
  );
}

function CheckRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <div
        onClick={onChange}
        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
          checked ? "bg-primary-base border-primary-base" : "border-stroke-soft bg-white"
        }`}
      >
        {checked && <CheckIcon className="w-2.5 h-2.5 text-white" />}
      </div>
      <span className="font-jost text-sm text-text-900">{label}</span>
    </label>
  );
}

function RadioRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer">
      <div
        onClick={onChange}
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
          checked ? "border-primary-base" : "border-stroke-soft"
        }`}
      >
        {checked && <div className="w-2 h-2 rounded-full bg-primary-base" />}
      </div>
      <span className="font-jost text-sm text-text-900">{label}</span>
    </label>
  );
}

function ShowMoreBtn({ expanded, onToggle }: { expanded: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-1 font-jost text-xs text-text-500 hover:text-text-900 transition-colors mt-1 self-start"
    >
      {expanded ? "Show less" : "Show more"}
      <ChevronIcon className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`} />
    </button>
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
      <circle cx="9" cy="9" r="5.5" /><path d="M13.5 13.5L17 17" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 5l2.5 2.5 4.5-4.5" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}
