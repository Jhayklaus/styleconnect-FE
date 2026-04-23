"use client";

import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { CustomerSidebar } from "./CustomerSidebar";
import { useRequireRole } from "../shared/useRequireRole";

export function CustomerDashboardLayout({ children }: { children: React.ReactNode }) {
  const { ready } = useRequireRole("customer");

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-beige-lighter flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col md:flex-row gap-28 px-5 md:px-8 lg:px-20 py-8">
        <CustomerSidebar />
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
