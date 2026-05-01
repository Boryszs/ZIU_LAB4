import { useMemo } from "react";
import {
  CheckBoxBlankIcon,
  CheckBoxIcon,
  DeleteIcon,
  EditIcon,
} from "./icons";
import { Filter, Todo } from "../types/todo.types";

interface TodoListProps {
  todos: Todo[];
  filter: Filter;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStartEdit: (id: string) => void;
}

const priorityLabel = {
  low: "Niski",
  medium: "Sredni",
  high: "Wysoki",
} as const;

const priorityClass = {
  low: "border-slate-400 bg-slate-200 text-slate-800 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100",
  medium:
    "border-amber-400 bg-amber-300 text-amber-950 dark:border-amber-700 dark:bg-amber-800 dark:text-amber-50",
  high: "border-red-300 bg-red-200 text-red-900 dark:border-red-700 dark:bg-red-900 dark:text-red-100",
} as const;

function formatTodoDate(value: string) {
  const timestamp = Number(value);

  if (Number.isFinite(timestamp) && value.trim() !== "") {
    return new Intl.DateTimeFormat("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
      .format(new Date(timestamp))
      .replace(/\./g, "-");
  }

  return value;
}

export function TodoList({
  todos,
  filter,
  onToggle,
  onDelete,
  onStartEdit,
}: TodoListProps) {
  const filteredTodos = useMemo(() => {
    if (filter === "active") return todos.filter((todo) => !todo.completed);
    if (filter === "completed") return todos.filter((todo) => todo.completed);
    return todos;
  }, [todos, filter]);

  if (filteredTodos.length === 0) {
    return (
      <p className="mx-auto mt-8 text-center text-slate-500 dark:text-slate-400">
        Brak zadan. Dodaj pierwsze!
      </p>
    );
  }

  return (
    <section className="mx-auto my-6 w-full max-w-[700px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] dark:border-slate-800 dark:bg-slate-900">
      <ul className="divide-y divide-slate-200 dark:divide-slate-700">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center gap-3 px-4 py-3 transition sm:px-5 ${
              todo.completed
                ? "bg-slate-50 dark:bg-slate-800/70"
                : "bg-white hover:bg-slate-50/70 dark:bg-slate-900 dark:hover:bg-slate-800/70"
            }`}
          >
            <button
              type="button"
              role="checkbox"
              aria-checked={todo.completed}
              aria-label={todo.title}
              onClick={() => onToggle(todo.id)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#1565C0] transition hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-100"
            >
              {todo.completed ? <CheckBoxIcon /> : <CheckBoxBlankIcon />}
            </button>

            <div className="min-w-0 flex-1 text-left">
              <p
                className={`truncate font-semibold ${
                  todo.completed
                    ? "text-slate-400 line-through"
                    : "text-slate-900 dark:text-slate-50"
                }`}
              >
                {todo.title}
              </p>
              <p
                className={`text-sm text-slate-500 ${
                  todo.completed ? "line-through" : ""
                }`}
              >
                {formatTodoDate(todo.date)}
              </p>
            </div>

            <span
              className={`mr-2 w-20 rounded-full border px-3 py-1 text-center text-xs font-semibold ${
                priorityClass[todo.priority]
              } ${todo.completed ? "bg-transparent opacity-70" : ""}`}
            >
              {priorityLabel[todo.priority]}
            </span>

            <div className="flex shrink-0 gap-1">
              <button
                type="button"
                onClick={() => onStartEdit(todo.id)}
                aria-label="Edytuj zadanie"
                className="flex h-10 w-10 items-center justify-center rounded-full text-blue-700 transition hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-100"
              >
                <EditIcon />
              </button>
              <button
                type="button"
                onClick={() => onDelete(todo.id)}
                aria-label="Usun zadanie"
                className="flex h-10 w-10 items-center justify-center rounded-full text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100"
              >
                <DeleteIcon />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
