import { DailyPoint } from "@/types/api";
import { useI18n } from "@/i18n/useI18n";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface RevenueAreaChartProps {
  data: DailyPoint[];
}

export const RevenueAreaChart = ({ data }: RevenueAreaChartProps) => {
  const { t } = useI18n();

  return (
    <div className="glass-panel lift-card p-5">
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{t.revenueTrend}</h3>
      <div className="mt-4 h-72 w-full">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} minTickGap={20} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v) => `$${Number(v).toFixed(2)}`} />
            <Area type="monotone" dataKey="value" stroke="#f59e0b" fill="url(#revenueGradient)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
