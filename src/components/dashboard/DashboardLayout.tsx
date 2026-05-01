import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import Sidebar, { type NavItem } from "./Sidebar";
import { DashboardIcon, LoginIcon, SettingsIcon, TaskIcon } from "../icons";

interface DashboardLayoutProps {
  appTodo?: () => React.ReactNode;
}

export default function DashboardLayout({ appTodo }: DashboardLayoutProps) {
  const navItems: NavItem[] = [
    { label: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
    { label: "Zadania", icon: TaskIcon, path: "/tasks" },
    { label: "Ustawienia", icon: SettingsIcon, path: "/settings" },
    { label: "Rejestracja", icon: LoginIcon, path: "/register" },
  ];

  return (
    <section aria-label="Układ pulpitu" className="min-h-screen bg-[#F5F7FA] text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Sidebar navItems={navItems} />
      <main id="main-content" tabIndex={-1} role="main" aria-label="Główna zawartość aplikacji" className="min-h-screen w-full bg-[#F5F7FA] p-6 pt-0 transition-colors dark:bg-slate-950 md:ml-[264px] md:w-[calc(100%_-_264px)]">
        <AppHeader navItems={navItems} />
        <div className="h-24" />
        <Outlet context={{ appTodo }} />
      </main>
    </section>
  );
}
