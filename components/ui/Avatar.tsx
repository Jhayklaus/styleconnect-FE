import Image from "next/image";
import { cn } from "@/lib/utils";

type AvatarProps = {
  src?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizeStyles = {
  xs: "w-6 h-6 text-[10px]",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-xl",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Avatar({ src, name, size = "md", className }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden shrink-0 bg-bg-soft flex items-center justify-center",
        sizeStyles[size],
        className
      )}
    >
      {src ? (
        <Image src={src} alt={name ?? "Avatar"} fill className="object-cover" />
      ) : (
        <span className="font-jost font-medium text-text-500 select-none">
          {name ? getInitials(name) : "?"}
        </span>
      )}
    </div>
  );
}
