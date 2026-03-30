import { StoreCard } from "@/components/ui";

const STORE_LOGO = "/images/store-logo.png";

const STORES = [
  { id: "1", logo: STORE_LOGO, name: "Grandstar Unilever", rating: 4.5 },
  { id: "2", logo: STORE_LOGO, name: "Grandstar Unilever", rating: 4.5 },
  { id: "3", logo: STORE_LOGO, name: "Grandstar Unilever", rating: 4.5 },
  { id: "4", logo: STORE_LOGO, name: "Grandstar Unilever", rating: 4.5 },
  { id: "5", logo: STORE_LOGO, name: "Grandstar Unilever", rating: 4.5 },
  { id: "6", logo: STORE_LOGO, name: "Grandstar Unilever", rating: 4.5 },
  { id: "7", logo: STORE_LOGO, name: "Grandstar Unilever", rating: 4.5 },
  { id: "8", logo: STORE_LOGO, name: "Grandstar Unilever", rating: 4.5 },
];

export function FeaturedStores() {
  return (
    <section className="px-4 md:px-8 lg:px-20 pt-8 md:pt-10 lg:pt-12 pb-12 flex flex-col gap-6">
      <h2 className="font-inter font-medium text-xl lg:text-2xl leading-8 text-text-900">
        Featured stores
      </h2>

      {/* Mobile: 2 cols, Tablet: 3 cols, Desktop: 4 cols */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {STORES.map((store) => (
          <StoreCard key={store.id} {...store} />
        ))}
      </div>
    </section>
  );
}
