"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { FloatingInput } from "@/components/ui/FloatingInput";
import { cn } from "@/lib/utils";

// Figma assets — valid for 7 days from fetch
const IMG_BUY  = "https://www.figma.com/api/mcp/asset/07a28df0-df0a-4dbf-b4d1-e7bb4e352824";
const IMG_SELL = "https://www.figma.com/api/mcp/asset/c28a78db-2c7f-4aa9-8314-1ba124334c06";

const ACCOUNT_TYPES = [
  {
    value: "buyer",
    label: "Buy or explore designs",
    description: "Explore or buy the latest designs from your favorite designers",
    image: IMG_BUY,
  },
  {
    value: "seller",
    label: "Sell your design",
    description: "Set up an online store and sell your designs to earn extra cash",
    image: IMG_SELL,
  },
];

export function ChooseAccountTypeStep() {
  const router = useRouter();
  const [selected, setSelected] = useState<string>("buyer");
  const [storeName, setStoreName]   = useState("");
  const [regNumber, setRegNumber]   = useState("");
  const [social, setSocial]         = useState("");

  const isSeller = selected === "seller";
  const isValid  = !isSeller || storeName.trim().length > 0;

  function handleBack() {
    router.push("/?modal=onboarding&step=about-yourself");
  }

  function handleNext() {
    if (!isValid) return;
    // TODO: submit registration
    router.push("/");
  }

  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col">
        {/* Title */}
        <div className="px-5 pt-5 pb-0 flex flex-col gap-4">
          <h2 className="font-inter font-medium text-[32px] leading-10 text-text-900">
            What would you like to do on Stylesconnect?
          </h2>
          <p className="font-jost text-lg leading-6 tracking-[-0.27px] text-text-500">
            You can create multiple account for different purposes
          </p>
        </div>

        {/* Cards */}
        <div className="px-5 pt-6 flex gap-4">
          {ACCOUNT_TYPES.map((type) => {
            const isSelected = selected === type.value;
            return (
              <button
                key={type.value}
                type="button"
                onClick={() => setSelected(type.value)}
                className={cn(
                  "flex flex-col gap-4 items-center p-5 rounded-2xl border-2 text-center transition-colors flex-1",
                  isSelected
                    ? "border-primary-base bg-beige-lighter"
                    : "border-stroke-soft bg-beige-lighter hover:border-text-300"
                )}
              >
                <div className="w-20 h-20 rounded-full bg-[#fef7ec] overflow-hidden flex items-center justify-center shrink-0">
                  <img
                    src={type.image}
                    alt={type.label}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-jost font-medium text-base leading-6 tracking-[-0.176px] text-text-900">
                    {type.label}
                  </p>
                  <p className="font-jost text-sm leading-5 tracking-[-0.084px] text-text-500">
                    {type.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Seller extra fields — shown only when "seller" is selected */}
        {isSeller && (
          <div className="px-5 pt-6 flex flex-col gap-4">
            <p className="font-jost font-medium text-lg leading-6 tracking-[-0.27px] text-text-900">
              Tell us about your store
            </p>
            <div className="flex flex-col gap-4">
              <FloatingInput
                label="Store or business name"
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="e.g. Roda Enterprise"
              />
              <FloatingInput
                label="Business registration number (optional)"
                type="text"
                value={regNumber}
                onChange={(e) => setRegNumber(e.target.value)}
                placeholder=""
              />
              <FloatingInput
                label="Website or social media (Instagram or X)"
                type="text"
                value={social}
                onChange={(e) => setSocial(e.target.value)}
                placeholder="e.g. @mystore"
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="px-5 pt-6 pb-4 flex gap-3">
        <Button variant="outline" className="flex-1 h-[52px]" onClick={handleBack}>
          Back
        </Button>
        <Button
          variant="filled"
          className="flex-1 h-[52px] text-beige-base"
          onClick={handleNext}
          disabled={!isValid}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
