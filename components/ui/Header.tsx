"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button } from "./Button";

const LOGO_SRC = "/images/logo.png";

const NAV_TABS = [
  { label: "For you", href: "/" },
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "Kids", href: "/kids" },
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) router.push(`/search?q=${encodeURIComponent(search.trim())}`);
  }

  function isTabActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="bg-beige-lighter w-full relative z-50">
      {/* Main bar */}
      <div className="h-[64px] md:h-[72px] lg:h-[86px] flex items-center px-4 md:px-8 lg:px-20">

        {/* Logo */}
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

        {/* Nav tabs — tablet and up */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 ml-2 lg:ml-4">
          {NAV_TABS.map(({ label, href }) => {
            const active = isTabActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`relative py-3 font-jost font-medium text-sm lg:text-base leading-6 tracking-[-0.176px] transition-colors whitespace-nowrap ${active ? "text-primary-base" : "text-text-900 hover:text-primary-base"
                  }`}
              >
                {label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-base rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Search bar — desktop only */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-[473px]"
        >
          <div className="flex items-center gap-2 border border-stroke-soft rounded-[30px] px-3 h-[54px] bg-beige-lighter">
            <SearchIcon className="w-5 h-5 text-text-500 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="flex-1 bg-transparent font-jost text-sm leading-5 tracking-[-0.084px] text-text-900 placeholder:text-text-500 outline-none"
            />
          </div>
        </form>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2 md:gap-3 lg:gap-4">

          {/* Search icon — mobile/tablet only */}
          <button
            onClick={() => router.push(`/search`)}
            className="lg:hidden p-2 rounded-pill hover:bg-bg-soft transition-colors"
            aria-label="Search"
          >
            <SearchIcon className="w-5 h-5 text-text-900" />
          </button>

          {/* Cart */}
          <button
            onClick={() => router.push(`${pathname}?panel=cart`)}
            className="relative p-[10px] rounded-pill hover:bg-bg-soft transition-colors"
            aria-label="Cart"
          >
            <CartIcon className="w-5 h-5 text-text-900" />
            {/* TODO: replace 0 with real cart count from context */}
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[#f5a623] text-white text-[10px] font-medium rounded-full flex items-center justify-center px-0.5">
              0
            </span>
          </button>

          {/* Bell */}
          <button className="hidden md:block p-[10px] rounded-pill hover:bg-bg-soft transition-colors" aria-label="Notifications">
            <BellIcon className="w-5 h-5 text-text-900" />
          </button>

          {isSignedIn ? (
            <>
              {/* Chat — logged in only */}
              <button className="hidden md:block p-[10px] rounded-pill hover:bg-bg-soft transition-colors" aria-label="Messages">
                <ChatIcon className="w-5 h-5 text-text-900" />
              </button>

              {/* Avatar — links to dashboard */}
              <Link href="/dashboard/profile" className="p-[2px] rounded-full hover:opacity-90 transition-opacity">
                <AvatarIcon />
              </Link>
            </>
          ) : (
            <>
              {/* Login button — tablet and up */}
              <Link
                href={`${pathname}?modal=onboarding&step=create-account`}
                className="hidden md:block"
              >
                <Button variant="outline" className="text-sm lg:text-base">
                  Login or Sign up
                </Button>
              </Link>

              {/* Hamburger — mobile only */}
              <button
                className="md:hidden p-2 rounded-pill hover:bg-bg-soft transition-colors"
                onClick={() => setMobileMenuOpen((v) => !v)}
                aria-label="Menu"
              >
                <MenuIcon className="w-5 h-5 text-text-900" open={mobileMenuOpen} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-beige-lighter border-t border-stroke-soft px-4 py-4 flex flex-col gap-1">
          {NAV_TABS.map(({ label, href }) => {
            const active = isTabActive(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-3 px-2 font-jost font-medium text-base rounded-xl transition-colors ${active ? "text-primary-base bg-beige-base/20" : "text-text-900 hover:bg-bg-soft"
                  }`}
              >
                {label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-stroke-soft mt-2">
            {isSignedIn ? (
              <Link
                href="/dashboard/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-3 px-2"
              >
                <AvatarIcon />
                <span className="font-jost text-base text-text-900">My Account</span>
              </Link>
            ) : (
              <Link
                href={`${pathname}?modal=onboarding&step=create-account`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button variant="outline" className="w-full">Login or Sign up</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="9" cy="9" r="6" />
      <path d="M13.5 13.5L17 17" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M2 3h2l2.4 9.6a1 1 0 001 .4h7.2a1 1 0 001-.8l1.4-6.2H5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8.5" cy="16.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="16.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M10 2a6 6 0 00-6 6v3l-1.5 2.5h15L16 11V8a6 6 0 00-6-6z" strokeLinejoin="round" />
      <path d="M8.5 17a1.5 1.5 0 003 0" strokeLinecap="round" />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 11.667a1.667 1.667 0 01-1.667 1.666H5.833L2.5 16.667V4.167A1.667 1.667 0 014.167 2.5h11.666A1.667 1.667 0 0117.5 4.167v7.5z" />
    </svg>
  );
}

function MenuIcon({ className, open }: { className?: string; open: boolean }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
      {open ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 5h14M3 10h14M3 15h14" />}
    </svg>
  );
}

function AvatarIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="32" fill="#FBDFB1" />
      <g filter="url(#filter0_i_4606_29770)">
        <g clip-path="url(#clip0_4606_29770)">
          <rect width="64" height="64" rx="32" fill="#FBDFB1" />
          <g filter="url(#filter1_di_4606_29770)">
            <ellipse cx="32" cy="60.7996" rx="25.6" ry="19.2" fill="url(#paint0_radial_4606_29770)" shape-rendering="crispEdges" />
            <path d="M31.9996 42.0996C38.9711 42.0996 45.2642 44.2194 49.8023 47.623C54.3402 51.0265 57.1002 55.6906 57.1002 60.7998C57.1001 65.9088 54.34 70.5722 49.8023 73.9756C45.2642 77.3792 38.9711 79.5 31.9996 79.5C25.0282 79.4999 18.7359 77.3791 14.1978 73.9756C9.66014 70.5722 6.90006 65.9089 6.89999 60.7998C6.89999 55.6906 9.65992 51.0265 14.1978 47.623C18.7359 44.2195 25.0282 42.0997 31.9996 42.0996Z" stroke="url(#paint1_radial_4606_29770)" shape-rendering="crispEdges" />
          </g>
          <g filter="url(#filter2_di_4606_29770)">
            <circle cx="32" cy="25.6008" r="12.8" fill="url(#paint2_radial_4606_29770)" shape-rendering="crispEdges" />
            <circle cx="32" cy="25.6008" r="12.3" stroke="url(#paint3_radial_4606_29770)" shape-rendering="crispEdges" />
          </g>
        </g>
      </g>
      <defs>
        <filter id="filter0_i_4606_29770" x="0" y="-8" width="64" height="72" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="-8" />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.7712 0 0 0 0 0.78 0 0 0 0 0.7888 0 0 0 0.48 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_4606_29770" />
        </filter>
        <filter id="filter1_di_4606_29770" x="2.39999" y="33.5996" width="59.2" height="54.4004" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.1728 0 0 0 0 0.740694 0 0 0 0 0.9472 0 0 0 0.24 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4606_29770" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4606_29770" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="-8" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_4606_29770" />
        </filter>
        <filter id="filter2_di_4606_29770" x="15.2" y="4.80078" width="33.6" height="41.5996" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.1728 0 0 0 0 0.740694 0 0 0 0 0.9472 0 0 0 0.24 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_4606_29770" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_4606_29770" result="shape" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="-8" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect2_innerShadow_4606_29770" />
        </filter>
        <radialGradient id="paint0_radial_4606_29770" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 41.5996) rotate(90) scale(38.4 51.2)">
          <stop stop-color="#F2AE40" />
          <stop offset="1" stop-color="#F2AE40" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="paint1_radial_4606_29770" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 41.5996) rotate(90) scale(38.4 51.2)">
          <stop stop-color="#F2AE40" />
          <stop offset="1" stop-color="#F2AE40" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="paint2_radial_4606_29770" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 12.8008) rotate(90) scale(25.6)">
          <stop stop-color="#F2AE40" />
          <stop offset="1" stop-color="#F2AE40" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="paint3_radial_4606_29770" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 12.8008) rotate(90) scale(25.6)">
          <stop stop-color="#F2AE40" />
          <stop offset="1" stop-color="#F2AE40" stop-opacity="0" />
        </radialGradient>
        <clipPath id="clip0_4606_29770">
          <rect width="64" height="64" rx="32" fill="white" />
        </clipPath>
      </defs>
    </svg>


  )
}