"use client";

import { useState } from "react";
import { useVendorModals } from "../VendorModalsContext";

type Tab = "wallet" | "settings";

export function VendorStorePage() {
  const [tab, setTab] = useState<Tab>("wallet");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-6 border-b border-stroke-soft">
        <TabButton active={tab === "wallet"} onClick={() => setTab("wallet")}>
          Wallet & Billing
        </TabButton>
        <TabButton active={tab === "settings"} onClick={() => setTab("settings")}>
          Settings
        </TabButton>
      </div>

      {tab === "wallet" ? <WalletAndBilling /> : <StoreSettings />}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative pb-3 font-jost text-base ${
        active ? "text-text-900 font-medium" : "text-text-500 hover:text-text-900"
      }`}
    >
      {children}
      {active && <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-text-900" />}
    </button>
  );
}

function WalletAndBilling() {
  const { openWalletHistory, openSubscription } = useVendorModals();

  // Mocked: assume wallet is activated and there is an active subscription.
  const walletActivated = true;
  const hasSubscription = true;

  return (
    <div className="flex flex-col gap-6 max-w-[680px]">
      <section className="relative rounded-3xl bg-[#E5A23A] text-text-900 px-6 py-5 overflow-hidden">
        <button
          type="button"
          aria-label="Wallet info"
          className="absolute top-5 right-5 w-6 h-6 rounded-full border border-text-900/40 flex items-center justify-center text-text-900/70 hover:text-text-900"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.25" />
            <path d="M7 6.5v3.5M7 4v.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
          </svg>
        </button>
        <p className="font-jost text-sm">My wallet</p>
        <p className="mt-1 font-inter font-medium text-3xl tracking-[-0.011em]">4,800,100.00</p>
        <div className="mt-4 flex items-center gap-3">
          {walletActivated ? (
            <button
              type="button"
              className="px-4 py-2 rounded-pill bg-white font-jost font-medium text-sm text-text-900 hover:bg-white/90"
            >
              Withdraw funds
            </button>
          ) : (
            <button
              type="button"
              className="px-4 py-2 rounded-pill bg-white font-jost font-medium text-sm text-text-900 hover:bg-white/90"
            >
              Activate wallet
            </button>
          )}
          <button
            type="button"
            onClick={openWalletHistory}
            className="px-4 py-2 rounded-pill bg-white/80 font-jost font-medium text-sm text-text-900 hover:bg-white"
          >
            View history
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <p className="font-jost font-medium text-base text-text-900">Plan & Billing</p>

        {hasSubscription ? (
          <div className="rounded-2xl border border-stroke-soft bg-white/40 px-5 py-4">
            <div className="flex items-center gap-2 text-text-900">
              <CardIcon />
              <p className="font-jost font-medium text-base">Card ending in 4242</p>
            </div>
            <p className="mt-1 font-jost text-sm text-text-500 ml-7">
              Next billing on Jan 24, 2027
            </p>
            <p className="mt-3 font-jost font-medium text-base text-text-900">$250/month</p>

            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <button
                type="button"
                className="px-4 py-2 rounded-pill bg-text-900 text-white font-jost font-medium text-sm hover:bg-text-900/90"
              >
                Update
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-pill bg-white border border-stroke-soft font-jost font-medium text-sm text-text-900 hover:bg-beige-base/30"
              >
                Cancel plan
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-pill bg-white border border-stroke-soft font-jost font-medium text-sm text-text-900 hover:bg-beige-base/30"
              >
                Billing history
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-stroke-soft bg-white/40 px-5 py-4">
            <div className="flex items-center gap-2 text-text-900">
              <CardIcon />
              <p className="font-jost font-medium text-base">No active subscription</p>
            </div>
            <p className="mt-1 font-jost text-sm text-text-500 ml-7">
              You do not have an active subscription
            </p>
            <p className="mt-3 font-jost font-medium text-base text-text-900">$0/month</p>
            <button
              type="button"
              onClick={openSubscription}
              className="mt-4 px-4 py-2 rounded-pill bg-text-900 text-white font-jost font-medium text-sm hover:bg-text-900/90"
            >
              Subscribe
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function StoreSettings() {
  const { openKyc } = useVendorModals();
  const kycComplete = false;

  return (
    <div className="flex flex-col gap-6 max-w-[680px]">
      <section className="relative h-[180px] rounded-2xl bg-[#FBDFB1]">
        <button
          type="button"
          className="absolute top-4 right-4 inline-flex items-center gap-1.5 h-9 px-4 rounded-pill bg-white font-jost font-medium text-sm text-[#140B0A] hover:bg-white/90 shadow-[0_1px_2px_rgba(82,88,102,0.06)]"
        >
          <CameraIcon />
          Change cover
        </button>

        <div className="absolute -bottom-8 left-4 w-20 h-20 rounded-2xl bg-[#FBDFB1] border-[2.5px] border-white overflow-hidden">
          <StoreAvatarArt />
        </div>
        <button
          type="button"
          aria-label="Change avatar"
          className="absolute -bottom-[3px] left-[78px] w-[35px] h-[35px] rounded-full bg-white flex items-center justify-center text-[#140B0A] shadow-[0_1.25px_2.5px_rgba(82,88,102,0.06)] hover:bg-white/95"
        >
          <PencilIcon />
        </button>
      </section>

      <div className="h-10" />

      {!kycComplete && (
        <button
          type="button"
          onClick={openKyc}
          className="flex items-center justify-between rounded-2xl border border-amber-300 bg-amber-50/60 px-5 py-4 hover:bg-amber-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-amber-200/70 flex items-center justify-center text-amber-900">
              <ShieldIcon />
            </span>
            <div>
              <p className="font-jost font-medium text-base text-text-900">Complete KYC</p>
              <p className="font-jost text-sm text-text-500">
                Verify your identity to unlock payouts and full account access
              </p>
            </div>
          </div>
          <ChevronRight />
        </button>
      )}

      <SettingRow
        icon={<BankIcon />}
        title="Bank account"
        primary="Guarantee Trust Bank"
        secondary="Adewale Adenike · 4512054320"
        actionLabel="Manage bank"
      />
      <SettingRow
        icon={<PinIcon />}
        title="Store address"
        primary="No. 14, Close 2 Keffi kojo street trust fund, Zambezi"
        secondary="crescent, Abuja, Nigeria"
        actionLabel="Change address"
      />
      <SettingRow
        icon={<BriefcaseIcon />}
        title="Business information"
        primary="Zurich styles & stiches"
        actionLabel="Manage details"
      />
      <SettingRow
        icon={<KeyIcon />}
        title="Transaction PIN"
        primary="Secure your funds and withdraw safely into your account"
        actionLabel="Change PIN"
      />
    </div>
  );
}

function SettingRow({
  icon,
  title,
  primary,
  secondary,
  actionLabel,
}: {
  icon: React.ReactNode;
  title: string;
  primary: string;
  secondary?: string;
  actionLabel: string;
}) {
  return (
    <div className="rounded-2xl border border-stroke-soft bg-white/40 px-5 py-4">
      <div className="flex items-start gap-3">
        <span className="w-7 h-7 rounded-md bg-beige-base/40 flex items-center justify-center text-text-900 shrink-0">
          {icon}
        </span>
        <div className="flex-1 min-w-0">
          <p className="font-jost font-medium text-base text-text-900">{title}</p>
          <p className="mt-0.5 font-jost text-sm text-text-500">{primary}</p>
          {secondary && <p className="font-jost text-sm text-text-500">{secondary}</p>}
          <button
            type="button"
            className="mt-2 inline-flex items-center gap-1 font-jost text-sm text-text-900 hover:underline"
          >
            {actionLabel}
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="text-text-500">
      <path d="m6 4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="2.5" y="5" width="15" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 8.5h15" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 7a2 2 0 0 1 2-2h2l1.5-2h7L17 5h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M13.203 4.39c.561-.561 1.314-.888 2.107-.914.793-.026 1.566.251 2.163.774l.15.14.736.737c.561.56.888 1.314.914 2.106.026.793-.25 1.566-.774 2.163l-.14.15-11.679 11.68c-.165.165-.365.292-.586.368l-.168.05-4.64 1.071c-.162.038-.331.036-.493-.005-.16-.041-.31-.121-.434-.232-.124-.111-.22-.25-.28-.406-.06-.156-.08-.323-.062-.49l.02-.117 1.07-4.642c.053-.227.156-.44.302-.622l.115-.131L13.203 4.39Zm-.737 3.682-9.364 9.365-.663 2.873 2.873-.664 9.365-9.364-2.211-2.21Zm3.683-2.21c-.18-.18-.418-.288-.671-.303-.253-.016-.504.06-.704.217l-.098.087-.737.736 2.21 2.21.736-.737c.18-.18.288-.418.303-.671.016-.253-.06-.504-.217-.704l-.087-.098-.736-.736Z"
        fill="currentColor"
      />
    </svg>
  );
}

function StoreAvatarArt() {
  return (
    <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden>
      <g transform="translate(-16.375, -131)">
        <g clipPath="url(#avatar-clip-outer)">
          <g clipPath="url(#avatar-clip-inner)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.5865 171.991C3.40324 169.763 3.15354 167.156 3.89235 164.744C4.63116 162.332 6.29795 160.312 8.52604 159.128L81.3351 120.462C83.5632 119.279 86.1701 119.029 88.5823 119.768C90.9945 120.507 93.0144 122.173 94.1976 124.402L4.5865 171.991Z"
              fill="#FBDFB1"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M90.0636 142.753C90.0833 142.197 90.2491 141.656 90.5443 141.184C90.8394 140.712 91.2536 140.326 91.7451 140.065C93.2909 139.244 98.1861 145.433 99.007 146.979L127.263 200.186C128.446 202.414 128.696 205.021 127.957 207.433C127.219 209.845 125.552 211.865 123.324 213.048L61.716 245.766C59.4879 246.949 56.881 247.199 54.4688 246.46C52.0566 245.721 50.0367 244.055 48.8534 241.826L20.5972 188.62C19.7763 187.074 17.3903 179.552 18.9361 178.732C19.4276 178.471 19.9793 178.344 20.5355 178.363C21.0917 178.383 21.6329 178.549 22.1048 178.844L90.0636 142.753Z"
              fill="#F2AE40"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M72.9413 185.766C72.6022 185.018 72.5663 184.168 72.8412 183.395C73.1161 182.621 73.6803 181.984 74.4151 181.618C75.1499 181.252 75.9981 181.185 76.7812 181.432C77.5643 181.678 78.2211 182.219 78.6137 182.94C79.7205 185.161 79.9161 187.726 79.159 190.089C78.4018 192.451 76.7517 194.425 74.5604 195.589C72.3692 196.752 69.81 197.014 67.4285 196.318C65.047 195.622 63.0315 194.024 61.8116 191.863C61.4341 191.134 61.354 190.287 61.5883 189.5C61.8226 188.713 62.3529 188.048 63.0677 187.644C63.7825 187.241 64.626 187.13 65.4209 187.335C66.2157 187.541 66.8998 188.047 67.3294 188.746L67.4952 189.031C67.9176 189.718 68.5858 190.218 69.3638 190.43C70.1417 190.641 70.9711 190.549 71.6831 190.171C72.3952 189.792 72.9365 189.157 73.1968 188.394C73.4572 187.631 73.4171 186.798 73.0847 186.063L72.9413 185.766Z"
              fill="#45231F"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M101.713 199.393C100.529 197.165 98.5094 195.498 96.0972 194.759C93.685 194.021 91.0781 194.27 88.85 195.454L66.4472 207.351C64.2191 208.534 62.5523 210.554 61.8135 212.966C61.0747 215.379 61.3244 217.985 62.5076 220.214L72.9178 239.816L112.123 218.996L101.713 199.393Z"
              fill="#E8C5A5"
            />
            <path d="M86.4493 180.944C90.3498 178.872 92.3126 174.935 90.8334 172.15C89.3541 169.364 84.993 168.785 81.0925 170.857C77.192 172.928 75.2292 176.865 76.7084 179.651C78.1877 182.436 82.5488 183.015 86.4493 180.944Z" fill="#FDF9F6" />
            <path d="M55.7694 197.237C59.6699 195.165 61.6327 191.228 60.1534 188.443C58.6742 185.657 54.3131 185.078 50.4126 187.15C46.5121 189.221 44.5493 193.158 46.0285 195.944C47.5077 198.729 51.8689 199.308 55.7694 197.237Z" fill="#FDF9F6" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22.7886 162.324L42.391 151.914L48.3397 163.115C51.6234 169.299 49.8974 176.649 44.4871 179.522C39.0769 182.395 32.0209 179.709 28.7372 173.526L22.7886 162.324ZM56.3928 144.478L75.9952 134.068L81.9439 145.269C85.2275 151.453 83.5016 158.803 78.0913 161.676C72.681 164.549 65.6251 161.863 62.3414 155.68L56.3928 144.478Z"
              fill="#CAC2FF"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M74.5954 134.811L94.1978 124.401L100.146 135.602C103.43 141.785 101.704 149.136 96.2939 152.009C90.8837 154.882 83.8277 152.196 80.544 146.012L74.5954 134.811ZM39.591 153.401L59.1935 142.99L65.1421 154.192C68.4258 160.375 66.6999 167.725 61.2896 170.598C55.8793 173.472 48.8234 170.785 45.5397 164.602L39.591 153.401ZM4.58667 171.99L24.1891 161.58L30.1378 172.781C33.4214 178.965 31.6955 186.315 26.2852 189.188C20.875 192.061 13.819 189.375 10.5353 183.192L4.58667 171.99Z"
              fill="#EEEBFF"
            />
            <path d="M58.8367 186.262C60.3833 185.441 60.9712 183.521 60.1499 181.974C59.3285 180.428 57.4089 179.84 55.8624 180.661C54.3158 181.483 53.7278 183.402 54.5492 184.949C55.3705 186.495 57.2901 187.083 58.8367 186.262Z" fill="#45231F" />
            <path d="M75.6397 177.338C77.1863 176.517 77.7742 174.597 76.9529 173.051C76.1315 171.504 74.2119 170.916 72.6653 171.737C71.1187 172.559 70.5308 174.478 71.3522 176.025C72.1735 177.572 74.0931 178.159 75.6397 177.338Z" fill="#45231F" />
          </g>
        </g>
      </g>
      <defs>
        <clipPath id="avatar-clip-outer">
          <rect x="16.375" y="131" width="80" height="80" rx="20" fill="white" />
        </clipPath>
        <clipPath id="avatar-clip-inner">
          <rect width="101.464" height="101.464" fill="white" transform="translate(0.125 163.59) rotate(-27.9712)" />
        </clipPath>
      </defs>
    </svg>
  );
}

function BankIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M10 2 2 6h16l-8-4ZM4 8v7M8 8v7M12 8v7M16 8v7M2 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M10 18s6-5.5 6-10a6 6 0 1 0-12 0c0 4.5 6 10 6 10Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="2.5" y="6" width="15" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="7" cy="13" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="m9 11 7-7-2-2M13 7l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M10 2 3 5v5c0 4 3 7 7 8 4-1 7-4 7-8V5l-7-3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="m7.5 10 1.75 1.75L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
