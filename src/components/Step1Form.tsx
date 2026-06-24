import React from "react";
import { useFormContext } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FullFormData } from "../schemas/schemas";
import { appColors } from "../theme/colors";

const getPasswordStrength = (password: string) => {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { label: "Słabe", value: 25, color: appColors.passwordStrength.weak };
  if (score <= 4) return { label: "Średnie", value: 66, color: appColors.passwordStrength.medium };
  return { label: "Silne", value: 100, color: appColors.passwordStrength.strong };
};

type Props = {
  onNext: () => void | Promise<void>;
};

export const Step1Form = ({ onNext }: Props) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const {
    register,
    watch,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useFormContext<FullFormData>();

  const passwordValue = watch("password") || "";
  const confirmPasswordValue = watch("confirmPassword") || "";
  const strength = getPasswordStrength(passwordValue);
  const passwordsMatch =
    passwordValue && confirmPasswordValue
      ? passwordValue === confirmPasswordValue
      : true;
  const passwordDescribedBy = errors.password
    ? "password-error"
    : passwordValue
      ? "password-hint"
      : undefined;
  const confirmPasswordDescribedBy =
    [
      !passwordsMatch ? "confirmPassword-error-2" : undefined,
      errors.confirmPassword ? "confirmPassword-error" : undefined,
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <Stack
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        void onNext();
      }}
      spacing={2}
      noValidate
    >
      <TextField
        id="firstName"
        label="Imię"
        required
        error={!!errors.firstName}
        helperText={errors.firstName?.message || " "}
        FormHelperTextProps={errors.firstName ? { id: "firstName-error", role: "alert" } : undefined}
        inputProps={{
          "aria-required": "true",
          "aria-describedby": errors.firstName ? "firstName-error" : undefined,
        }}
        fullWidth
        {...register("firstName")}
      />

      <TextField
        id="lastName"
        label="Nazwisko"
        required
        error={!!errors.lastName}
        helperText={errors.lastName?.message || " "}
        FormHelperTextProps={errors.lastName ? { id: "lastName-error", role: "alert" } : undefined}
        inputProps={{
          "aria-required": "true",
          "aria-describedby": errors.lastName ? "lastName-error" : undefined,
        }}
        fullWidth
        {...register("lastName")}
      />

      <TextField
        id="email"
        type="email"
        label="Email"
        required
        error={!!errors.email}
        helperText={errors.email?.message || " "}
        FormHelperTextProps={errors.email ? { id: "email-error", role: "alert" } : undefined}
        inputProps={{
          "aria-required": "true",
          "aria-describedby": errors.email ? "email-error" : undefined,
        }}
        fullWidth
        {...register("email", {
          onChange: () => clearErrors("email"),
        })}
      />

      <Box>
        <TextField
          id="password"
          type={showPassword ? "text" : "password"}
          label="Hasło"
          required
          error={!!errors.password}
          helperText={errors.password?.message || " "}
          FormHelperTextProps={errors.password ? { id: "password-error", role: "alert" } : undefined}
          inputProps={{
            "aria-required": "true",
            "aria-describedby": passwordDescribedBy,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  type="button"
                  size="small"
                  variant="text"
                  aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Ukryj" : "Pokaż"}
                </Button>
              </InputAdornment>
            ),
          }}
          fullWidth
          {...register("password")}
        />

        {!errors.password && passwordValue && (
          <Box id="password-hint" aria-live="polite" sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Siła hasła: {strength.label}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={strength.value}
              sx={{
                mt: 0.75,
                height: 8,
                borderRadius: 999,
                bgcolor: "action.hover",
                "& .MuiLinearProgress-bar": { bgcolor: strength.color },
              }}
            />
          </Box>
        )}
      </Box>

      <TextField
        id="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        label="Potwierdź hasło"
        required
        error={!!errors.confirmPassword || !passwordsMatch}
        helperText={
          !passwordsMatch
            ? "Hasła nie są zgodne"
            : errors.confirmPassword?.message || " "
        }
        FormHelperTextProps={
          !passwordsMatch || errors.confirmPassword
            ? {
                id: !passwordsMatch
                  ? "confirmPassword-error-2"
                  : "confirmPassword-error",
                role: "alert",
              }
            : undefined
        }
        inputProps={{
          "aria-required": "true",
          "aria-describedby": confirmPasswordDescribedBy,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                type="button"
                size="small"
                variant="text"
                aria-label={showConfirmPassword ? "Ukryj hasło" : "Pokaż hasło"}
                aria-pressed={showConfirmPassword}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? "Ukryj" : "Pokaż"}
              </Button>
            </InputAdornment>
          ),
        }}
        fullWidth
        {...register("confirmPassword")}
      />

      <Button type="submit" variant="contained" disabled={isSubmitting} aria-busy={isSubmitting}>
        {isSubmitting ? "Wysyłanie..." : "Dalej"}
      </Button>
    </Stack>
  );
};
