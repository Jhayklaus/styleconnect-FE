"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FloatingInput } from "@/components/ui/FloatingInput";
import { Button } from "@/components/ui/Button";

export function AboutYourselfStep() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const returnToParam = returnTo ? `&returnTo=${encodeURIComponent(returnTo)}` : "";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");

  const isValid =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    phone.trim().length > 0 &&
    dob.trim().length > 0;

  function handleNext() {
    if (!isValid) return;
    router.push(`/?modal=onboarding&step=choose-account-type${returnToParam}`);
  }

  return (
    <div className="flex flex-col">
      {/* Title */}
      <div className="px-5 pt-5 pb-0">
        <h2 className="font-inter font-medium text-[32px] leading-10 text-text-900">
          Tell us about yourself
        </h2>
        <p className="font-jost text-base leading-6 text-text-500 mt-2">
          Help us personalise your experience.
        </p>
      </div>

      {/* Fields */}
      <div className="px-5 pt-5 flex flex-col gap-4">
        <FloatingInput
          label="First name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="John"
        />
        <FloatingInput
          label="Last name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Doe"
        />
        <FloatingInput
          label="Date of birth"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <FloatingInput
          label="Phone number"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+234 000 000 0000"
        />

      </div>

      {/* Action */}
      <div className="px-5 pt-6 pb-5">
        <Button
          variant="filled"
          className="w-full h-[52px] text-beige-base"
          onClick={handleNext}
          disabled={!isValid}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
