import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTheme } from "../../context/TodoContext";

export default function AppHeader() {
  const { theme, setTheme } = useTheme();

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        width: "calc(100% - 240px)",
        ml: "240px",
        borderBottom: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Toolbar sx={{ minHeight: 72, display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="overline" color="primary.main">
            TodoApp
          </Typography>
          <Typography variant="h5" fontWeight={700}>
            Dashboard
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            color="primary"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Przelacz motyw"
          >
            {theme === "light" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </IconButton>
          <IconButton aria-label="Powiadomienia">
            <Badge color="error" variant="dot">
              <NotificationsNoneOutlinedIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
