import { Locale } from "@/i18n/messages";
import { ActivityItem } from "@/types/api";

type TemplateResolver = (params: Record<string, string | number>) => string;

const getString = (params: Record<string, string | number>, key: string, fallback = "") => {
  const value = params[key];
  return value === undefined ? fallback : String(value);
};

const getAmount = (params: Record<string, string | number>) => {
  const amount = params.amount;
  return typeof amount === "number" ? amount.toFixed(2) : String(amount ?? "");
};

const templates: Record<Locale, Record<string, TemplateResolver>> = {
  uz: {
    "message.received": (params) => `${getString(params, "user", "unknown")} dan xabar keldi`,
    "payment.received": (params) => `${getAmount(params)} ${getString(params, "currency", "USD")} to'lov qabul qilindi`,
    "user.joined": (params) => `${getString(params, "user", "unknown")} botga qo'shildi`
  },
  ru: {
    "message.received": (params) => `Получено сообщение от ${getString(params, "user", "unknown")}`,
    "payment.received": (params) => `Платеж ${getAmount(params)} ${getString(params, "currency", "USD")} получен`,
    "user.joined": (params) => `Пользователь ${getString(params, "user", "unknown")} присоединился`
  },
  en: {
    "message.received": (params) => `Message received from ${getString(params, "user", "unknown")}`,
    "payment.received": (params) => `Payment of ${getAmount(params)} ${getString(params, "currency", "USD")}`,
    "user.joined": (params) => `User ${getString(params, "user", "unknown")} joined`
  }
};

export const formatActivityDescription = (item: ActivityItem, locale: Locale) => {
  if (!item.eventCode || !item.params) {
    return item.description;
  }

  const resolver = templates[locale][item.eventCode];
  if (!resolver) {
    return item.description;
  }

  return resolver(item.params);
};
