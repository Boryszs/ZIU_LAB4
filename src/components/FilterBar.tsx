import { useId, useState } from "react";
import {
  Filter as FilterType,
  PriorityFilter,
} from "../types/todo.types";
import { AppButton } from "./common/AppButton";

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
  const filters: FilterType[] = ["all", "active", "completed"];
  const filtersId = useId();
  const filterNames: Record<FilterType, string> = {
    all: "Wszystkie",
    active: "Aktywne",
    completed: "Ukończone",
  };

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
              {filters.map((filter) => {
                const isActive = activeFilter === filter;

                return (
                  <AppButton
                    type="button"
                    aria-label={`Pokaż ${filterNames[filter].toLowerCase()} zadania`}
                    aria-pressed={isActive}
                    key={filter}
                    onClick={() => onFilterChange(filter)}
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
                    {filterNames[filter]}
                  </AppButton>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="m-0 flex min-w-0 flex-col rounded-xl border border-app-border bg-app-surface p-3 shadow-sm dark:border-appDark-border dark:bg-appDark-surface">
            <legend className="px-1 text-sm font-semibold text-app-text-secondary dark:text-appDark-text-primary">
              Priorytet
            </legend>
            <select
              aria-label="Filtr priorytetu"
              value={priorityFilter}
              onChange={(event) =>
                onPriorityFilterChange(event.target.value as PriorityFilter)
              }
              className="mt-1 h-10 w-full rounded border border-app-borderStrong bg-app-hover px-3 font-normal text-control-text focus:outline-none focus:ring-4 focus:ring-app-primaryLight dark:border-appDark-borderStrong dark:bg-appDark-hover dark:text-appDark-text-primary"
            >
              <option value="all">Wszystkie</option>
              <option value="high">Wysoki</option>
              <option value="medium">Średni</option>
              <option value="low">Niski</option>
            </select>
          </fieldset>
        </div>
      )}
    </section>
  );
}
