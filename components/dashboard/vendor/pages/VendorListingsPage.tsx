"use client";

import { useState } from "react";
import { useVendorModals } from "../VendorModalsContext";

type ListingStatus = "active" | "in-review" | "unlisted" | "draft";

type Listing = {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  price: string;
  status: ListingStatus;
  image?: string;
};

const TABS: { key: "active" | "pending" | "unlisted" | "drafts"; label: string }[] = [
  { key: "active", label: "Active" },
  { key: "pending", label: "Pending review" },
  { key: "unlisted", label: "Unlisted" },
  { key: "drafts", label: "Drafts" },
];

const MOCK_LISTINGS: Listing[] = [
  {
    id: "lst-001",
    title: "Senator Wear for Men, African Men's Clothing",
    category: "Women",
    subcategory: "Shirt",
    price: "₦50,000",
    status: "in-review",
  },
  {
    id: "lst-002",
    title: "Senator Wear for Men, African Men's Clothing",
    category: "Women",
    subcategory: "Shirt",
    price: "₦50,000",
    status: "in-review",
  },
];

const STATUS_META: Record<ListingStatus, { label: string; dot: string }> = {
  active: { label: "Active", dot: "bg-green-500" },
  "in-review": { label: "In review", dot: "bg-yellow-base" },
  unlisted: { label: "Unlisted", dot: "bg-text-500" },
  draft: { label: "Draft", dot: "bg-text-300" },
};

function matchesTab(status: ListingStatus, tab: typeof TABS[number]["key"]): boolean {
  if (tab === "active") return status === "active";
  if (tab === "pending") return status === "in-review";
  if (tab === "unlisted") return status === "unlisted";
  return status === "draft";
}

export function VendorListingsPage() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]["key"]>("active");

  // Temporary: show mock listings under "pending" since the mock status is "in-review"
  const listings = MOCK_LISTINGS.filter((l) => matchesTab(l.status, activeTab));

  return (
    <div className="flex flex-col">
      <nav
        aria-label="Listing status"
        className="flex items-center gap-6 border-b border-stroke-soft pl-2 md:pl-12 py-3.5 -mx-5 md:-mx-8 lg:-mx-12 px-5 md:px-8 lg:px-12 mb-6"
      >
        {TABS.map(({ key, label }) => {
          const active = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`relative pb-3.5 -mb-3.5 font-jost font-medium text-base leading-6 tracking-[-0.011em] transition-colors ${
                active ? "text-text-900" : "text-text-500 hover:text-text-900"
              }`}
            >
              {label}
              {active && (
                <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-text-900 rounded-full" />
              )}
            </button>
          );
        })}
      </nav>

      {listings.length === 0 ? (
        <EmptyState tab={activeTab} />
      ) : (
        <ListingsTable listings={listings} />
      )}
    </div>
  );
}

function ListingsTable({ listings }: { listings: Listing[] }) {
  return (
    <div className="flex flex-col">
      <div className="hidden md:grid grid-cols-[1fr_120px_120px_140px] gap-x-8 px-4 pb-3 font-jost font-medium text-base text-text-900 tracking-[-0.011em]">
        <span>Listing</span>
        <span>Category</span>
        <span>Price</span>
        <span>Status</span>
      </div>

      <ul className="flex flex-col">
        {listings.map((l) => (
          <li key={l.id}>
            <ListingRow listing={l} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ListingRow({ listing }: { listing: Listing }) {
  const status = STATUS_META[listing.status];
  const { openEditListing } = useVendorModals();
  return (
    <button
      type="button"
      onClick={() => openEditListing(listing.id)}
      className="grid grid-cols-[80px_1fr] md:grid-cols-[1fr_120px_120px_140px] items-center gap-x-8 gap-y-2 p-4 rounded-2xl hover:bg-white/60 transition-colors text-left w-full"
    >
      <div className="flex items-center gap-4 col-span-2 md:col-span-1 min-w-0">
        <div className="w-20 h-20 rounded-xl bg-primary-lighter shrink-0 overflow-hidden" aria-hidden>
          {listing.image && (
            <img src={listing.image} alt="" className="w-full h-full object-cover" />
          )}
        </div>
        <p className="font-jost text-base leading-6 text-text-900 tracking-[-0.011em] line-clamp-2">
          {listing.title}
        </p>
      </div>

      <div className="flex flex-col gap-1 md:contents">
        <div className="flex flex-col md:flex-col">
          <span className="md:hidden font-jost text-xs text-text-500 uppercase tracking-wide">
            Category
          </span>
          <span className="font-jost text-base text-text-900 tracking-[-0.011em]">
            {listing.category}
          </span>
          <span className="font-jost text-sm text-text-900 tracking-[-0.006em]">
            {listing.subcategory}
          </span>
        </div>

        <div className="flex items-center gap-2 md:gap-0">
          <span className="md:hidden font-jost text-xs text-text-500 uppercase tracking-wide">
            Price
          </span>
          <span className="font-jost text-base text-text-900 tracking-[-0.011em]">
            {listing.price}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${status.dot}`} aria-hidden />
          <span className="font-jost text-base text-text-900 tracking-[-0.011em]">
            {status.label}
          </span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden className="text-text-500">
            <path d="m7.5 5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </button>
  );
}

function EmptyState({ tab }: { tab: string }) {
  const label = TABS.find((t) => t.key === tab)?.label.toLowerCase() ?? "";
  return (
    <div className="flex flex-col items-center justify-center py-40 text-center">
      <p className="font-jost font-medium text-base text-text-900 mb-1">
        No {label === "active" ? "Listings" : label} yet
      </p>
      <p className="font-jost text-sm text-text-500 max-w-xs">
        All your listings will appear here. You can add or manage existing listings
      </p>
    </div>
  );
}
