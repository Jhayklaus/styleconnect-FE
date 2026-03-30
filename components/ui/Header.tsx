"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./Button";

const LOGO_SRC = "/images/logo.png";

const NAV_TABS = ["For you", "Men", "Women", "Kids"];

type HeaderProps = {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  isLoggedIn?: boolean;
  cartCount?: number;
};

export function Header({
  activeTab = "For you",
  onTabChange,
  isLoggedIn = false,
  cartCount = 0,
}: HeaderProps) {
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-beige-lighter w-full relative z-50">
      {/* Main bar */}
      <div className="h-[64px] md:h-[72px] lg:h-[86px] flex items-center px-4 md:px-8 lg:px-20">
        {/* Logo */}
        <div className="flex items-center shrink-0 mr-4">
          <Image
            src={LOGO_SRC}
            alt="StylesConnect"
            width={24}
            height={31}
            className="lg:w-[31px] lg:h-[40px]"
            priority
          />
        </div>

        {/* Tab navigation — tablet and up */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6 ml-2 lg:ml-4">
          {NAV_TABS.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => onTabChange?.(tab)}
                className={`relative py-3 font-jost font-medium text-sm lg:text-base leading-6 tracking-[-0.176px] transition-colors whitespace-nowrap ${
                  isActive ? "text-primary-base" : "text-text-900 hover:text-primary-base"
                }`}
              >
                {tab}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-base rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Search bar — desktop only (needs the horizontal space) */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 w-[473px]">
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
        </div>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2 md:gap-3 lg:gap-10">
          {/* Search icon — tablet and below */}
          <button className="lg:hidden p-2 rounded-pill hover:bg-bg-soft transition-colors">
            <SearchIcon className="w-5 h-5 text-text-900" />
          </button>

          <div className="flex items-center gap-2">
            {/* Cart — always visible */}
            <button className="relative bg-beige-lighter p-[10px] rounded-pill hover:bg-bg-soft transition-colors">
              <CartIcon className="w-5 h-5 text-text-900" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary-base text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            {/* Bell — tablet and up */}
            <button className="hidden md:block bg-beige-lighter p-[10px] rounded-pill hover:bg-bg-soft transition-colors">
              <BellIcon className="w-5 h-5 text-text-900" />
            </button>
          </div>

          {isLoggedIn ? (
            <button className="bg-beige-lighter p-[10px] rounded-pill hover:bg-bg-soft transition-colors">
              <div className="w-8 h-8 rounded-full bg-bg-soft flex items-center justify-center font-jost font-medium text-sm text-text-900">
                U
              </div>
            </button>
          ) : (
            <>
              {/* Login button — tablet and up */}
              <Link href="/?modal=onboarding&step=create-account" className="hidden md:block">
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

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-beige-lighter border-t border-stroke-soft px-4 py-4 flex flex-col gap-1">
          {NAV_TABS.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => { onTabChange?.(tab); setMobileMenuOpen(false); }}
                className={`text-left py-3 px-2 font-jost font-medium text-base rounded-xl transition-colors ${
                  isActive ? "text-primary-base bg-beige-base/20" : "text-text-900 hover:bg-bg-soft"
                }`}
              >
                {tab}
              </button>
            );
          })}
          <div className="pt-2 border-t border-stroke-soft mt-2">
            <Link href="/?modal=onboarding&step=create-account" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full">Login or Sign up</Button>
            </Link>
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

function MenuIcon({ className, open }: { className?: string; open: boolean }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
      {open ? (
        <path d="M5 5l10 10M15 5L5 15" />
      ) : (
        <path d="M3 5h14M3 10h14M3 15h14" />
      )}
    </svg>
  );
}
