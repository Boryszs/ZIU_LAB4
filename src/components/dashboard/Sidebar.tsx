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
    <aside className="fixed left-0 top-0 hidden h-screen w-[240px] flex-col bg-[#1565C0] text-white md:flex">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-xl font-bold">TodoApp</h1>
      </div>

      <div className="border-t border-white/20" />

      <nav className="py-2" aria-label="Glowne">
        <ul>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.section;

            return (
              <li key={item.section}>
                <button
                  type="button"
                  onClick={() => onSectionChange(item.section)}
                  className={`flex min-h-[48px] w-full items-center gap-4 px-4 text-left transition ${
                    isActive ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="h-6 w-6 shrink-0" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex-1" />

      <div className="flex items-center gap-3 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 font-semibold">
          U
        </div>
        <span className="text-sm">Uzytkownik</span>
      </div>
    </aside>
  );
}
