export type AppThemeMode = "light" | "dark";

export type ModeColors = {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  borderStrong: string;
  error: string;
  success: string;
  warning: string;
  hover: string;
  selected: string;
};

export const appColors: {
  light: ModeColors;
  dark: ModeColors;
  common: {
    white: string;
  };
  action: {
    disabled: Record<AppThemeMode, string>;
    disabledBackground: Record<AppThemeMode, string>;
  };
  interaction: {
    link: string;
    linkHover: string;
    controlActive: string;
    controlText: string;
    selectedButtonHover: Record<AppThemeMode, string>;
  };
  dashboard: Record<
    "total" | "completed" | "pending",
    {
      color: string;
      bgColor: string;
    }
  >;
  priority: Record<
    "low" | "medium" | "high",
    {
      color: string;
      borderColor: string;
      bgcolor: string;
    }
  >;
  passwordStrength: Record<"weak" | "medium" | "strong", string>;
  alert: {
    info: Record<
      AppThemeMode,
      {
        border: string;
        background: string;
        text: string;
        icon: string;
      }
    >;
  };
  shadow: {
    consent: string;
    todoInfoLight: string;
    todoInfoDark: string;
  };
};

export const tailwindColors: Record<string, unknown>;

export function getModeColors(mode: AppThemeMode): ModeColors;
