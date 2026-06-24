import { useId, useState } from "react";
import { priorityFilterOptions } from "../constants/priorityOptions";
import { Filter as FilterType, PriorityFilter } from "../types/todo.types";
import { AppButton } from "./common/AppButton";
import { AppSelect } from "./common/AppSelect";
import { statusFilterOptions } from "./filterBar/statusFilterOptions";

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  priorityFilter: PriorityFilter;
  onPriorityFilterChange: (priority: PriorityFilter) => void;
}

export function FilterBar({
  activeFilter,
  onFilterChange,
  priorityFilter,
  onPriorityFilterChange,
}: FilterBarProps) {
  const filtersId = useId();

  const [showFilters, setShowFilters] = useState(true);

  return (
    <section
      aria-label="Filtr zadań"
      className="mx-auto my-5 flex w-full max-w-[700px] flex-col items-center gap-2.5"
    >
      <div className="flex w-full justify-end">
        <AppButton
          type="button"
          aria-label="Pokaż lub ukryj filtry zadań"
          aria-controls={filtersId}
          aria-expanded={showFilters}
          onClick={() => setShowFilters((prev) => !prev)}
          compact
          iconOnly
          tone="neutral"
          variant="soft"
          sx={{ border: 1, borderColor: "divider" }}
        >
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
        </AppButton>
      </div>

      {showFilters && (
        <div
          id={filtersId}
          className="grid w-full gap-3 sm:grid-cols-[minmax(0,1fr)_220px] sm:items-stretch"
        >
          <fieldset className="m-0 flex min-w-0 flex-col rounded-xl border border-app-border bg-app-surface p-3 shadow-sm dark:border-appDark-border dark:bg-appDark-surface">
            <legend className="px-1 text-sm font-semibold text-app-text-secondary dark:text-appDark-text-primary">
              Status
            </legend>
            <div
              role="toolbar"
              aria-label="Filtry statusu zadań"
              className="mt-1 grid grid-cols-3 gap-2"
            >
              {statusFilterOptions.map((filterOption) => {
                const isActive = activeFilter === filterOption.value;

                return (
                  <AppButton
                    type="button"
                    aria-label={`Pokaż ${filterOption.label.toLowerCase()} zadania`}
                    aria-pressed={isActive}
                    key={filterOption.value}
                    onClick={() => onFilterChange(filterOption.value)}
                    compact
                    fullWidth
                    size="small"
                    tone={isActive ? "primary" : "neutral"}
                    variant={isActive ? "contained" : "outlined"}
                    sx={{
                      height: 40,
                      minWidth: 0,
                      px: { xs: 1, sm: 1.5 },
                    }}
                  >
                    {filterOption.label}
                  </AppButton>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="m-0 flex min-w-0 flex-col rounded-xl border border-app-border bg-app-surface p-3 shadow-sm dark:border-appDark-border dark:bg-appDark-surface">
            <legend className="px-1 text-sm font-semibold text-app-text-secondary dark:text-appDark-text-primary">
              Priorytet
            </legend>
            <AppSelect
              aria-label="Filtr priorytetu"
              value={priorityFilter}
              options={priorityFilterOptions}
              onChange={(event) =>
                onPriorityFilterChange(event.target.value as PriorityFilter)
              }
              className="mt-1"
            />
          </fieldset>
        </div>
      )}
    </section>
  );
}
