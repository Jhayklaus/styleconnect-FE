import { CustomerDashboardLayout } from "@/components/dashboard/customer/CustomerDashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CustomerDashboardLayout>{children}</CustomerDashboardLayout>;
}
