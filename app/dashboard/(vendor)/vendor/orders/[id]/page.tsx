import { VendorOrderDetailPage } from "@/components/dashboard/vendor/pages/VendorOrderDetailPage";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <VendorOrderDetailPage orderId={id} />;
}
