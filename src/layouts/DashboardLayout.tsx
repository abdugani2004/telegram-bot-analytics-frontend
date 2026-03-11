import { Activity, BarChart3, LayoutDashboard, MessageCircle, Users } from "lucide-react";
import { PropsWithChildren, useEffect, useState } from "react";
import { GlowButton } from "@/components/ui/GlowButton";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useI18n } from "@/i18n/useI18n";
import { NavLink, useLocation } from "react-router-dom";

type DashboardRoute = "overview" | "users" | "messages" | "revenue" | "health";

interface DashboardLayoutProps extends PropsWithChildren {
  hasBotIdentity: boolean;
}

export const DashboardLayout = ({ children, hasBotIdentity }: DashboardLayoutProps) => {
  const [darkMode, setDarkMode] = useState(true);
  const { t } = useI18n();
  const location = useLocation();

  const navItems: Array<{ id: DashboardRoute; label: string; icon: typeof LayoutDashboard }> = [
    { id: "overview", label: t.navOverview, icon: LayoutDashboard },
    { id: "users", label: t.navUsers, icon: Users },
    { id: "messages", label: t.navMessages, icon: MessageCircle },
    { id: "revenue", label: t.navRevenue, icon: BarChart3 },
    { id: "health", label: t.navHealth, icon: Activity }
  ];

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-emerald-50 to-sky-100 text-slate-900 transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 dark:text-slate-100">
      <div className="mx-auto flex max-w-[1600px] flex-col md:flex-row">
        <aside className="w-full border-b border-slate-200/80 bg-white/70 p-4 backdrop-blur md:min-h-screen md:w-72 md:border-b-0 md:border-r dark:border-slate-700/80 dark:bg-slate-900/60">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-tight">{t.appTitle}</h1>
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <GlowButton className="px-3 py-1.5 text-xs" label={darkMode ? t.themeLight : t.themeDark} onClick={() => setDarkMode((value) => !value)} />
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-2 md:grid-cols-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <NavLink
                key={id}
                className={({ isActive }) =>
                  `nav-pill flex items-center gap-2 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-slate-100 ${
                    isActive ? "bg-emerald-100/80 text-slate-900 dark:bg-slate-800 dark:text-slate-100" : ""
                  } ${!hasBotIdentity ? "pointer-events-none opacity-50" : ""}`
                }
                to={`/${id}`}
              >
                <Icon className="relative z-10 h-4 w-4" />
                <span className="relative z-10">{label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="w-full p-4 md:p-8">
          <header className="glass-panel mb-6 p-5">
            <h2 className="text-2xl font-semibold tracking-tight">{t.workspaceTitle}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t.workspaceSubtitle}</p>
            {hasBotIdentity ? (
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-emerald-500">
                {location.pathname === "/users"
                  ? t.routeUsers
                  : location.pathname === "/messages"
                    ? t.routeMessages
                    : location.pathname === "/revenue"
                      ? t.routeRevenue
                      : location.pathname === "/health"
                        ? t.routeHealth
                        : t.routeOverview}
              </p>
            ) : null}
          </header>
          {children}
        </main>
      </div>
    </div>
  );
};
