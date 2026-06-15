import { useMemo, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useTheme } from "../../context/TodoContext";
import type { NavItem } from "./Sidebar";
import { drawerWidth } from "./DashboardLayout";

interface AppHeaderProps {
  navItems: NavItem[];
}

export default function AppHeader({ navItems }: AppHeaderProps) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const title = useMemo(() => {
    const currentItem = navItems.find((item) => item.path === location.pathname);
    return currentItem?.label || "Dashboard";
  }, [location.pathname, navItems]);

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
          <IconButton
            type="button"
            edge="start"
            color="inherit"
            onClick={() => setIsOpen(true)}
            aria-controls="mobile-menu"
            aria-label="Otwórz menu"
            aria-expanded={isOpen}
            sx={{ display: { xs: "inline-flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

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

          <Button
            type="button"
            variant="outlined"
            color="inherit"
            startIcon={theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label={
              theme === "light" ? "Włącz tryb ciemny" : "Włącz tryb jasny"
            }
            aria-pressed={theme === "dark"}
            sx={{
              display: { xs: "none", sm: "inline-flex" },
              minWidth: 132,
              borderRadius: 999,
            }}
          >
            {theme === "light" ? "Tryb ciemny" : "Tryb jasny"}
          </Button>

          <IconButton
            type="button"
            color="inherit"
            aria-label="Powiadomienia"
            sx={{ display: { xs: "none", sm: "inline-flex" } }}
          >
            <Badge variant="dot" color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        id="mobile-menu"
        variant="temporary"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: "block", md: "none" } }}
        PaperProps={{
          sx: {
            width: "min(88vw, 320px)",
            pt: 2,
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Stack
          component="header"
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{ height: 80, px: 2.5 }}
        >
          <IconButton
            type="button"
            edge="start"
            color="inherit"
            onClick={() => setIsOpen(false)}
            aria-controls="mobile-menu"
            aria-label="Zamknij menu"
            aria-expanded={isOpen}
          >
            <MenuIcon />
          </IconButton>
          <Avatar sx={{ bgcolor: "primary.main", fontWeight: 800 }}>T</Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography component="p" variant="h6" noWrap fontWeight={800}>
              {/* TodoApp */}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              fontSize={24}
              fontWeight={700}
              noWrap
            >
              Panel zadań
            </Typography>
          </Box>
        </Stack>
        <Divider sx={{ mx: 2 }} />

        <Box component="nav" aria-label="Menu mobilne">
          <List>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <ListItemButton
                  key={item.path}
                  component={RouterLink}
                  to={item.path}
                  selected={isActive}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                  sx={{
                    minHeight: 48,
                    mx: 1,
                    borderRadius: 2,
                    "&.Mui-selected": {
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      "&:hover": { bgcolor: "primary.dark" },
                      "& .MuiListItemIcon-root": {
                        color: "primary.contrastText",
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 44 }}>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              );
            })}
          </List>
        </Box>

        <Box sx={{ flex: 1 }} />
        <Divider sx={{ mx: 2 }} />
        <Paper
          component="footer"
          variant="outlined"
          sx={{ m: 2, p: 1.5, borderRadius: 2 }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
              U
            </Avatar>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="body2" noWrap fontWeight={700}>
                Użytkownik
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                Online
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Drawer>
    </>
  );
}
