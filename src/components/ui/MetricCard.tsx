import clsx from "clsx";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  status?: "positive" | "negative" | "neutral";
}

const statusMap = {
  positive: {
    text: "text-emerald-700 dark:text-emerald-300",
    dot: "bg-emerald-500"
  },
  negative: {
    text: "text-rose-700 dark:text-rose-300",
    dot: "bg-rose-500"
  },
  neutral: {
    text: "text-stone-600 dark:text-slate-300",
    dot: "bg-stone-400"
  }
} as const;

export const MetricCard = ({ title, value, subtitle, status = "neutral" }: MetricCardProps) => {
  return (
    <article className="glass-panel lift-card group relative overflow-hidden p-5 sm:p-6">
      <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-stone-300/80 to-transparent dark:via-slate-600/70" />
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <span className={clsx("h-2.5 w-2.5 rounded-full", statusMap[status].dot)} />
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 transition-transform duration-300 group-hover:translate-x-1 dark:text-slate-100 sm:text-[2rem]">{value}</p>
      {subtitle ? (
        <p className={clsx("mt-3 text-sm leading-6", statusMap[status].text)}>{subtitle}</p>
      ) : null}
    </article>
  );
};
