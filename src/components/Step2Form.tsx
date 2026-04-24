import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema } from "../schemas/schemas";

// =======================
// SCHEMA
// =======================

type Step2Data = z.infer<typeof step2Schema>;

// =======================
// COMPONENT
// =======================

type Step2Props = {
  defaultValues?: Step2Data;
  onNext: (data: Step2Data) => void;
  onBack: () => void;
};

export const Step2Form = ({ onNext, onBack, defaultValues }: Step2Props) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: defaultValues || {
      categories: [{ value: "" }],
      notifications: {
        email: false,
        push: false,
      },
      newsletter: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "categories",
  });

  const onSubmit = async (data: Step2Data) => {
    await new Promise((r) => setTimeout(r, 1000));
    onNext?.(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* ======================= */}
      {/* CATEGORIES */}
      {/* ======================= */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-gray-700 mb-2">
          Kategorie *
        </legend>
        {fields.map((field, index) => {
          const error = errors.categories?.[index]?.value;

          return (
            <div key={field.id} className="flex gap-2 mb-2">
              <input
                id={`category-${index}`}
                aria-label={`Kategoria ${index + 1}`}
                required
                aria-required="true"
                aria-invalid={!!error}
                aria-describedby={error ? `category-${index}-error` : undefined}
                {...register(`categories.${index}.value`)}
                className="flex-1 px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Np. sport"
              />

              <button
                type="button"
                onClick={() => remove(index)}
                aria-label={`Usuń kategorię ${index + 1}`}
                className="px-3 py-2 bg-red-600 text-white rounded"
              >
                ✕
              </button>

              {error && (
                <span
                  id={`category-${index}-error`}
                  role="alert"
                  className="text-red-600 text-sm block"
                >
                  {error.message}
                </span>
              )}
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => append({ value: "" })}
          className="text-blue-600 text-sm"
        >
          + Dodaj kategorię
        </button>

        {errors.categories && typeof errors.categories.message === "string" && (
          <span role="alert" className="text-red-600 text-sm">
            {errors.categories.message}
          </span>
        )}
      </fieldset>

      {/* ======================= */}
      {/* NOTIFICATIONS */}
      {/* ======================= */}
      <fieldset>
        <legend className="text-sm font-medium text-gray-700">
          Powiadomienia
        </legend>

        <Controller
          name="notifications.email"
          control={control}
          render={({ field }) => (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={field.value}
                onChange={field.onChange}
                aria-label="Powiadomienia e-mail"
              />
              E-mail
            </label>
          )}
        />

        <Controller
          name="notifications.push"
          control={control}
          render={({ field }) => (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={field.value}
                onChange={field.onChange}
                aria-label="Powiadomienia push"
              />
              Push
            </label>
          )}
        />
      </fieldset>

      {/* ======================= */}
      {/* NEWSLETTER */}
      {/* ======================= */}
      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("newsletter")}
            aria-label="Zapisz się do newslettera"
          />
          Newsletter (opcjonalne)
        </label>
      </div>

      {/* ======================= */}
      {/* BUTTON */}
      {/* ======================= */}
      <div className="flex gap-2">
        {/* BACK */}
        <button
          type="button"
          onClick={() => onBack()}
          className="w-1/2 border border-gray-300 py-2 rounded hover:bg-gray-100"
        >
          Wstecz
        </button>

        {/* NEXT */}
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="w-1/2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? "Zapisywanie…" : "Dalej"}
        </button>
      </div>
    </form>
  );
};
