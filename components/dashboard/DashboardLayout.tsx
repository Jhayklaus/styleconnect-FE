"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Sidebar } from "./Sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isSignedIn, isHydrated } = useAuth();

  useEffect(() => {
    if (isHydrated && !isSignedIn) {
      router.replace("/?modal=onboarding&step=create-account");
    }
  }, [isHydrated, isSignedIn, router]);

  if (!isHydrated) return null;
  if (!isSignedIn) return null;

  return (
    <div className="min-h-screen bg-beige-lighter flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col md:flex-row gap-28 px-5 md:px-8 lg:px-20 py-8">
        <Sidebar />
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
