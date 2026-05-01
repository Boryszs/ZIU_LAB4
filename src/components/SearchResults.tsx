import type { Todo } from "../types/todo.types";

interface SearchResultsProps {
  results: Todo[];
  query: string;
  onQueryChange: (value: string) => void;
  isLoading: boolean;
}

export function SearchResults({
  results,
  query,
  onQueryChange,
  isLoading,
}: SearchResultsProps) {
  const normalizedQuery = query.trim();
  const statusMessage = normalizedQuery === ""
    ? ""
    : isLoading
    ? "Wyszukiwanie..."
    : results.length === 0
    ? `Brak wyników dla zapytania: ${query}`
    : `Znaleziono ${results.length} wyników dla: ${query}`;

  return (
    <div className="flex-grow">
      <div role="search" aria-label="Wyszukiwarka zadań">
        <label htmlFor="todo-search" className="sr-only">
          Wyszukaj zadania
        </label>
        <input
          id="todo-search"
          type="search"
          aria-describedby="search-status"
          placeholder="Wyszukaj zadania..."
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          className="h-10 w-full rounded border border-slate-300 bg-white px-2 text-base text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400"
        />
      </div>

      {statusMessage !== "" ? (
        <p
          id="search-status"
          role="status"
          aria-atomic="true"
          className="mt-2 text-sm text-slate-500 dark:text-slate-400"
        >
          {statusMessage}
        </p>
      ) : null}
    </div>
  );
}
