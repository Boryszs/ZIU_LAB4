import React, { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { trackFormSubmit } from "../analytics";
import { FullFormData } from "../schemas/schemas";

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
    register,
    handleSubmit,
    setError,
    clearErrors,
    control,
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
        message: "Ten adres e-mail jest juz zarejestrowany",
      });
      goToStep1();
      return;
    }

    if (response.status === 500) {
      trackFormSubmit("registration", "server_error");
      setError("root.serverError", {
        type: "server",
        message: "Blad serwera, sproboj ponownie",
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <section aria-label="Podsumowanie danych" className="text-sm space-y-2">
        <p>
          <strong>Imie:</strong> {values.firstName}
        </p>
        <p>
          <strong>Nazwisko:</strong> {values.lastName}
        </p>
        <p>
          <strong>Email:</strong> {values.email}
        </p>
        <p>
          <strong>Kategorie:</strong>{" "}
          {values.categories?.map((category) => category.value).join(", ")}
        </p>
        <p>
          <strong>Powiadomienia:</strong>{" "}
          {[
            values.notifications?.email && "Email",
            values.notifications?.push && "Push",
          ]
            .filter(Boolean)
            .join(", ") || "Brak"}
        </p>
        <p>
          <strong>Newsletter:</strong> {values.newsletter ? "Tak" : "Nie"}
        </p>
      </section>

      <div>
        <label htmlFor="rodo" className="flex items-center gap-2">
          <input
            id="rodo"
            type="checkbox"
            required
            aria-required="true"
            aria-invalid={!!errors.rodo}
            aria-describedby={errors.rodo ? "rodo-error" : undefined}
            {...register("rodo")}
          />
          Akceptuje regulamin i polityke prywatnosci *
        </label>

        {errors.rodo && (
          <span id="rodo-error" role="alert" className="text-red-600 text-sm">
            {errors.rodo.message}
          </span>
        )}
      </div>

      {errors.root?.serverError && (
        <div role="alert" aria-live="assertive" className="text-red-600 text-sm">
          {errors.root.serverError.message}
        </div>
      )}

      {successMessage && (
        <div
          role="status"
          aria-live="polite"
          className="rounded border border-green-300 bg-green-50 px-3 py-2 text-sm font-medium text-green-800"
        >
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleBack}
          className="min-h-[44px] w-full rounded border border-gray-300 py-2 hover:bg-gray-100"
        >
          Wstecz
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="min-h-[44px] w-full rounded bg-green-700 py-2 text-white hover:bg-green-800"
        >
          {isSubmitting ? "Rejestrowanie..." : "Zarejestruj sie"}
        </button>
      </div>
    </form>
  );
};
