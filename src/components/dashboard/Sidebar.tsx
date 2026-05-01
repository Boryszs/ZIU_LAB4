import type { AppIcon } from "../icons";

export type DashboardSection = "dashboard" | "tasks" | "settings" | "login";

export interface DashboardNavItem {
  label: string;
  icon: AppIcon;
  section: DashboardSection;
}

interface SidebarProps {
  activeSection: DashboardSection;
  onSectionChange: (section: DashboardSection) => void;
  navItems: DashboardNavItem[];
}

export default function Sidebar({
  activeSection,
  onSectionChange,
  navItems,
}: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-[264px] flex-col border-r border-slate-200 bg-white text-slate-900 shadow-[8px_0_24px_rgba(15,23,42,0.08)] transition-colors dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 md:flex">
      <div className="flex h-20 items-center gap-3 px-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1565C0] text-lg font-bold text-white shadow-sm">
          T
        </div>
        <div className="min-w-0">
          <h1 className="truncate text-xl font-bold leading-tight">TodoApp</h1>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Panel zadan
          </p>
        </div>
      </div>

      <div className="mx-5 border-t border-slate-200 dark:border-slate-800" />

      <nav className="px-3 py-4" aria-label="Glowne">
        <ul className="grid gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.section;

            return (
              <li key={item.section}>
                <button
                  type="button"
                  onClick={() => onSectionChange(item.section)}
                  className={`group relative flex min-h-[48px] w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#1565C0] text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${
                      isActive
                        ? "bg-white/15"
                        : "bg-slate-100 text-slate-500 group-hover:text-[#1565C0] dark:bg-slate-900 dark:text-slate-400"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex-1" />

      <div className="m-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1565C0] font-semibold text-white">
            U
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
              Uzytkownik
            </p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
