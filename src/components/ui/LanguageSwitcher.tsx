import { useI18n } from "@/i18n/useI18n";
import { Locale } from "@/i18n/messages";

const locales: Locale[] = ["uz", "ru", "en"];

export const LanguageSwitcher = () => {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-0.5 rounded-2xl border border-stone-200/80 bg-white/80 p-0.5 shadow-sm sm:gap-1 sm:p-1 dark:border-slate-700 dark:bg-slate-900/70">
      {locales.map((item) => (
        <button
          key={item}
          className={`rounded-xl px-2.5 py-1.5 text-[10px] font-semibold uppercase leading-none transition sm:px-3 sm:text-xs ${locale === item ? "bg-emerald-500 text-white shadow-sm" : "text-slate-600 hover:bg-stone-100 dark:text-slate-300 dark:hover:bg-slate-800"}`}
          onClick={() => setLocale(item)}
          type="button"
        >
          {item}
        </button>
      ))}
    </div>
  );
};
