import type { ElementType } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { drawerWidth } from "./DashboardLayout";

export interface NavItem {
  label: string;
  icon: ElementType;
  path: string;
}

interface SidebarProps {
  navItems: NavItem[];
}

export default function Sidebar({ navItems }: SidebarProps) {
  const location = useLocation();

  return (
    <Drawer
      component="aside"
      variant="permanent"
      aria-label="Panel bocznej nawigacji"
      sx={{
        display: { xs: "none", md: "block" },
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        },
      }}
    >
      <Stack component="header" direction="row" spacing={1.5} alignItems="center" sx={{ height: 80, px: 2.5 }}>
        <Avatar sx={{ bgcolor: "primary.main", fontWeight: 800 }}>T</Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography component="h1" variant="h6" noWrap fontWeight={800}>
            {/* TodoApp */}
          </Typography>
          <Typography variant="caption" color="text.secondary" fontSize={24} fontWeight={700} noWrap>
            Panel zadań
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ mx: 2.5 }} />

      <Box component="nav" aria-label="Główna nawigacja" sx={{ px: 1.5, py: 2 }}>
        <List disablePadding>
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
                sx={{
                  minHeight: 48,
                  borderRadius: 2,
                  mb: 0.5,
                  fontWeight: 700,
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
                  <Icon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontWeight: 700 }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      <Box sx={{ flex: 1 }} />

      <Paper variant="outlined" sx={{ m: 2, p: 1.5, borderRadius: 2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>U</Avatar>
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
  );
}
