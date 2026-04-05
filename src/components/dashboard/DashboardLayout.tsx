import { Box, Toolbar } from "@mui/material";
import AppHeader from "./AppHeader";
import Sidebar from "./Sidebar";
import StatsGrid from "./StatsGrid";
import { SidebarProps } from "../../types/todo.types";

export default function DashboardLayout({
  activeSection,
  onSectionChange,
  appTodo,
}: SidebarProps) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        activeSection={activeSection}
        onSectionChange={onSectionChange}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: "background.default" }}
      >
        <AppHeader />
        <Toolbar />
        {activeSection === "dashboard" && <StatsGrid />}
        {activeSection === "tasks" && appTodo?.()}
        {activeSection === "settings" && <StatsGrid />}
      </Box>
    </Box>
  );
}
