import { DailyPoint } from "@/types/api";
import { useI18n } from "@/i18n/useI18n";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface MessagesBarChartProps {
  data: DailyPoint[];
}

export const MessagesBarChart = ({ data }: MessagesBarChartProps) => {
  const { t } = useI18n();

  return (
    <div className="glass-panel lift-card p-5">
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{t.dailyMessages}</h3>
      <div className="mt-4 h-72 w-full">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.2} />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} minTickGap={20} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
