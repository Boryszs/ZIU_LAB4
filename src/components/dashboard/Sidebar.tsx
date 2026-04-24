import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Avatar,
  Box,
} from "@mui/material";

const DRAWER_WIDTH = 240;

export type DashboardSection = "dashboard" | "tasks" | "settings" | "login";

export default function Sidebar({
  activeSection,
  onSectionChange,
  navItems,
}: any) {
  return (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        width: DRAWER_WIDTH,
        height: "100vh",
        position: "fixed", // 🔥 klucz
        top: 0,
        left: 0,
        bgcolor: "primary.main",
        color: "white",
      }}
    >
      <Toolbar>
        <Typography variant="h6" fontWeight={700}>
          TodoApp
        </Typography>
      </Toolbar>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

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

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar>U</Avatar>
        <Typography variant="body2">Uzytkownik</Typography>
      </Box>
    </Box>
  );
}
