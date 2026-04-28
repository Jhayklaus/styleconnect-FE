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
      className={`flex items-center gap-2 h-[44px] md:h-[48px] lg:h-[52px] pl-3 lg:pl-[14px] pr-4 lg:pr-5 py-2 rounded-[30px] ${store === "apple" ? "bg-primary-base text-white" : "bg-text-900 text-white"
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
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 13.414L14.947 16.361L5.25 21.959C5.01075 22.0989 4.73719 22.1691 4.46016 22.1619C4.18312 22.1546 3.91361 22.0702 3.682 21.918L3.574 21.84L12 13.414ZM3 4.41401L10.586 12L3 19.586V4.41401ZM16.74 8.67401L20.25 10.701C21.25 11.278 21.25 12.721 20.25 13.299L16.74 15.326L13.414 12L16.74 8.67401ZM5.25 2.04101L14.947 7.63901L12 10.586L3.574 2.15901C3.8092 1.9733 4.09487 1.86271 4.39381 1.84167C4.69275 1.82062 4.9911 1.89008 5.25 2.04101Z" fill="white" />
    </svg>

  );
}
