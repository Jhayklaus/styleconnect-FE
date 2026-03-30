import { ProductCard } from "@/components/ui";

const PRODUCTS = [
  {
    id: "1",
    image: "/images/product-1.png",
    storeName: "Roda enterprise",
    description: "Senator Wear for Men, African Men's Clothing...",
    rating: 4.8,
    reviewCount: 200,
    price: "₦5,000,000",
  },
  {
    id: "2",
    image: "/images/product-2.png",
    storeName: "Roda enterprise",
    description: "Senator Wear for Men, African Men's Clothing...",
    rating: 4.8,
    reviewCount: 200,
    price: "₦5,000,000",
  },
  {
    id: "3",
    image: "/images/product-3.png",
    storeName: "Roda enterprise",
    description: "Senator Wear for Men, African Men's Clothing...",
    rating: 4.8,
    reviewCount: 200,
    price: "₦5,000,000",
  },
  {
    id: "4",
    image: "/images/product-4.png",
    storeName: "Roda enterprise",
    description: "Senator Wear for Men, African Men's Clothing...",
    rating: 4.8,
    reviewCount: 200,
    price: "₦5,000,000",
  },
];

export function FeaturedDesigns() {
  return (
    <section className="px-4 md:px-8 lg:px-20 pt-8 md:pt-10 lg:pt-12 flex flex-col gap-6">
      <h2 className="font-inter font-medium text-xl lg:text-2xl leading-8 text-text-900">
        Featured designs
      </h2>

      <div className="flex gap-4 items-start overflow-x-auto pb-2 scrollbar-hide">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
