import { useEffect, useState } from "react";
import { PlanBadge } from "@/components/billing/PlanBadge";
import { MetricCard } from "@/components/ui/MetricCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { analyticsApi } from "@/services/analyticsApi";
import { AccountSummary, OwnerBotSummary } from "@/types/api";

const numberFormatter = new Intl.NumberFormat("en-US");
const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

export const AccountPage = () => {
  const [account, setAccount] = useState<AccountSummary | null>(null);
  const [bots, setBots] = useState<OwnerBotSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [accountData, botData] = await Promise.all([
        analyticsApi.getAccountSummary(),
        analyticsApi.getAccountBots()
      ]);
      setAccount(accountData);
      setBots(botData);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed to load account");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  if (isLoading) {
    return <div className="glass-panel p-6">Loading account...</div>;
  }

  if (error || !account) {
    return (
      <div className="glass-panel p-6">
        <p className="text-lg font-semibold text-rose-600">{error ?? "Failed to load account"}</p>
        <GlowButton className="mt-4" label="Retry" onClick={() => void load()} />
      </div>
    );
  }

  const usage = account.usage;
  const botsUsagePct = Math.min((usage.usage.totalBots / usage.limits.maxBots) * 100, 100);
  const eventsUsagePct = Math.min((usage.usage.monthlyEvents / usage.limits.monthlyEvents) * 100, 100);

  return (
    <div className="space-y-6">
      <section className="glass-panel p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Account</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {account.name ?? "Owner workspace"}
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{account.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <PlanBadge plan={usage.plan} />
            <GlowButton label="Billing & Upgrade" onClick={() => { window.location.href = "/billing"; }} />
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Current plan" value={usage.plan.toUpperCase()} subtitle="Active workspace tier" status="positive" />
        <MetricCard
          title="Bots used"
          value={`${usage.usage.totalBots}/${usage.limits.maxBots}`}
          subtitle="Connected bot capacity"
          status={usage.usage.totalBots >= usage.limits.maxBots ? "negative" : "neutral"}
        />
        <MetricCard
          title="Monthly events"
          value={numberFormatter.format(usage.usage.monthlyEvents)}
          subtitle={`Limit ${numberFormatter.format(usage.limits.monthlyEvents)}`}
          status="neutral"
        />
        <MetricCard title="Owner ID" value={account.ownerId.slice(0, 8)} subtitle="Internal account reference" status="neutral" />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="glass-panel p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Bot capacity</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{usage.usage.totalBots}/{usage.limits.maxBots}</p>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-stone-200 dark:bg-slate-800">
            <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-500" style={{ width: `${botsUsagePct}%` }} />
          </div>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">Track how close this workspace is to its connected bot limit.</p>
        </article>

        <article className="glass-panel p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Monthly event usage</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{numberFormatter.format(usage.usage.monthlyEvents)}/{numberFormatter.format(usage.limits.monthlyEvents)}</p>
          </div>
          <div className="mt-4 h-3 overflow-hidden rounded-full bg-stone-200 dark:bg-slate-800">
            <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: `${eventsUsagePct}%` }} />
          </div>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">This number is enforced by the backend, so it reflects your real plan ceiling.</p>
        </article>
      </section>

      <section className="glass-panel p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="eyebrow">Connected Bots</p>
            <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">Bot portfolio</h3>
          </div>
          <GlowButton label="Refresh" onClick={() => void load()} />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {bots.map((bot) => (
            <article key={bot.botId} className="surface-outline rounded-[24px] p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{bot.displayName}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{bot.botType}</p>
                </div>
                <div className="rounded-2xl bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-300">
                  {bot.trackingStatus}
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Users</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{numberFormatter.format(bot.totalUsers)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Messages</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{numberFormatter.format(bot.totalMessages)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Month revenue</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{moneyFormatter.format(bot.revenueThisMonth)}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
