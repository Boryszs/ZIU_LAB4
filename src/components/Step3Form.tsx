import React, { useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { trackFormSubmit } from "../analytics";
import { FullFormData } from "../schemas/schemas";
import { AppButton } from "./common/AppButton";

type Step3Props = {
  goToStep1: () => void;
  onBack: () => void;
  onComplete: () => void;
};

const fakeRegister = async () => {
  await new Promise((r) => setTimeout(r, 1000));

  const rand = Math.random();

  if (rand < 0.25) return { status: 409 };
  if (rand < 0.5) return { status: 500 };
  return { status: 200 };
};

export const Step3Form = ({ goToStep1, onBack, onComplete }: Step3Props) => {
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useFormContext<FullFormData>();

  const values = useWatch({ control });
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async () => {
    setSuccessMessage("");
    clearErrors("root.serverError");

    const response = await fakeRegister();

    if (response.status === 409) {
      trackFormSubmit("registration", "email_conflict");
      setError("email", {
        type: "server",
        message: "Ten adres e-mail jest już zarejestrowany",
      });
      goToStep1();
      return;
    }

    if (response.status === 500) {
      trackFormSubmit("registration", "server_error");
      setError("root.serverError", {
        type: "server",
        message: "Błąd serwera, spróbuj ponownie",
      });
      return;
    }

    trackFormSubmit("registration", "success");
    onComplete();
    setSuccessMessage("Rejestracja zakończona sukcesem.");
  };

  const handleBack = () => {
    setSuccessMessage("");
    onBack();
  };

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={3} noValidate>
      <Box component="section" aria-label="Podsumowanie danych">
        <Stack spacing={1.25} divider={<Divider flexItem />}>
          <Typography variant="body2">
            <strong>Imię:</strong> {values.firstName}
          </Typography>
          <Typography variant="body2">
            <strong>Nazwisko:</strong> {values.lastName}
          </Typography>
          <Typography variant="body2">
            <strong>Email:</strong> {values.email}
          </Typography>
          <Typography variant="body2">
            <strong>Kategorie:</strong>{" "}
            {values.categories?.map((category) => category.value).join(", ")}
          </Typography>
          <Typography variant="body2">
            <strong>Powiadomienia:</strong>{" "}
            {[
              values.notifications?.email && "Email",
              values.notifications?.push && "Push",
            ]
              .filter(Boolean)
              .join(", ") || "Brak"}
          </Typography>
          <Typography variant="body2">
            <strong>Newsletter:</strong> {values.newsletter ? "Tak" : "Nie"}
          </Typography>
        </Stack>
      </Box>

      <Box>
        <Controller
          name="rodo"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  id="rodo"
                  required
                  checked={Boolean(field.value)}
                  onChange={(event) => field.onChange(event.target.checked)}
                  inputProps={{
                    "aria-required": "true",
                    "aria-invalid": Boolean(errors.rodo),
                    "aria-describedby": errors.rodo ? "rodo-error" : undefined,
                  }}
                />
              }
              label="Akceptuję regulamin i politykę prywatności *"
            />
          )}
        />

        {errors.rodo && (
          <FormHelperText id="rodo-error" error role="alert">
            {errors.rodo.message}
          </FormHelperText>
        )}
      </Box>

      {errors.root?.serverError && (
        <Alert role="alert" severity="error">
          {errors.root.serverError.message}
        </Alert>
      )}

      {successMessage && (
        <Alert role="status" aria-live="polite" severity="success">
          {successMessage}
        </Alert>
      )}

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
        <AppButton type="button" variant="outlined" tone="neutral" onClick={handleBack} fullWidth>
          Wstecz
        </AppButton>

        <AppButton
          type="submit"
          variant="contained"
          tone="success"
          loading={isSubmitting}
          fullWidth
        >
          {isSubmitting ? "Rejestrowanie..." : "Zarejestruj się"}
        </AppButton>
      </Stack>
    </Stack>
  );
};
