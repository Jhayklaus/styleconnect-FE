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
  const row1 = STORES.slice(0, 4);
  const row2 = STORES.slice(4, 8);

  return (
    <section className="px-20 pt-12 flex flex-col gap-6">
      <h2 className="font-inter font-medium text-2xl leading-8 text-text-900">
        Featured stores
      </h2>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          {row1.map((store) => (
            <StoreCard key={store.id} {...store} />
          ))}
        </div>
        <div className="flex gap-4">
          {row2.map((store) => (
            <StoreCard key={store.id} {...store} />
          ))}
        </div>
      </div>
    </section>
  );
}
