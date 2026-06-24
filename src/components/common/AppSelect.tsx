import {
  forwardRef,
  type OptionHTMLAttributes,
  type SelectHTMLAttributes,
} from "react";
import type { SelectOption } from "../../types/select.types";

interface AppSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  fullWidth?: boolean;
  options?: readonly SelectOption[];
}

const joinClassNames = (...classNames: Array<string | false | undefined>) =>
  classNames.filter(Boolean).join(" ");

const selectClassName =
  "h-10 rounded border border-app-borderStrong bg-app-hover px-3 font-normal text-control-text transition-colors [color-scheme:light] focus:outline-none focus:ring-4 focus:ring-app-primaryLight disabled:cursor-not-allowed disabled:opacity-70 dark:border-appDark-borderStrong dark:bg-appDark-background dark:text-appDark-text-primary dark:[color-scheme:dark] [&>option]:bg-app-surface [&>option]:text-app-text-primary dark:[&>option]:bg-appDark-background dark:[&>option]:text-appDark-text-primary";

const optionClassName =
  "bg-app-surface text-app-text-primary dark:bg-appDark-background dark:text-appDark-text-primary";

export const AppSelect = forwardRef<HTMLSelectElement, AppSelectProps>(
  function AppSelect(
    { children, className, fullWidth = true, options, ...props },
    ref,
  ) {
    return (
      <select
        {...props}
        ref={ref}
        className={joinClassNames(
          selectClassName,
          fullWidth && "w-full",
          className,
        )}
      >
        {options
          ? options.map((option) => (
              <AppOption
                disabled={option.disabled}
                key={String(option.value)}
                value={option.value}
              >
                {option.label}
              </AppOption>
            ))
          : children}
      </select>
    );
  },
);

export const AppOption = forwardRef<
  HTMLOptionElement,
  OptionHTMLAttributes<HTMLOptionElement>
>(function AppOption({ className, ...props }, ref) {
  return (
    <option
      {...props}
      ref={ref}
      className={joinClassNames(optionClassName, className)}
    />
  );
});
