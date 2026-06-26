import { lazy, Suspense, useState } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import Box from "@mui/material/Box";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import AppHeader from "./AppHeader";
import type { NavItem } from "./NavigationList";
import { pageVariants, reducedPageVariants } from "../../shared/animations/variants";
import { PageSkeleton } from "../loading/LoadingSkeletons";

const Sidebar = lazy(() => import("./Sidebar"));

interface DashboardLayoutProps {
  title?: string;
}

export interface DashboardOutletContext {
  setPageTitle: (title: string) => void;
}

export const drawerWidth = 264;

export default function DashboardLayout({
  title = "Dashboard",
}: DashboardLayoutProps) {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState(title);
  const outlet = useOutlet({ setPageTitle });
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? reducedPageVariants : pageVariants;

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
      <Suspense fallback={null}>
        <Sidebar navItems={navItems} />
      </Suspense>
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
          overflow: "hidden", // prevents scrollbars during animations
        }}
      >
        <AppHeader navItems={navItems} title={pageTitle} />
        <Box sx={{ height: 96 }} />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="in"
            exit="out"
            variants={variants}
          >
            <Suspense fallback={<PageSkeleton />}>{outlet}</Suspense>
          </motion.div>
        </AnimatePresence>
      </Box>
    </Box>
  );
}
