import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { FullFormData } from "../schemas/schemas";
import { AppButton } from "./common/AppButton";

type Step2Props = {
  onNext: () => void | Promise<void>;
  onBack: () => void;
};

export const Step2Form = ({ onNext, onBack }: Step2Props) => {
  const {
    control,
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<FullFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "categories",
  });

  const categoriesMessage =
    !Array.isArray(errors.categories) && errors.categories?.message
      ? errors.categories.message
      : "";

  return (
    <Stack
      component="form"
      onSubmit={(event) => {
        event.preventDefault();
        void onNext();
      }}
      spacing={3}
      noValidate
    >
      <FormControl component="fieldset" error={Boolean(categoriesMessage)}>
        <FormLabel component="legend">Kategorie *</FormLabel>

        <Stack spacing={1.5} sx={{ mt: 1 }}>
          {fields.map((field, index) => {
            const error = errors.categories?.[index]?.value;

            return (
              <Box key={field.id}>
                <Stack direction="row" spacing={1} alignItems="flex-start">
                  <TextField
                    id={`category-${index}`}
                    label={`Kategoria ${index + 1}`}
                    placeholder="Np. sport"
                    required
                    error={!!error}
                    helperText={error?.message || " "}
                    FormHelperTextProps={
                      error
                        ? { id: `category-${index}-error`, role: "alert" }
                        : undefined
                    }
                    inputProps={{
                      "aria-required": "true",
                      "aria-describedby": error
                        ? `category-${index}-error`
                        : undefined,
                    }}
                    fullWidth
                    {...register(`categories.${index}.value`)}
                  />

                  <AppButton
                    type="button"
                    iconOnly
                    tone="danger"
                    variant="text"
                    onClick={() => remove(index)}
                    aria-label={`Usuń kategorię ${index + 1}`}
                    sx={{ mt: 0.5 }}
                  >
                    <DeleteIcon />
                  </AppButton>
                </Stack>
              </Box>
            );
          })}
        </Stack>

        <AppButton
          type="button"
          variant="text"
          startIcon={<AddIcon />}
          onClick={() => append({ value: "" })}
          sx={{ alignSelf: "flex-start", mt: 1 }}
        >
          Dodaj kategorię
        </AppButton>

        {categoriesMessage && (
          <FormHelperText role="alert">{categoriesMessage}</FormHelperText>
        )}
      </FormControl>

      <FormControl component="fieldset">
        <FormLabel component="legend">Powiadomienia</FormLabel>
        <FormGroup>
          <Controller
            name="notifications.email"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.value}
                    onChange={(event) => field.onChange(event.target.checked)}
                  />
                }
                label="E-mail"
              />
            )}
          />

          <Controller
            name="notifications.push"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={field.value}
                    onChange={(event) => field.onChange(event.target.checked)}
                  />
                }
                label="Push"
              />
            )}
          />
        </FormGroup>
      </FormControl>

      <Controller
        name="newsletter"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={Boolean(field.value)}
                onChange={(event) => field.onChange(event.target.checked)}
              />
            }
            label="Newsletter (opcjonalne)"
          />
        )}
      />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
        <AppButton type="button" variant="outlined" tone="neutral" onClick={onBack} fullWidth>
          Wstecz
        </AppButton>

        <AppButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
          fullWidth
        >
          {isSubmitting ? "Zapisywanie..." : "Dalej"}
        </AppButton>
      </Stack>
    </Stack>
  );
};
