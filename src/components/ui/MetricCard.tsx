import clsx from "clsx";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  status?: "positive" | "negative" | "neutral";
}

const statusMap = {
  positive: "text-emerald-600 dark:text-emerald-300",
  negative: "text-red-600 dark:text-red-300",
  neutral: "text-slate-600 dark:text-slate-300"
} as const;

export const MetricCard = ({ title, value, subtitle, status = "neutral" }: MetricCardProps) => {
  return (
    <article className="glass-panel lift-card group p-5">
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 transition-transform duration-300 group-hover:translate-x-1 dark:text-slate-100">{value}</p>
      {subtitle ? (
        <p className={clsx("mt-2 text-sm", statusMap[status])}>{subtitle}</p>
      ) : null}
    </article>
  );
};
