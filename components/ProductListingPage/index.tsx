"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { ProductGrid, type GridProduct } from "./ProductGrid";
import { FloatingFilterSortCTA } from "./FloatingFilterSortCTA";
import { FilterPanel } from "./FilterPanel";
import { SortPanel } from "./SortPanel";

// ─── Mock data ────────────────────────────────────────────────────────────────
// TODO: replace with real API call
const MOCK_PRODUCTS: GridProduct[] = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  image: i % 2 === 0 ? "/images/product-1.png" : "/images/product-2.png",
  storeName: "Roda Enterprise",
  description: "Senator Wear for Men, African Men's Clothing, Nigerian Native Attire",
  rating: 4.4,
  reviewCount: 200,
  price: "₦5,000,000",
}));

const TYPE_PILLS = [
  "Shirts", "Trousers", "Kaftan", "Shorts",
  "Jumpsuits", "Fabric", "Suits", "Robes",
];

// Groups for category landing page
const CATEGORY_SECTIONS = [
  { label: "Shirts", products: MOCK_PRODUCTS.slice(0, 4) },
  { label: "Trousers", products: MOCK_PRODUCTS.slice(0, 4) },
  { label: "Kaftan", products: MOCK_PRODUCTS.slice(0, 4) },
];

// ─── Types ────────────────────────────────────────────────────────────────────
export type ProductListingMode = "category" | "subcategory" | "search";

type CategoryProps = {
  mode: "category";
  gender: string;                   // "men" | "women" | "kids"
};

type SubcategoryProps = {
  mode: "subcategory";
  gender: string;
  type: string;
};

type SearchProps = {
  mode: "search";
  query: string;
  resultCount?: number;
};

type Props = CategoryProps | SubcategoryProps | SearchProps;

// ─── Component ────────────────────────────────────────────────────────────────
export function ProductListingPage(props: Props) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortValue, setSortValue] = useState("newest");
  const [filterCount, setFilterCount] = useState(0);

  const showFloatingCTA = props.mode !== "category";

  return (
    <div className="min-h-screen bg-beige-lighter flex flex-col">
      <Header />

      <main className="flex-1 px-4 md:px-8 lg:px-20 py-6 md:py-10">

        {props.mode === "category" && (
          <CategoryContent gender={props.gender} />
        )}

        {props.mode === "subcategory" && (
          <SubcategoryContent
            gender={props.gender}
            type={props.type}
            products={MOCK_PRODUCTS}
          />
        )}

        {props.mode === "search" && (
          <SearchContent
            query={props.query}
            resultCount={props.resultCount ?? MOCK_PRODUCTS.length}
            products={MOCK_PRODUCTS}
          />
        )}
      </main>

      <Footer />

      {/* Floating CTA — subcategory + search only */}
      {showFloatingCTA && (
        <FloatingFilterSortCTA
          onSort={() => setSortOpen(true)}
          onFilter={() => setFilterOpen(true)}
          filterCount={filterCount}
        />
      )}

      <FilterPanel
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={(filters) => {
          const count =
            filters.categories.length +
            filters.types.length +
            filters.colors.length +
            (filters.rating ? 1 : 0);
          setFilterCount(count);
        }}
      />

      <SortPanel
        open={sortOpen}
        value={sortValue}
        onChange={setSortValue}
        onClose={() => setSortOpen(false)}
      />
    </div>
  );
}

// ─── Category landing ─────────────────────────────────────────────────────────
function CategoryContent({ gender }: { gender: string }) {
  const label = `All ${capitalize(gender)}'s clothing`;

  return (
    <div className="flex flex-col gap-8">
      {/* Title */}
      <h1 className="font-inter font-medium text-2xl md:text-[28px] text-text-900 text-center">
        {label}
      </h1>

      {/* Type pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide justify-center flex-wrap">
        {TYPE_PILLS.map((pill) => (
          <Link
            key={pill}
            href={`/${gender}/${pill.toLowerCase()}`}
            className="shrink-0 h-8 px-4 rounded-pill border border-stroke-soft font-jost text-sm text-text-900 hover:border-primary-base hover:text-primary-base transition-colors whitespace-nowrap"
          >
            {pill}
          </Link>
        ))}
      </div>

      {/* Sections */}
      {CATEGORY_SECTIONS.map((section) => (
        <div key={section.label} className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-inter font-medium text-lg text-text-900">{section.label}</h2>
            <Link
              href={`/${gender}/${section.label.toLowerCase()}`}
              className="flex items-center gap-1 font-jost text-sm text-text-500 hover:text-text-900 transition-colors"
            >
              View all
              <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </div>
          <ProductGrid products={section.products} />
        </div>
      ))}
    </div>
  );
}

// ─── Sub-category ─────────────────────────────────────────────────────────────
function SubcategoryContent({
  gender,
  type,
  products,
}: {
  gender: string;
  type: string;
  products: GridProduct[];
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 font-jost text-xs text-text-500">
        <Link href="/" className="hover:text-text-900 transition-colors">Home</Link>
        <span>
          <ChevronRightIcon />
        </span>
        <Link href={`/${gender}`} className="hover:text-text-900 transition-colors capitalize">{gender}</Link>
        <span>
          <ChevronRightIcon />
        </span>
        <span className="text-text-900 capitalize">{type}</span>
      </nav>

      {/* Title */}
      <h1 className="font-inter font-medium text-2xl md:text-[28px] text-text-900 capitalize">
        {capitalize(gender)}&apos;s clothing in {type}
      </h1>

      <ProductGrid products={products} />
    </div>
  );
}

// ─── Search results ───────────────────────────────────────────────────────────
function SearchContent({
  query,
  resultCount,
  products,
}: {
  query: string;
  resultCount: number;
  products: GridProduct[];
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* Result count */}
      <div>
        <p className="font-jost text-sm text-text-500">{resultCount} items found for</p>
        <h1 className="font-inter font-medium text-2xl text-text-900">
          &ldquo;{query}&rdquo;
        </h1>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.7959 9.99956L7.08337 6.28706L8.14387 5.22656L12.9169 9.99956L8.14387 14.7726L7.08337 13.7121L10.7959 9.99956Z" fill="#C4C2C2" />
    </svg>

  );
}
