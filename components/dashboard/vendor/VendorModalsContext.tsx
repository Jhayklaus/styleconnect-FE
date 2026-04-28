"use client";

import { createContext, useContext, useState } from "react";

type Ctx = {
  createListingOpen: boolean;
  openCreateListing: () => void;
  closeCreateListing: () => void;

  editListingId: string | null;
  openEditListing: (id: string) => void;
  closeEditListing: () => void;

  kycOpen: boolean;
  openKyc: () => void;
  closeKyc: () => void;

  walletHistoryOpen: boolean;
  openWalletHistory: () => void;
  closeWalletHistory: () => void;

  subscriptionOpen: boolean;
  openSubscription: () => void;
  closeSubscription: () => void;
};

const VendorModalsContext = createContext<Ctx | null>(null);

export function VendorModalsProvider({ children }: { children: React.ReactNode }) {
  const [createListingOpen, setCreateListingOpen] = useState(false);
  const [editListingId, setEditListingId] = useState<string | null>(null);
  const [kycOpen, setKycOpen] = useState(false);
  const [walletHistoryOpen, setWalletHistoryOpen] = useState(false);
  const [subscriptionOpen, setSubscriptionOpen] = useState(false);

  return (
    <VendorModalsContext.Provider
      value={{
        createListingOpen,
        openCreateListing: () => setCreateListingOpen(true),
        closeCreateListing: () => setCreateListingOpen(false),

        editListingId,
        openEditListing: (id) => setEditListingId(id),
        closeEditListing: () => setEditListingId(null),

        kycOpen,
        openKyc: () => setKycOpen(true),
        closeKyc: () => setKycOpen(false),

        walletHistoryOpen,
        openWalletHistory: () => setWalletHistoryOpen(true),
        closeWalletHistory: () => setWalletHistoryOpen(false),

        subscriptionOpen,
        openSubscription: () => setSubscriptionOpen(true),
        closeSubscription: () => setSubscriptionOpen(false),
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
