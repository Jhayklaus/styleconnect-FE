"use client";

import { useState } from "react";
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

  function addColor() {
    const v = input.trim();
    if (!v || colors.some((c) => c.toLowerCase() === v.toLowerCase())) {
      setInput("");
      return;
    }
    setColors([...colors, v]);
    setInput("");
  }

  function removeColor(c: string) {
    setColors(colors.filter((x) => x !== c));
  }

  const hasInput = input.trim().length > 0;

  return (
    <SubPanel
      title="Add Colors"
      onClose={onClose}
      footer={
        colors.length === 0 ? (
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("color-input") as HTMLInputElement | null;
              el?.focus();
            }}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-pill bg-primary-darker text-white font-jost font-medium text-sm mx-auto"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
            Add
          </button>
        ) : (
          <PrimaryButton onClick={() => onSave(colors)}>Done</PrimaryButton>
        )
      }
    >
      {colors.length === 0 && !hasInput ? (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <p className="font-jost font-medium text-base text-text-900">
            Add colors to give your customers options
          </p>
          <p className="mt-1 font-jost text-sm text-text-500">
            You can add as many color as you have available for this item
          </p>
          <input
            id="color-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addColor();
              }
            }}
            className="sr-only"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="relative rounded-2xl border border-stroke-soft bg-white/40 px-4 py-3 min-h-[88px]">
            <input
              id="color-input"
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
              aria-label="Add color"
              className={`absolute right-3 bottom-3 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                hasInput ? "bg-primary-darker text-white" : "bg-beige-base/60 text-text-500"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <ul className="flex flex-col gap-2">
            {colors.map((c) => (
              <li
                key={c}
                className="flex items-center justify-between rounded-xl bg-beige-base/30 px-4 py-3"
              >
                <span className="font-jost text-base text-text-900">{c}</span>
                <button
                  type="button"
                  onClick={() => removeColor(c)}
                  aria-label={`Remove ${c}`}
                  className="text-text-900 hover:opacity-70"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                    <path d="M5 5l8 8M13 5l-8 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </SubPanel>
  );
}

export function formatColors(colors: string[]): string | null {
  if (colors.length === 0) return null;
  const [a, b, ...rest] = colors;
  if (colors.length <= 3) return colors.join(", ");
  return `${a}, ${b}, ${colors[2]} +${rest.length - 1} more`;
}
