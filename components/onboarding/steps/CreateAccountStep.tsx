"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FloatingInput } from "@/components/ui/FloatingInput";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const PASSWORD_RULES = [
  { id: "uppercase", label: "At least 1 uppercase", test: (p: string) => /[A-Z]/.test(p) },
  { id: "number",    label: "At least 1 number",    test: (p: string) => /\d/.test(p) },
  { id: "length",    label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { id: "special",  label: "At least 1 special character (e.g @,#)", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export function CreateAccountStep() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const returnToParam = returnTo ? `&returnTo=${encodeURIComponent(returnTo)}` : "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const allValid = PASSWORD_RULES.every((r) => r.test(password)) && email.length > 0;

  function handleNext() {
    if (!allValid) return;
    router.push(`/?modal=onboarding&step=verify-code${returnToParam}`);
  }

  return (
    <div className="flex flex-col">
      {/* Title */}
      <div className="px-5 pt-5 pb-0">
        <h2 className="font-inter font-medium text-[32px] leading-10 text-text-900">
          Create account
        </h2>
        <p className="font-jost text-base leading-6 text-text-900 mt-2">
          Have an account?{" "}
          <Link
            href="/?modal=login"
            className="font-medium underline hover:text-primary-base transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Fields */}
      <div className="px-5 pt-5 flex flex-col gap-4">
        <FloatingInput
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="myaddress@gmail.com"
        />
        <FloatingInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Password strength */}
        <div className="flex flex-col gap-2">
          {PASSWORD_RULES.map((rule) => {
            const passed = rule.test(password);
            return (
              <div key={rule.id} className="flex items-center gap-1.5">
                {passed ? (
                  <CheckCircleIcon className="w-3.5 h-3.5 text-primary-base shrink-0" />
                ) : (
                  <MinusCircleIcon className="w-3.5 h-3.5 text-text-300 shrink-0" />
                )}
                <span
                  className={cn(
                    "font-jost text-sm leading-5 tracking-[-0.084px]",
                    passed ? "text-text-900" : "text-text-300"
                  )}
                >
                  {rule.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="px-5 pt-5 flex flex-col gap-6 items-center">
        <Button
          variant="filled"
          className="w-full h-[52px] text-beige-base"
          onClick={handleNext}
          disabled={!allValid}
        >
          Next
        </Button>

        <Divider />

        <button
          type="button"
          className="w-full h-[52px] flex items-center justify-center gap-2 border border-stroke-soft rounded-pill bg-beige-lighter font-jost font-medium text-base text-text-500 shadow-[0px_1px_2px_0px_rgba(82,88,102,0.06)] hover:bg-bg-soft transition-colors"
        >
          <GoogleIcon className="w-5 h-5 shrink-0" />
          Continue with Google
        </button>
      </div>

      {/* Terms */}
      <div className="px-5 pt-5 pb-5">
        <p className="font-jost text-base leading-6 text-text-500">
          By clicking &quot;Next&quot;, you acknowledge that you have read and agree to{" "}
          Stylesconnect{" "}
          <Link href="/terms" className="text-text-900 underline">Terms</Link>
          {" "}and{" "}
          <Link href="/privacy" className="text-text-900 underline">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-2.5 w-full">
      <div className="flex-1 h-px bg-stroke-soft" />
      <span className="font-jost font-medium text-[11px] leading-3 tracking-[0.22px] uppercase text-text-300">
        or
      </span>
      <div className="flex-1 h-px bg-stroke-soft" />
    </div>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M7 13A6 6 0 107 1a6 6 0 000 12zm2.78-7.47a.75.75 0 00-1.06-1.06L6.25 6.94 5.28 5.97a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.06 0l3-3z" />
    </svg>
  );
}

function MinusCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.25}>
      <circle cx="7" cy="7" r="5.5" />
      <path d="M4.5 7h5" strokeLinecap="round" />
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none">
      <path d="M18.17 10.23c0-.63-.06-1.25-.16-1.84H10v3.48h4.59a3.93 3.93 0 01-1.7 2.58v2.14h2.75c1.6-1.48 2.53-3.66 2.53-6.36z" fill="#4285F4" />
      <path d="M10 18.5c2.3 0 4.23-.76 5.64-2.07l-2.75-2.14c-.76.51-1.74.82-2.89.82-2.22 0-4.1-1.5-4.77-3.51H2.4v2.21A8.5 8.5 0 0010 18.5z" fill="#34A853" />
      <path d="M5.23 11.6A5.1 5.1 0 014.96 10c0-.56.1-1.1.27-1.6V6.19H2.4A8.5 8.5 0 001.5 10c0 1.37.33 2.67.9 3.81l2.83-2.21z" fill="#FBBC05" />
      <path d="M10 4.89c1.25 0 2.37.43 3.25 1.27l2.44-2.44C14.22 2.34 12.3 1.5 10 1.5A8.5 8.5 0 002.4 6.19l2.83 2.21C5.9 6.39 7.78 4.89 10 4.89z" fill="#EA4335" />
    </svg>
  );
}
