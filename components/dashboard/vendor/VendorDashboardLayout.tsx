"use client";

import { Footer } from "@/components/ui/Footer";
import { VendorSidebar } from "./VendorSidebar";
import { VendorTopBar } from "./VendorTopBar";
import { useRequireRole } from "../shared/useRequireRole";
import { VendorModalsProvider } from "./VendorModalsContext";
import { CreateListingModal } from "./modals/CreateListingModal";
import { EditListingModal } from "./modals/EditListingModal";
import { KycModal } from "./modals/KycModal";
import { WalletHistoryModal } from "./modals/WalletHistoryModal";
import { SubscriptionModal } from "./modals/SubscriptionModal";

export function VendorDashboardLayout({ children }: { children: React.ReactNode }) {
  const { ready } = useRequireRole("vendor");

  if (!ready) return null;

  return (
    <VendorModalsProvider>
      <div className="min-h-screen bg-beige-lighter flex flex-col">
        <VendorTopBar />

        <main className="flex-1 flex flex-col md:flex-row px-5 md:px-8 lg:px-12 py-6 gap-8">
          <VendorSidebar />
          <div className="flex-1 min-w-0 px-5 md:px-8 lg:px-[58px]">{children}</div>
        </main>

        <Footer />
      </div>

      <CreateListingModal />
      <EditListingModal />
      <KycModal />
      <WalletHistoryModal />
      <SubscriptionModal />
    </VendorModalsProvider>
  );
}
