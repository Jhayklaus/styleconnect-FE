import Image from "next/image";

const LOGO_SRC = "/images/logo-white.png";

const NAV_LINKS = ["Men", "Women", "Kids"];
const LEGAL_LINKS = ["Privacy", "Terms of Service", "Shipping & Returns"];

export function Footer() {
  return (
    <footer className="bg-charcoal-darker text-text-white w-full">
      {/* Top section */}
      <div className="px-4 md:px-8 lg:px-[83px] pt-10 md:pt-14 lg:pt-20 pb-6 flex flex-col md:flex-row items-start justify-between gap-8">
        {/* Logo + nav */}
        <div className="flex flex-col gap-6">
          <Image src={LOGO_SRC} alt="StylesConnect" width={26} height={34} />
          <div className="flex gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="font-jost font-medium text-base leading-6 tracking-[-0.176px] text-text-white hover:text-beige-base transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* App store buttons */}
        <div className="flex flex-col gap-4">
          <p className="font-inter font-medium text-xl leading-7 text-beige-base">
            Download the app
          </p>
          <div className="flex gap-2">
            <AppStoreButton store="apple" />
            <AppStoreButton store="google" />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 md:mx-8 lg:mx-[83px] h-px bg-charcoal-base" />

      {/* Bottom section */}
      <div className="px-4 md:px-8 lg:px-[83px] py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 lg:gap-[113px]">
          <div className="flex items-center gap-5 md:gap-6">
            <SocialIcon platform="instagram" />
            <SocialIcon platform="twitter" />
            <SocialIcon platform="pinterest" />
            <SocialIcon platform="tiktok" />
          </div>
          <div className="flex flex-wrap items-center gap-4 md:gap-5 lg:gap-6">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="font-jost font-medium text-sm leading-5 tracking-[-0.084px] text-text-white hover:text-beige-base transition-colors whitespace-nowrap"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <p className="font-jost font-medium text-sm leading-5 tracking-[-0.084px] text-text-300 whitespace-nowrap">
          ©Stylesconnect 2026. All rights reserved
        </p>
      </div>
    </footer>
  );
}

function AppStoreButton({ store }: { store: "apple" | "google" }) {
  return (
    <button className="flex items-center gap-2 border border-charcoal-base rounded-[30px] pl-[14px] pr-5 py-2 h-[52px] hover:border-beige-base/30 transition-colors">
      {store === "apple" ? (
        <AppleIcon className="w-6 h-6 text-text-white shrink-0" />
      ) : (
        <GooglePlayIcon className="w-6 h-6 shrink-0" />
      )}
      <div className="flex flex-col items-start font-jost font-medium text-text-white">
        <span className="text-[11px] leading-3 uppercase tracking-[0.22px]">
          {store === "apple" ? "Download on the" : "Get it on"}
        </span>
        <span className="text-base leading-6 tracking-[-0.176px]">
          {store === "apple" ? "App Store" : "Google Play"}
        </span>
      </div>
    </button>
  );
}

function SocialIcon({ platform }: { platform: string }) {
  return (
    <a
      href="#"
      aria-label={platform}
      className="w-6 h-6 text-text-white hover:text-beige-base transition-colors flex items-center justify-center"
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        {platform === "instagram" && (
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        )}
        {platform === "twitter" && (
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        )}
        {platform === "pinterest" && (
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
        )}
        {platform === "tiktok" && (
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.73a8.27 8.27 0 004.84 1.56V6.84a4.85 4.85 0 01-1.07-.15z" />
        )}
      </svg>
    </a>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M3.18 23.64c.3.16.65.18.97.08L14.88 12 11.1 8.22 3.18 23.64z" fill="#EA4335" />
      <path d="M20.82 10.26L17.9 8.62l-3.02 3.38 3.02 3.38 2.94-1.64c.84-.47.84-1.81-.02-2.28v-.1z" fill="#FBBC04" />
      <path d="M3.18.36C2.9.52 2.72.82 2.72 1.2v21.6c0 .38.18.68.46.84L14.88 12 3.18.36z" fill="#4285F4" />
      <path d="M14.88 12L3.18 23.64c.1.03.2.04.3.04.24 0 .47-.07.67-.2l12.75-7.1L14.88 12z" fill="#34A853" />
    </svg>
  );
}
