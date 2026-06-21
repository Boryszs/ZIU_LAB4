import { Link as RouterLink, useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import type { NavItem } from "./Sidebar";

interface MobileNavigationDrawerProps {
  navItems: NavItem[];
  open: boolean;
  onClose: () => void;
}

export default function MobileNavigationDrawer({
  navItems,
  open,
  onClose,
}: MobileNavigationDrawerProps) {
  const location = useLocation();

  return (
    <Drawer
      id="mobile-menu"
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: false }}
      sx={{ display: { xs: "block", md: "none" } }}
      slotProps={{
        paper: {
          sx: {
            width: "min(88vw, 320px)",
            pt: 2,
            display: "flex",
            flexDirection: "column",
          },
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
          onClick={onClose}
          aria-controls="mobile-menu"
          aria-label="Zamknij menu"
          aria-expanded={open}
        >
          <MenuIcon />
        </IconButton>
        <Avatar sx={{ bgcolor: "primary.main", fontWeight: 800 }}>T</Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography component="p" variant="h6" noWrap fontWeight={800}>
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
                onClick={onClose}
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
  );
}
