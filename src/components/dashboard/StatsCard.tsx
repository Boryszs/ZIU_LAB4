import type { AppIcon } from "../icons";

interface StatsCardProps {
  title: string;
  value: number;
  icon: AppIcon;
  color: string;
  bgColor: string;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  color,
  bgColor,
}: StatsCardProps) {
  return (
    <article className="rounded-xl bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.08)] transition-colors dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <p className="text-4xl font-bold text-slate-900 dark:text-slate-50">
            {value}
          </p>
        </div>
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: bgColor, color }}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </article>
  );
}
