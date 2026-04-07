import { CheckoutFlow } from "@/components/checkout/CheckoutFlow";

type Props = {
  searchParams: Promise<{ step?: string }>;
};

export default async function CheckoutPage({ searchParams }: Props) {
  const { step } = await searchParams;
  return <CheckoutFlow step={step} />;
}
