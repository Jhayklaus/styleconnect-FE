"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";
import { CartDrawer } from "@/components/product/CartDrawer";
import { SearchAddressModal } from "@/components/checkout/SearchAddressModal";
import { AddressDetailsModal } from "@/components/checkout/AddressDetailsModal";

function Modals() {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const step = searchParams.get("step");
  const returnTo = searchParams.get("returnTo") ?? undefined;
  const panel = searchParams.get("panel");

  return (
    <>
      {modal === "onboarding"      && <OnboardingModal step={step ?? "create-account"} returnTo={returnTo} />}
      {modal === "search-address"  && <SearchAddressModal />}
      {modal === "address-details" && <AddressDetailsModal />}
      {panel === "cart"            && <CartDrawer />}
    </>
  );
}

export function GlobalModals() {
  return (
    <Suspense>
      <Modals />
    </Suspense>
  );
}
