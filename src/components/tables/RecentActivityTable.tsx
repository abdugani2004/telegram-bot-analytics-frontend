import { ActivityItem } from "@/types/api";
import { useI18n } from "@/i18n/useI18n";
import { formatActivityDescription } from "@/utils/activityFormatter";

interface RecentActivityTableProps {
  rows: ActivityItem[];
}

export const RecentActivityTable = ({ rows }: RecentActivityTableProps) => {
  const { t, locale } = useI18n();

  return (
    <div className="glass-panel lift-card p-5">
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{t.recentActivity}</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
            <tr>
              <th className="pb-3">{t.type}</th>
              <th className="pb-3">{t.description}</th>
              <th className="pb-3">{t.createdAt}</th>
            </tr>
          </thead>
          <tbody className="text-slate-700 dark:text-slate-200">
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-slate-200/70 transition-colors hover:bg-slate-100/60 dark:border-slate-700/70 dark:hover:bg-slate-800/60">
                <td className="py-3">{row.eventType}</td>
                <td className="py-3">{formatActivityDescription(row, locale)}</td>
                <td className="py-3">{new Date(row.createdAt).toLocaleString()}</td>
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
