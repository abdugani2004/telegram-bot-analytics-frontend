import { useI18n } from "@/i18n/useI18n";
import { Locale } from "@/i18n/messages";

const locales: Locale[] = ["uz", "ru", "en"];

export const LanguageSwitcher = () => {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-1 rounded-xl border border-slate-300/80 bg-white/70 p-1 dark:border-slate-700 dark:bg-slate-900/70">
      {locales.map((item) => (
        <button
          key={item}
          className={`rounded-lg px-2.5 py-1 text-xs font-semibold uppercase transition ${locale === item ? "bg-emerald-500 text-white" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`}
          onClick={() => setLocale(item)}
          type="button"
        >
          {item}
        </button>
      ))}
    </div>
  );
};
