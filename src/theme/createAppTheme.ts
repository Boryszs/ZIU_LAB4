import { createTheme } from "@mui/material/styles";
import { appColors, getModeColors } from "./colors";
import type { AppThemeMode } from "./colors";

export function createAppTheme(mode: AppThemeMode) {
  const colors = getModeColors(mode);

  return createTheme({
    palette: {
      mode,
      contrastThreshold: 4.5,
      primary: {
        main: colors.primary,
        dark: colors.primaryDark,
        light: colors.primaryLight,
        contrastText: appColors.common.white,
      },
      background: {
        default: colors.background,
        paper: colors.surface,
      },
      text: {
        primary: colors.textPrimary,
        secondary: colors.textSecondary,
      },
      divider: colors.border,
      error: {
        main: colors.error,
      },
      success: {
        main: colors.success,
      },
      warning: {
        main: colors.warning,
      },
      action: {
        hover: colors.hover,
        selected: colors.selected,
        disabled: appColors.action.disabled[mode],
        disabledBackground: appColors.action.disabledBackground[mode],
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          outlined: {
            borderColor: colors.border,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            minHeight: 44,
            textTransform: "none",
            fontWeight: 700,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: colors.borderStrong,
          },
          root: {
            backgroundColor: colors.surface,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.primary,
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: colors.textSecondary,
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: colors.textSecondary,
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            borderColor: colors.borderStrong,
            color: colors.textPrimary,
            "&.Mui-selected": {
              backgroundColor: colors.primary,
              color: appColors.common.white,
              "&:hover": {
                backgroundColor: appColors.interaction.selectedButtonHover[mode],
              },
            },
          },
        },
      },
    },
  });
}
