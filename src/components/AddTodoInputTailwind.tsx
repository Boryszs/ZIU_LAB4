import { useEffect, useState } from "react";
import { PriorityType, Todo } from "../types/todo.types";

interface AddTodoFormProps {
  onSave: (title: string, priority: PriorityType) => void;
  onCancel: () => void;
  initialData?: Pick<Todo, "title" | "priority">;
}

export function AddTodAddTodoInputTailwindForm({
  onSave,
  onCancel,
  initialData,
}: AddTodoFormProps) {
  const [inputValue, setInputValue] = useState<string>(
    initialData?.title || "",
  );
  const [priority, setPriority] = useState<PriorityType>(
    initialData?.priority || "medium",
  );

  useEffect(() => {
    setInputValue(initialData?.title || "");
    setPriority(initialData?.priority || "medium");
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      return;
    }

    onSave(inputValue.trim(), priority);
  };

  const isEditing = Boolean(initialData);

  return (
    <div className="mx-auto my-3 w-full max-w-[420px] rounded-3xl bg-white p-6 text-left shadow-[0_8px_22px_rgba(15,23,42,0.18)] sm:p-7">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <label className="grid gap-1.5">
          <span className="text-sm font-medium text-slate-700">
            Tresc zadania
          </span>
          <input
            id="add-todo-title-tailwind"
            type="text"
            placeholder="Wpisz tresc zadania..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
          />
        </label>

        <label className="grid gap-1.5">
          <span className="text-sm font-medium text-slate-700">Priorytet</span>
          <div className="relative">
            <select
              id="add-todo-priority-tailwind"
              value={priority}
              onChange={(e) => setPriority(e.target.value as PriorityType)}
              className="w-full appearance-none rounded-2xl border border-slate-300 bg-white px-4 py-3 pr-11 text-base text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            >
              <option value="low">Niski</option>
              <option value="medium">Sredni</option>
              <option value="high">Wysoki</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.51a.75.75 0 0 1-1.08 0l-4.25-4.51a.75.75 0 0 1 .02-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </label>

        <div className="flex flex-wrap justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2Zm3.71 13.29a1 1 0 0 1-1.42 1.42L12 13.41l-2.29 2.3a1 1 0 0 1-1.42-1.42L10.59 12l-2.3-2.29a1 1 0 0 1 1.42-1.42L12 10.59l2.29-2.3a1 1 0 1 1 1.42 1.42L13.41 12Z" />
            </svg>
            Anuluj
          </button>
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="inline-flex min-h-[42px] items-center gap-2 rounded-xl bg-slate-300 px-4 py-2 text-sm font-semibold text-slate-500 transition enabled:bg-sky-600 enabled:text-white enabled:hover:bg-sky-700 disabled:cursor-not-allowed"
          >
            {isEditing ? (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17 3a2.98 2.98 0 0 0-2.12.88l-9 9A3 3 0 0 0 5 15v4a2 2 0 0 0 2 2h4a3 3 0 0 0 2.12-.88l9-9A3 3 0 0 0 17 3Zm0 2a1 1 0 0 1 .71.29l1 1a1 1 0 0 1 0 1.42l-.88.88-2.42-2.42.88-.88A1 1 0 0 1 17 5ZM7 15a1 1 0 0 1 .29-.71l6.99-6.99 2.42 2.42-6.99 6.99A1 1 0 0 1 9 17H7Z" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M19 11H13V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2Z" />
              </svg>
            )}
            {isEditing ? "Zapisz zmiany" : "Dodaj"}
          </button>
        </div>
      </form>
    </div>
  );
}
