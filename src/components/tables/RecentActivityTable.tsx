import { ActivityItem } from "@/types/api";
import { useI18n } from "@/i18n/useI18n";
import { formatActivityDescription } from "@/utils/activityFormatter";

interface RecentActivityTableProps {
  rows: ActivityItem[];
}

export const RecentActivityTable = ({ rows }: RecentActivityTableProps) => {
  const { t, locale } = useI18n();

  return (
    <div className="glass-panel lift-card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="eyebrow">{t.routeHealth}</p>
          <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">{t.recentActivity}</h3>
        </div>
      </div>

      <div className="mt-5 space-y-3 md:hidden">
        {rows.map((row) => (
          <article key={row.id} className="surface-outline rounded-[22px] p-4">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-stone-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-600 dark:bg-slate-800 dark:text-slate-300">
                {row.eventType}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{new Date(row.createdAt).toLocaleString()}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-200">{formatActivityDescription(row, locale)}</p>
          </article>
        ))}
        {rows.length === 0 ? <p className="text-sm text-slate-500 dark:text-slate-400">{t.noRecentActivity}</p> : null}
      </div>

      <div className="mt-5 hidden overflow-x-auto md:block">
        <table className="min-w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            <tr>
              <th className="pb-3">{t.type}</th>
              <th className="pb-3">{t.description}</th>
              <th className="pb-3">{t.createdAt}</th>
            </tr>
          </thead>
          <tbody className="text-slate-700 dark:text-slate-200">
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-stone-200/80 transition-colors hover:bg-white/50 dark:border-slate-700/70 dark:hover:bg-slate-800/60">
                <td className="py-4 pr-4">
                  <span className="rounded-full bg-stone-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-600 dark:bg-slate-800 dark:text-slate-300">
                    {row.eventType}
                  </span>
                </td>
                <td className="py-4 pr-4">{formatActivityDescription(row, locale)}</td>
                <td className="py-4">{new Date(row.createdAt).toLocaleString()}</td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td className="py-4 text-slate-500 dark:text-slate-400" colSpan={3}>
                  {t.noRecentActivity}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};
