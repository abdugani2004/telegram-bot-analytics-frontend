import { FormEvent, useMemo, useState } from "react";
import { GlowButton } from "@/components/ui/GlowButton";
import { useI18n } from "@/i18n/useI18n";
import { analyticsApi } from "@/services/analyticsApi";
import { BotIdentity } from "@/types/api";

interface BotIdentityFormProps {
  onSubmit: (botIdentity: BotIdentity) => void;
}

type WizardStep = 1 | 2 | 3;
type StepState = "idle" | "loading" | "success" | "error";

export const BotIdentityForm = ({ onSubmit }: BotIdentityFormProps) => {
  const [type, setType] = useState<BotIdentity["type"]>("username");
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<WizardStep>(1);
  const [stepState, setStepState] = useState<StepState>("idle");
  const [stepFeedback, setStepFeedback] = useState<string | null>(null);
  const { t } = useI18n();

  const trimmedValue = value.trim();

  const stepItems = useMemo(
    () => [
      { step: 1 as WizardStep, title: t.setupStepOneTitle, text: t.setupStepOneText },
      { step: 2 as WizardStep, title: t.setupStepTwoTitle, text: t.setupStepTwoText },
      { step: 3 as WizardStep, title: t.setupStepThreeTitle, text: t.setupStepThreeText }
    ],
    [t]
  );

  const validateIdentity = () => {
    if (!trimmedValue) {
      return type === "token" ? t.enterBotToken : t.enterBotUsername;
    }

    if (type === "username" && !/^@?[a-zA-Z0-9_]{5,}$/.test(trimmedValue)) {
      return t.usernameValidation;
    }

    if (type === "token" && trimmedValue.length < 10) {
      return t.tokenValidation;
    }

    return null;
  };

  const handleContinue = async () => {
    const validationError = validateIdentity();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setStepFeedback(null);

    const botIdentity: BotIdentity = {
      type,
      value: trimmedValue
    };

    try {
      setStepState("loading");

      if (currentStep === 1) {
        await analyticsApi.connectBot(botIdentity);
        setStepState("success");
        setStepFeedback(t.connectSuccess);
        setCurrentStep(2);
        return;
      }

      if (currentStep === 2) {
        await analyticsApi.verifyBot(botIdentity);
        setStepState("success");
        setStepFeedback(t.verifySuccess);
        setCurrentStep(3);
        return;
      }

      await analyticsApi.enableTracking(botIdentity);
      setStepState("success");
      setStepFeedback(t.trackingSuccess);
      onSubmit(botIdentity);
      return;
    } catch (stepError) {
      setStepState("error");
      setError(stepError instanceof Error ? stepError.message : t.unexpectedError);
      return;
    }
  };

  const handleBack = () => {
    setError(null);
    setStepFeedback(null);
    setStepState("idle");
    setCurrentStep((step) => (Math.max(1, step - 1) as WizardStep));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void handleContinue();
  };

  return (
    <section className="glass-panel mx-auto max-w-4xl p-6 md:p-8">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-500">{t.botAccess}</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {t.botIdentityTitle}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">{t.botIdentitySubtitle}</p>
      </div>

      <div className="mb-8 grid gap-3 md:grid-cols-3">
        {stepItems.map((item) => {
          const isActive = currentStep === item.step;
          const isCompleted = currentStep > item.step;

          return (
            <article
              key={item.step}
              className={`rounded-2xl border p-4 transition ${
                isActive
                  ? "border-emerald-400 bg-emerald-50/80 dark:border-emerald-500 dark:bg-emerald-900/20"
                  : isCompleted
                    ? "border-sky-400 bg-sky-50/70 dark:border-sky-500 dark:bg-sky-900/20"
                    : "border-slate-200/70 bg-white/50 dark:border-slate-700/70 dark:bg-slate-900/40"
              }`}
            >
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.text}</p>
            </article>
          );
        })}
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {currentStep === 1 ? (
          <>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                className={`rounded-2xl border p-4 text-left transition ${type === "username" ? "border-emerald-400 bg-emerald-50/80 dark:border-emerald-500 dark:bg-emerald-900/20" : "border-slate-200 bg-white/40 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/40 dark:hover:bg-slate-800/70"}`}
                onClick={() => setType("username")}
                type="button"
              >
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">@username</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t.useUsername}</p>
              </button>
              <button
                className={`rounded-2xl border p-4 text-left transition ${type === "token" ? "border-sky-400 bg-sky-50/80 dark:border-sky-500 dark:bg-sky-900/20" : "border-slate-200 bg-white/40 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/40 dark:hover:bg-slate-800/70"}`}
                onClick={() => setType("token")}
                type="button"
              >
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t.botToken}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t.useToken}</p>
              </button>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                {type === "token" ? t.telegramBotToken : t.telegramBotUsername}
              </span>
              <input
                autoComplete="off"
                className="w-full rounded-2xl border border-slate-300 bg-white/80 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/10 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:border-emerald-500"
                onChange={(event) => setValue(event.target.value)}
                placeholder={type === "token" ? "123456:ABC-DEF..." : "@sample_analytics_bot"}
                value={value}
              />
            </label>
          </>
        ) : null}

        {currentStep === 2 ? (
          <div className="rounded-2xl border border-slate-200/70 bg-white/50 p-5 dark:border-slate-700/70 dark:bg-slate-900/40">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t.setupStepTwoTitle}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t.setupStepTwoText}</p>
            <div className="mt-4 rounded-xl border border-emerald-400/40 bg-emerald-50/60 p-4 text-sm text-slate-700 dark:bg-emerald-900/10 dark:text-slate-200">
              {type === "token" ? t.telegramBotToken : t.telegramBotUsername}: <span className="font-semibold">{trimmedValue}</span>
            </div>
          </div>
        ) : null}

        {currentStep === 3 ? (
          <div className="rounded-2xl border border-slate-200/70 bg-white/50 p-5 dark:border-slate-700/70 dark:bg-slate-900/40">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t.setupStepThreeTitle}</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t.setupStepThreeText}</p>
            <div className="mt-4 rounded-xl border border-sky-400/40 bg-sky-50/60 p-4 text-sm text-slate-700 dark:bg-sky-900/10 dark:text-slate-200">
              {t.liveDashboard}
            </div>
          </div>
        ) : null}

        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        {stepFeedback ? <p className="text-sm text-emerald-500">{stepFeedback}</p> : null}
        {stepState === "loading" ? <p className="text-sm text-slate-500 dark:text-slate-400">{t.setupInProgress}</p> : null}

        <div className="flex items-center justify-between">
          <button
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            disabled={currentStep === 1}
            onClick={handleBack}
            type="button"
          >
            {t.back}
          </button>
          <GlowButton disabled={stepState === "loading"} label={currentStep === 3 ? t.openDashboard : t.continue} type="submit" />
        </div>
      </form>
    </section>
  );
};
