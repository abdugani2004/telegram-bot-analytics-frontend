import { useEffect, useMemo, useState } from "react";
import { PlanBadge } from "@/components/billing/PlanBadge";
import { UpgradeModal } from "@/components/billing/UpgradeModal";
import { GlowButton } from "@/components/ui/GlowButton";
import { MetricCard } from "@/components/ui/MetricCard";
import { useToast } from "@/components/ui/toastContext";
import { analyticsApi } from "@/services/analyticsApi";
import { BillingCheckoutResponse, PricingPlan, SubscriptionSummary } from "@/types/api";
import { useSearchParams } from "react-router-dom";

const moneyFormatter = (currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  });

export const BillingPage = () => {
  const [pricing, setPricing] = useState<PricingPlan[]>([]);
  const [subscription, setSubscription] = useState<SubscriptionSummary | null>(null);
  const [checkout, setCheckout] = useState<BillingCheckoutResponse | null>(null);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { showToast } = useToast();

  const load = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [pricingData, subscriptionData] = await Promise.all([
        analyticsApi.getPricing(),
        analyticsApi.getSubscription()
      ]);
      setPricing(pricingData);
      setSubscription(subscriptionData);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed to load billing");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  useEffect(() => {
    const billingState = searchParams.get("billing");
    if (!billingState) {
      return;
    }

    if (billingState === "success") {
      showToast("Billing flow completed. Review the checkout preview and webhook result.", "success");
    } else if (billingState === "cancel") {
      showToast("Billing flow was canceled.", "info");
    }

    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("billing");
    setSearchParams(nextParams, { replace: true });
  }, [searchParams, setSearchParams, showToast]);

  const startCheckout = async (plan: "starter" | "growth") => {
    try {
      const response = await analyticsApi.createCheckout({
        plan,
        provider: "manual",
        successUrl: `${window.location.origin}/billing?billing=success`,
        cancelUrl: `${window.location.origin}/billing?billing=cancel`
      });
      setCheckout(response);
      showToast(`Checkout preview created for ${plan}.`, "success");
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Failed to create checkout");
      showToast(checkoutError instanceof Error ? checkoutError.message : "Failed to create checkout", "error");
    }
  };

  const banner = useMemo(() => {
    if (!checkout) {
      return null;
    }

    return {
      title: `${checkout.plan.toUpperCase()} checkout preview is ready`,
      description: `Use this URL to simulate the approval step before wiring a real provider like Stripe or Click.`
    };
  }, [checkout]);

  if (isLoading) {
    return <div className="glass-panel p-6">Loading billing...</div>;
  }

  if (error) {
    return (
      <div className="glass-panel p-6">
        <p className="text-lg font-semibold text-rose-600">{error}</p>
        <GlowButton className="mt-4" label="Retry" onClick={() => void load()} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <UpgradeModal
        checkoutUrl={checkout?.approvalUrl ?? null}
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
        onSelect={(plan) => void startCheckout(plan)}
        plans={pricing}
      />

      <section className="glass-panel relative overflow-hidden p-5 sm:p-6">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-amber-200/25 blur-3xl dark:bg-slate-700/20" />
        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Billing</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">Monetize the workspace like a real SaaS</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Your backend now supports pricing, checkout previews, subscriptions, and billing webhooks. This screen makes that story visible.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <PlanBadge plan={subscription?.plan ?? "starter"} />
            <GlowButton label="Open Upgrade Modal" onClick={() => setIsUpgradeOpen(true)} />
          </div>
        </div>
      </section>

      {banner ? (
        <section className="glass-panel border-emerald-300/50 bg-emerald-50/70 p-5 sm:p-6 dark:bg-emerald-950/10">
          <p className="eyebrow">Billing status</p>
          <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">{banner.title}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{banner.description}</p>
        </section>
      ) : null}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Subscription plan" value={(subscription?.plan ?? "starter").toUpperCase()} subtitle="Workspace billing tier" status="positive" />
        <MetricCard title="Status" value={(subscription?.status ?? "inactive").replace("_", " ")} subtitle="Current subscription state" status={subscription?.status === "active" ? "positive" : "neutral"} />
        <MetricCard
          title="Monthly amount"
          value={moneyFormatter(subscription?.currency ?? "USD").format(subscription?.amountMonthly ?? 0)}
          subtitle={subscription?.provider ?? "manual"}
          status="neutral"
        />
        <MetricCard title="Renewal" value={subscription?.currentPeriodEnd?.slice(0, 10) ?? "N/A"} subtitle="Current billing period end" status="neutral" />
      </section>

      <section className="glass-panel p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Pricing</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">Upgrade your analytics stack</h2>
          </div>
          <GlowButton label="Compare in Modal" onClick={() => setIsUpgradeOpen(true)} />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {pricing.map((plan) => (
            <article
              key={plan.plan}
              className={`surface-outline rounded-[24px] p-5 ${subscription?.plan === plan.plan ? "ring-2 ring-emerald-400/60" : ""}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <PlanBadge plan={plan.plan} />
                  <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">
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

              <GlowButton
                className="mt-5 w-full"
                label={subscription?.plan === plan.plan ? `Current ${plan.plan}` : `Choose ${plan.plan}`}
                onClick={() => void startCheckout(plan.plan)}
              />
            </article>
          ))}
        </div>
      </section>

      {checkout ? (
        <section className="glass-panel border-emerald-300/50 bg-emerald-50/70 p-5 sm:p-6 dark:bg-emerald-950/10">
          <p className="eyebrow">Checkout Preview</p>
          <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">{checkout.plan.toUpperCase()} via {checkout.provider}</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 break-all">{checkout.approvalUrl}</p>
        </section>
      ) : null}
    </div>
  );
};
