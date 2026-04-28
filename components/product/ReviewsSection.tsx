import Image from "next/image";
import Link from "next/link";

const REVIEWS = [
  {
    id: "1",
    name: "Josephine Clarkson",
    avatar: "/images/store-logo.png",
    rating: 4,
    date: "Jul 1, 2025",
    text: "This is a unique classy outfit. Meticulously tailored with high quality fabrics. It comes with a top and a matching pant. Tailored to fit.",
  },
  {
    id: "2",
    name: "Josephine Clarkson",
    avatar: "/images/store-logo.png",
    rating: 4,
    date: "Jul 1, 2025",
    text: "This is a unique classy outfit. Meticulously tailored with high quality fabrics. It comes with a top and a matching pant. Tailored to fit.",
    images: ["/images/product-1.png", "/images/product-2.png", "/images/product-3.png", "/images/product-4.png"],
  },
];

const RATING_BARS = [
  { stars: 5, count: 180 },
  { stars: 4, count: 120 },
  { stars: 3, count: 60 },
  { stars: 2, count: 20 },
  { stars: 1, count: 10 },
];

const MAX_COUNT = 180;

export function ReviewsSection({ productId }: { productId: string }) {
  return (
    <section className="px-4 md:px-8 lg:px-20 py-10 border-t border-stroke-soft">
      <div className="flex flex-col gap-8 lg:gap-16">
        {/* Left: aggregate rating */}
        <div className="flex flex-col gap-4 lg:w-[280px] shrink-0">
          <h2 className="font-inter font-medium text-xl text-text-900">
            Item reviews and ratings
          </h2>

          <div className="flex items-end gap-3">
            <span className="font-inter font-medium text-5xl text-text-900">4.5</span>
            <div className="flex flex-col gap-1 pb-1">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarFilledIcon key={i} className={`w-4 h-4 ${i < 4 ? "text-[#E8C5A5]" : "text-stroke-soft"}`} />
                ))}
              </div>
              <span className="font-jost text-xs text-text-500">600 ratings</span>
            </div>
          </div>

          {/* Rating bars */}
          <div className="flex flex-col gap-2">
            {RATING_BARS.map(({ stars, count }) => (
              <div key={stars} className="flex items-center gap-2">
                <span className="font-jost text-xs text-text-500 w-3">{stars}</span>
                <div className="flex-1 h-1.5 bg-stroke-soft rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#E8C5A5] rounded-full"
                    style={{ width: `${(count / MAX_COUNT) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: individual reviews */}
        <div className="flex flex-col gap-6 flex-1">
          {REVIEWS.map((review) => (
            <div key={review.id} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden bg-bg-soft shrink-0">
                  <Image src={review.avatar} alt={review.name} fill className="object-cover" />
                </div>
                <p className="font-jost font-medium text-sm text-text-900">{review.name}</p>

              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex flex-col">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarFilledIcon key={i} className={`w-3 h-3 ${i < review.rating ? "text-[#E8C5A5]" : "text-stroke-soft"}`} />
                    ))}
                  </div>
                </div>
                <span className="font-jost text-xs text-text-500">{review.date}</span>
              </div>

              <p className="font-jost text-sm text-text-500 leading-5 line-clamp-3">
                {review.text}{" "}
                <button className="text-text-900 font-medium hover:text-primary-base transition-colors">
                  read more
                </button>
              </p>
            </div>
          ))}

          <Link
            href={`/product/${productId}?modal=reviews`}
            className="self-start font-jost font-medium text-sm text-primary-base rounded-pill px-5 py-2.5 bg-primary-lighter hover:bg-bg-soft transition-colors"
          >
            See all reviews
          </Link>
        </div>
      </div>
    </section>
  );
}

function StarFilledIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1l1.76 3.57L14 5.24l-3 2.92.71 4.13L8 10.25l-3.71 2.04.71-4.13-3-2.92 4.24-.67L8 1z" />
    </svg>
  );
}
