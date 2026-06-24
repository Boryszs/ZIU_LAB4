import { forwardRef, type ReactNode } from "react";
import MuiButton, {
  type ButtonProps as MuiButtonProps,
} from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import type { SxProps, Theme } from "@mui/material/styles";

type AppButtonVariant = NonNullable<MuiButtonProps["variant"]> | "soft";
type AppButtonTone = "primary" | "neutral" | "success" | "danger" | "link";
type AppButtonRadius = "default" | "pill";

interface AppButtonProps
  extends Omit<
    MuiButtonProps,
    "color" | "endIcon" | "startIcon" | "variant"
  > {
  variant?: AppButtonVariant;
  tone?: AppButtonTone;
  radius?: AppButtonRadius;
  compact?: boolean;
  iconOnly?: boolean;
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const toneColor: Record<AppButtonTone, MuiButtonProps["color"]> = {
  primary: "primary",
  neutral: "inherit",
  success: "success",
  danger: "error",
  link: "primary",
};

const getButtonSx = ({
  compact,
  iconOnly,
  radius,
  tone,
  variant,
}: Required<
  Pick<AppButtonProps, "compact" | "iconOnly" | "radius" | "tone" | "variant">
>) => {
  return (theme: Theme) => ({
    borderRadius: iconOnly || radius === "pill" ? 999 : theme.shape.borderRadius,
    whiteSpace: "nowrap",
    ...(compact && {
      minHeight: 40,
      px: 1.5,
      py: 0.5,
    }),
    ...(iconOnly && {
      minWidth: compact ? 40 : 44,
      width: compact ? 40 : 44,
      px: 0,
    }),
    ...(variant === "soft" && {
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.text.primary,
      "&:hover": {
        backgroundColor: theme.palette.action.selected,
      },
    }),
    ...(tone === "link" && {
      minWidth: "auto",
      px: compact ? 0.5 : 1,
      textDecoration: "underline",
      textUnderlineOffset: 4,
      "&:hover": {
        textDecoration: "underline",
      },
    }),
  });
};

export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  function AppButton(
    {
      children,
      compact = false,
      disabled,
      endIcon,
      iconOnly = false,
      loading = false,
      radius = "default",
      size = "medium",
      startIcon,
      sx,
      tone = "primary",
      type = "button",
      variant = "contained",
      ...props
    },
    ref,
  ) {
    const muiVariant = variant === "soft" ? "text" : variant;
    const resolvedStartIcon = loading ? (
      <CircularProgress aria-hidden="true" color="inherit" size={18} />
    ) : (
      startIcon
    );
    const buttonSx = [
      getButtonSx({ compact, iconOnly, radius, tone, variant }),
      ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
    ] as SxProps<Theme>;

    return (
      <MuiButton
        {...props}
        ref={ref}
        aria-busy={loading || props["aria-busy"] || undefined}
        color={toneColor[tone]}
        disabled={disabled || loading}
        endIcon={endIcon}
        size={size}
        startIcon={iconOnly ? undefined : resolvedStartIcon}
        sx={buttonSx}
        type={type}
        variant={muiVariant}
      >
        {iconOnly ? resolvedStartIcon || children : children}
      </MuiButton>
    );
  },
);
