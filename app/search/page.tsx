import { ProductListingPage } from "@/components/ProductListingPage";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  return <ProductListingPage mode="search" query={q ?? ""} />;
}
