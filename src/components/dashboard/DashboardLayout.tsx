import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AppHeader from "./AppHeader";
import Sidebar, { type NavItem } from "./Sidebar";

interface DashboardLayoutProps {
  appTodo?: () => React.ReactNode;
}

export const drawerWidth = 264;

export default function DashboardLayout({ appTodo }: DashboardLayoutProps) {
  const navItems: NavItem[] = [
    { label: "Dashboard", icon: DashboardIcon, path: "/dashboard" },
    { label: "Zadania", icon: TaskAltIcon, path: "/tasks" },
    { label: "Ustawienia", icon: SettingsIcon, path: "/settings" },
    { label: "Rejestracja", icon: AppRegistrationIcon, path: "/register" },
  ];

  return (
    <Box
      component="section"
      aria-label="Układ pulpitu"
      sx={{ minHeight: "100vh", bgcolor: "background.default" }}
    >
      <Sidebar navItems={navItems} />
      <Box
        id="main-content"
        component="main"
        tabIndex={-1}
        aria-label="Główna zawartość aplikacji"
        sx={{
          minHeight: "100vh",
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          ml: { xs: 0, md: `${drawerWidth}px` },
          bgcolor: "background.default",
          px: { xs: 2, sm: 3 },
          pb: 4,
        }}
      >
        <AppHeader navItems={navItems} />
        <Box sx={{ height: 96 }} />
        <Outlet context={{ appTodo }} />
      </Box>
    </Box>
  );
}
