import { DailyPoint } from "@/types/api";
import { useI18n } from "@/i18n/useI18n";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface RevenueAreaChartProps {
  data: DailyPoint[];
}

export const RevenueAreaChart = ({ data }: RevenueAreaChartProps) => {
  const { t } = useI18n();

  return (
    <div className="glass-panel lift-card p-5 sm:p-6">
      <div>
        <p className="eyebrow">{t.navRevenue}</p>
        <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">{t.revenueTrend}</h3>
      </div>
      <div className="mt-5 h-64 w-full sm:h-72">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c98d54" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#c98d54" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#a8a29e" opacity={0.16} vertical={false} />
            <XAxis axisLine={false} dataKey="date" tick={{ fill: "#78716c", fontSize: 12 }} tickLine={false} minTickGap={20} />
            <YAxis axisLine={false} tick={{ fill: "#78716c", fontSize: 12 }} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 18, border: "1px solid rgba(214, 211, 209, 0.9)", background: "rgba(255,255,255,0.92)", boxShadow: "0 20px 50px -30px rgba(41, 37, 36, 0.35)" }} formatter={(v) => `$${Number(v).toFixed(2)}`} />
            <Area type="monotone" dataKey="value" stroke="#c98d54" fill="url(#revenueGradient)" strokeWidth={3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
