"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type IconName = "user" | "bill" | "chat" | "store" | "reviews";

const NAV_ITEMS: { label: string; href: string; icon: IconName }[] = [
  { label: "Orders", href: "/dashboard/vendor/orders", icon: "user" },
  { label: "Listings", href: "/dashboard/vendor/listings", icon: "bill" },
  { label: "Messages", href: "/dashboard/vendor/messages", icon: "chat" },
  { label: "Store", href: "/dashboard/vendor/store", icon: "store" },
  { label: "Reviews", href: "/dashboard/vendor/reviews", icon: "reviews" },
];

export function VendorSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-[300px] shrink-0 flex flex-col gap-8 border-r pr-5">
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ label, href, icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 pl-4 pr-6 py-3 rounded-pill transition-colors ${
                active
                  ? "bg-primary-lighter text-primary-base"
                  : "text-text-500 hover:bg-beige-lighter"
              }`}
            >
              <NavIcon type={icon} active={active} />
              <span className="font-jost font-medium text-base leading-6 tracking-[-0.011em]">
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      <PromoCard />
    </aside>
  );
}

function PromoCard() {
  return (
    <div className="relative bg-primary-darker rounded-3xl overflow-hidden px-6 py-5 min-h-[148px]">
      <div
        aria-hidden
        className="absolute -right-10 -top-4 w-[280px] h-[240px] opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at top right, #e8c5a5 0%, transparent 60%)",
        }}
      />
      <div className="relative flex flex-col gap-1 text-white max-w-[180px]">
        <p className="font-inter font-medium text-xl leading-7">
          Go live with your listings
        </p>
        <p className="font-jost text-base leading-6 tracking-[-0.011em]">
          List to get orders from customers
        </p>
      </div>
      <button className="relative mt-4 bg-white rounded-pill px-4 py-2 font-jost font-medium text-sm text-text-900 shadow-sm hover:bg-white/90 transition-colors">
        Subscribe
      </button>
    </div>
  );
}

function NavIcon({ type, active }: { type: IconName; active: boolean }) {
  const color = active ? "#63322c" : "#585251";
  const common = { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" } as const;

  if (type === "user") {
    return (
      <svg {...common} aria-hidden>
        <path d="M10 10.8333a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666Zm0 1.667c-2.774 0-5 1.79-5 4v.833h10v-.833c0-2.21-2.226-4-5-4Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "bill") {
    return (
      <svg {...common} aria-hidden>
        <path d="M5 2.5h10v15l-2.5-1.667L10 17.5l-2.5-1.667L5 17.5v-15Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M7.5 6.25h5M7.5 9.583h5M7.5 12.917h3.333" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "chat") {
    return (
      <svg {...common} aria-hidden>
        <path d="M3.333 4.167A1.667 1.667 0 0 1 5 2.5h10a1.667 1.667 0 0 1 1.667 1.667v8.333A1.667 1.667 0 0 1 15 14.167H7.5L4.167 17.5v-3.333H5a1.667 1.667 0 0 1-1.667-1.667V4.167Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "store") {
    return (
      <svg {...common} aria-hidden>
        <path d="M3.333 3.333h13.334L17.5 7.5a2.083 2.083 0 0 1-4.167 0 2.083 2.083 0 0 1-4.166 0 2.083 2.083 0 0 1-4.167 0 2.083 2.083 0 0 1-4.167 0l.833-4.167ZM4.167 8.333V16.667h11.666V8.333" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }
  // reviews
  return (
    <svg {...common} aria-hidden>
      <path d="M5.833 2.5h8.334a1.667 1.667 0 0 1 1.666 1.667V17.5l-5.833-2.917L4.167 17.5V4.167A1.667 1.667 0 0 1 5.833 2.5Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
