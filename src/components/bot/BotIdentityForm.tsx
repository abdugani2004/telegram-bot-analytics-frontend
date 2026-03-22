import { FormEvent, useMemo, useState } from "react";
import { CheckCircle2, ChevronRight, ShieldCheck, Sparkles } from "lucide-react";
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
      { step: 1 as WizardStep, title: t.setupStepOneTitle, text: t.setupStepOneText, icon: Sparkles },
      { step: 2 as WizardStep, title: t.setupStepTwoTitle, text: t.setupStepTwoText, icon: ShieldCheck },
      { step: 3 as WizardStep, title: t.setupStepThreeTitle, text: t.setupStepThreeText, icon: CheckCircle2 }
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
    <section className="glass-panel mx-auto max-w-5xl overflow-hidden p-5 sm:p-7 md:p-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
        <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 p-6 text-stone-50 shadow-soft sm:p-8">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-amber-300/20 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/80">{t.botAccess}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{t.botIdentityTitle}</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-stone-200/80">{t.botIdentitySubtitle}</p>

            <div className="mt-8 space-y-3">
              {stepItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentStep === item.step;
                const isCompleted = currentStep > item.step;

                return (
                  <article
                    key={item.step}
                    className={`rounded-[24px] border px-4 py-4 transition sm:px-5 ${
                      isActive
                        ? "border-amber-300/40 bg-white/10"
                        : isCompleted
                          ? "border-emerald-400/30 bg-emerald-400/10"
                          : "border-white/10 bg-white/5"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 rounded-2xl p-2 ${isCompleted ? "bg-emerald-400/20 text-emerald-200" : isActive ? "bg-amber-300/20 text-amber-100" : "bg-white/10 text-stone-200"}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="mt-1 text-sm leading-6 text-stone-200/75">{item.text}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="surface-outline rounded-[30px] p-5 sm:p-6">
            <p className="eyebrow">{currentStep === 1 ? t.setupStepOneTitle : currentStep === 2 ? t.setupStepTwoTitle : t.setupStepThreeTitle}</p>

            {currentStep === 1 ? (
              <>
                <div className="mt-5 grid gap-3">
                  <button
                    className={`rounded-[24px] border p-4 text-left transition ${type === "username" ? "border-emerald-400 bg-emerald-50/80 shadow-sm dark:border-emerald-500 dark:bg-emerald-900/20" : "border-stone-200 bg-white/60 hover:bg-stone-50 dark:border-slate-700 dark:bg-slate-900/40 dark:hover:bg-slate-800/70"}`}
                    onClick={() => setType("username")}
                    type="button"
                  >
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">@username</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t.useUsername}</p>
                  </button>
                  <button
                    className={`rounded-[24px] border p-4 text-left transition ${type === "token" ? "border-amber-300 bg-amber-50/80 shadow-sm dark:border-amber-500 dark:bg-amber-900/20" : "border-stone-200 bg-white/60 hover:bg-stone-50 dark:border-slate-700 dark:bg-slate-900/40 dark:hover:bg-slate-800/70"}`}
                    onClick={() => setType("token")}
                    type="button"
                  >
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t.botToken}</p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t.useToken}</p>
                  </button>
                </div>

                <label className="mt-5 block">
                  <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {type === "token" ? t.telegramBotToken : t.telegramBotUsername}
                  </span>
                  <input
                    autoComplete="off"
                    className="w-full rounded-[24px] border border-stone-300 bg-white/80 px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-500/10 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:focus:border-amber-500"
                    onChange={(event) => setValue(event.target.value)}
                    placeholder={type === "token" ? "123456:ABC-DEF..." : "@sample_analytics_bot"}
                    value={value}
                  />
                </label>
              </>
            ) : null}

            {currentStep === 2 ? (
              <div className="mt-5 rounded-[24px] border border-stone-200/80 bg-white/60 p-5 dark:border-slate-700/70 dark:bg-slate-900/40">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t.setupStepTwoTitle}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{t.setupStepTwoText}</p>
                <div className="mt-4 rounded-2xl border border-emerald-400/40 bg-emerald-50/60 p-4 text-sm text-slate-700 dark:bg-emerald-900/10 dark:text-slate-200">
                  {type === "token" ? t.telegramBotToken : t.telegramBotUsername}: <span className="font-semibold">{trimmedValue}</span>
                </div>
              </div>
            ) : null}

            {currentStep === 3 ? (
              <div className="mt-5 rounded-[24px] border border-stone-200/80 bg-white/60 p-5 dark:border-slate-700/70 dark:bg-slate-900/40">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{t.setupStepThreeTitle}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{t.setupStepThreeText}</p>
                <div className="mt-4 flex items-center gap-3 rounded-2xl border border-amber-300/40 bg-amber-50/70 p-4 text-sm text-slate-700 dark:bg-amber-900/10 dark:text-slate-200">
                  <ChevronRight className="h-4 w-4 text-amber-600" />
                  <span>{t.liveDashboard}</span>
                </div>
              </div>
            ) : null}
          </div>

          {(error || stepFeedback || stepState === "loading") ? (
            <div className="surface-outline rounded-[24px] p-4">
              {error ? <p className="text-sm text-red-500">{error}</p> : null}
              {stepFeedback ? <p className="text-sm text-emerald-600 dark:text-emerald-400">{stepFeedback}</p> : null}
              {stepState === "loading" ? <p className="text-sm text-slate-500 dark:text-slate-400">{t.setupInProgress}</p> : null}
            </div>
          ) : null}

          <div className="flex items-center justify-between gap-3">
            <button
              className="surface-outline rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-white/65 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-200 dark:hover:bg-slate-800/70"
              disabled={currentStep === 1}
              onClick={handleBack}
              type="button"
            >
              {t.back}
            </button>
            <GlowButton disabled={stepState === "loading"} label={currentStep === 3 ? t.openDashboard : t.continue} type="submit" />
          </div>
        </form>
      </div>
    </section>
  );
};
