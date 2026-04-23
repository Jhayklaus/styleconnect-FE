"use client";

import { useState } from "react";
import { PrimaryButton, Select, SubPanel } from "./SubPanel";
import type { AgeRange, SizeCategory, SizesValue } from "./types";

const CATEGORIES: { value: SizeCategory; label: string }[] = [
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "unisex", label: "Unisex" },
  { value: "kids", label: "Kids" },
];

const ADULT_SIZES = [
  { value: "xs", label: "Extra small (XS)" },
  { value: "s", label: "Small (S)" },
  { value: "m", label: "Medium (M)" },
  { value: "l", label: "Large (L)" },
  { value: "xl", label: "X Large (XL)" },
  { value: "2xl", label: "2X Large (2XL)" },
  { value: "3xl", label: "3X Large (3XL)" },
];

const KIDS_AGES = [
  "2T", "3T", "4T", "5T", "6T", "7Y", "8Y", "10Y", "12Y", "14Y",
].map((a) => ({ value: a, label: a }));

let nextId = 0;
const newAgeRange = (): AgeRange => ({ id: `age-${++nextId}`, from: "", to: "" });

export function SizesPanel({
  value,
  onClose,
  onSave,
}: {
  value: SizesValue;
  onClose: () => void;
  onSave: (v: SizesValue) => void;
}) {
  const [draft, setDraft] = useState<SizesValue>(
    value.category
      ? value
      : { category: undefined, options: [], ageRanges: [newAgeRange()] }
  );

  const isKids = draft.category === "kids";
  const isAdult = draft.category === "men" || draft.category === "women" || draft.category === "unisex";

  function toggleAdultSize(v: string) {
    setDraft((d) => ({
      ...d,
      options: d.options.includes(v) ? d.options.filter((x) => x !== v) : [...d.options, v],
    }));
  }

  function updateAge(id: string, field: "from" | "to", v: string) {
    setDraft((d) => ({
      ...d,
      ageRanges: d.ageRanges.map((r) => (r.id === id ? { ...r, [field]: v } : r)),
    }));
  }

  function removeAge(id: string) {
    setDraft((d) => ({ ...d, ageRanges: d.ageRanges.filter((r) => r.id !== id) }));
  }

  function addAge() {
    setDraft((d) => ({ ...d, ageRanges: [...d.ageRanges, newAgeRange()] }));
  }

  const canSave =
    !!draft.category &&
    (isKids
      ? draft.ageRanges.length > 0 && draft.ageRanges.every((r) => r.from && r.to)
      : draft.options.length > 0);

  return (
    <SubPanel
      title="Add Sizes"
      subtitle="Select available sizes for your listing. Use the size guide for measurement reference."
      onClose={onClose}
      footer={
        <PrimaryButton onClick={() => onSave(draft)} disabled={!canSave}>
          Save
        </PrimaryButton>
      }
    >
      <div className="flex flex-col gap-6">
        <Select
          label="Select category"
          placeholder="Select category"
          value={draft.category}
          onChange={(v) => setDraft({ category: v as SizeCategory, options: [], ageRanges: [newAgeRange()] })}
          options={CATEGORIES}
        />

        {draft.category && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-jost font-medium text-base text-text-900">Add options</p>
                <p className="mt-1 font-jost text-sm text-text-500">
                  {isKids
                    ? "You can add multiple age range options for your kids design listing"
                    : `You can add multiple size options for your ${draft.category}'s design listing`}
                </p>
              </div>
              <button
                type="button"
                className="shrink-0 px-4 py-2 rounded-pill bg-beige-base/50 font-jost font-medium text-sm text-text-900 hover:bg-beige-base/70"
              >
                Size guide
              </button>
            </div>

            {isAdult && (
              <ul className="flex flex-col">
                {ADULT_SIZES.map((s) => {
                  const checked = draft.options.includes(s.value);
                  return (
                    <li key={s.value}>
                      <label className="flex items-center justify-between py-3 border-b border-stroke-soft last:border-0 cursor-pointer">
                        <span className="font-jost text-base text-text-900">{s.label}</span>
                        <span
                          className={`w-5 h-5 rounded border flex items-center justify-center ${
                            checked ? "bg-primary-darker border-primary-darker" : "border-stroke-soft bg-white"
                          }`}
                        >
                          {checked && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                              <path d="m2.5 6 2.5 2.5L9.5 3.5" stroke="#fff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleAdultSize(s.value)}
                          className="sr-only"
                        />
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}

            {isKids && (
              <div className="flex flex-col gap-4">
                {draft.ageRanges.map((r) => (
                  <div key={r.id} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-jost font-medium text-sm text-text-900">Age range</span>
                      {draft.ageRanges.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeAge(r.id)}
                          className="font-jost text-sm text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Select
                        label="From"
                        placeholder="From"
                        value={r.from}
                        onChange={(v) => updateAge(r.id, "from", v)}
                        options={KIDS_AGES}
                      />
                      <Select
                        label="To"
                        placeholder="To"
                        value={r.to}
                        onChange={(v) => updateAge(r.id, "to", v)}
                        options={KIDS_AGES}
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addAge}
                  className="self-center px-6 py-2.5 rounded-pill bg-beige-base/50 font-jost font-medium text-sm text-text-900 hover:bg-beige-base/70"
                >
                  Add option
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </SubPanel>
  );
}

export function formatSizes(v: SizesValue): string | null {
  if (!v.category) return null;
  if (v.category === "kids") {
    if (v.ageRanges.length === 0) return null;
    const filled = v.ageRanges.filter((r) => r.from && r.to);
    if (filled.length === 0) return null;
    return filled.map((r) => `${r.from}–${r.to}`).join(", ");
  }
  if (v.options.length === 0) return null;
  return v.options
    .map((o) => ADULT_SIZES.find((s) => s.value === o)?.label.match(/\(([^)]+)\)/)?.[1] ?? o.toUpperCase())
    .join(", ");
}
