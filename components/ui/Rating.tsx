import { cn } from "@/lib/utils";

type RatingProps = {
  value: number; // 0–5, supports halves
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
};

const sizeStyles = {
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

const textSizeStyles = {
  sm: "text-xs leading-4",
  md: "text-sm leading-5",
  lg: "text-base leading-6",
};

export function Rating({
  value,
  reviewCount,
  size = "sm",
  showValue = true,
  className,
}: RatingProps) {
  const clamped = Math.max(0, Math.min(5, value));

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const fill = Math.min(1, Math.max(0, clamped - i));
          return <StarIcon key={i} fill={fill} className={sizeStyles[size]} />;
        })}
      </div>

      {(showValue || reviewCount !== undefined) && (
        <span
          className={cn(
            "font-jost tracking-[-0.084px] text-text-500 whitespace-nowrap",
            textSizeStyles[size]
          )}
        >
          {showValue && clamped.toFixed(1)}
          {reviewCount !== undefined && ` (${reviewCount})`}
        </span>
      )}
    </div>
  );
}

function StarIcon({ fill, className }: { fill: number; className?: string }) {
  const id = `star-grad-${Math.random().toString(36).slice(2, 7)}`;

  return (
    <svg className={className} viewBox="0 0 16 16" fill="none">
      <defs>
        <linearGradient id={id}>
          <stop offset={`${fill * 100}%`} stopColor="#F59E0B" />
          <stop offset={`${fill * 100}%`} stopColor="#D1D5DB" />
        </linearGradient>
      </defs>
      <path
        d="M8 1.5l1.545 3.13 3.455.503-2.5 2.437.59 3.44L8 9.25 4.91 10.01l.59-3.44L3 4.133l3.455-.502L8 1.5z"
        fill={`url(#${id})`}
        strokeLinejoin="round"
      />
    </svg>
  );
}
