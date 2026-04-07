import { notFound } from "next/navigation";
import { ProductListingPage } from "@/components/ProductListingPage";

const VALID_GENDERS = ["men", "women", "kids"];

type Props = {
  params: Promise<{ gender: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { gender } = await params;
  if (!VALID_GENDERS.includes(gender)) notFound();

  return <ProductListingPage mode="category" gender={gender} />;
}

export function generateStaticParams() {
  return VALID_GENDERS.map((gender) => ({ gender }));
}
