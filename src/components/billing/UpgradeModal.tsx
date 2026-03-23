import { X } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
import { PricingPlan } from "@/types/api";
import { PlanBadge } from "@/components/billing/PlanBadge";

interface UpgradeModalProps {
  checkoutUrl: string | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (plan: "starter" | "growth") => void;
  plans: PricingPlan[];
}

const moneyFormatter = (currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  });

export const UpgradeModal = ({ checkoutUrl, isOpen, onClose, onSelect, plans }: UpgradeModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm">
      <div className="glass-panel relative w-full max-w-4xl p-5 sm:p-6">
        <button
          className="absolute right-4 top-4 rounded-full border border-stone-200 bg-white/70 p-2 text-slate-700 transition hover:bg-white dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200"
          onClick={onClose}
          type="button"
        >
          <X className="h-4 w-4" />
        </button>

        <p className="eyebrow">Upgrade</p>
        <h3 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">Choose the plan that matches your bot growth</h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
          Pick a workspace tier and generate a checkout preview from the backend. You can wire this to Stripe or Click later without changing the UI.
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {plans.map((plan) => (
            <article key={plan.plan} className="surface-outline rounded-[24px] p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <PlanBadge plan={plan.plan} />
                  <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-slate-100">
                    {moneyFormatter(plan.currency).format(plan.priceMonthly)}
                    <span className="ml-2 text-sm font-medium text-slate-500 dark:text-slate-400">/ month</span>
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-2 text-sm text-slate-600 dark:text-slate-400">
                {plan.features.map((feature) => (
                  <p key={feature}>{feature}</p>
                ))}
              </div>

              <GlowButton className="mt-5 w-full" label={`Start ${plan.plan}`} onClick={() => onSelect(plan.plan)} />
            </article>
          ))}
        </div>

        {checkoutUrl ? (
          <div className="mt-6 rounded-[24px] border border-emerald-200 bg-emerald-50/70 p-4 text-sm text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/10 dark:text-emerald-100">
            <p className="font-semibold">Checkout preview ready</p>
            <p className="mt-2 break-all">{checkoutUrl}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
