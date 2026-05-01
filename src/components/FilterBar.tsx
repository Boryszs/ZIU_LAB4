import { useState } from "react";
import { Filter as FilterType } from "../types/todo.types";

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  const filters: FilterType[] = ["all", "active", "completed"];
  const filterNames: Record<FilterType, string> = {
    all: "Wszystkie",
    active: "Aktywne",
    completed: "Ukonczone",
  };

  const [showFilters, setShowFilters] = useState(true);

  return (
    <section aria-label="Filtr zadań" className="mx-auto my-5 flex w-full max-w-[700px] flex-col items-center gap-2.5">
      <div className="flex w-full justify-end">
        <button
          type="button"
          aria-label="Pokaż lub ukryj filtry zadań"
          onClick={() => setShowFilters((prev) => !prev)}
          className="flex h-9 w-9 items-center justify-center rounded border border-slate-300 bg-slate-50 text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
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
        </button>
      </div>

      {showFilters && (
        <div role="toolbar" aria-label="Filtry zadań" className="flex justify-center gap-2.5">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                type="button"
                aria-label={`Pokaż ${filterNames[filter].toLowerCase()} zadania`}
                aria-pressed={isActive}
                key={filter}
                onClick={() => onFilterChange(filter)}
                className={`rounded border px-3 py-2 transition focus:outline-none focus:ring-4 ${
                  isActive
                    ? "border-[#0056b3] bg-[#0056b3] text-white focus:ring-blue-200"
                    : "border-slate-500 bg-slate-50 text-[#595959] hover:bg-slate-100 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                }`}
              >
                {filterNames[filter]}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
