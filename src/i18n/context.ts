import { createContext } from "react";
import { messages, Locale } from "@/i18n/messages";

export interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof messages.en;
}

export const I18nContext = createContext<I18nContextValue | null>(null);
