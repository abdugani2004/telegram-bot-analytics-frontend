import { useEffect, useState } from "react";
import { BotIdentity } from "@/types/api";

const storageKey = "aboutbot.bot.identity";

const readInitialValue = (): BotIdentity | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(storageKey);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as BotIdentity;
  } catch {
    window.localStorage.removeItem(storageKey);
    return null;
  }
};

export const useBotIdentity = () => {
  const [botIdentity, setBotIdentityState] = useState<BotIdentity | null>(() => readInitialValue());

  useEffect(() => {
    if (!botIdentity) {
      window.localStorage.removeItem(storageKey);
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(botIdentity));
  }, [botIdentity]);

  const setBotIdentity = (nextValue: BotIdentity) => {
    setBotIdentityState({
      type: nextValue.type,
      value: nextValue.value.trim()
    });
  };

  const clearBotIdentity = () => {
    setBotIdentityState(null);
  };

  return {
    botIdentity,
    setBotIdentity,
    clearBotIdentity
  };
};
