import { DailyPoint } from "@/types/api";
import { useI18n } from "@/i18n/useI18n";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface MessagesBarChartProps {
  data: DailyPoint[];
}

export const MessagesBarChart = ({ data }: MessagesBarChartProps) => {
  const { t } = useI18n();

  return (
    <div className="glass-panel lift-card p-5 sm:p-6">
      <div>
        <p className="eyebrow">{t.navMessages}</p>
        <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-slate-100">{t.dailyMessages}</h3>
      </div>
      <div className="mt-5 h-64 w-full sm:h-72">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#a8a29e" opacity={0.16} vertical={false} />
            <XAxis axisLine={false} dataKey="date" tick={{ fill: "#78716c", fontSize: 12 }} tickLine={false} minTickGap={20} />
            <YAxis axisLine={false} tick={{ fill: "#78716c", fontSize: 12 }} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 18, border: "1px solid rgba(214, 211, 209, 0.9)", background: "rgba(255,255,255,0.92)", boxShadow: "0 20px 50px -30px rgba(41, 37, 36, 0.35)" }} />
            <Bar dataKey="value" fill="#c98d54" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
