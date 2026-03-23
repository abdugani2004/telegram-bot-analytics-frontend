import { Activity, BarChart3, CreditCard, LayoutDashboard, MessageCircle, Settings2, Users } from "lucide-react";
import { PropsWithChildren, useEffect, useState } from "react";
import { GlowButton } from "@/components/ui/GlowButton";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useI18n } from "@/i18n/useI18n";
import { NavLink, useLocation } from "react-router-dom";

type DashboardRoute = "overview" | "users" | "messages" | "revenue" | "health" | "account" | "billing";

interface DashboardLayoutProps extends PropsWithChildren {
  hasBotIdentity: boolean;
  ownerEmail?: string | null;
  onResetWorkspace?: () => void;
}

export const DashboardLayout = ({
  children,
  hasBotIdentity,
  ownerEmail,
  onResetWorkspace
}: DashboardLayoutProps) => {
  const [darkMode, setDarkMode] = useState(true);
  const { t } = useI18n();
  const location = useLocation();
  const isLanding = !hasBotIdentity && location.pathname === "/";

  const navItems: Array<{ id: DashboardRoute; label: string; icon: typeof LayoutDashboard }> = [
    { id: "overview", label: t.navOverview, icon: LayoutDashboard },
    { id: "users", label: t.navUsers, icon: Users },
    { id: "messages", label: t.navMessages, icon: MessageCircle },
    { id: "revenue", label: t.navRevenue, icon: BarChart3 },
    { id: "health", label: t.navHealth, icon: Activity },
    { id: "account", label: "Account", icon: Settings2 },
    { id: "billing", label: "Billing", icon: CreditCard }
  ];

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen text-slate-900 transition-colors dark:text-slate-100">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-6rem] top-0 h-72 w-72 rounded-full bg-amber-200/30 blur-3xl dark:bg-slate-800/40" />
        <div className="absolute right-[-3rem] top-24 h-80 w-80 rounded-full bg-orange-200/25 blur-3xl dark:bg-slate-700/30" />
      </div>

      <div className={`relative mx-auto flex max-w-[1600px] flex-col gap-4 px-3 py-3 sm:px-4 md:px-6 md:py-6 ${isLanding ? "" : "md:flex-row md:gap-6"}`}>
        {isLanding ? (
          <header className="glass-panel flex items-center justify-between gap-3 p-4 sm:p-5">
            <div>
              <p className="eyebrow">{t.workspaceTitle}</p>
              <h1 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">{t.appTitle}</h1>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <GlowButton
                className="min-h-10 rounded-xl px-3 text-xs"
                label={darkMode ? t.themeLight : t.themeDark}
                onClick={() => setDarkMode((value) => !value)}
              />
            </div>
          </header>
        ) : (
        <aside className="surface-outline w-full p-3 md:sticky md:top-6 md:max-h-[calc(100vh-3rem)] md:w-[290px] md:self-start md:overflow-hidden md:p-5">
          <div className="mb-3 flex items-start justify-between gap-3 md:mb-8 md:flex-col md:items-stretch">
            <div className="min-w-0">
              <p className="eyebrow mb-2 hidden md:inline-flex">{t.workspaceTitle}</p>
              <h1 className="text-lg font-bold leading-tight tracking-tight sm:text-xl">{t.appTitle}</h1>
            </div>
            <div className="flex shrink-0 items-center gap-1.5 md:w-full md:justify-between">
              <LanguageSwitcher />
              <GlowButton className="min-h-8 rounded-xl px-2.5 py-1.5 text-[10px] leading-none sm:text-[11px] md:min-h-10 md:px-3 md:text-xs" label={darkMode ? t.themeLight : t.themeDark} onClick={() => setDarkMode((value) => !value)} />
            </div>
          </div>

          {ownerEmail ? (
            <div className="mb-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 px-3 py-2 text-xs text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/20 dark:text-emerald-100">
              {ownerEmail}
            </div>
          ) : null}

          <nav className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:grid md:grid-cols-1 md:gap-2 md:overflow-visible md:px-0 md:pb-0">
            {navItems.map(({ id, label, icon: Icon }) => (
              <NavLink
                key={id}
                className={({ isActive }) =>
                  `nav-pill flex min-h-0 min-w-[104px] shrink-0 items-center justify-center gap-1.5 border border-transparent bg-white/40 text-center text-slate-700 hover:border-stone-200 hover:text-slate-900 md:min-w-0 md:justify-start md:bg-transparent md:text-left dark:bg-slate-900/30 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:text-slate-100 ${
                    isActive ? "border-stone-200 bg-amber-100/80 text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100" : ""
                  } ${!hasBotIdentity ? "pointer-events-none opacity-50" : ""}`
                }
                to={`/${id}`}
              >
                <Icon className="relative z-10 h-3.5 w-3.5 shrink-0 md:h-4 md:w-4" />
                <span className="relative z-10 truncate leading-tight">{label}</span>
              </NavLink>
            ))}
          </nav>

          {onResetWorkspace ? (
            <button
              className="mt-3 w-full rounded-2xl border border-stone-200 bg-white/60 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white/80 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200 dark:hover:bg-slate-800/70"
              onClick={onResetWorkspace}
              type="button"
            >
              Reset Workspace
            </button>
          ) : null}
        </aside>
        )}

        <main className="w-full min-w-0 pb-3">
          {!isLanding ? (
          <header className="glass-panel mb-5 p-5 sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow">{t.workspaceTitle}</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{t.workspaceTitle}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{t.workspaceSubtitle}</p>
              </div>
              <div className="surface-outline flex items-center gap-3 self-start px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span>{darkMode ? t.themeDark : t.themeLight}</span>
              </div>
            </div>
            {hasBotIdentity ? (
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-400">
                {location.pathname === "/users"
                  ? t.routeUsers
                  : location.pathname === "/messages"
                    ? t.routeMessages
                    : location.pathname === "/revenue"
                      ? t.routeRevenue
                      : location.pathname === "/health"
                        ? t.routeHealth
                        : location.pathname === "/account"
                          ? "account"
                          : location.pathname === "/billing"
                            ? "billing"
                        : t.routeOverview}
              </p>
            ) : null}
          </header>
          ) : null}
          {children}
        </main>
      </div>
    </div>
  );
};
