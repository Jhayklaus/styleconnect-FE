"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, type Role } from "@/lib/auth";

type Result = { ready: boolean };

export function useRequireRole(allowed: Role | Role[]): Result {
  const router = useRouter();
  const { role, isHydrated } = useAuth();
  const allowedList = Array.isArray(allowed) ? allowed : [allowed];

  useEffect(() => {
    if (!isHydrated) return;
    if (allowedList.includes(role)) return;
    if (role === "visitor") {
      router.replace("/?modal=onboarding&step=create-account");
    } else {
      // Signed in but wrong role — send to their own dashboard root
      router.replace(role === "vendor" ? "/dashboard/vendor" : "/dashboard");
    }
  }, [isHydrated, role, router, allowedList]);

  return { ready: isHydrated && allowedList.includes(role) };
}
