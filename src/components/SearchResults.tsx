import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Todo } from "../types/todo.types";

interface SearchResultsProps {
  results: Todo[];
  query: string;
  onQueryChange: (value: string) => void;
}

export function SearchResults({
  results,
  query,
  onQueryChange,
}: SearchResultsProps) {
  const [announcement, setAnnouncement] = useState("");
  const announcementTimeout = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (announcementTimeout.current !== null) {
        window.clearTimeout(announcementTimeout.current);
      }
    };
  }, []);

  const announce = (message: string) => {
    if (announcementTimeout.current !== null) {
      window.clearTimeout(announcementTimeout.current);
    }

    setAnnouncement("");
    announcementTimeout.current = window.setTimeout(() => {
      setAnnouncement(message);
      announcementTimeout.current = null;
    }, 0);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedQuery = query.trim();
    if (normalizedQuery === "") {
      announce("Wpisz frazę, aby wyszukać zadania.");
      return;
    }

    announce(`Znaleziono ${results.length} wyników dla: ${normalizedQuery}`);
  };

  return (
    <div className="flex-grow">
      <form role="search" aria-label="Wyszukiwarka zadań" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label htmlFor="todo-search" className="sr-only">
            Wyszukaj zadania
          </label>
          <input
            id="todo-search"
            type="search"
            aria-describedby="search-status"
            placeholder="Wyszukaj zadania..."
            value={query}
            onChange={(event) => {
              if (announcementTimeout.current !== null) {
                window.clearTimeout(announcementTimeout.current);
                announcementTimeout.current = null;
              }

              onQueryChange(event.target.value);
              setAnnouncement("");
            }}
            className="h-10 min-w-0 flex-1 rounded border border-slate-300 bg-white px-2 text-base text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400"
          />
          <button
            type="submit"
            className="h-10 rounded bg-slate-700 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:bg-slate-200 dark:text-slate-950 dark:hover:bg-white dark:focus:ring-slate-500"
          >
            Szukaj
          </button>
        </div>
      </form>

      <p
        id="search-status"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-2 min-h-5 text-sm text-slate-600 dark:text-slate-300"
      >
        {announcement}
      </p>
    </div>
  );
}
