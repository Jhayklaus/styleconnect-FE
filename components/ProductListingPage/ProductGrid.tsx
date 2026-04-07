import Image from "next/image";
import Link from "next/link";

export type GridProduct = {
  id: string;
  image: string;
  storeName: string;
  description: string;
  rating: number;
  reviewCount: number;
  price: string;
};

export function ProductGrid({ products }: { products: GridProduct[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
      {products.map((product) => (
        <GridProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function GridProductCard({ product }: { product: GridProduct }) {
  return (
    <Link href={`/product/${product.id}`} className="flex flex-col gap-2 group">
      {/* Image */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-bg-soft">
        <Image
          src={product.image}
          alt={product.storeName}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Wishlist */}
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
          aria-label="Add to wishlist"
        >
          <HeartIcon className="w-3.5 h-3.5 text-text-500" />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <p className="font-jost font-medium text-sm text-text-900 leading-snug">
          {product.storeName}
        </p>
        <p className="font-jost text-xs text-text-500 line-clamp-2 leading-snug">
          {product.description}
        </p>
        <div className="flex items-center gap-0.5">
          <StarIcon className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span className="font-jost text-xs text-text-500">
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
        </div>
        <p className="font-jost font-medium text-sm text-text-900">{product.price}</p>
      </div>
    </Link>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinejoin="round">
      <path d="M10 17s-7-4.5-7-9a4 4 0 018 0 4 4 0 018 0c0 4.5-7 9-7 9z" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12">
      <path d="M6 1l1.236 2.506L10 3.918l-2 1.95.472 2.752L6 7.25l-2.472 1.37L4 5.868 2 3.918l2.764-.412L6 1z" strokeLinejoin="round" />
    </svg>
  );
}
