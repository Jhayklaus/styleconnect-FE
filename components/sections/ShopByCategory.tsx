import Image from "next/image";
import { Button } from "@/components/ui";

const CATEGORIES = [
  { label: "Men clothing",   image: "/images/category-men.png",   href: "/men" },
  { label: "Women clothing", image: "/images/category-women.png", href: "/women" },
  { label: "Kids clothing",  image: "/images/category-kids.png",  href: "/kids" },
];

export function ShopByCategory() {
  return (
    <section className="px-4 md:px-8 lg:px-20 pt-8 md:pt-10 lg:pt-12 flex flex-col gap-6">
      <h2 className="font-inter font-medium text-xl lg:text-2xl leading-8 text-text-900">
        Shop by category
      </h2>

      {/* Mobile: horizontal scroll; tablet+: equal columns */}
      <div className="flex gap-4 items-start overflow-x-auto pb-2 scrollbar-hide md:overflow-visible md:pb-0">
        {CATEGORIES.map((cat) => (
          <CategoryCard key={cat.label} {...cat} />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({ label, image, href }: { label: string; image: string; href: string }) {
  return (
    <a
      href={href}
      className="relative shrink-0 w-[240px] md:w-auto md:flex-1 h-[340px] md:h-[420px] lg:h-[534px] rounded-2xl overflow-hidden bg-bg-soft group block"
    >
      <Image
        src={image}
        alt={label}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute left-4 lg:left-6 bottom-6 md:bottom-8 lg:bottom-[42px] flex flex-col gap-2 w-[160px] md:w-[180px] lg:w-[204px]">
        <h3 className="font-inter font-medium text-lg md:text-xl lg:text-2xl leading-7 lg:leading-8 text-text-900">
          {label}
        </h3>
        <Button variant="outline-dark" size="sm" className="w-fit">
          Shop now
        </Button>
      </div>
    </a>
  );
}
