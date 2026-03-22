import { DailyPoint } from "@/types/api";
import { useI18n } from "@/i18n/useI18n";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface GrowthLineChartProps {
  data: DailyPoint[];
}

export const GrowthLineChart = ({ data }: GrowthLineChartProps) => {
  const { t } = useI18n();

  return (
    <div className="glass-panel lift-card p-5 sm:p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">{t.navUsers}</p>
          <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">{t.userGrowth}</h3>
        </div>
      </div>
      <div className="mt-5 h-64 w-full sm:h-72">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#a8a29e" opacity={0.16} vertical={false} />
            <XAxis axisLine={false} dataKey="date" tick={{ fill: "#78716c", fontSize: 12 }} tickLine={false} minTickGap={20} />
            <YAxis axisLine={false} tick={{ fill: "#78716c", fontSize: 12 }} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 18, border: "1px solid rgba(214, 211, 209, 0.9)", background: "rgba(255,255,255,0.92)", boxShadow: "0 20px 50px -30px rgba(41, 37, 36, 0.35)" }} />
            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 5, fill: "#10b981" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
