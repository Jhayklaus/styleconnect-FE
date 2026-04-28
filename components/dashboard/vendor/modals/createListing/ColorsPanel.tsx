"use client";

import { useEffect, useRef, useState } from "react";
import { PrimaryButton, SubPanel } from "./SubPanel";

export function ColorsPanel({
  value,
  onClose,
  onSave,
}: {
  value: string[];
  onClose: () => void;
  onSave: (v: string[]) => void;
}) {
  const [colors, setColors] = useState<string[]>(value);
  const [input, setInput] = useState("");
  const [editing, setEditing] = useState(colors.length > 0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  function addColor() {
    const v = input.trim();
    if (!v) return;
    if (colors.some((c) => c.toLowerCase() === v.toLowerCase())) {
      setInput("");
      return;
    }
    setColors([...colors, v]);
    setInput("");
  }

  function removeColor(c: string) {
    const next = colors.filter((x) => x !== c);
    setColors(next);
    if (next.length === 0) setEditing(false);
  }

  const hasInput = input.trim().length > 0;

  return (
    <SubPanel
      title="Add Colors"
      subtitle="Add the colors you have available for this listing so customers can choose."
      onClose={onClose}
      footer={
        !editing ? (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-pill bg-primary-darker text-white font-jost font-medium text-sm mx-auto"
          >
            <PlusIcon />
            Add
          </button>
        ) : (
          <PrimaryButton onClick={() => onSave(colors)} disabled={colors.length === 0}>
            Save
          </PrimaryButton>
        )
      }
    >
      {!editing ? (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <p className="font-jost font-medium text-base text-text-900">
            Add colors to give your customers options
          </p>
          <p className="mt-1 font-jost text-sm text-text-500">
            You can add as many colors as you have available for this item
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="relative rounded-2xl border border-stroke-soft bg-white/40 px-4 py-3 min-h-[88px]">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addColor();
                }
              }}
              placeholder="Add available colors"
              className="w-full pr-12 bg-transparent outline-none font-jost text-base text-text-900 placeholder:text-text-500"
            />
            <button
              type="button"
              onClick={addColor}
              disabled={!hasInput}
              aria-label="Add color"
              className={`absolute right-3 bottom-3 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                hasInput ? "bg-primary-darker text-white" : "bg-beige-base/60 text-text-500"
              }`}
            >
              <PlusIcon />
            </button>
          </div>

          {colors.length > 0 && (
            <ul className="flex flex-col gap-2">
              {colors.map((c) => (
                <li
                  key={c}
                  className="flex items-center justify-between rounded-xl bg-beige-base/30 px-4 py-3"
                >
                  <span className="font-jost text-base text-text-900 truncate">{c}</span>
                  <button
                    type="button"
                    onClick={() => removeColor(c)}
                    aria-label={`Remove ${c}`}
                    className="text-text-900 hover:opacity-70 shrink-0"
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                      <path d="M5 5l8 8M13 5l-8 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </SubPanel>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function formatColors(colors: string[]): string | null {
  if (colors.length === 0) return null;
  if (colors.length <= 3) return colors.join(", ");
  const [a, b, c, ...rest] = colors;
  return `${a}, ${b}, ${c} +${rest.length} more`;
}
