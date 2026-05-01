import { useEffect, useState, type FormEvent } from "react";
import { PriorityType, Todo } from "../types/todo.types";
import { AddIcon, CancelIcon, SaveIcon } from "./icons";

interface AddTodoFormProps {
  onSave: (title: string, priority: PriorityType) => void;
  onCancel: () => void;
  initialData?: Pick<Todo, "title" | "priority">;
}

export function AddTodoForm({ onSave, onCancel, initialData }: AddTodoFormProps) {
  const [inputValue, setInputValue] = useState(initialData?.title || "");
  const [priority, setPriority] = useState<PriorityType>(
    initialData?.priority || "medium",
  );

  useEffect(() => {
    setInputValue(initialData?.title || "");
    setPriority(initialData?.priority || "medium");
  }, [initialData]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim()) return;
    onSave(inputValue.trim(), priority);
  };

  const isEditing = Boolean(initialData);

  return (
    <section className="mx-auto my-6 w-full max-w-[420px] rounded-3xl bg-white p-6 text-left shadow-[0_8px_22px_rgba(15,23,42,0.18)] transition-colors dark:bg-slate-900 sm:p-7">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
          {isEditing ? "Edytuj zadanie" : "Dodaj nowe zadanie"}
        </h2>

        <div className="grid gap-1.5">
          <label
            htmlFor="todo-title"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Tresc zadania
          </label>
          <input
            id="todo-title"
            type="text"
            placeholder="Wpisz tresc zadania..."
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50"
          />
        </div>

        <div className="grid gap-1.5">
          <label
            htmlFor="todo-priority"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Priorytet
          </label>
          <select
            id="todo-priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value as PriorityType)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50"
          >
            <option value="low">Niski</option>
            <option value="medium">Sredni</option>
            <option value="high">Wysoki</option>
          </select>
        </div>

        <div className="flex flex-wrap justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2 font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            <CancelIcon />
            Anuluj
          </button>

          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-slate-300 px-5 py-2 font-semibold text-slate-500 shadow-sm transition enabled:bg-[#1565C0] enabled:text-white enabled:hover:bg-[#0D47A1] enabled:focus:ring-4 enabled:focus:ring-blue-200 disabled:cursor-not-allowed"
          >
            {isEditing ? <SaveIcon /> : <AddIcon />}
            {isEditing ? "Zapisz zmiany" : "Dodaj"}
          </button>
        </div>
      </form>
    </section>
  );
}
