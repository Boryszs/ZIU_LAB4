import React from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { FullFormData } from "../schemas/schemas";

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

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void onNext();
      }}
      className="space-y-6"
      noValidate
    >
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-gray-700 mb-2">
          Kategorie *
        </legend>

        {fields.map((field, index) => {
          const error = errors.categories?.[index]?.value;

          return (
            <div key={field.id} className="mb-2">
              <div className="flex gap-2">
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
                  className="min-h-[44px] min-w-[44px] rounded bg-red-700 px-3 py-2 text-white transition hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-200"
                >
                  X
                </button>
              </div>

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
          className="inline-flex min-h-[44px] items-center rounded px-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-100"
        >
          + Dodaj kategorię
        </button>

        {!Array.isArray(errors.categories) && errors.categories?.message && (
          <span role="alert" className="text-red-600 text-sm block mt-1">
            {errors.categories.message}
          </span>
        )}
      </fieldset>

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
              />
              Push
            </label>
          )}
        />
      </fieldset>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("newsletter")}
          />
          Newsletter (opcjonalne)
        </label>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={onBack}
          className="min-h-[44px] w-full rounded border border-gray-300 py-2 hover:bg-gray-100"
        >
          Wstecz
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="min-h-[44px] w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          {isSubmitting ? "Zapisywanie..." : "Dalej"}
        </button>
      </div>
    </form>
  );
};
