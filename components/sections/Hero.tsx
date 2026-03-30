import Image from "next/image";

const HERO_BG = "/images/hero-bg.png";

export function Hero() {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[624px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={HERO_BG}
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative h-full flex items-center">
        <div className="mx-4 md:mx-8 lg:ml-20 flex flex-col gap-6 lg:gap-10 w-full md:w-[420px] lg:w-[505px]">
          <h1 className="font-inter font-medium text-[26px] md:text-[32px] lg:text-[40px] leading-[34px] md:leading-[42px] lg:leading-[48px] tracking-[-0.4px] text-text-900 max-w-[300px] md:max-w-none">
            Shop Bespoke &amp; Ready-made designs from local designers
          </h1>

          <div className="flex gap-2">
            <AppStoreButton store="apple" />
            <AppStoreButton store="google" />
          </div>
        </div>
      </div>
    </section>
  );
}

function AppStoreButton({ store }: { store: "apple" | "google" }) {
  return (
    <button
      className={`flex items-center gap-2 h-[44px] md:h-[48px] lg:h-[52px] pl-3 lg:pl-[14px] pr-4 lg:pr-5 py-2 rounded-[30px] ${
        store === "apple" ? "bg-primary-base text-white" : "bg-text-900 text-white"
      }`}
    >
      {store === "apple" ? (
        <AppleIcon className="w-5 h-5 shrink-0" />
      ) : (
        <GooglePlayIcon className="w-5 h-5 shrink-0" />
      )}
      <div className="flex flex-col items-start font-jost font-medium">
        <span className="text-[10px] leading-3 uppercase tracking-[0.22px]">
          {store === "apple" ? "Download on the" : "Get it on"}
        </span>
        <span className="text-sm lg:text-base leading-5 lg:leading-6 tracking-[-0.176px]">
          {store === "apple" ? "App Store" : "Google Play"}
        </span>
      </div>
    </button>
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
