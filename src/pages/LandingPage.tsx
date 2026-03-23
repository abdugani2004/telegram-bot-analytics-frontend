import { ArrowRight, BadgeDollarSign, Bot, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const metrics = [
  { label: "Bots tracked", value: "25+" },
  { label: "Monthly events", value: "250K" },
  { label: "Revenue insights", value: "Live" }
];

const features = [
  {
    icon: Bot,
    title: "Fast bot onboarding",
    description: "Connect, verify, and enable tracking in a guided flow designed for Telegram bot owners."
  },
  {
    icon: TrendingUp,
    title: "Revenue-first analytics",
    description: "See growth, messages, users, and monetization signals in one workspace."
  },
  {
    icon: ShieldCheck,
    title: "Owner-scoped access",
    description: "API-key protected workspaces map each bot and analytics stream to its real owner."
  }
];

export const LandingPage = () => {
  return (
    <div className="space-y-6">
      <section className="glass-panel relative overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_42%)]" />
        <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)] xl:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">Launch Ready</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              Analytics workspace for Telegram bots that want real growth, not vanity charts.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400">
              AboutBot helps bot founders connect live tracking, monitor revenue, and turn raw Telegram activity into product decisions.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="btn-gradient" to="/workspace">
                <span className="relative z-10 inline-flex items-center gap-2">
                  Open Workspace
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link
                className="surface-outline inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white/80 dark:text-slate-200 dark:hover:bg-slate-800/70"
                to="/workspace"
              >
                Try Demo Flow
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            {metrics.map((metric) => (
              <article key={metric.label} className="surface-outline rounded-[24px] p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{metric.label}</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">{metric.value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <article key={title} className="glass-panel p-5 sm:p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-300">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{description}</p>
          </article>
        ))}
      </section>

      <section className="glass-panel p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)] lg:items-center">
          <div>
            <p className="eyebrow">Why now</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-slate-100">Built for founders who want to monetize bot traffic faster.</h2>
            <div className="mt-5 space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
              <p>Track user growth, health, and payment activity without building a full analytics stack from scratch.</p>
              <p>Use plan limits, account ownership, and billing previews to shape this into a real SaaS offer from day one.</p>
            </div>
          </div>

          <div className="surface-outline rounded-[28px] p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Founder checklist</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">What you can show right now</p>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm text-slate-700 dark:text-slate-200">
              <p>Live onboarding with API key ownership</p>
              <p>Dashboard with health, revenue, and alerts</p>
              <p>Account usage, pricing, and subscription previews</p>
              <p>Upgrade flow ready for Stripe or Click integration</p>
            </div>

            <Link className="btn-gradient mt-6 w-full" to="/workspace">
              <span className="relative z-10 inline-flex items-center gap-2">
                Start With Demo Owner
                <BadgeDollarSign className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
