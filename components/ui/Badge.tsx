import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info" | "outline";
  className?: string;
};

const variantStyles = {
  default: "bg-bg-soft text-text-500",
  success: "bg-green-50 text-green-700",
  warning: "bg-amber-50 text-amber-700",
  error: "bg-red-50 text-red-600",
  info: "bg-blue-50 text-blue-700",
  outline: "bg-transparent text-text-900 border border-stroke-soft",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-2.5 py-1 rounded-full font-jost font-medium text-xs leading-4 tracking-[-0.084px] whitespace-nowrap",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
