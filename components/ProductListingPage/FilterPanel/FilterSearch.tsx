"use client";

const SUGGESTIONS = [
  { id: "1", name: "Tertiary education trust fund, Zambezi crescent, Abuja", sub: "Zambezi Crescent, Abuja" },
  { id: "2", name: "Okota",         sub: "Lagos" },
  { id: "3", name: "Amuwo Odofin", sub: "Lagos" },
  { id: "4", name: "Amuwo Odofin", sub: "Lagos" },
];

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSelect: (name: string) => void;
};

export function FilterSearch({ value, onChange, onSelect }: Props) {
  const filtered = value.trim()
    ? SUGGESTIONS.filter(
        (s) =>
          s.name.toLowerCase().includes(value.toLowerCase()) ||
          s.sub.toLowerCase().includes(value.toLowerCase())
      )
    : SUGGESTIONS;

  return (
    <div className="flex flex-col gap-0">
      {filtered.map((s) => (
        <button
          key={s.id + s.name}
          onMouseDown={(e) => { e.preventDefault(); onSelect(s.name); }}
          className="w-full text-left px-0 py-2.5 hover:bg-beige-lighter transition-colors border-b border-stroke-soft last:border-0"
        >
          <p className="font-jost text-sm text-text-900 leading-snug">{s.name}</p>
          <p className="font-jost text-xs text-text-500">{s.sub}</p>
        </button>
      ))}
    </div>
  );
}
