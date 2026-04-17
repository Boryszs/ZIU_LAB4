import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTheme } from "../../context/TodoContext";

const DRAWER_WIDTH = 240;

export default function AppHeader({
  title = "Dashboard",
  activeSection,
  onSectionChange,
  navItems,
}: any) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { xs: "100%", md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { xs: 0, md: `${DRAWER_WIDTH}px` },
          bgcolor: "background.paper",
          color: "text.primary",
          borderBottom: "1px solid",
          borderColor: "divider",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* LEFT */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={() => setIsOpen((prev) => !prev)}
              sx={{ display: { xs: "flex", md: "none" } }}
              edge="start"
              color="inherit"
              aria-label="otwórz menu"
            >
              <MenuIcon />
            </IconButton>

            <Box>
              <Typography variant="overline" color="primary.main">
                TodoApp
              </Typography>
              <Typography variant="h5" fontWeight={700}>
                {title}
              </Typography>
            </Box>
          </Box>

          {/* RIGHT */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              edge="start"
              color="inherit"
              aria-label="dark mode"
            >
              {theme === "light" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>

            <IconButton edge="start" color="inherit" aria-label="otwórz menu">
              <Badge color="error" variant="dot">
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* 📱 MOBILE MENU */}
      {isOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 72,
            left: 0,
            width: "100%",
            bgcolor: "background.paper",
            zIndex: 1200,
            boxShadow: 2,
          }}
        >
          <List>
            {navItems.map((item: any) => {
              const Icon = item.icon;

              return (
                <ListItemButton
                  key={item.section}
                  selected={activeSection === item.section}
                  onClick={() => onSectionChange(item.section)}
                >
                  <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              );
            })}
          </List>

          {/* <List>
            <ListItemButton>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Zadania" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Ustawienia" />
            </ListItemButton>
          </List> */}
        </Box>
      )}
    </>
  );
}
