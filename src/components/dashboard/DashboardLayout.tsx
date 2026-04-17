import { Box, Toolbar } from "@mui/material";
import AppHeader from "./AppHeader";
import Sidebar from "./Sidebar";
import StatsGrid from "./StatsGrid";
import { SidebarProps } from "../../types/todo.types";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskIcon from "@mui/icons-material/Task";
import SettingsIcon from "@mui/icons-material/Settings";

export default function DashboardLayout({
  activeSection,
  onSectionChange,
  appTodo,
}: SidebarProps) {
  const navItems = [
    { label: "Dashboard", icon: DashboardIcon, section: "dashboard" },
    { label: "Zadania", icon: TaskIcon, section: "tasks" },
    { label: "Ustawienia", icon: SettingsIcon, section: "settings" },
  ];

  return (
    <Box sx={{ 
    display: "flex", 
    flexDirection: "column", // Elementy jeden pod drugim
    alignItems: "center",    // Centrowanie w poziomie
    justifyContent: "center", // Centrowanie w pionie
    minHeight: "100vh",
    bgcolor: "background.default", // Używa koloru z motywu
    p: 2 // Padding, żeby na mobile karta nie dotykała krawędzi
  }}>
      <Sidebar
        activeSection={activeSection}
        onSectionChange={onSectionChange}
        navItems={navItems}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { md: "240px" }, // 🔥 KLUCZ
          width: { md: "calc(100% - 240px)" }, // 🔥 BONUS (usuwa pustkę)
          p: 3,
          bgcolor: "background.default",
        }}
      >
        <AppHeader
          activeSection={activeSection}
          onSectionChange={onSectionChange}
          navItems={navItems}
        />
        <Toolbar />

        {activeSection === "dashboard" && <StatsGrid />}
        {activeSection === "tasks" && appTodo?.()}
        {activeSection === "settings" && <StatsGrid />}
      </Box>
    </Box>
  );
}
