import { Activity, BadgeDollarSign, Bot, MessageSquareText, RefreshCw, Users } from "lucide-react";
import { GrowthLineChart } from "@/components/charts/GrowthLineChart";
import { MessagesBarChart } from "@/components/charts/MessagesBarChart";
import { RevenueAreaChart } from "@/components/charts/RevenueAreaChart";
import { RecentActivityTable } from "@/components/tables/RecentActivityTable";
import { CardSkeleton } from "@/components/ui/CardSkeleton";
import { GlowButton } from "@/components/ui/GlowButton";
import { MetricCard } from "@/components/ui/MetricCard";
import { useDashboardData } from "@/hooks/useDashboardData";
import { useI18n } from "@/i18n/useI18n";
import { BotIdentity } from "@/types/api";

const numberFormatter = new Intl.NumberFormat("en-US");
const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

type DashboardView = "overview" | "users" | "messages" | "revenue" | "health";

interface DashboardPageProps {
  botIdentity: BotIdentity;
  onChangeBot: () => void;
  view: DashboardView;
}

const formatBotLabel = (botIdentity: BotIdentity) => {
  if (botIdentity.type === "username") {
    return botIdentity.value.startsWith("@") ? botIdentity.value : `@${botIdentity.value}`;
  }

  if (botIdentity.value.length <= 8) {
    return "configured token";
  }

  return `${botIdentity.value.slice(0, 4)}...${botIdentity.value.slice(-4)}`;
};

export const DashboardPage = ({ botIdentity, onChangeBot, view }: DashboardPageProps) => {
  const { data, isLoading, error, refetch } = useDashboardData(botIdentity);
  const { t } = useI18n();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-[28px] border border-red-300 bg-red-50/80 p-6 text-red-800 shadow-soft dark:border-red-900 dark:bg-red-950/40 dark:text-red-100">
        <p className="text-lg font-semibold">{t.failedToLoadDashboard}</p>
        <p className="mt-1 text-sm">{error ?? t.unexpectedError}</p>
        <GlowButton className="mt-4" label={t.retry} onClick={() => void refetch()} />
      </div>
    );
  }

  const { overview, users, revenue, messages, recentActivity } = data;
  const botLabel = formatBotLabel(botIdentity);
  const showOverview = view === "overview";
  const showUsers = view === "overview" || view === "users";
  const showMessages = view === "overview" || view === "messages";
  const showRevenue = view === "overview" || view === "revenue";
  const showHealth = view === "overview" || view === "health";
  const hasNoAnalytics =
    overview.totalUsers === 0 &&
    overview.activeUsersToday === 0 &&
    overview.newUsersToday === 0 &&
    overview.messagesToday === 0 &&
    overview.totalMessages === 0 &&
    overview.revenueToday === 0 &&
    overview.revenueThisWeek === 0 &&
    overview.revenueThisMonth === 0;

  const heroStats = [
    { icon: Users, label: t.totalUsers, value: numberFormatter.format(overview.totalUsers) },
    { icon: MessageSquareText, label: t.messagesToday, value: numberFormatter.format(overview.messagesToday) },
    { icon: BadgeDollarSign, label: t.revenueToday, value: moneyFormatter.format(overview.revenueToday) },
    { icon: Activity, label: t.botStatus, value: overview.botStatus === "online" ? t.online : t.offline }
  ];

  return (
    <div className="space-y-6">
      <section className="glass-panel relative overflow-hidden p-5 sm:p-6 lg:p-7">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-amber-200/20 blur-3xl dark:bg-slate-700/20" />
        <div className="relative flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{t.performancePulse}</p>
            <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">{t.liveDashboard}</p>
            <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
              {t.currentBot}: <span className="font-semibold text-slate-700 dark:text-slate-200">{botLabel}</span>
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <GlowButton label={t.refresh} onClick={() => void refetch()} />
              <button className="surface-outline rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-stone-300 hover:bg-white/70 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800/70" onClick={onChangeBot} type="button">
                {t.changeBot}
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:w-[420px]">
            {heroStats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="surface-outline rounded-[22px] px-4 py-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-slate-400">
                  <Icon className="h-3.5 w-3.5" />
                  <span>{label}</span>
                </div>
                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {hasNoAnalytics ? (
        <section className="glass-panel border-emerald-300/50 bg-emerald-50/70 p-5 sm:p-6 dark:bg-emerald-950/10">
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{t.noAnalyticsTitle}</p>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">{t.noAnalyticsDescription}</p>
        </section>
      ) : null}

      {showOverview ? (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard title={t.totalUsers} value={numberFormatter.format(overview.totalUsers)} subtitle={t.allTimeUsers} />
          <MetricCard title={t.activeUsersToday} value={numberFormatter.format(overview.activeUsersToday)} subtitle={t.activeUsersSubtitle} status="positive" />
          <MetricCard title={t.newUsersToday} value={numberFormatter.format(overview.newUsersToday)} subtitle={`${overview.weeklyGrowthPct.toFixed(1)}% ${t.weeklyGrowth}`} status={overview.weeklyGrowthPct >= 0 ? "positive" : "negative"} />
          <MetricCard title={t.messagesToday} value={numberFormatter.format(overview.messagesToday)} subtitle={`${numberFormatter.format(overview.totalMessages)} ${t.totalSuffix}`} />
          <MetricCard title={t.revenueToday} value={moneyFormatter.format(overview.revenueToday)} subtitle={`${t.revenueWeek}: ${moneyFormatter.format(overview.revenueThisWeek)}`} status="positive" />
          <MetricCard title={t.revenueMonth} value={moneyFormatter.format(overview.revenueThisMonth)} subtitle={t.currentMonth} status="positive" />
          <MetricCard title={t.botStatus} value={overview.botStatus === "online" ? t.online : t.offline} subtitle={`${t.api}: ${overview.apiHealth}`} status={overview.botStatus === "online" ? "positive" : "negative"} />
          <MetricCard title={t.uptimeRequests} value={`${overview.uptimePct.toFixed(1)}%`} subtitle={`${numberFormatter.format(overview.requestsToday)} ${t.requestsToday}`} status="neutral" />
        </section>
      ) : null}

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.9fr)]">
        <div className="space-y-6">
          {showUsers ? (
            <section className="space-y-6">
              {view === "users" ? (
                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  <MetricCard title={t.totalUsers} value={numberFormatter.format(users.totalUsers)} subtitle={t.allTimeUsers} />
                  <MetricCard title={t.activeUsersToday} value={numberFormatter.format(users.activeUsersToday)} subtitle={t.activeUsersSubtitle} status="positive" />
                  <MetricCard title={t.newUsersToday} value={numberFormatter.format(users.newUsersToday)} subtitle={`${overview.weeklyGrowthPct.toFixed(1)}% ${t.weeklyGrowth}`} status={overview.weeklyGrowthPct >= 0 ? "positive" : "negative"} />
                </section>
              ) : null}
              <GrowthLineChart data={users.growthSeries} />
            </section>
          ) : null}

          {showMessages ? (
            <section className="space-y-6">
              {view === "messages" ? (
                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  <MetricCard title={t.messagesToday} value={numberFormatter.format(messages.messagesToday)} subtitle={`${numberFormatter.format(messages.totalMessages)} ${t.totalSuffix}`} />
                  <MetricCard title={t.activeUsersToday} value={numberFormatter.format(overview.activeUsersToday)} subtitle={t.activeUsersSubtitle} status="positive" />
                  <MetricCard title={t.newUsersToday} value={numberFormatter.format(overview.newUsersToday)} subtitle={`${overview.weeklyGrowthPct.toFixed(1)}% ${t.weeklyGrowth}`} status={overview.weeklyGrowthPct >= 0 ? "positive" : "negative"} />
                </section>
              ) : null}
              <MessagesBarChart data={messages.dailyMessagesSeries} />
            </section>
          ) : null}
        </div>

        <div className="space-y-6">
          {showRevenue ? (
            <section className="space-y-6">
              {view === "revenue" ? (
                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                  <MetricCard title={t.revenueToday} value={moneyFormatter.format(revenue.revenueToday)} subtitle={`${t.revenueWeek}: ${moneyFormatter.format(revenue.revenueThisWeek)}`} status="positive" />
                  <MetricCard title={t.revenueMonth} value={moneyFormatter.format(revenue.revenueThisMonth)} subtitle={t.currentMonth} status="positive" />
                  <MetricCard title={t.messagesToday} value={numberFormatter.format(messages.messagesToday)} subtitle={`${numberFormatter.format(messages.totalMessages)} ${t.totalSuffix}`} />
                </section>
              ) : null}
              <RevenueAreaChart data={revenue.revenueSeries} />
            </section>
          ) : null}

          {showHealth ? (
            <section className="space-y-6">
              <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                <MetricCard title={t.botStatus} value={overview.botStatus === "online" ? t.online : t.offline} subtitle={`${t.api}: ${overview.apiHealth}`} status={overview.botStatus === "online" ? "positive" : "negative"} />
                <MetricCard title={t.uptimeRequests} value={`${overview.uptimePct.toFixed(1)}%`} subtitle={`${numberFormatter.format(overview.requestsToday)} ${t.requestsToday}`} status="neutral" />
                <MetricCard title={t.revenueToday} value={moneyFormatter.format(revenue.revenueToday)} subtitle={`${t.revenueWeek}: ${moneyFormatter.format(revenue.revenueThisWeek)}`} status="positive" />
              </section>
              <RecentActivityTable rows={recentActivity} />
            </section>
          ) : null}
        </div>
      </section>

      {view === "overview" ? (
        <section className="glass-panel p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">{t.botStatus}</p>
              <p className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">{t.liveDashboard}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {t.currentBot}: <span className="font-semibold text-slate-700 dark:text-slate-200">{botLabel}</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="surface-outline flex items-center gap-2 rounded-2xl px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
                <Bot className="h-4 w-4 text-emerald-500" />
                <span>{overview.botStatus === "online" ? t.online : t.offline}</span>
              </div>
              <div className="surface-outline flex items-center gap-2 rounded-2xl px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
                <RefreshCw className="h-4 w-4 text-amber-600" />
                <span>{`${overview.uptimePct.toFixed(1)}% ${t.uptimeRequests}`}</span>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};
