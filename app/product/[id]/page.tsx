import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ReviewsSection } from "@/components/product/ReviewsSection";
import { RelatedItems } from "@/components/product/RelatedItems";
import { SizeGuideModal } from "@/components/product/SizeGuideModal";
import { ReviewsModal } from "@/components/product/ReviewsModal";

const PRODUCT = {
  id: "1",
  name: "Senator Wear for Men, African Men's Clothing, Nigerian Native Attire, Kaftan",
  price: "₦5,000,000",
  rating: 4.8,
  reviewCount: 200,
  store: { name: "Roda Enterprise", logo: "/images/store-logo.png" },
};

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ modal?: string }>;
};

export default async function ProductPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { modal } = await searchParams;

  return (
    <div className="min-h-screen bg-beige-lighter flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Main product section */}
        <div className="px-4 md:px-8 lg:px-20 py-6 md:py-10 flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12">
          <ProductGallery />
          <ProductInfo product={{ ...PRODUCT, id }} />
        </div>

        <ReviewsSection productId={id} />
        <RelatedItems />
      </main>

      <Footer />

      {modal === "size-guide" && <SizeGuideModal productId={id} />}
      {modal === "reviews" && <ReviewsModal productId={id} />}
    </div>
  );
}
