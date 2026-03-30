"use client";

import { ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeStyles = {
  sm: "max-w-[480px]",
  md: "max-w-[560px]",
  lg: "max-w-[720px]",
};

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
  className,
}: ModalProps) {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-text-900/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "relative z-10 w-full bg-bg-white rounded-3xl shadow-xl flex flex-col overflow-hidden",
          sizeStyles[size],
          className
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-stroke-soft">
            <h2 className="font-inter font-medium text-xl leading-7 text-text-900">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-bg-soft transition-colors text-text-500 hover:text-text-900"
              aria-label="Close"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 px-6 py-5 overflow-y-auto">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-6 pb-6 pt-4 border-t border-stroke-soft">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}
