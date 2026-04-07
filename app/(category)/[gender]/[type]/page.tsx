import { notFound } from "next/navigation";
import { ProductListingPage } from "@/components/ProductListingPage";

const VALID_GENDERS = ["men", "women", "kids"];

type Props = {
  params: Promise<{ gender: string; type: string }>;
};

export default async function SubcategoryPage({ params }: Props) {
  const { gender, type } = await params;
  if (!VALID_GENDERS.includes(gender)) notFound();

  return <ProductListingPage mode="subcategory" gender={gender} type={type} />;
}
