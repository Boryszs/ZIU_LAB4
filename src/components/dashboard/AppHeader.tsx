import { useState } from "react";
import { BellIcon, MenuIcon, MoonIcon, SunIcon } from "../icons";
import { useTheme } from "../../context/TodoContext";
import type { DashboardNavItem, DashboardSection } from "./Sidebar";

interface AppHeaderProps {
  title?: string;
  activeSection: DashboardSection;
  onSectionChange: (section: DashboardSection) => void;
  navItems: DashboardNavItem[];
}

export default function AppHeader({
  title = "Dashboard",
  activeSection,
  onSectionChange,
  navItems,
}: AppHeaderProps) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleSectionChange = (section: DashboardSection) => {
    onSectionChange(section);
    setIsOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 z-[1100] w-full border-b border-slate-200 bg-white text-slate-900 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50 md:ml-[240px] md:w-[calc(100%_-_240px)]">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:hover:bg-slate-800 md:hidden"
              aria-label="otworz menu"
              aria-expanded={isOpen}
            >
              <MenuIcon />
            </button>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#1565C0]">
                TodoApp
              </p>
              <h2 className="truncate text-2xl font-bold leading-tight">
                {title}
              </h2>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:hover:bg-slate-800"
              aria-label="dark mode"
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </button>

            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:hover:bg-slate-800"
              aria-label="powiadomienia"
            >
              <BellIcon />
              <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-red-600 ring-2 ring-white dark:ring-slate-900" />
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <nav
          className="fixed left-0 top-16 z-[1200] w-full bg-white shadow-lg dark:bg-slate-900 md:hidden"
          aria-label="Menu mobilne"
        >
          <ul className="py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.section;

              return (
                <li key={item.section}>
                  <button
                    type="button"
                    onClick={() => handleSectionChange(item.section)}
                    className={`flex min-h-[48px] w-full items-center gap-4 px-4 text-left transition ${
                      isActive
                        ? "bg-blue-50 text-[#1565C0] dark:bg-blue-950 dark:text-blue-200"
                        : "text-slate-700 hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-800"
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
      )}
    </>
  );
}
