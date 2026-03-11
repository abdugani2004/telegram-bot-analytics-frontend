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
      <div className="rounded-2xl border border-red-300 bg-red-50 p-6 text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-100">
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

  return (
    <div className="space-y-6">
      <section className="glass-panel flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{t.performancePulse}</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{t.liveDashboard}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {t.currentBot}: <span className="font-semibold text-slate-700 dark:text-slate-200">{botLabel}</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <GlowButton label={t.refresh} onClick={() => void refetch()} />
          <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800" onClick={onChangeBot} type="button">
            {t.changeBot}
          </button>
        </div>
      </section>

      {hasNoAnalytics ? (
        <section className="glass-panel border-emerald-400/30 bg-emerald-50/60 p-5 dark:bg-emerald-950/10">
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{t.noAnalyticsTitle}</p>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-400">{t.noAnalyticsDescription}</p>
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

      {showUsers ? (
        <section className="space-y-6">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <MetricCard title={t.totalUsers} value={numberFormatter.format(users.totalUsers)} subtitle={t.allTimeUsers} />
            <MetricCard title={t.activeUsersToday} value={numberFormatter.format(users.activeUsersToday)} subtitle={t.activeUsersSubtitle} status="positive" />
            <MetricCard title={t.newUsersToday} value={numberFormatter.format(users.newUsersToday)} subtitle={`${overview.weeklyGrowthPct.toFixed(1)}% ${t.weeklyGrowth}`} status={overview.weeklyGrowthPct >= 0 ? "positive" : "negative"} />
          </section>
          <GrowthLineChart data={users.growthSeries} />
        </section>
      ) : null}

      {showMessages ? (
        <section className="space-y-6">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <MetricCard title={t.messagesToday} value={numberFormatter.format(messages.messagesToday)} subtitle={`${numberFormatter.format(messages.totalMessages)} ${t.totalSuffix}`} />
            <MetricCard title={t.activeUsersToday} value={numberFormatter.format(overview.activeUsersToday)} subtitle={t.activeUsersSubtitle} status="positive" />
            <MetricCard title={t.newUsersToday} value={numberFormatter.format(overview.newUsersToday)} subtitle={`${overview.weeklyGrowthPct.toFixed(1)}% ${t.weeklyGrowth}`} status={overview.weeklyGrowthPct >= 0 ? "positive" : "negative"} />
          </section>
          <MessagesBarChart data={messages.dailyMessagesSeries} />
        </section>
      ) : null}

      {showRevenue ? (
        <section className="space-y-6">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <MetricCard title={t.revenueToday} value={moneyFormatter.format(revenue.revenueToday)} subtitle={`${t.revenueWeek}: ${moneyFormatter.format(revenue.revenueThisWeek)}`} status="positive" />
            <MetricCard title={t.revenueMonth} value={moneyFormatter.format(revenue.revenueThisMonth)} subtitle={t.currentMonth} status="positive" />
            <MetricCard title={t.messagesToday} value={numberFormatter.format(messages.messagesToday)} subtitle={`${numberFormatter.format(messages.totalMessages)} ${t.totalSuffix}`} />
          </section>
          <RevenueAreaChart data={revenue.revenueSeries} />
        </section>
      ) : null}

      {showHealth ? (
        <section className="space-y-6">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <MetricCard title={t.botStatus} value={overview.botStatus === "online" ? t.online : t.offline} subtitle={`${t.api}: ${overview.apiHealth}`} status={overview.botStatus === "online" ? "positive" : "negative"} />
            <MetricCard title={t.uptimeRequests} value={`${overview.uptimePct.toFixed(1)}%`} subtitle={`${numberFormatter.format(overview.requestsToday)} ${t.requestsToday}`} status="neutral" />
            <MetricCard title={t.revenueToday} value={moneyFormatter.format(revenue.revenueToday)} subtitle={`${t.revenueWeek}: ${moneyFormatter.format(revenue.revenueThisWeek)}`} status="positive" />
          </section>
          <RecentActivityTable rows={recentActivity} />
        </section>
      ) : null}
    </div>
  );
};
