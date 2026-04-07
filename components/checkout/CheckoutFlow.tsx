"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { SavedAddressStep } from "./SavedAddressStep";

export function CheckoutFlow({ step }: { step?: string }) {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!step) {
      if (isSignedIn) {
        router.replace("/checkout?step=saved-address");
      } else {
        const returnTo = encodeURIComponent("/?modal=search-address&returnTo=/checkout/confirm");
        router.replace(`/?modal=onboarding&step=create-account&returnTo=${returnTo}`);
      }
    }
  }, [step, isSignedIn, router]);

  if (!step) return null;

  return (
    <div className="min-h-screen bg-beige-lighter">
      {step === "saved-address" && <SavedAddressStep />}
    </div>
  );
}
