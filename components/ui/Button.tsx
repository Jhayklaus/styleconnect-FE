import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  variant?: "filled" | "outline" | "outline-dark" | "ghost";
  size?: "sm" | "md" | "lg";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const variantStyles = {
  filled:
    "bg-primary-base text-white border-2 border-primary-base hover:bg-primary-light hover:border-primary-light",
  outline:
    "bg-transparent text-primary-base border-2 border-primary-base hover:bg-primary-base/5",
  "outline-dark":
    "bg-transparent text-text-900 border-2 border-text-900 hover:bg-text-900/5",
  ghost:
    "bg-transparent text-text-900 border-2 border-transparent hover:bg-bg-soft",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm leading-5",
  md: "px-4 py-[14px] text-base leading-6",
  lg: "px-6 py-4 text-base leading-6",
};

export function Button({
  children,
  variant = "filled",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-1 rounded-pill font-jost font-medium tracking-[-0.176px] transition-colors shadow-[0px_1px_2px_0px_rgba(55,93,251,0.08)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
