import { Header } from "@/components/ui";
import { Footer } from "@/components/ui";
import { Hero } from "@/components/sections/Hero";
import { FeaturedDesigns } from "@/components/sections/FeaturedDesigns";
import { ShopByCategory } from "@/components/sections/ShopByCategory";
import { FeaturedStores } from "@/components/sections/FeaturedStores";
import { OnboardingModal } from "@/components/onboarding/OnboardingModal";

type Props = {
  searchParams: Promise<{ modal?: string; step?: string }>;
};

export default async function HomePage({ searchParams }: Props) {
  const { modal, step } = await searchParams;

  return (
    <div className="min-h-screen bg-beige-lighter flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col">
        <Hero />
        <FeaturedDesigns />
        <ShopByCategory />
        <FeaturedStores />
        <div className="pb-16" />
      </main>

      <Footer />

      {modal === "onboarding" && (
        <OnboardingModal step={step ?? "create-account"} />
      )}
    </div>
  );
}
