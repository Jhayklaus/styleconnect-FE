"use client";

import { useEffect, useState } from "react";
import { useVendorModals } from "../VendorModalsContext";

type View = "menu" | "bvn-form" | "bvn-code" | "bvn-verifying" | "pin";

export function KycModal() {
  const { kycOpen, closeKyc } = useVendorModals();
  const [view, setView] = useState<View>("menu");
  const [bvn, setBvn] = useState("");
  const [legalName, setLegalName] = useState("");
  const [dob, setDob] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (!kycOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [kycOpen]);

  useEffect(() => {
    if (!kycOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (view !== "menu") setView("menu");
      else closeKyc();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [kycOpen, view, closeKyc]);

  useEffect(() => {
    if (view !== "bvn-verifying") return;
    const t = setTimeout(() => {
      setView("menu");
      reset();
      closeKyc();
    }, 2000);
    return () => clearTimeout(t);
  }, [view, closeKyc]);

  function reset() {
    setBvn("");
    setLegalName("");
    setDob("");
    setCode("");
  }

  function handleClose() {
    setView("menu");
    reset();
    closeKyc();
  }

  if (!kycOpen) return null;

  const bvnValid = bvn.length === 11 && legalName.trim().length > 0 && dob.length > 0;
  const codeValid = code.length === 6;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="KYC verification">
      <div className="absolute inset-0 bg-black/30" onClick={handleClose} aria-hidden />

      <div className="absolute inset-y-0 right-0 w-full max-w-[510px] bg-beige-lighter shadow-xl flex flex-col">
        {view === "menu" && (
          <>
            <Header onClose={handleClose} title="KYC verification & Security" subtitle="Verify your identity and set up a PIN to secure your account" />
            <div className="flex-1 overflow-y-auto px-6 pt-6 pb-6 flex flex-col gap-3">
              <KycRow label="BVN Verification" onClick={() => setView("bvn-form")} />
              <KycRow label="Transaction PIN Set up" onClick={() => setView("pin")} />
            </div>
          </>
        )}

        {view === "bvn-form" && (
          <>
            <Header onBack={() => setView("menu")} title="Verify BVN" subtitle="Verify your identity and set up a PIN to secure your account" />
            <div className="flex-1 overflow-y-auto px-6 pt-6 pb-6 flex flex-col gap-4">
              <FormField label="BVN">
                <input
                  inputMode="numeric"
                  maxLength={11}
                  value={bvn}
                  onChange={(e) => setBvn(e.target.value.replace(/\D/g, ""))}
                  placeholder="BVN"
                  className="w-full bg-transparent outline-none font-jost text-base text-text-900 placeholder:text-text-500"
                />
              </FormField>
              <div>
                <FormField label="Legal first and last name">
                  <input
                    value={legalName}
                    onChange={(e) => setLegalName(e.target.value)}
                    placeholder="Legal first and last name"
                    className="w-full bg-transparent outline-none font-jost text-base text-text-900 placeholder:text-text-500"
                  />
                </FormField>
                <p className="mt-2 ml-1 inline-flex items-center gap-1.5 font-jost text-sm text-text-500">
                  <InfoIcon />
                  Name must be same as they appear on your document
                </p>
              </div>
              <FormField label="Date of birth">
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-transparent outline-none font-jost text-base text-text-900 placeholder:text-text-500"
                />
              </FormField>

              <div className="flex items-start gap-2 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3">
                <span className="text-amber-700 mt-0.5"><InfoIcon /></span>
                <p className="font-jost text-sm text-amber-900">
                  We will send you a 6-digit verification code to your registered phone number to confirm your BVN
                </p>
              </div>
            </div>
            <Footer
              primary={{ label: "Send code", disabled: !bvnValid, onClick: () => setView("bvn-code") }}
              secondary={{ label: "Cancel", onClick: () => setView("menu") }}
            />
          </>
        )}

        {view === "bvn-code" && (
          <>
            <Header onBack={() => setView("bvn-form")} title="Verify BVN" subtitle="Verify your identity and set up a PIN to secure your account" />
            <div className="flex-1 overflow-y-auto px-6 pt-6 pb-6">
              <FormField>
                <input
                  inputMode="numeric"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 6-digit code"
                  className="w-full bg-transparent outline-none font-jost text-base text-text-900 placeholder:text-text-500 tracking-widest"
                />
              </FormField>
            </div>
            <Footer
              primary={{ label: "Send code", disabled: !codeValid, onClick: () => setView("bvn-verifying") }}
              secondary={{ label: "Cancel", onClick: () => setView("menu") }}
            />
          </>
        )}

        {view === "bvn-verifying" && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
            <Spinner />
            <p className="font-inter font-medium text-2xl text-text-900">Verifying BVN</p>
            <p className="font-jost text-base text-text-500">Please wait while we verify your BVN details…</p>
          </div>
        )}

        {view === "pin" && (
          <>
            <Header onBack={() => setView("menu")} title="Transaction PIN" subtitle="Set a 4-digit PIN you'll use to authorize withdrawals and sensitive actions" />
            <div className="flex-1 overflow-y-auto px-6 pt-6 pb-6 flex flex-col gap-4">
              <FormField label="New PIN">
                <input
                  inputMode="numeric"
                  maxLength={4}
                  type="password"
                  placeholder="••••"
                  className="w-full bg-transparent outline-none font-jost text-base text-text-900 placeholder:text-text-500 tracking-widest"
                />
              </FormField>
              <FormField label="Confirm PIN">
                <input
                  inputMode="numeric"
                  maxLength={4}
                  type="password"
                  placeholder="••••"
                  className="w-full bg-transparent outline-none font-jost text-base text-text-900 placeholder:text-text-500 tracking-widest"
                />
              </FormField>
            </div>
            <Footer
              primary={{ label: "Save PIN", onClick: handleClose }}
              secondary={{ label: "Cancel", onClick: () => setView("menu") }}
            />
          </>
        )}
      </div>
    </div>
  );
}

function Header({
  onClose,
  onBack,
  title,
  subtitle,
}: {
  onClose?: () => void;
  onBack?: () => void;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="px-6 pt-6 flex flex-row-reverse items-start gap-4">
      <button
        type="button"
        onClick={onBack ?? onClose}
        aria-label={onBack ? "Back" : "Close"}
        className="w-10 h-10 rounded-full border border-stroke-soft bg-white flex items-center justify-center text-text-900 hover:bg-beige-base/30 shrink-0"
      >
        {onBack ? (
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="m12 5-5 5 5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        )}
      </button>
      <div className="flex-1">
        <h2 className="font-inter font-medium text-2xl leading-8 text-text-900 tracking-[-0.011em]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 font-jost text-base text-text-500 leading-6">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

function KycRow({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-between rounded-2xl bg-primary-lighter hover:bg-beige-base/50 px-5 py-4 text-left transition-colors"
    >
      <span className="font-jost font-medium text-base text-text-900">{label}</span>
      <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="m6 4 4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
}

function FormField({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1 rounded-2xl border border-stroke-soft bg-white/40 px-4 py-3">
      {label && <span className="font-jost text-xs text-text-500">{label}</span>}
      {children}
    </label>
  );
}

function Footer({
  primary,
  secondary,
}: {
  primary: { label: string; onClick: () => void; disabled?: boolean };
  secondary?: { label: string; onClick: () => void };
}) {
  return (
    <div className="border-t border-stroke-soft px-6 py-5 flex items-center gap-3 bg-beige-lighter">
      {secondary && (
        <button
          type="button"
          onClick={secondary.onClick}
          className="flex-1 h-12 rounded-pill border border-stroke-soft bg-white font-jost font-medium text-base text-text-900 hover:bg-beige-base/30 transition-colors"
        >
          {secondary.label}
        </button>
      )}
      <button
        type="button"
        onClick={primary.onClick}
        disabled={primary.disabled}
        className="flex-1 h-12 rounded-pill bg-primary-darker text-white font-jost font-medium text-base hover:opacity-95 transition-opacity disabled:opacity-50"
      >
        {primary.label}
      </button>
    </div>
  );
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 7.5v3.5M8 5v.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      {/* <rect width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"> */}
      <path d="M19.9999 10.0007C20.884 10.0007 21.7318 9.64946 22.3569 9.02434C22.982 8.39922 23.3332 7.55137 23.3332 6.66732C23.3332 5.78326 22.982 4.93542 22.3569 4.31029C21.7318 3.68517 20.884 3.33398 19.9999 3.33398C19.1158 3.33398 18.268 3.68517 17.6429 4.31029C17.0178 4.93542 16.6666 5.78326 16.6666 6.66732C16.6666 7.55137 17.0178 8.39922 17.6429 9.02434C18.268 9.64946 19.1158 10.0007 19.9999 10.0007ZM8.3499 12.7107C8.77056 12.8423 9.16094 13.0561 9.49844 13.3396C9.83594 13.6231 10.1139 13.9708 10.3161 14.3624C10.5183 14.7541 10.6409 15.182 10.6767 15.6213C10.7124 16.0606 10.6607 16.5027 10.5245 16.9219C10.3883 17.3411 10.1703 17.7291 9.88313 18.0635C9.59595 18.3979 9.2453 18.6721 8.85148 18.87C8.45765 19.068 8.02847 19.1859 7.58878 19.2169C7.14908 19.2479 6.7076 19.1914 6.2899 19.0507C5.45807 18.7703 4.77038 18.1732 4.37613 17.389C3.98188 16.6047 3.91289 15.6966 4.18415 14.8618C4.4554 14.027 5.04499 13.3328 5.82493 12.9301C6.60486 12.5273 7.51218 12.4485 8.3499 12.7107ZM10.2032 6.51732C10.5571 6.25571 10.9593 6.06676 11.3865 5.96138C11.8138 5.85599 12.2577 5.83625 12.6926 5.9033C13.1276 5.97034 13.5449 6.12284 13.9206 6.35201C14.2963 6.58117 14.6229 6.88246 14.8815 7.23848C15.1402 7.59451 15.3258 7.99823 15.4276 8.42636C15.5295 8.85448 15.5455 9.29853 15.4749 9.73289C15.4042 10.1672 15.2483 10.5833 15.016 10.9571C14.7837 11.3309 14.4797 11.655 14.1216 11.9107C13.4055 12.4101 12.522 12.6087 11.6611 12.4637C10.8002 12.3188 10.0305 11.8418 9.51744 11.1354C9.00443 10.4289 8.78905 9.54942 8.9176 8.68588C9.04615 7.82234 9.5067 7.0437 10.2032 6.51732ZM14.1216 28.0907C14.485 28.3441 14.7942 28.6675 15.0312 29.0419C15.2681 29.4163 15.4281 29.8342 15.5017 30.2711C15.5752 30.708 15.561 31.1553 15.4597 31.5866C15.3584 32.018 15.1721 32.4248 14.9118 32.7833C14.6514 33.1418 14.3222 33.4448 13.9433 33.6746C13.5645 33.9044 13.1437 34.0564 12.7054 34.1216C12.2671 34.1869 11.8203 34.1641 11.3909 34.0546C10.9616 33.9451 10.5584 33.7511 10.2049 33.484C9.50836 32.9576 9.04615 32.179 8.9176 31.3154C8.78905 30.4519 9.00443 29.5724 9.51744 28.8659C10.0305 28.1595 10.8002 27.6825 11.6611 27.5376C12.522 27.3926 13.4055 27.5912 14.1216 28.0907ZM6.28823 20.9507C7.12897 20.6773 8.04387 20.749 8.83168 21.1502C9.61949 21.5514 10.2157 22.2491 10.4891 23.0898C10.7625 23.9306 10.6907 24.8455 10.2895 25.6333C9.88833 26.4211 9.19063 27.0173 8.3499 27.2907C7.51218 27.5528 6.60486 27.474 5.82493 27.0712C5.04499 26.6685 4.4554 25.9743 4.18415 25.1395C3.91289 24.3047 3.98188 23.3966 4.37613 22.6123C4.77038 21.8281 5.4564 21.231 6.28823 20.9507ZM19.9999 30.0007C19.1158 30.0007 18.268 30.3518 17.6429 30.977C17.0178 31.6021 16.6666 32.4499 16.6666 33.334C16.6666 34.218 17.0178 35.0659 17.6429 35.691C18.268 36.3161 19.1158 36.6673 19.9999 36.6673C20.884 36.6673 21.7318 36.3161 22.3569 35.691C22.982 35.0659 23.3332 34.218 23.3332 33.334C23.3332 32.4499 22.982 31.6021 22.3569 30.977C21.7318 30.3518 20.884 30.0007 19.9999 30.0007ZM30.5332 28.8273C30.7976 29.1809 30.9891 29.5835 31.0966 30.0117C31.2042 30.4399 31.2255 30.8852 31.1595 31.3217C31.0935 31.7583 30.9415 32.1773 30.7122 32.5546C30.4829 32.9319 30.1809 33.2599 29.8238 33.5195C29.4667 33.7791 29.0616 33.9652 28.632 34.067C28.2024 34.1688 27.7569 34.1842 27.3213 34.1123C26.8856 34.0405 26.4686 33.8828 26.0945 33.6485C25.7203 33.4142 25.3964 33.1079 25.1416 32.7473C24.6358 32.0317 24.4322 31.1457 24.5747 30.281C24.7173 29.4164 25.1947 28.6427 25.9035 28.1274C26.6123 27.612 27.4955 27.3966 28.3619 27.5276C29.2284 27.6586 30.0085 28.1255 30.5332 28.8273ZM29.5099 23.0907C29.6452 22.6743 29.8611 22.2886 30.1454 21.9556C30.4297 21.6227 30.7768 21.349 31.1669 21.1502C31.557 20.9514 31.9824 20.8314 32.4189 20.797C32.8554 20.7626 33.2943 20.8146 33.7107 20.9498C34.1271 21.0851 34.5128 21.301 34.8458 21.5853C35.1787 21.8697 35.4524 22.2168 35.6512 22.6069C35.85 22.9969 35.97 23.4224 36.0044 23.8588C36.0387 24.2953 35.9868 24.7343 35.8516 25.1507C35.5784 25.9916 34.9823 26.6896 34.1945 27.0911C33.4067 27.4926 32.4917 27.5647 31.6507 27.2915C30.8098 27.0183 30.1118 26.4223 29.7103 25.6344C29.3088 24.8466 29.2367 23.9316 29.5099 23.0907ZM35.8516 14.8507C35.9868 15.2671 36.0387 15.706 36.0044 16.1425C35.97 16.5789 35.85 17.0044 35.6512 17.3944C35.4524 17.7845 35.1787 18.1316 34.8458 18.416C34.5128 18.7003 34.1271 18.9162 33.7107 19.0515C33.2943 19.1867 32.8554 19.2387 32.4189 19.2043C31.9824 19.1699 31.557 19.0499 31.1669 18.8511C30.7768 18.6523 30.4297 18.3786 30.1454 18.0457C29.8611 17.7127 29.6452 17.3271 29.5099 16.9107C29.2367 16.0697 29.3088 15.1547 29.7103 14.3669C30.1118 13.579 30.8098 12.983 31.6507 12.7098C32.4917 12.4366 33.4067 12.5087 34.1945 12.9102C34.9823 13.3117 35.5784 14.0097 35.8516 14.8507ZM25.1399 7.25398C25.3956 6.89582 25.7197 6.59183 26.0935 6.35956C26.4672 6.12729 26.8833 5.97132 27.3177 5.90067C27.752 5.83002 28.1961 5.84607 28.6242 5.9479C29.0523 6.04974 29.456 6.23534 29.8121 6.494C30.1681 6.75266 30.4694 7.07926 30.6985 7.45495C30.9277 7.83064 31.0802 8.24799 31.1473 8.68292C31.2143 9.11785 31.1946 9.56176 31.0892 9.98902C30.9838 10.4163 30.7948 10.8184 30.5332 11.1723C30.0069 11.8689 29.2282 12.3311 28.3647 12.4596C27.5011 12.5882 26.6216 12.3728 25.9152 11.8598C25.2087 11.3468 24.7318 10.5771 24.5868 9.71612C24.4418 8.85518 24.6404 7.97006 25.1399 7.25398Z" fill="url(#pattern0_4844_58210)" />
      <defs>
        <pattern id="pattern0_4844_58210" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_4844_58210" transform="scale(0.05)" />
        </pattern>
        <image id="image0_4844_58210" width="20" height="20" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAACy3fD9AAACtUlEQVQ4EZ2TTY7UMBCFn8t20j3MsEL8LNjNDeYMLGCLOA0H4EZwmdnDCgkNYrrTsYuvnEFCLBBN1C0nsev5e6+ctL9+4zrzur/9WHT9uujbfdUjFZ1y1sS4WrYzteTy99KN6UfJansbYjsEEVNL5wsebj990PVT0/I166JDhdjiJcQ0/Qeh9G6ju6wb1fQgVlXm1Us517L0vehAXroqqoeq6mWXpuJtyUifZ5lmmJ61ov1SlQ+0odb5VKvnVt1KVaulOFfi+jfSm6K5TnKflfM0J0MIrlXQrVldVpTSic6ZNtn8V+Enu5182WNxR+3kC2TYlDWjOabSjGPjJ8QWhBZgD4if3NX+FB529xdXc8lXPbdL9+XCp75j3exKs1uavFktaROLemzzIwFPSg/UQTwRSNbLVy+q2fPWNXMYM5ZNnZU8ULbVylJ0Oeh+XTHLKlhDU4P0yM3neZreem9fTPlIeVPrnbhiDZcxrgzJC9VYpn4IeCzqRNAoWiEjAt0B8SW5vxAfA5vdddcRjVXJmnrv9LSPejYIwtMmQo/E372xIDZZ6NM9DHeIBuWcen/sxG7eK5ssPZE/LogcEOtBXWKCbRHzThDRjJXi2ORIRge2P473kaNHA/pe0UtOhjkncDgJR/zNEJSvUGwvGGkGYbAJGyVD1AnHRxREnwpSExuGRabEByyLeIDLRNTKg71hlQXkMuyGlRNZrahAHeFzhFPKZFmDmNg9SCGOBJkYUBxsiljYGEcj4jlsIxHWEYMOhAABLGiAopk8IM5hCFEw4uh079Hl38W4J4KUIKU5iu6NZoHnARKq8c88lx4vyQg5ysYMH3oQ/S46LHrDSIMgBAOAYVzc8JlifasZI5KDkak0At0Iwx62I1gEsAPZOF9DMPYPMU59UI5vPxv3uMazcwJ6bJJ/Aoy/k5VHVQn8AAAAAElFTkSuQmCC" />
      </defs>
    </svg>

  );
}
