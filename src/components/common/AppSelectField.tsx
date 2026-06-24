import { useId, type SelectHTMLAttributes } from "react";
import type { SelectOption } from "../../types/select.types";
import { AppSelect } from "./AppSelect";

interface AppSelectFieldProps
  extends Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    "aria-describedby" | "children"
  > {
  error?: string;
  helperText?: string;
  label: string;
  options: readonly SelectOption[];
  wrapperClassName?: string;
}

const joinClassNames = (...classNames: Array<string | false | undefined>) =>
  classNames.filter(Boolean).join(" ");

export function AppSelectField({
  className,
  disabled,
  error,
  helperText,
  id,
  label,
  options,
  required,
  wrapperClassName,
  ...props
}: AppSelectFieldProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const helperTextId = helperText ? `${selectId}-helper` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;
  const describedBy = errorId ?? helperTextId;

  return (
    <div className={joinClassNames("flex w-full flex-col gap-1.5", wrapperClassName)}>
      <label
        htmlFor={selectId}
        className="text-sm font-medium text-app-text-primary dark:text-appDark-text-primary"
      >
        {label}
      </label>
      <AppSelect
        {...props}
        id={selectId}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        className={className}
        disabled={disabled}
        options={options}
        required={required}
      />
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="text-sm text-red-700 dark:text-red-300"
        >
          {error}
        </p>
      ) : helperText ? (
        <p
          id={helperTextId}
          className="text-sm text-app-text-secondary dark:text-appDark-text-secondary"
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
