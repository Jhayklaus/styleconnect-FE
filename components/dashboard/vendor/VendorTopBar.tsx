"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import Image from "next/image";
import { useVendorModals } from "./VendorModalsContext";

const TITLES: { match: string; title: string }[] = [
  { match: "/dashboard/vendor/orders", title: "All Orders" },
  { match: "/dashboard/vendor/listings", title: "Listings" },
  { match: "/dashboard/vendor/messages", title: "Messages" },
  { match: "/dashboard/vendor/store", title: "Store" },
  { match: "/dashboard/vendor/reviews", title: "Reviews" },
];

const LOGO_SRC = "/images/logo.png";


function usePageTitle() {
  const pathname = usePathname();
  return TITLES.find((t) => pathname.startsWith(t.match))?.title ?? "Dashboard";
}

export function VendorTopBar() {
  const title = usePageTitle();
  const router = useRouter();
  const { signOut } = useAuth();
  const { openCreateListing } = useVendorModals();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    signOut();
    setMenuOpen(false);
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-40 bg-beige-lighter shadow-[0_-1px_4px_0_rgba(15,15,16,0.05)]">
      <div className="flex items-center justify-between px-5 md:px-8 lg:px-[58px] h-[100px]">
        <Link href="/" className="flex items-center shrink-0 mr-4">
          <Image
            src={LOGO_SRC}
            alt="StylesConnect"
            width={24}
            height={31}
            className="lg:w-[31px] lg:h-[40px]"
            priority
          />
        </Link>

        <div className="flex-1 flex items-center justify-between pl-8 md:pl-16 lg:pl-[338px]">
          <p className="font-inter font-medium text-xl leading-7 text-text-900 truncate">
            {title}
          </p>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={openCreateListing}
              className="hidden sm:inline-flex items-center gap-1 bg-yellow-base rounded-pill px-3 py-3 shadow-sm hover:bg-yellow-base/90 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M10 4.167v11.666M4.167 10h11.666" stroke="#140b0a" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span className="px-1 font-jost font-medium text-sm text-text-900">
                Add listing
              </span>
            </button>

            <button
              aria-label="Notifications"
              className="p-2.5 rounded-full hover:bg-beige-base/30 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M10 2.5a5 5 0 0 0-5 5v2.5L3.333 12.5h13.334L15 10V7.5a5 5 0 0 0-5-5ZM7.917 15a2.083 2.083 0 0 0 4.166 0" stroke="#140b0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="relative">
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-2 hover:opacity-90 transition-opacity"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
              >
                <div className="w-10 h-10 rounded-full bg-yellow-light" aria-hidden />
                <span className="hidden sm:inline font-jost font-medium text-sm text-text-900">
                  Morgan Markwell
                </span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="m5 7.5 5 5 5-5" stroke="#140b0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {menuOpen && (
                <div
                  className="absolute right-0 top-12 w-48 bg-white border border-stroke-soft rounded-xl shadow-md py-2 font-jost text-sm"
                  role="menu"
                >
                  <Link
                    href="/dashboard/vendor/store"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 text-text-900 hover:bg-beige-lighter"
                    role="menuitem"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-text-500 hover:bg-beige-lighter"
                    role="menuitem"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
