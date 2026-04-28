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
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M6.24996 15.8334C6.58148 15.8334 6.89942 15.9651 7.13384 16.1995C7.36826 16.4339 7.49996 16.7518 7.49996 17.0834C7.49996 17.4149 7.36826 17.7328 7.13384 17.9672C6.89942 18.2017 6.58148 18.3334 6.24996 18.3334C5.91844 18.3334 5.6005 18.2017 5.36608 17.9672C5.13166 17.7328 4.99996 17.4149 4.99996 17.0834C4.99996 16.7518 5.13166 16.4339 5.36608 16.1995C5.6005 15.9651 5.91844 15.8334 6.24996 15.8334ZM14.5833 15.8334C14.9148 15.8334 15.2328 15.9651 15.4672 16.1995C15.7016 16.4339 15.8333 16.7518 15.8333 17.0834C15.8333 17.4149 15.7016 17.7328 15.4672 17.9672C15.2328 18.2017 14.9148 18.3334 14.5833 18.3334C14.2518 18.3334 13.9338 18.2017 13.6994 17.9672C13.465 17.7328 13.3333 17.4149 13.3333 17.0834C13.3333 16.7518 13.465 16.4339 13.6994 16.1995C13.9338 15.9651 14.2518 15.8334 14.5833 15.8334ZM2.61496 1.66669C3.24708 1.66676 3.8557 1.90629 4.31832 2.33706C4.78094 2.76782 5.0632 3.35784 5.10829 3.98835L5.12079 4.16669H16.5016C16.7458 4.16665 16.987 4.22026 17.2081 4.32372C17.4293 4.42718 17.625 4.57797 17.7814 4.76542C17.9379 4.95287 18.0512 5.1724 18.1135 5.4085C18.1757 5.64459 18.1853 5.89147 18.1416 6.13169L16.7775 13.6317C16.7076 14.0157 16.5052 14.363 16.2055 14.6131C15.9057 14.8631 15.5278 15.0001 15.1375 15H5.77579C5.35424 15 4.94835 14.8403 4.63986 14.553C4.33138 14.2657 4.14322 13.8722 4.11329 13.4517L3.44663 4.10752C3.43165 3.89706 3.33739 3.70012 3.18288 3.55644C3.02838 3.41276 2.82512 3.33303 2.61413 3.33335H2.49996C2.27895 3.33335 2.06698 3.24556 1.9107 3.08928C1.75442 2.933 1.66663 2.72103 1.66663 2.50002C1.66663 2.27901 1.75442 2.06704 1.9107 1.91076C2.06698 1.75448 2.27895 1.66669 2.49996 1.66669H2.61496ZM16.5016 5.83335H5.23996L5.77579 13.3334H15.1375L16.5016 5.83335Z" fill="#140B0A" />
    </svg>

  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.16665 7.50002C4.16665 5.95292 4.78123 4.46919 5.87519 3.37523C6.96916 2.28127 8.45289 1.66669 9.99998 1.66669C11.5471 1.66669 13.0308 2.28127 14.1248 3.37523C15.2187 4.46919 15.8333 5.95292 15.8333 7.50002V10.6367L17.3517 13.6734C17.4215 13.8131 17.4545 13.9684 17.4475 14.1245C17.4405 14.2807 17.3937 14.4324 17.3115 14.5653C17.2294 14.6982 17.1146 14.8079 16.9781 14.884C16.8416 14.9601 16.6879 15 16.5317 15H13.2283C13.043 15.7152 12.6253 16.3486 12.041 16.8008C11.4567 17.253 10.7388 17.4983 9.99998 17.4983C9.26115 17.4983 8.54324 17.253 7.95893 16.8008C7.37463 16.3486 6.95701 15.7152 6.77165 15H3.46832C3.31205 15 3.15837 14.9601 3.02187 14.884C2.88538 14.8079 2.7706 14.6982 2.68844 14.5653C2.60628 14.4324 2.55946 14.2807 2.55244 14.1245C2.54542 13.9684 2.57842 13.8131 2.64832 13.6734L4.16665 10.6367V7.50002ZM8.55665 15C8.70294 15.2534 8.91333 15.4637 9.16669 15.61C9.42004 15.7563 9.70744 15.8333 9.99998 15.8333C10.2925 15.8333 10.5799 15.7563 10.8333 15.61C11.0866 15.4637 11.297 15.2534 11.4433 15H8.55665ZM9.99998 3.33335C8.89491 3.33335 7.83511 3.77234 7.0537 4.55374C6.2723 5.33514 5.83332 6.39495 5.83332 7.50002V10.6367C5.8333 10.8953 5.7731 11.1504 5.65748 11.3817L4.68248 13.3334H15.3183L14.3433 11.3817C14.2274 11.1504 14.167 10.8954 14.1666 10.6367V7.50002C14.1666 6.39495 13.7277 5.33514 12.9463 4.55374C12.1649 3.77234 11.1051 3.33335 9.99998 3.33335Z" fill="#140B0A" />
    </svg>


  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M1.66663 5C1.66663 4.33696 1.93002 3.70107 2.39886 3.23223C2.8677 2.76339 3.50358 2.5 4.16663 2.5H15.8333C16.4963 2.5 17.1322 2.76339 17.6011 3.23223C18.0699 3.70107 18.3333 4.33696 18.3333 5V13.3333C18.3333 13.9964 18.0699 14.6323 17.6011 15.1011C17.1322 15.5699 16.4963 15.8333 15.8333 15.8333H9.44413L6.66663 17.9167C5.97996 18.4317 4.99996 17.9417 4.99996 17.0833V15.8333H4.16663C3.50358 15.8333 2.8677 15.5699 2.39886 15.1011C1.93002 14.6323 1.66663 13.9964 1.66663 13.3333V5ZM4.16663 4.16667C3.94561 4.16667 3.73365 4.25446 3.57737 4.41074C3.42109 4.56702 3.33329 4.77899 3.33329 5V13.3333C3.33329 13.5543 3.42109 13.7663 3.57737 13.9226C3.73365 14.0789 3.94561 14.1667 4.16663 14.1667H5.41663C5.74815 14.1667 6.06609 14.2984 6.30051 14.5328C6.53493 14.7672 6.66663 15.0851 6.66663 15.4167V15.8333L8.44413 14.5C8.73262 14.2836 9.08351 14.1667 9.44413 14.1667H15.8333C16.0543 14.1667 16.2663 14.0789 16.4225 13.9226C16.5788 13.7663 16.6666 13.5543 16.6666 13.3333V5C16.6666 4.77899 16.5788 4.56702 16.4225 4.41074C16.2663 4.25446 16.0543 4.16667 15.8333 4.16667H4.16663Z" fill="#140B0A" />
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