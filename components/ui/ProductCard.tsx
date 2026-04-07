import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  id?: string;
  image: string;
  storeName: string;
  description: string;
  rating: number;
  reviewCount: number;
  price: string;
};

export function ProductCard({
  id = "1",
  image,
  storeName,
  description,
  rating,
  reviewCount,
  price,
}: ProductCardProps) {
  return (
    <Link
      href={`/product/${id}`}
      className="flex flex-col gap-2 w-[220px] md:w-[308px] shrink-0 group"
    >
      {/* Image */}
      <div className="relative w-full h-[220px] md:h-[308px] rounded-2xl overflow-hidden bg-bg-soft">
        <Image
          src={image}
          alt={storeName}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <p className="font-jost font-medium text-base leading-6 tracking-[-0.176px] text-text-900">
            {storeName}
          </p>

          <div className="flex flex-col gap-1">
            <p className="font-jost text-sm leading-5 tracking-[-0.084px] text-text-900 line-clamp-2">
              {description}
            </p>
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="font-jost text-sm leading-5 tracking-[-0.084px] text-text-500 whitespace-nowrap">
                {rating.toFixed(1)} ({reviewCount})
              </span>
            </div>
          </div>
        </div>

        <p className="font-jost font-medium text-sm leading-5 tracking-[-0.084px] text-text-900">
          {price}
        </p>
      </div>
    </Link>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12">
      <path
        d="M6 1l1.236 2.506L10 3.918l-2 1.95.472 2.752L6 7.25l-2.472 1.37L4 5.868 2 3.918l2.764-.412L6 1z"
        strokeLinejoin="round"
      />
    </svg>
  );
}
