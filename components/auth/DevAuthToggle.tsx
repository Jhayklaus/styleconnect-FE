"use client";

import { useAuth, type Role } from "@/lib/auth";

const ROLES: Role[] = ["visitor", "customer", "vendor"];

const ROLE_LABEL: Record<Role, string> = {
  visitor: "Visitor",
  customer: "Customer",
  vendor: "Vendor",
};

const ROLE_COLOR: Record<Role, string> = {
  visitor: "text-text-500",
  customer: "text-green-600",
  vendor: "text-primary-base",
};

export function DevAuthToggle() {
  const { role, setRole } = useAuth();

  return (
    <div className="fixed bottom-4 left-4 z-[9999] flex items-center gap-2 bg-white border border-stroke-soft rounded-xl px-3 py-2 shadow-md font-jost text-xs">
      <span className="text-text-500">Dev:</span>
      <span className={`font-medium ${ROLE_COLOR[role]}`}>{ROLE_LABEL[role]}</span>
      <div className="flex items-center gap-1">
        {ROLES.map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`rounded-lg px-2 py-1 transition-colors ${
              role === r
                ? "bg-primary-base text-white"
                : "bg-beige-lighter text-text-500 hover:bg-beige-base/40"
            }`}
          >
            {ROLE_LABEL[r]}
          </button>
        ))}
      </div>
    </div>
  );
}
