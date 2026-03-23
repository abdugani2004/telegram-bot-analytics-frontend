import { useEffect, useState } from "react";

export interface OwnerAuthState {
  apiKey: string;
  email: string | null;
  name: string | null;
}

const storageKey = "aboutbot.owner.auth";

const readInitialValue = (): OwnerAuthState | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(storageKey);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as OwnerAuthState;
  } catch {
    window.localStorage.removeItem(storageKey);
    return null;
  }
};

export const useOwnerAuth = () => {
  const [ownerAuth, setOwnerAuthState] = useState<OwnerAuthState | null>(() => readInitialValue());

  useEffect(() => {
    if (!ownerAuth) {
      window.localStorage.removeItem(storageKey);
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(ownerAuth));
  }, [ownerAuth]);

  const setOwnerAuth = (nextValue: OwnerAuthState) => {
    setOwnerAuthState({
      apiKey: nextValue.apiKey.trim(),
      email: nextValue.email?.trim() || null,
      name: nextValue.name?.trim() || null
    });
  };

  const clearOwnerAuth = () => {
    setOwnerAuthState(null);
  };

  return {
    ownerAuth,
    setOwnerAuth,
    clearOwnerAuth
  };
};
