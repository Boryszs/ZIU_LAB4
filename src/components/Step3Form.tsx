import React from "react";
import { useForm } from "react-hook-form";
import { Step1Data, Step2Data } from "../schemas/schemas";

// =======================
// TYPES
// =======================

type Step3Props = {
  step1: Step1Data;
  step2: Step2Data;
  goToStep1: (error?: string) => void;
  onBack: () => void;
  defaultValues?: { rodo: boolean };
};

// =======================
// FAKE API
// =======================
const fakeRegister = async () => {
  await new Promise((r) => setTimeout(r, 1000));

  const rand = Math.random();

  if (rand < 0.25) return { status: 409 };
  if (rand < 0.5) return { status: 500 };
  return { status: 200 };
};

// =======================
// COMPONENT
// =======================
export const Step3Form = ({
  step1,
  step2,
  goToStep1,
  onBack,
  defaultValues,
}: Step3Props) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<{ rodo: boolean }>({
    defaultValues: defaultValues || { rodo: false },
  });

  const onSubmit = async (data: any) => {
    const payload = {
      ...step1,
      ...step2,
      rodo: data.rodo,
    };

    console.log("WYSYŁANE DANE FORMULARZA:", payload);

    const response = await fakeRegister();

    if (response.status === 409) {
      goToStep1("Ten adres e-mail jest już zajęty");
      return;
    }

    if (response.status === 500) {
      setError("root.serverError", {
        message: "Błąd serwera, spróbuj ponownie",
      });
      return;
    }

    alert("Rejestracja zakończona sukcesem 🎉");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* READ ONLY */}
      <section aria-label="Podsumowanie danych" className="text-sm space-y-2">
        <p>
          <strong>Imię:</strong> {step1.firstName}
        </p>
        <p>
          <strong>Nazwisko:</strong> {step1.lastName}
        </p>
        <p>
          <strong>Email:</strong> {step1.email}
        </p>

        <p>
          <strong>Kategorie:</strong>{" "}
          {step2.categories.map((c) => c.value).join(", ")}
        </p>

        <p>
          <strong>Powiadomienia:</strong>{" "}
          {[
            step2.notifications.email && "Email",
            step2.notifications.push && "Push",
          ]
            .filter(Boolean)
            .join(", ") || "Brak"}
        </p>

        <p>
          <strong>Newsletter:</strong> {step2.newsletter ? "Tak" : "Nie"}
        </p>
      </section>

      {/* RODO */}
      <div>
        <label htmlFor="rodo" className="flex items-center gap-2">
          <input
            id="rodo"
            type="checkbox"
            required
            aria-required="true"
            aria-invalid={!!errors.rodo}
            aria-describedby={errors.rodo ? "rodo-error" : undefined}
            {...register("rodo", {
              required: "Musisz zaakceptować RODO",
            })}
          />
          Akceptuję regulamin i politykę prywatności *
        </label>

        {errors.rodo && (
          <span id="rodo-error" role="alert" className="text-red-600 text-sm">
            {errors.rodo.message}
          </span>
        )}
      </div>

      {/* SERVER ERROR */}
      {errors.root?.serverError && (
        <div role="alert" className="text-red-600 text-sm">
          {errors.root.serverError.message}
        </div>
      )}

      {/* BUTTONS */}
      <div className="flex gap-2">
        {/* BACK */}
        <button
          type="button"
          onClick={() => onBack()}
          className="w-1/2 border border-gray-300 py-2 rounded hover:bg-gray-100"
        >
          Wstecz
        </button>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="w-1/2 bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {isSubmitting ? "Rejestrowanie…" : "Zarejestruj się"}
        </button>
      </div>
    </form>
  );
};
