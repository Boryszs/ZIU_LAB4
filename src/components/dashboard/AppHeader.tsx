import { useMemo, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BellIcon, MenuIcon, MoonIcon, SunIcon } from "../icons";
import { useTheme } from "../../context/TodoContext";
import type { NavItem } from "./Sidebar";
import { FocusTrap } from "../FocusTrap";

interface AppHeaderProps {
  navItems: NavItem[];
}

export default function AppHeader({ navItems }: AppHeaderProps) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  const title = useMemo(() => {
    const currentItem = navItems.find(
      (item) => item.path === location.pathname,
    );
    return currentItem?.label || "Dashboard";
  }, [location.pathname, navItems]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-[1100] border-b border-slate-300 bg-white/95 text-slate-900 shadow-sm backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-950/95 dark:text-slate-50 md:left-[264px]">
        <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:hover:bg-slate-800 md:hidden"
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
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

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="flex h-10 min-w-[132px] items-center justify-center gap-2 rounded-full border border-slate-300 bg-transparent px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus:ring-slate-700"
              aria-label={
                theme === "light" ? "Wlacz tryb ciemny" : "Wlacz tryb jasny"
              }
              aria-pressed={theme === "dark"}
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
              <span>{theme === "light" ? "Tryb ciemny" : "Tryb jasny"}</span>
            </button>

            <button
              type="button"
              className="relative hidden h-10 w-10 items-center justify-center rounded-full transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:hover:bg-slate-800 sm:flex"
              aria-label="Powiadomienia"
            >
              <BellIcon />
              <span
                aria-hidden="true"
                className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-red-600 ring-2 ring-white dark:ring-slate-900"
              />
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <FocusTrap onEscape={() => setIsOpen(false)} triggerRef={menuButtonRef}>
          <nav
            id="mobile-menu"
            className="fixed left-0 top-16 z-[1200] w-full bg-white shadow-lg dark:bg-slate-900 md:hidden"
            aria-label="Menu mobilne"
          >
            <ul className="py-2">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      onClick={handleLinkClick}
                      className={({ isActive }) =>
                        `flex min-h-[48px] w-full items-center gap-4 px-4 text-left transition ${
                          isActive
                            ? "bg-blue-50 text-[#1565C0] dark:bg-blue-950 dark:text-blue-200"
                            : "text-slate-700 hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-800"
                        }`
                      }
                    >
                      <Icon className="h-6 w-6 shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
         </FocusTrap> 
      )}
    </>
  );
}
