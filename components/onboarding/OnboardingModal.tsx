"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { CreateAccountStep } from "./steps/CreateAccountStep";
import { VerifyCodeStep } from "./steps/VerifyCodeStep";
import { AboutYourselfStep } from "./steps/AboutYourselfStep";
import { ChooseAccountTypeStep } from "./steps/ChooseAccountTypeStep";

const STEPS = ["create-account", "verify-code", "about-yourself", "choose-account-type"] as const;
type Step = (typeof STEPS)[number];

const STEP_LABELS: Record<Step, string> = {
  "create-account": "Login or Sign up",
  "verify-code": "Confirm email address",
  "about-yourself": "Your profile",
  "choose-account-type": "Account type",
};

export function OnboardingModal({ step }: { step: string }) {
  const router = useRouter();
  const currentStep = (STEPS.includes(step as Step) ? step : "create-account") as Step;
  const stepIndex = STEPS.indexOf(currentStep);

  function handleClose() {
    router.push("/");
  }

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-[rgba(2,13,23,0.19)] pt-[60px] px-4 overflow-y-auto"
      onClick={handleClose}
    >
      {/* Panel — wider on the last step */}
      <div
        className={cn(
          "relative bg-beige-lighter rounded-[20px] shadow-[0px_16px_40px_-8px_rgba(88,92,95,0.16)] w-full mb-8 transition-all duration-300",
          currentStep === "choose-account-type" ? "max-w-[616px]" : "max-w-[531px]"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stroke-soft">
          {/* Back button (hidden on first step) */}
          <button
            onClick={() =>
              stepIndex > 0
                ? router.push(`/?modal=onboarding&step=${STEPS[stepIndex - 1]}`)
                : handleClose()
            }
            className="p-0.5 rounded-md hover:bg-bg-soft transition-colors text-text-500 hover:text-text-900"
            aria-label="Back"
          >
            {stepIndex > 0 ? (
              <ChevronLeftIcon className="w-5 h-5" />
            ) : (
              <span className="w-5 h-5 block" />
            )}
          </button>

          <p className="font-jost font-medium text-base leading-6 tracking-[-0.176px] text-text-900">
            {STEP_LABELS[currentStep]}
          </p>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="p-0.5 rounded-md hover:bg-bg-soft transition-colors text-text-500 hover:text-text-900"
            aria-label="Close"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 bg-stroke-soft">
          <div
            className="h-full bg-primary-base transition-all duration-300"
            style={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        {/* Step content */}
        {currentStep === "create-account"     && <CreateAccountStep />}
        {currentStep === "verify-code"        && <VerifyCodeStep />}
        {currentStep === "about-yourself"     && <AboutYourselfStep />}
        {currentStep === "choose-account-type" && <ChooseAccountTypeStep />}
      </div>
    </div>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.5 5l-5 5 5 5" />
    </svg>
  );
}
