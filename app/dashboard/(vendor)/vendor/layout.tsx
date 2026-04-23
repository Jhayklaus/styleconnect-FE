import { VendorDashboardLayout } from "@/components/dashboard/vendor/VendorDashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <VendorDashboardLayout>{children}</VendorDashboardLayout>;
}
