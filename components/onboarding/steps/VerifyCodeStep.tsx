"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DigitInput } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function VerifyCodeStep() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [resent, setResent] = useState(false);

  const isComplete = code.replace(/\s/g, "").length === 6;

  function handleNext() {
    if (!isComplete) return;
    router.push("/?modal=onboarding&step=about-yourself");
  }

  function handleResend() {
    setCode("");
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  }

  return (
    <div className="flex flex-col">
      {/* Title */}
      <div className="px-5 pt-5 pb-0">
        <h2 className="font-inter font-medium text-[32px] leading-10 text-text-900">
          Confirm email address
        </h2>
        <p className="font-jost text-base leading-6 text-text-500 mt-2">
          We sent a 5-digit code to your email. Enter it below to confirm your address.
        </p>
      </div>

      {/* Digit input */}
      <div className="px-5 pt-8 flex flex-col gap-5">
        <DigitInput value={code} onChange={setCode} length={6} />

        <div className="flex items-center gap-1 font-jost text-base leading-6">
          <span className="text-text-500">Didn&apos;t receive a code?</span>
          <button
            type="button"
            onClick={handleResend}
            className="font-medium text-text-900 underline hover:text-primary-base transition-colors"
          >
            {resent ? "Code sent!" : "Resend code"}
          </button>
        </div>
      </div>

      {/* Action */}
      <div className="px-5 pt-8 pb-5">
        <Button
          variant="filled"
          className="w-full h-[52px] text-beige-base"
          onClick={handleNext}
          disabled={!isComplete}
        >
          Verify
        </Button>
      </div>
    </div>
  );
}
