import React from "react";
import { useFormContext } from "react-hook-form";
import { FullFormData } from "../schemas/schemas";

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
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void onNext();
      }}
      className="space-y-4"
      noValidate
    >
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
          <span id="lastName-error" role="alert" className="text-red-600 text-sm">
            {errors.lastName.message}
          </span>
        )}
      </div>

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
          {...register("email", {
            onChange: () => clearErrors("email"),
          })}
          className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <span id="email-error" role="alert" className="text-red-600 text-sm">
            {errors.email.message}
          </span>
        )}
      </div>

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
            aria-describedby={passwordDescribedBy}
            {...register("password")}
            className="w-full border px-3 py-2 rounded pr-10 focus:ring-2 focus:ring-blue-500 [&::-ms-reveal]:hidden"
          />

          <button
            type="button"
            aria-label={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-600"
          >
            {showPassword ? "Ukryj" : "Pokaż"}
          </button>
        </div>

        {!errors.password && passwordValue && (
          <span
            id="password-hint"
            aria-live="polite"
            className="text-sm text-gray-700 dark:text-white"
          >
            Siła hasła: {strength.label}
          </span>
        )}

        {errors.password && (
          <span
            id="password-error"
            role="alert"
            className="text-red-600 text-sm"
          >
            {errors.password.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="text-gray-700">
          Potwierdź hasło *
        </label>

        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            required
            aria-required="true"
            aria-invalid={!!errors.confirmPassword || !passwordsMatch}
            aria-describedby={confirmPasswordDescribedBy}
            {...register("confirmPassword")}
            className="w-full border px-3 py-2 rounded pr-10 focus:ring-2 focus:ring-blue-500 [&::-ms-reveal]:hidden"
          />

          <button
            type="button"
            aria-label={showConfirmPassword ? "Ukryj hasło" : "Pokaż hasło"}
            aria-pressed={showConfirmPassword}
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm text-gray-600"
          >
            {showConfirmPassword ? "Ukryj" : "Pokaż"}
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

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {isSubmitting ? "Wysyłanie..." : "Dalej"}
      </button>
    </form>
  );
};
