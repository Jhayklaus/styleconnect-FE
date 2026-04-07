"use client";

import { useAuth } from "@/lib/auth";

export function DevAuthToggle() {
  const { isSignedIn, signIn, signOut } = useAuth();

  return (
    <div className="fixed bottom-4 left-4 z-[9999] flex items-center gap-2 bg-white border border-stroke-soft rounded-xl px-3 py-2 shadow-md font-jost text-xs">
      <span className="text-text-500">Dev:</span>
      <span className={isSignedIn ? "text-green-600 font-medium" : "text-text-500"}>
        {isSignedIn ? "Signed in" : "Visitor"}
      </span>
      <button
        onClick={isSignedIn ? signOut : signIn}
        className="bg-primary-base text-white rounded-lg px-2 py-1 hover:bg-primary-base/90 transition-colors"
      >
        {isSignedIn ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
