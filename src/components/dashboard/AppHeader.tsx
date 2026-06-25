import { lazy, Suspense, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useAppTheme } from "../../context/AppContext";
import { AppButton } from "../common/AppButton";
import type { NavItem } from "./Sidebar";
import { drawerWidth } from "./DashboardLayout";

const MobileNavigationDrawer = lazy(
  () => import("./MobileNavigationDrawer"),
);

interface AppHeaderProps {
  navItems: NavItem[];
  title: string;
}

export default function AppHeader({ navItems, title }: AppHeaderProps) {
  const { theme, setTheme } = useAppTheme();
  const [isOpen, setIsOpen] = useState(false);
  const themeButtonLabel =
    theme === "light" ? "Włącz tryb ciemny" : "Włącz tryb jasny";
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={1}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          left: { md: drawerWidth },
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          bgcolor: "background.paper",
        }}
      >
        <Toolbar sx={{ gap: 2, px: { xs: 2, sm: 3 } }}>
          <AppButton
            type="button"
            iconOnly
            tone="neutral"
            variant="text"
            onClick={() => setIsOpen(true)}
            aria-controls="mobile-menu"
            aria-label="Otwórz menu"
            aria-expanded={isOpen}
            sx={{ display: { xs: "inline-flex", md: "none" }, ml: -1 }}
          >
            <MenuIcon />
          </AppButton>

          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              component="p"
              variant="caption"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                letterSpacing: 0,
                textTransform: "uppercase",
              }}
            >
              {/* TodoApp */}
            </Typography>
            <Typography component="h2" variant="h5" noWrap fontWeight={800}>
              {title}
            </Typography>
          </Box>

          <AppButton
            type="button"
            variant="outlined"
            tone="neutral"
            radius="pill"
            startIcon={theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            onClick={toggleTheme}
            aria-label={themeButtonLabel}
            aria-pressed={theme === "dark"}
            sx={{
              display: { xs: "none", sm: "inline-flex" },
              minWidth: 132,
            }}
          >
            {theme === "light" ? "Tryb ciemny" : "Tryb jasny"}
          </AppButton>

          <AppButton
            type="button"
            iconOnly
            tone="neutral"
            variant="text"
            onClick={toggleTheme}
            aria-label={themeButtonLabel}
            aria-pressed={theme === "dark"}
            sx={{
              display: { xs: "inline-flex", sm: "none" },
              border: 1,
              borderColor: "divider",
            }}
          >
            {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </AppButton>

          <AppButton
            type="button"
            iconOnly
            tone="neutral"
            variant="text"
            aria-label="Powiadomienia"
            sx={{ display: { xs: "none", sm: "inline-flex" } }}
          >
            <Badge variant="dot" color="error">
              <NotificationsIcon />
            </Badge>
          </AppButton>
        </Toolbar>
      </AppBar>

      {isOpen && (
        <Suspense fallback={null}>
          <MobileNavigationDrawer
            navItems={navItems}
            open={isOpen}
            onClose={() => setIsOpen(false)}
          />
        </Suspense>
      )}
    </>
  );
}
