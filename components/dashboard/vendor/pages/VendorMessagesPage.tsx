"use client";

import { useState } from "react";

type Conversation = {
  id: string;
  name: string;
  preview: string;
  timestamp?: string;
  read?: boolean;
};

type MessageBubble = {
  id: string;
  body?: string;
  attachment?: { thumbnail: string; title: string; itemCount: number; status: string };
  time: string;
  fromMe: boolean;
};

type Day = { label: string; messages: MessageBubble[] };

const CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    name: "Kristin & Paiger Supermart",
    preview: "List to get orders from customers",
    timestamp: "4/10/26",
    read: true,
  },
  { id: "c2", name: "Kristin & Paiger Supermart", preview: "List to get orders from customers" },
  { id: "c3", name: "Kristin & Paiger Supermart", preview: "List to get orders from customers" },
];

const THREAD: Day[] = [
  {
    label: "September 9th",
    messages: [
      {
        id: "m1",
        fromMe: true,
        body: "here are the outcomes under the two most common assumptions. I’ll show both so you can see the difference clearly.",
        time: "10:20 PM",
      },
      {
        id: "m2",
        fromMe: false,
        body: "here are the outcomes under the two most common assumptions. I’ll show both so you can see the difference clearly.",
        time: "10:20 PM",
      },
    ],
  },
  {
    label: "September 9th",
    messages: [
      {
        id: "m3",
        fromMe: false,
        attachment: {
          thumbnail: "#e9e3da",
          title: "Senator Wear for Men, African Men’s Clothing, Nigerian Native Attire, Kaftan",
          itemCount: 1,
          status: "Awaiting confirmation",
        },
        time: "10:20 PM",
      },
    ],
  },
];

export function VendorMessagesPage() {
  const [activeId, setActiveId] = useState(CONVERSATIONS[0].id);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [draft, setDraft] = useState("");

  const filtered = filter === "unread" ? [] : CONVERSATIONS;
  const active = CONVERSATIONS.find((c) => c.id === activeId) ?? CONVERSATIONS[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] rounded-2xl bg-beige-lighter overflow-hidden min-h-[624px] shadow-[0px_16px_32px_-12px_rgba(88,92,95,0.1)]">
        <aside className="flex flex-col border-b md:border-b-0 md:border-r border-stroke-soft">
          <div className="flex items-center gap-3 pl-6 pr-4 pt-6 pb-4">
            <p className="flex-1 font-jost font-medium text-lg leading-6 text-text-900 tracking-[-0.27px]">
              Messages
            </p>
            <button
              type="button"
              aria-label="More"
              className="p-0.5 rounded-md text-text-900 hover:bg-beige-base/30"
            >
              <MoreIcon />
            </button>
          </div>

          <div className="px-6 py-2">
            <div className="flex items-center gap-2 h-12 py-2">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`flex items-center justify-center gap-1 rounded-pill px-3 py-2 font-jost font-medium text-sm tracking-[-0.084px] transition-colors ${
                  filter === "all"
                    ? "bg-primary-base text-white shadow-[0px_1px_2px_0px_rgba(99,50,44,0.08)]"
                    : "bg-beige-lighter border border-stroke-soft text-text-900 shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]"
                }`}
              >
                <span className="px-1">All</span>
                {filter === "all" && <ChevronDownIcon />}
              </button>
              <button
                type="button"
                onClick={() => setFilter("unread")}
                className={`flex items-center justify-center gap-1 rounded-pill px-3 py-2 font-jost font-medium text-sm tracking-[-0.084px] transition-colors ${
                  filter === "unread"
                    ? "bg-primary-base text-white shadow-[0px_1px_2px_0px_rgba(99,50,44,0.08)]"
                    : "bg-beige-lighter border border-stroke-soft text-text-900 shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]"
                }`}
              >
                <span className="px-1">Unread</span>
                {filter === "unread" && <ChevronDownIcon />}
              </button>
            </div>
          </div>

          <div className="px-6 py-4">
            <div className="flex items-center gap-2 h-12 px-3 rounded-[30px] border border-stroke-soft">
              <SearchIcon />
              <input
                placeholder="Search..."
                className="flex-1 bg-transparent outline-none font-jost text-sm text-text-900 placeholder:text-text-500 tracking-[-0.084px]"
              />
            </div>
          </div>

          <ul className="px-6 flex-1 overflow-y-auto">
            {filtered.map((c, i) => {
              const isActive = c.id === activeId;
              return (
                <li key={c.id}>
                  {i === 2 && <div className="border-t border-stroke-soft" />}
                  <button
                    type="button"
                    onClick={() => setActiveId(c.id)}
                    className={`w-full flex items-start gap-[11px] p-4 rounded-2xl text-left transition-colors ${
                      isActive ? "bg-primary-lighter" : "bg-beige-lighter hover:bg-beige-base/20"
                    }`}
                  >
                    <span
                      className="w-12 h-12 rounded-full bg-[#ecebeb] shrink-0"
                      aria-hidden
                    />
                    <div className="flex-1 min-w-0 flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <p className="flex-1 font-jost font-medium text-sm text-text-900 tracking-[-0.084px] truncate">
                          {c.name}
                        </p>
                        {c.timestamp && (
                          <div className="flex items-center gap-1 shrink-0">
                            <span className="font-jost text-xs text-text-500">{c.timestamp}</span>
                            {c.read && <CheckIcon />}
                          </div>
                        )}
                      </div>
                      <p className="font-jost text-sm text-text-500 tracking-[-0.084px] truncate">
                        {c.preview}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <section className="flex flex-col">
          <header className="flex items-center gap-3 pl-6 pr-4 py-4 border-b border-stroke-soft">
            <p className="flex-1 font-jost font-medium text-lg leading-6 text-text-900 tracking-[-0.27px] truncate">
              {active.name}
            </p>
            <button
              type="button"
              aria-label="Close conversation"
              className="w-10 h-10 rounded-full flex items-center justify-center text-text-900 hover:bg-beige-base/30"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </header>

          <div className="flex-1 overflow-y-auto">
            {THREAD.map((day, di) => (
              <div key={di} className="flex flex-col">
                <div className="flex items-center justify-center p-2">
                  <p className="font-jost text-xs text-text-500 text-center">{day.label}</p>
                </div>
                {day.messages.map((m) => (
                  <Bubble key={m.id} message={m} />
                ))}
              </div>
            ))}
          </div>

          <div className="px-5 py-4">
            <div className="flex items-center justify-between gap-2 pl-3 pr-2 py-4 rounded-xl border border-stroke-soft bg-beige-lighter shadow-[0px_1px_2px_0px_rgba(228,229,231,0.24)]">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={`Message ${active.name}`}
                className="flex-1 min-w-0 bg-transparent outline-none font-jost text-sm text-text-900 placeholder:text-text-400 tracking-[-0.084px] py-1"
              />
              <button
                type="button"
                aria-label="Send"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-text-500 hover:bg-beige-base/30 disabled:opacity-50"
                disabled={!draft.trim()}
              >
                <SendIcon />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function Bubble({ message }: { message: MessageBubble }) {
  const fromMe = message.fromMe;
  if (message.attachment) {
    return (
      <div className="flex flex-col items-start px-5 py-2">
        <div className="relative w-[357px] max-w-full ml-[7px]">
          <div className="relative bg-white rounded-2xl rounded-br-lg px-3 py-2 flex items-center gap-4 drop-shadow-[0px_1px_1px_rgba(228,229,231,0.24)]">
            <BubbleTail side="left" color="white" />
            <div
              className="w-[84px] h-[84px] rounded-lg shrink-0"
              style={{ background: message.attachment.thumbnail }}
              aria-hidden
            />
            <div className="flex-1 min-w-0 flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <p className="font-jost text-sm leading-5 text-text-900 tracking-[-0.084px]">
                  {message.attachment.title}
                </p>
                <p className="font-jost text-sm leading-5 text-text-500 tracking-[-0.084px]">
                  {message.attachment.itemCount} item(s)
                </p>
              </div>
              <p className="font-jost font-medium text-sm leading-5 text-[#6e3ff3] tracking-[-0.084px]">
                {message.attachment.status}
              </p>
            </div>
          </div>
          <p className="mt-2 font-jost text-[10px] leading-3 text-text-400">{message.time}</p>
        </div>
      </div>
    );
  }
  return (
    <div className={`flex flex-col px-5 py-2 ${fromMe ? "items-end" : "items-start"}`}>
      <div className={`relative w-[325px] max-w-full ${fromMe ? "" : "ml-2"}`}>
        <div
          className={`relative px-3 py-2 rounded-2xl rounded-br-lg font-jost text-sm leading-5 tracking-[-0.084px] ${
            fromMe ? "bg-[#f2ae40] text-text-900" : "bg-white text-text-900 drop-shadow-[0px_1px_1px_rgba(228,229,231,0.24)]"
          }`}
        >
          <BubbleTail side={fromMe ? "right" : "left"} color={fromMe ? "#f2ae40" : "white"} />
          {message.body}
        </div>
        <p
          className={`mt-2 font-jost text-[10px] leading-3 text-text-400 ${
            fromMe ? "text-right" : "text-left"
          }`}
        >
          {message.time}
        </p>
      </div>
    </div>
  );
}

function BubbleTail({ side, color }: { side: "left" | "right"; color: string }) {
  const transform = side === "right" ? "scaleX(-1)" : undefined;
  const positionClass = side === "right" ? "-right-2" : "-left-2";
  return (
    <svg
      aria-hidden
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={`absolute -bottom-[1px] ${positionClass}`}
      style={{ transform }}
    >
      <path d="M14 0V14H4.5C8 14 14 12 14 0Z" fill={color} />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden className="text-text-500 shrink-0">
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="m13.5 13.5 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="m6 8 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <circle cx="4.5" cy="10" r="1.5" />
      <circle cx="10" cy="10" r="1.5" />
      <circle cx="15.5" cy="10" r="1.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden className="text-text-500">
      <path
        d="m3 8 3.5 3.5L13 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M3 17 17 10 3 3l3 7-3 7Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
