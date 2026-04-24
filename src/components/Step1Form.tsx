import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema } from "../schemas/schemas";

// =======================
// SCHEMA
// =======================

export type Step1Data = z.infer<typeof step1Schema>;

// =======================
// PASSWORD STRENGTH
// =======================
const getPasswordStrength = (password: string) => {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { label: "Słabe", width: "25%", color: "bg-red-500" };
  if (score <= 4)
    return { label: "Średnie", width: "66%", color: "bg-yellow-500" };
  return { label: "Silne", width: "100%", color: "bg-green-500" };
};

// =======================
// PROPS
// =======================
type Props = {
  defaultValues?: Step1Data;
  onNext: (data: Step1Data) => void;
  externalError?: string;
};

// =======================
// COMPONENT
// =======================
export const Step1Form = ({ defaultValues, onNext, externalError }: Props) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setError,
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: defaultValues || {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // backend error (409)
  React.useEffect(() => {
    if (externalError) {
      setError("email", { message: externalError });
    }
  }, [externalError, setError]);

  const passwordValue = watch("password") || "";
  const confirmPasswordValue = watch("confirmPassword") || "";

  const strength = getPasswordStrength(passwordValue);

  const passwordsMatch =
    passwordValue && confirmPasswordValue
      ? passwordValue === confirmPasswordValue
      : true;

  const onSubmit = (data: Step1Data) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {/* IMIĘ */}
      <div>
        <label htmlFor="firstName" className="text-gray-700">
          Imię *
        </label>
        <input
          id="firstName"
          required
          aria-required="true"
          aria-invalid={!!errors.firstName}
          aria-describedby={errors.firstName ? "firstName-error" : undefined}
          {...register("firstName")}
          className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
        />
        {errors.firstName && (
          <span
            id="firstName-error"
            role="alert"
            className="text-red-600 text-sm"
          >
            {errors.firstName.message}
          </span>
        )}
      </div>

      {/* NAZWISKO */}
      <div>
        <label htmlFor="lastName" className="text-gray-700">
          Nazwisko *
        </label>
        <input
          id="lastName"
          required
          aria-required="true"
          aria-invalid={!!errors.lastName}
          aria-describedby={errors.lastName ? "lastName-error" : undefined}
          {...register("lastName")}
          className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
        />
        {errors.lastName && (
          <span
            id="lastName-error"
            role="alert"
            className="text-red-600 text-sm"
          >
            {errors.lastName.message}
          </span>
        )}
      </div>

      {/* EMAIL */}
      <div>
        <label htmlFor="email" className="text-gray-700">
          Email *
        </label>
        <input
          id="email"
          type="email"
          required
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
          className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <span id="email-error" role="alert" className="text-red-600 text-sm">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* HASŁO */}
      <div>
        <label htmlFor="password" className="text-gray-700">
          Hasło *
        </label>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            required
            aria-required="true"
            aria-invalid={!!errors.password}
            aria-describedby={
              errors.password ? "password-error" : "password-hint"
            }
            {...register("password")}
            // Dodano [&::-ms-reveal]:hidden aby ukryć natywne oko przeglądarki
            className="w-full border px-3 py-2 rounded pr-10 focus:ring-2 focus:ring-blue-500 [&::-ms-reveal]:hidden"
          />

          <button
            type="button"
            aria-label="Pokaż lub ukryj hasło"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-2"
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        </div>

        {!errors.password && passwordValue && (
          <span
            id="password-hint"
            aria-live="polite"
            className="text-gray-700 text-sm"
          >
            Siła hasła: {strength.label}
          </span>
        )}

        {errors.password && (
          <span
            id="password-error-1"
            role="alert"
            className="text-red-600 text-sm"
          >
            {errors.password.message}
          </span>
        )}
      </div>

      {/* CONFIRM PASSWORD */}
      <div>
        <label htmlFor="confirmPassword" className="text-gray-700">
          Potwierdź hasło *
        </label>

        {/* Dodano relative wrapper i przycisk oka dla drugiego hasła */}
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            required
            aria-required="true"
            aria-invalid={!!errors.confirmPassword || !passwordsMatch}
            aria-describedby={
              errors.confirmPassword || !passwordsMatch
                ? "confirmPassword-error"
                : undefined
            }
            {...register("confirmPassword")}
            // Dodano [&::-ms-reveal]:hidden
            className="w-full border px-3 py-2 rounded pr-10 focus:ring-2 focus:ring-blue-500 [&::-ms-reveal]:hidden"
          />

          <button
            type="button"
            aria-label="Pokaż lub ukryj hasło"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-2 top-2"
          >
            {showConfirmPassword ? "🙈" : "👁"}
          </button>
        </div>

        {!passwordsMatch && (
          <span
            id="confirmPassword-error-2"
            role="alert"
            className="text-red-600 text-sm"
          >
            Hasła nie są zgodne
          </span>
        )}

        {errors.confirmPassword && (
          <span
            id="confirmPassword-error"
            role="alert"
            className="text-red-600 text-sm"
          >
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {isSubmitting ? "Wysyłanie…" : "Dalej"}
      </button>
    </form>
  );
};
