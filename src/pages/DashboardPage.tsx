import { Activity, AlertTriangle, BadgeDollarSign, Bot, MessageSquareText, RefreshCw, TrendingUp, Users } from "lucide-react";
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
  const weeklySummary = [
    {
      label: "Weekly growth",
      value: `${overview.weeklyGrowthPct.toFixed(1)}%`,
      tone: overview.weeklyGrowthPct >= 0 ? "text-emerald-600 dark:text-emerald-300" : "text-rose-600 dark:text-rose-300"
    },
    {
      label: "Revenue this week",
      value: moneyFormatter.format(overview.revenueThisWeek),
      tone: "text-slate-900 dark:text-slate-100"
    },
    {
      label: "Active users today",
      value: numberFormatter.format(overview.activeUsersToday),
      tone: "text-slate-900 dark:text-slate-100"
    },
    {
      label: "Messages today",
      value: numberFormatter.format(overview.messagesToday),
      tone: "text-slate-900 dark:text-slate-100"
    }
  ];

  const alerts = [
    overview.botStatus === "offline"
      ? { title: "Bot is offline", description: "Webhook traffic or polling looks interrupted. Check tracking and deployment health.", tone: "negative" as const }
      : null,
    overview.uptimePct < 99
      ? { title: "Uptime slipped below target", description: `Current uptime is ${overview.uptimePct.toFixed(1)}%. Consider checking webhook failures and database latency.`, tone: "negative" as const }
      : null,
    overview.revenueThisWeek === 0 && overview.totalUsers > 0
      ? { title: "Revenue is flat this week", description: "Users are active, but conversions are not moving yet. This is a strong place to test offers or checkout flow.", tone: "neutral" as const }
      : null,
    recentActivity.length < 3
      ? { title: "Low signal from live events", description: "Very few new events arrived recently. If this is a live bot, it may need more traffic or event instrumentation.", tone: "neutral" as const }
      : null
  ].filter(Boolean) as Array<{ title: string; description: string; tone: "negative" | "neutral" }>;

  const nextActions = [
    overview.botStatus !== "online" ? "Re-check tracking and webhook status from the onboarding flow." : null,
    overview.revenueThisWeek === 0 ? "Open Billing and upgrade monetization flow if you are testing paid funnels." : null,
    overview.activeUsersToday === 0 ? "Send a campaign or trigger a bot broadcast to generate fresh usage." : null,
    messages.messagesToday < 5 ? "Add more message events or connect a live Telegram bot token for stronger analytics." : null
  ].filter(Boolean) as string[];
  const healthPulse = messages.dailyMessagesSeries.slice(-7).map((point, index, source) => {
    const maxValue = Math.max(...source.map((item) => item.value), 1);
    const heightPct = Math.max((point.value / maxValue) * 100, 18);
    return {
      ...point,
      heightPct,
      uptimeProxy: Math.max(92, Math.min(100, overview.uptimePct - (maxValue - point.value) * 0.6)).toFixed(1)
    };
  });

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

      {view === "overview" ? (
        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
          <article className="glass-panel p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-300">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="eyebrow">Weekly report</p>
                <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">Growth snapshot for this bot</h3>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {weeklySummary.map((item) => (
                <div key={item.label} className="surface-outline rounded-[22px] p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{item.label}</p>
                  <p className={`mt-3 text-2xl font-semibold ${item.tone}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="glass-panel p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-amber-50 p-3 text-amber-700 dark:bg-amber-950/20 dark:text-amber-300">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <p className="eyebrow">Attention alerts</p>
                <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">What needs action next</h3>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {alerts.length > 0 ? (
                alerts.map((alert) => (
                  <div key={alert.title} className="surface-outline rounded-[22px] p-4">
                    <p className={`text-sm font-semibold ${alert.tone === "negative" ? "text-rose-600 dark:text-rose-300" : "text-slate-900 dark:text-slate-100"}`}>
                      {alert.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{alert.description}</p>
                  </div>
                ))
              ) : (
                <div className="surface-outline rounded-[22px] p-4">
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-300">No urgent alerts</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">Your current bot health and revenue signals look stable enough for now.</p>
                </div>
              )}
            </div>

            <div className="mt-5 rounded-[22px] border border-stone-200/80 bg-white/50 p-4 dark:border-slate-700/70 dark:bg-slate-900/40">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Suggested next actions</p>
              <div className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-200">
                {nextActions.length > 0 ? nextActions.map((item) => <p key={item}>{item}</p>) : <p>Keep collecting live events and review Billing when you are ready to monetize growth.</p>}
              </div>
            </div>
          </article>
        </section>
      ) : null}

      {view === "overview" ? (
        <section className="glass-panel p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">Health pulse</p>
              <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">Last 7 signal bars</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                This mini chart uses recent message activity as a health proxy until a dedicated health history endpoint is added.
              </p>
            </div>
            <div className="surface-outline rounded-2xl px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
              Live uptime proxy: {overview.uptimePct.toFixed(1)}%
            </div>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-3">
            {healthPulse.map((item) => (
              <div key={item.date} className="flex flex-col items-center gap-3">
                <div className="flex h-40 w-full items-end rounded-[24px] bg-stone-100/80 px-2 py-2 dark:bg-slate-800/80">
                  <div
                    className="w-full rounded-[18px] bg-gradient-to-t from-emerald-500 via-teal-500 to-cyan-400"
                    style={{ height: `${item.heightPct}%` }}
                    title={`${item.date}: ${item.uptimeProxy}% proxy`}
                  />
                </div>
                <div className="text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    {item.date.slice(5)}
                  </p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{item.uptimeProxy}%</p>
                </div>
              </div>
            ))}
          </div>
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
