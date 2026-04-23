"use client";

import { createContext, useContext, useState } from "react";

type Ctx = {
  createListingOpen: boolean;
  openCreateListing: () => void;
  closeCreateListing: () => void;
};

const VendorModalsContext = createContext<Ctx | null>(null);

export function VendorModalsProvider({ children }: { children: React.ReactNode }) {
  const [createListingOpen, setCreateListingOpen] = useState(false);

  return (
    <VendorModalsContext.Provider
      value={{
        createListingOpen,
        openCreateListing: () => setCreateListingOpen(true),
        closeCreateListing: () => setCreateListingOpen(false),
      }}
    >
      {children}
    </VendorModalsContext.Provider>
  );
}

export function useVendorModals() {
  const ctx = useContext(VendorModalsContext);
  if (!ctx) throw new Error("useVendorModals must be used within VendorModalsProvider");
  return ctx;
}
