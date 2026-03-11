import { PropsWithChildren, useEffect, useState } from "react";
import { I18nContext } from "@/i18n/context";
import { Locale, messages } from "@/i18n/messages";

const storageKey = "aboutbot.locale";

const getInitialLocale = (): Locale => {
  if (typeof window === "undefined") {
    return "en";
  }

  const saved = window.localStorage.getItem(storageKey);
  if (saved === "uz" || saved === "ru" || saved === "en") {
    return saved;
  }

  return "en";
};

export const I18nProvider = ({ children }: PropsWithChildren) => {
  const [locale, setLocaleState] = useState<Locale>(() => getInitialLocale());

  useEffect(() => {
    window.localStorage.setItem(storageKey, locale);
  }, [locale]);

  const value = {
    locale,
    setLocale: setLocaleState,
    t: messages[locale]
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
