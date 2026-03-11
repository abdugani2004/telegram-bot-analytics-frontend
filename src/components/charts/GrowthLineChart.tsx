import { DailyPoint } from "@/types/api";
import { useI18n } from "@/i18n/useI18n";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface GrowthLineChartProps {
  data: DailyPoint[];
}

export const GrowthLineChart = ({ data }: GrowthLineChartProps) => {
  const { t } = useI18n();

  return (
    <div className="glass-panel lift-card p-5">
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{t.userGrowth}</h3>
      <div className="mt-4 h-72 w-full">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} minTickGap={20} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
