import { ProductCard } from "@/components/ui";

const RELATED = [
  { id: "1", image: "/images/product-1.png", storeName: "Roda enterprise", description: "Senator Wear for Men, African Men's Clothing...", rating: 4.8, reviewCount: 200, price: "₦5,000,000" },
  { id: "2", image: "/images/product-2.png", storeName: "Roda enterprise", description: "Senator Wear for Men, African Men's Clothing...", rating: 4.8, reviewCount: 200, price: "₦5,000,000" },
  { id: "3", image: "/images/product-3.png", storeName: "Roda enterprise", description: "Senator Wear for Men, African Men's Clothing...", rating: 4.8, reviewCount: 200, price: "₦5,000,000" },
  { id: "4", image: "/images/product-4.png", storeName: "Roda enterprise", description: "Senator Wear for Men, African Men's Clothing...", rating: 4.8, reviewCount: 200, price: "₦5,000,000" },
];

export function RelatedItems() {
  return (
    <section className="px-4 md:px-8 lg:px-20 py-10 border-t border-stroke-soft">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-inter font-medium text-xl lg:text-2xl text-text-900">Related items</h2>
        <button className="p-2 rounded-full border border-stroke-soft hover:border-text-300 transition-colors">
          <ChevronRightIcon className="w-5 h-5 text-text-900" />
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {RELATED.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.5 5l5 5-5 5" />
    </svg>
  );
}
