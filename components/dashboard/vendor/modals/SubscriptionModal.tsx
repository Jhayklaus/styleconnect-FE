"use client";

import { useEffect, useState } from "react";
import { useVendorModals } from "../VendorModalsContext";

type Plan = "monthly" | "quarterly" | "yearly";

const PLANS: {
  value: Plan;
  label: string;
  price: string;
  description: string;
  save?: string;
}[] = [
  {
    value: "monthly",
    label: "Monthly",
    price: "₦36,000",
    description: "Plan expires after one month",
  },
  {
    value: "quarterly",
    label: "Quarterly",
    price: "₦90,000",
    description: "₦25,000/month payment for duration of 3 months",
    save: "Save 15%",
  },
  {
    value: "yearly",
    label: "Yearly",
    price: "₦90,000",
    description: "₦25,000/month payment for duration of 1 year",
    save: "Save 35%",
  },
];

const BENEFITS = [
  "Unlimited live listing on your store",
  "Manage listing & product catalogue",
  "Receive orders & payment",
  "Process payout to your bank account",
  "Full customer support & access",
];

export function SubscriptionModal() {
  const { subscriptionOpen, closeSubscription } = useVendorModals();
  const [plan, setPlan] = useState<Plan>("quarterly");

  useEffect(() => {
    if (!subscriptionOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [subscriptionOpen]);

  useEffect(() => {
    if (!subscriptionOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeSubscription();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [subscriptionOpen, closeSubscription]);

  if (!subscriptionOpen) return null;

  const selected = PLANS.find((p) => p.value === plan)!;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Subscription">
      <div className="absolute inset-0 bg-black/40" onClick={closeSubscription} aria-hidden />

      <div className="relative w-full max-w-[1060px] grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl bg-beige-lighter">
        <div className="relative bg-primary-darker text-white px-8 py-10 hidden md:flex flex-col justify-end overflow-hidden min-h-[680px] ">
          <BenefitsBlob />
          <div className="relative">
            <p className="font-inter font-medium text-xl mb-5">Benefits you will enjoy</p>
            <ul className="flex flex-col gap-3">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-2 font-jost text-base">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e5a23a] mt-2 shrink-0" aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-beige-lighter px-6 sm:px-8 py-8 flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-inter font-medium text-2xl leading-8 text-text-900 tracking-[-0.011em] mx-auto md:mx-0">
              Go live with your listings
            </h2>
            <button
              type="button"
              onClick={closeSubscription}
              aria-label="Close"
              className="text-text-900 hover:opacity-70 shrink-0"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            {PLANS.map((p) => (
              <PlanRow
                key={p.value}
                plan={p}
                selected={plan === p.value}
                onSelect={() => setPlan(p.value)}
              />
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-stroke-soft flex items-center justify-between">
            <span className="font-jost font-medium text-base text-text-900">Total</span>
            <div className="text-right">
              <p className="font-inter font-medium text-lg text-text-900 tabular-nums">{selected.price}</p>
              {selected.save && (
                <p className="font-jost text-sm text-amber-700">{selected.save}</p>
              )}
            </div>
          </div>

          <button
            type="button"
            className="mt-5 w-full h-12 rounded-pill bg-primary-base text-white font-jost font-medium text-base hover:opacity-95 transition-opacity"
          >
            Pay now
          </button>

          <p className="mt-4 font-jost text-xs text-text-500 text-center leading-5">
            By continuing, you agree to our <a className="underline">Terms of Service</a>, <a className="underline">Privacy Policy</a>, and <a className="underline">Refund &amp; Cancellation Policy</a>.
          </p>
          <p className="mt-2 font-jost text-xs text-text-500 text-center inline-flex items-center justify-center gap-1">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden>
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.25" />
              <path d="M8 7.5v3.5M8 5v.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
            </svg>
            Final amount will include processing fee
          </p>
        </div>
      </div>
    </div>
  );
}

export function BenefitsBlob({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 536"
      preserveAspectRatio="xMaxYMax meet"
      className={`absolute right-0 bottom-0 w-2/3 h-full pointer-events-none ${className}`}
    >
      <path
        d="M637.818 84.0219C292.248 121.534 108.318 492.522 152.818 710.022C226.818 977.022 575.827 699.011 684.399 528.118C925.233 149.048 798.09 84.0219 637.818 84.0219Z"
        fill="#693D11"
      />
      <path
        d="M747.021 131.093C389.326 169.921 203.268 541.752 283.361 754.551C399.92 1014.36 688.439 926.403 800.822 749.514C1050.11 357.143 895.489 126.557 747.021 131.093Z"
        fill="#F2AE40"
      />
    </svg>
  );
}

function PlanRow({
  plan,
  selected,
  onSelect,
}: {
  plan: (typeof PLANS)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left rounded-2xl border px-4 py-3 transition-colors ${
        selected ? "border-primary-darker bg-white" : "border-stroke-soft bg-white/40 hover:bg-white/70"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 shrink-0 ${
            selected ? "border-primary-darker" : "border-stroke-soft"
          }`}
        >
          {selected && <span className="w-2.5 h-2.5 rounded-full bg-primary-darker" />}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-jost font-medium text-base text-text-900">{plan.label}</span>
            {plan.save && (
              <span className="px-2 py-0.5 rounded-pill bg-amber-100 text-amber-800 font-jost text-xs">
                {plan.save}
              </span>
            )}
          </div>
          <p className="mt-0.5 font-jost text-sm text-text-500">{plan.description}</p>
        </div>
        <span className="font-inter font-medium text-base text-text-900 tabular-nums shrink-0">
          {plan.price}
        </span>
      </div>
    </button>
  );
}
