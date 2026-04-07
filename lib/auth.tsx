"use client";

import { createContext, useContext, useState, useEffect } from "react";

type AuthCtx = {
  isSignedIn: boolean;
  isHydrated: boolean;
  signIn: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthCtx>({
  isSignedIn: false,
  isHydrated: false,
  signIn: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsSignedIn(localStorage.getItem("mock_signed_in") === "true");
    setIsHydrated(true);
  }, []);

  function signIn() {
    localStorage.setItem("mock_signed_in", "true");
    setIsSignedIn(true);
  }

  function signOut() {
    localStorage.removeItem("mock_signed_in");
    setIsSignedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isSignedIn, isHydrated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
