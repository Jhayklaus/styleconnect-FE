"use client";

import { useState } from "react";
import { PrimaryButton, SubPanel } from "./SubPanel";
import type { Photo } from "./types";

const SWATCHES = ["#b9c8d4", "#8ea4b5", "#d4b89a", "#a8907a", "#c3b5a1", "#d9c7b6"];
let nextId = 0;

export function PhotosPanel({
  value,
  onClose,
  onSave,
}: {
  value: Photo[];
  onClose: () => void;
  onSave: (v: Photo[]) => void;
}) {
  const [photos, setPhotos] = useState<Photo[]>(value);
  const [menuFor, setMenuFor] = useState<string | null>(null);

  function addPhoto() {
    if (photos.length >= 6) return;
    const id = `p-${++nextId}`;
    const swatch = SWATCHES[photos.length % SWATCHES.length];
    const next: Photo = {
      id,
      swatch,
      cover: photos.length === 0,
    };
    setPhotos([...photos, next]);
  }

  function removePhoto(id: string) {
    const filtered = photos.filter((p) => p.id !== id);
    if (filtered.length > 0 && !filtered.some((p) => p.cover)) filtered[0].cover = true;
    setPhotos(filtered);
    setMenuFor(null);
  }

  function makeCover(id: string) {
    setPhotos(photos.map((p) => ({ ...p, cover: p.id === id })));
    setMenuFor(null);
  }

  const slots = Array.from({ length: 6 });

  return (
    <SubPanel
      title="Manage photos"
      onClose={onClose}
      footer={<PrimaryButton onClick={() => onSave(photos)}>Save</PrimaryButton>}
    >
      <div className="grid grid-cols-3 gap-4">
        {slots.map((_, i) => {
          const photo = photos[i];
          if (photo) {
            return (
              <div key={photo.id} className="relative aspect-square rounded-2xl overflow-hidden" style={{ background: photo.swatch }}>
                {photo.cover && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/90 font-jost text-xs text-text-900">
                    Cover
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setMenuFor(menuFor === photo.id ? null : photo.id)}
                  aria-label="Photo options"
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-text-900 hover:bg-white"
                >
                  <svg width="16" height="4" viewBox="0 0 16 4" fill="currentColor" aria-hidden>
                    <circle cx="2" cy="2" r="1.5" />
                    <circle cx="8" cy="2" r="1.5" />
                    <circle cx="14" cy="2" r="1.5" />
                  </svg>
                </button>
                {menuFor === photo.id && (
                  <div className="absolute top-10 right-2 w-36 bg-white rounded-xl shadow-md py-1 z-10">
                    {!photo.cover && (
                      <button
                        type="button"
                        onClick={() => makeCover(photo.id)}
                        className="block w-full text-left px-3 py-2 font-jost text-sm text-text-900 hover:bg-beige-lighter"
                      >
                        Make cover
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removePhoto(photo.id)}
                      className="block w-full text-left px-3 py-2 font-jost text-sm text-red-600 hover:bg-beige-lighter"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            );
          }
          const isNext = i === photos.length;
          return (
            <button
              key={`slot-${i}`}
              type="button"
              onClick={isNext ? addPhoto : undefined}
              disabled={!isNext}
              className={`aspect-square rounded-2xl border border-dashed flex flex-col items-center justify-center gap-1 text-text-500 transition-colors ${
                isNext ? "border-stroke-soft bg-white/40 hover:bg-white/70" : "border-stroke-soft/50 bg-white/20"
              }`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M3 7a2 2 0 0 1 2-2h2l1.5-2h7L17 5h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              {isNext && (
                <span className="font-jost text-xs text-text-500">Upload from folder</span>
              )}
            </button>
          );
        })}
      </div>
    </SubPanel>
  );
}
