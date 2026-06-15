import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { trackFormAbandonment, trackFormSubmit } from "../analytics";
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
  const hasInteractedRef = useRef(false);
  const submittedRef = useRef(false);
  const abandonmentSentRef = useRef(false);
  const [titleTouched, setTitleTouched] = useState(false);
  const isEditing = Boolean(initialData);
  const formName = isEditing ? "todo_edit" : "todo_create";
  const formNameRef = useRef(formName);

  const emitAbandonment = () => {
    if (
      hasInteractedRef.current &&
      !submittedRef.current &&
      !abandonmentSentRef.current
    ) {
      trackFormAbandonment(formNameRef.current);
      abandonmentSentRef.current = true;
    }
  };

  useEffect(() => {
    setInputValue(initialData?.title || "");
    setPriority(initialData?.priority || "medium");
    setTitleTouched(false);
  }, [initialData]);

  useEffect(() => {
    formNameRef.current = formName;
  }, [formName]);

  useEffect(() => {
    return () => {
      if (
        hasInteractedRef.current &&
        !submittedRef.current &&
        !abandonmentSentRef.current
      ) {
        trackFormAbandonment(formNameRef.current);
        abandonmentSentRef.current = true;
      }
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim()) {
      setTitleTouched(true);
      return;
    }
    submittedRef.current = true;
    trackFormSubmit(formName, "success");
    onSave(inputValue.trim(), priority);
  };

  const handleCancel = () => {
    emitAbandonment();
    onCancel();
  };

  const headingId = useId();
  const titleErrorId = `${headingId}-title-error`;
  const titleError = titleTouched && !inputValue.trim()
    ? "Treść zadania jest wymagana."
    : "";

  return (
    <section
      aria-labelledby={headingId}
      className="mx-auto my-6 w-full max-w-[420px] rounded-3xl bg-white p-6 text-left shadow-[0_8px_22px_rgba(15,23,42,0.18)] transition-colors dark:bg-slate-900 sm:p-7"
    >
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <h2 id={headingId} className="text-xl font-semibold text-slate-900 dark:text-slate-50">
          {isEditing ? "Edytuj zadanie" : "Dodaj nowe zadanie"}
        </h2>

        <div className="grid gap-1.5">
          <label
            htmlFor="todo-title"
            className="text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Treść zadania
          </label>
          <input
            id="todo-title"
            type="text"
            required
            aria-required="true"
            aria-invalid={Boolean(titleError)}
            aria-describedby={titleError ? titleErrorId : undefined}
            placeholder="Wpisz treść zadania..."
            value={inputValue}
            onBlur={() => setTitleTouched(true)}
            onChange={(event) => {
              hasInteractedRef.current = true;
              setTitleTouched(true);
              setInputValue(event.target.value);
            }}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-50"
          />
          {titleError && (
            <p id={titleErrorId} role="alert" className="text-sm text-red-700 dark:text-red-300">
              {titleError}
            </p>
          )}
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
            onChange={(event) => {
              hasInteractedRef.current = true;
              setPriority(event.target.value as PriorityType);
            }}
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
            onClick={handleCancel}
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
