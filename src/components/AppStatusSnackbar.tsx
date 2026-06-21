import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import type { AppStatus } from "../types/todo.types";

interface AppStatusSnackbarProps {
  status: AppStatus;
  onClose: () => void;
}

export default function AppStatusSnackbar({
  status,
  onClose,
}: AppStatusSnackbarProps) {
  const severity =
    status.type === "error"
      ? "error"
      : status.type === "success"
        ? "success"
        : "info";
  const isLoading = status.type === "loading";

  return (
    <Snackbar
      open
      autoHideDuration={isLoading ? null : 4000}
      onClose={isLoading ? undefined : onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={isLoading ? undefined : onClose}
        severity={severity}
        icon={
          isLoading ? <CircularProgress size={18} color="inherit" /> : undefined
        }
        variant="filled"
        role={status.type === "error" ? "alert" : "status"}
        sx={{ width: "100%", fontWeight: 700 }}
        aria-live={status.type === "error" ? "assertive" : "polite"}
      >
        {status.message}
      </Alert>
    </Snackbar>
  );
}
