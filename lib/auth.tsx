"use client";

import { createContext, useContext, useState, useEffect } from "react";

export type Role = "visitor" | "customer" | "vendor";

type AuthCtx = {
  role: Role;
  isSignedIn: boolean;
  isHydrated: boolean;
  signIn: (role?: Exclude<Role, "visitor">) => void;
  signOut: () => void;
  setRole: (role: Role) => void;
};

const STORAGE_KEY = "mock_auth_role";

const AuthContext = createContext<AuthCtx>({
  role: "visitor",
  isSignedIn: false,
  isHydrated: false,
  signIn: () => {},
  signOut: () => {},
  setRole: () => {},
});

function readRole(): Role {
  if (typeof window === "undefined") return "visitor";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "customer" || stored === "vendor" || stored === "visitor") return stored;
  // Back-compat with previous boolean flag
  if (localStorage.getItem("mock_signed_in") === "true") return "customer";
  return "visitor";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>("visitor");
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setRoleState(readRole());
    setIsHydrated(true);
  }, []);

  function setRole(next: Role) {
    if (next === "visitor") {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem("mock_signed_in");
    } else {
      localStorage.setItem(STORAGE_KEY, next);
    }
    setRoleState(next);
  }

  function signIn(as: Exclude<Role, "visitor"> = "customer") {
    setRole(as);
  }

  function signOut() {
    setRole("visitor");
  }

  return (
    <AuthContext.Provider
      value={{
        role,
        isSignedIn: role !== "visitor",
        isHydrated,
        signIn,
        signOut,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
