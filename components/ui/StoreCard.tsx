import Image from "next/image";

type StoreCardProps = {
  logo: string;
  name: string;
  rating: number;
  reviewCount?: number;
  onClick?: () => void;
};

export function StoreCard({ logo, name, rating, reviewCount, onClick }: StoreCardProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  return (
    <div
      className="flex items-center gap-0 w-full h-[72px] md:h-[88px] bg-bg-soft rounded-2xl overflow-hidden cursor-pointer hover:bg-stroke-soft transition-colors"
      onClick={onClick}
    >
      {/* Logo */}
      <div className="relative w-[48px] h-[48px] md:w-[64px] md:h-[64px] rounded-xl overflow-hidden shrink-0 ml-3">
        <Image src={logo} alt={name} fill className="object-cover" />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 ml-3">
        <p className="font-jost font-medium text-sm md:text-base leading-5 md:leading-6 tracking-[-0.176px] text-text-900 truncate">
          {name}
        </p>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className={`w-3 h-3 ${
                i < fullStars
                  ? "text-amber-400 fill-amber-400"
                  : i === fullStars && hasHalf
                  ? "text-amber-400 fill-amber-200"
                  : "text-stroke-soft fill-bg-soft"
              }`}
            />
          ))}
          {reviewCount !== undefined && (
            <span className="font-jost text-xs leading-5 tracking-[-0.084px] text-text-500 ml-1">
              ({reviewCount})
            </span>
          )}
        </div>
      </div>
    </div>
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
