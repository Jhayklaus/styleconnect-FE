"use client";

import { useState } from "react";
import { PrimaryButton, Select, SubPanel } from "./SubPanel";
import type { TypeValue } from "./types";

const CATEGORIES = [
  { value: "top", label: "Top" },
  { value: "bottom", label: "Bottom" },
  { value: "dress", label: "Dress" },
  { value: "outerwear", label: "Outerwear" },
];

const SUBCATEGORIES: Record<string, { value: string; label: string }[]> = {
  top: [
    { value: "shirt", label: "Shirt" },
    { value: "t-shirt", label: "T-shirt" },
    { value: "blouse", label: "Blouse" },
  ],
  bottom: [
    { value: "trousers", label: "Trousers" },
    { value: "skirt", label: "Skirt" },
    { value: "shorts", label: "Shorts" },
  ],
  dress: [
    { value: "casual", label: "Casual dress" },
    { value: "formal", label: "Formal dress" },
  ],
  outerwear: [
    { value: "jacket", label: "Jacket" },
    { value: "coat", label: "Coat" },
  ],
};

const SLEEVE_STYLES = [
  { value: "long", label: "Long sleeved" },
  { value: "short", label: "Short sleeved" },
  { value: "sleeveless", label: "Sleeveless" },
];

export function TypePanel({
  value,
  onClose,
  onSave,
}: {
  value: TypeValue;
  onClose: () => void;
  onSave: (v: TypeValue) => void;
}) {
  const [draft, setDraft] = useState<TypeValue>(value);
  const subOptions = draft.category ? SUBCATEGORIES[draft.category] ?? [] : [];

  return (
    <SubPanel
      title="Add Types"
      subtitle="The correct description of your item helps people discover and find them easily"
      onClose={onClose}
      footer={
        <PrimaryButton
          onClick={() => onSave(draft)}
          disabled={!draft.category || !draft.subcategory}
        >
          Save
        </PrimaryButton>
      }
    >
      <div className="flex flex-col gap-4">
        <Select
          label="Select type"
          placeholder="Select type"
          value={draft.category}
          onChange={(v) => setDraft({ category: v, subcategory: undefined, sleeveStyle: undefined })}
          options={CATEGORIES}
        />
        <Select
          label="Select Sub type"
          placeholder="Select Sub type"
          value={draft.subcategory}
          onChange={(v) => setDraft({ ...draft, subcategory: v })}
          options={subOptions}
        />
        <Select
          label="Sleeve style"
          placeholder="Sleeve style"
          value={draft.sleeveStyle}
          onChange={(v) => setDraft({ ...draft, sleeveStyle: v })}
          options={SLEEVE_STYLES}
        />
      </div>
    </SubPanel>
  );
}

export function formatType(v: TypeValue): string | null {
  if (!v.category || !v.subcategory) return null;
  const cat = CATEGORIES.find((c) => c.value === v.category)?.label ?? v.category;
  const sub = SUBCATEGORIES[v.category]?.find((s) => s.value === v.subcategory)?.label ?? v.subcategory;
  const sleeve = SLEEVE_STYLES.find((s) => s.value === v.sleeveStyle)?.label.toLowerCase();
  return sleeve ? `${cat} (${sub}, ${sleeve})` : `${cat} (${sub})`;
}
