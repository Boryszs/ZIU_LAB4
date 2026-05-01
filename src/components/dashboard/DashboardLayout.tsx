import AppHeader from "./AppHeader";
import Sidebar, { type DashboardNavItem } from "./Sidebar";
import StatsGrid from "./StatsGrid";
import { SidebarProps } from "../../types/todo.types";
import {
  DashboardIcon,
  LoginIcon,
  SettingsIcon,
  TaskIcon,
} from "../icons";
import MultiStepForm from "../MultiStepForm";

export default function DashboardLayout({
  activeSection,
  onSectionChange,
  appTodo,
}: SidebarProps) {
  const navItems: DashboardNavItem[] = [
    { label: "Dashboard", icon: DashboardIcon, section: "dashboard" },
    { label: "Zadania", icon: TaskIcon, section: "tasks" },
    { label: "Ustawienia", icon: SettingsIcon, section: "settings" },
    { label: "Logowanie", icon: LoginIcon, section: "login" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={onSectionChange}
        navItems={navItems}
      />

      <main className="min-h-screen w-full bg-[#F5F7FA] p-6 pt-0 transition-colors dark:bg-slate-950 md:ml-[240px] md:w-[calc(100%_-_240px)]">
        <AppHeader
          activeSection={activeSection}
          onSectionChange={onSectionChange}
          navItems={navItems}
        />

        <div className="h-16" />

        {activeSection === "dashboard" && <StatsGrid />}
        {activeSection === "tasks" && appTodo?.()}
        {activeSection === "login" && <MultiStepForm />}
      </main>
    </div>
  );
}
