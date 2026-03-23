import clsx from "clsx";

interface PlanBadgeProps {
  plan: "starter" | "growth";
}

const badgeMap = {
  starter: "bg-stone-100 text-stone-700 border-stone-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700",
  growth: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-300 dark:border-emerald-900/60"
} as const;

export const PlanBadge = ({ plan }: PlanBadgeProps) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]",
        badgeMap[plan]
      )}
    >
      {plan}
    </span>
  );
};
