const modeColors = {
  light: {
    primary: "#01579B",
    primaryDark: "#003F73",
    primaryLight: "#B9DCF4",
    background: "#EAF4FB",
    surface: "#FFFFFF",
    contrastText: "#FFFFFF",
    textPrimary: "#0F172A",
    textSecondary: "#334155",
    border: "#9AB6C9",
    borderStrong: "#6F91A8",
    error: "#B42318",
    success: "#00695C",
    warning: "#8A5A00",
    hover: "rgba(1, 87, 155, 0.10)",
    selected: "rgba(1, 87, 155, 0.16)",
  },
  dark: {
    primary: "#4EA3E8",
    primaryDark: "#B9DCF4",
    primaryLight: "#0B2A44",
    background: "#020617",
    surface: "#0B1220",
    contrastText: "#020617",
    textPrimary: "#F8FAFC",
    textSecondary: "#D7E3EF",
    border: "#3E5870",
    borderStrong: "#6E8AA3",
    error: "#F87171",
    success: "#5EEAD4",
    warning: "#FBBF24",
    hover: "rgba(78, 163, 232, 0.16)",
    selected: "rgba(78, 163, 232, 0.24)",
  },
};

const appColors = {
  ...modeColors,
  common: {
    white: "#FFFFFF",
  },
  action: {
    disabled: {
      light: "rgba(51, 65, 85, 0.42)",
      dark: "rgba(215, 227, 239, 0.42)",
    },
    disabledBackground: {
      light: "rgba(51, 65, 85, 0.14)",
      dark: "rgba(215, 227, 239, 0.14)",
    },
  },
  interaction: {
    link: "#1565C0",
    linkHover: "#0D47A1",
    controlActive: "#0056B3",
    controlText: "#595959",
    selectedButtonHover: {
      light: modeColors.light.primaryDark,
      dark: "#2F86CC",
    },
  },
  dashboard: {
    total: {
      color: "#014F86",
      bgColor: "#C7E0F4",
    },
    completed: {
      color: "#005C4B",
      bgColor: "#BFE7D7",
    },
    pending: {
      color: "#7A3E00",
      bgColor: "#F1CF9D",
    },
  },
  priority: {
    low: {
      color: "#1E293B",
      borderColor: "#64748B",
      bgcolor: "#E2E8F0",
    },
    medium: {
      color: "#6B3A00",
      borderColor: "#B45309",
      bgcolor: "#F6D7A8",
    },
    high: {
      color: "#7F1D1D",
      borderColor: "#B91C1C",
      bgcolor: "#F4B4B4",
    },
  },
  passwordStrength: {
    weak: "#C62828",
    medium: modeColors.light.warning,
    strong: "#2E7D32",
  },
  alert: {
    info: {
      light: {
        border: "#93C5FD",
        background: "#EFF6FF",
        text: "#1E3A8A",
        icon: "#2563EB",
      },
      dark: {
        border: "#2563EB",
        background: "#0B2545",
        text: "#DBEAFE",
        icon: "#60A5FA",
      },
    },
  },
  shadow: {
    consent: "0 -8px 24px rgba(15, 23, 42, 0.14)",
    todoInfoLight: "0 8px 24px rgba(30, 64, 175, 0.08)",
    todoInfoDark: "0 8px 24px rgba(0, 0, 0, 0.22)",
  },
};

const tailwindColors = {
  common: {
    white: appColors.common.white,
  },
  app: {
    primary: modeColors.light.primary,
    primaryDark: modeColors.light.primaryDark,
    primaryLight: modeColors.light.primaryLight,
    contrastText: modeColors.light.contrastText,
    background: modeColors.light.background,
    surface: modeColors.light.surface,
    hover: modeColors.light.hover,
    selected: modeColors.light.selected,
    border: modeColors.light.border,
    borderStrong: modeColors.light.borderStrong,
    text: {
      primary: modeColors.light.textPrimary,
      secondary: modeColors.light.textSecondary,
    },
  },
  appDark: {
    primary: modeColors.dark.primary,
    primaryDark: modeColors.dark.primaryDark,
    primaryLight: modeColors.dark.primaryLight,
    contrastText: modeColors.dark.contrastText,
    background: modeColors.dark.background,
    surface: modeColors.dark.surface,
    hover: modeColors.dark.hover,
    selected: modeColors.dark.selected,
    border: modeColors.dark.border,
    borderStrong: modeColors.dark.borderStrong,
    text: {
      primary: modeColors.dark.textPrimary,
      secondary: modeColors.dark.textSecondary,
    },
  },
  link: {
    DEFAULT: appColors.interaction.link,
    hover: appColors.interaction.linkHover,
  },
  control: {
    active: appColors.interaction.controlActive,
    text: appColors.interaction.controlText,
  },
};

const getModeColors = (mode) => appColors[mode];

module.exports = {
  appColors,
  getModeColors,
  tailwindColors,
};
