import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { appColors } from "../../theme/colors";

export function TodoListEmptyState() {
  const infoAlert = appColors.alert.info;

  return (
    <Alert
      severity="info"
      role="status"
      aria-live="polite"
      sx={(theme) => ({
        mx: "auto",
        mt: 4,
        width: "100%",
        maxWidth: 700,
        alignItems: "center",
        fontSize: 12,
        border: "1px solid",
        borderColor: infoAlert[theme.palette.mode].border,
        borderRadius: 1,
        bgcolor: infoAlert[theme.palette.mode].background,
        color: infoAlert[theme.palette.mode].text,
        boxShadow:
          theme.palette.mode === "dark"
            ? appColors.shadow.todoInfoDark
            : appColors.shadow.todoInfoLight,
        px: { xs: 2, sm: 3 },
        "& .MuiAlert-icon": {
          color: infoAlert[theme.palette.mode].icon,
        },
        "& .MuiAlert-message": {
          width: "100%",
        },
      })}
    >
      <Typography component="p" fontWeight={700}>
        Brak zadań
      </Typography>
    </Alert>
  );
}
