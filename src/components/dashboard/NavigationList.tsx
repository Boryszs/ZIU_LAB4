import type { ElementType } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export interface NavItem {
  label: string;
  icon: ElementType;
  path: string;
}

interface NavigationListProps {
  navItems: NavItem[];
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
}

export function NavigationList({
  navItems,
  onNavigate,
  variant = "desktop",
}: NavigationListProps) {
  const location = useLocation();
  const isDesktop = variant === "desktop";

  return (
    <List disablePadding={isDesktop}>
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
            onClick={onNavigate}
            sx={{
              minHeight: 48,
              borderRadius: 2,
              ...(isDesktop
                ? { mb: 0.5, fontWeight: 700 }
                : { mx: 1 }),
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
              <Icon fontSize={isDesktop ? "small" : undefined} />
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={
                isDesktop ? { fontWeight: 700 } : undefined
              }
            />
          </ListItemButton>
        );
      })}
    </List>
  );
}
