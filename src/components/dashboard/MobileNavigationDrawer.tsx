import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { AppButton } from "../common/AppButton";
import { NavigationList, type NavItem } from "./NavigationList";

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
        <AppButton
          type="button"
          iconOnly
          tone="neutral"
          variant="text"
          onClick={onClose}
          aria-controls="mobile-menu"
          aria-label="Zamknij menu"
          aria-expanded={open}
          sx={{ ml: -1 }}
        >
          <MenuIcon />
        </AppButton>
        <Avatar sx={{ bgcolor: "primary.main", color: "primary.contrastText", fontWeight: 800 }}>T</Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography component="p" variant="h6" noWrap fontWeight={800}>
            Panel zadań
          </Typography>
        </Box>
      </Stack>
      <Divider sx={{ mx: 2 }} />

      <Box component="nav" aria-label="Menu mobilne">
        <NavigationList
          navItems={navItems}
          onNavigate={onClose}
          variant="mobile"
        />
      </Box>

      <Box sx={{ flex: 1 }} />
      <Divider sx={{ mx: 2 }} />
      <Paper
        component="footer"
        variant="outlined"
        sx={{ m: 2, p: 1.5, borderRadius: 2 }}
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar sx={{ bgcolor: "primary.main", color: "primary.contrastText", width: 40, height: 40 }}>
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
