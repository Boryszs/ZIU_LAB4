import React from "react";
import { Filter as FilterType, PriorityType } from "../types/todo.types";
// import "../styles/TaskGrid.css";
import "../styles/TaskSubgrid.css";
// import "../styles/TaskContainer.css";
// Zdefiniowany lokalnie typ Todo (jeśli eksportujesz go z todo.types,
// możesz usunąć tę deklarację i zaimportować go u góry)
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: PriorityType;
}

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStartEdit: (id: string) => void;
}

export const TodoListTailwind: React.FC<TodoListProps> = ({
  todos,
  filter,
  onToggle,
  onDelete,
  onStartEdit,
}) => {
  // Logika filtrowania przeniesiona bezpośrednio tutaj
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // 'all'
  });

  if (filteredTodos.length === 0) {
    return (
      <div className="mx-auto mt-6 w-full max-w-[80%] rounded-3xl border border-slate-300 bg-white p-8 text-center text-slate-500 shadow-sm">
        Brak zadań. Dodaj nowe zadanie!
      </div>
    );
  }

  return (
    //TaskSubgrid
    <div className="mx-auto w-full max-w-[1200px] p-4">
      <ul className="task-grid">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className={`task-card border rounded-2xl p-4 ${
              todo.completed ? "bg-slate-50 opacity-60" : "bg-white shadow-sm"
            }`}
          >
            {/* Rząd 1: card__title */}
            <div className="card__title flex items-start gap-3">
              <input
                id={`todo-${todo.id}`}
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className="mt-1 h-5 w-5"
                placeholder="np. Kupić mleko"
              />
              <span
                className={`font-semibold ${todo.completed ? "line-through" : ""}`}
              >
                {todo.title}
              </span>
            </div>

            {/* Rząd 2: card__body */}
            <div className="card__body py-2">
              <span className="text-xs font-bold uppercase text-slate-500">
                Priorytet: {todo.priority}
              </span>
            </div>

            {/* Rząd 3: card__footer */}
            <div className="card__footer flex gap-2">
              <button
                aria-label={`Edytuj zadanie: ${todo.title}`}
                onClick={() => onStartEdit(todo.id)}
                className="text-sm text-blue-700 hover:underline"
              >
                Edytuj
              </button>
              <button
                aria-label={`Usuń zadanie: ${todo.title}`}
                onClick={() => onDelete(todo.id)}
                className="text-sm text-red-700 hover:underline"
              >
                Usuń
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    // TaskContainer
    // <div className="card-wrapper mx-auto mt-6 w-full max-w-[80%] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm mb-16">
    //   <ul className="flex w-full flex-col divide-y divide-slate-200">
    //     {filteredTodos.map((todo) => (
    //       <li
    //         key={todo.id}
    //         /* KROK 2: Każdy wiersz otrzymuje klasę .task-card */
    //         className={`task-card p-4 transition-colors sm:p-5 ${
    //           todo.completed ? "bg-slate-50" : "bg-white hover:bg-slate-50/70"
    //         }`}
    //       >
    //         {/* Sekcja Tytułu */}
    //         <div className="flex items-center gap-4">
    //           <input
    //             type="checkbox"
    //             checked={todo.completed}
    //             onChange={() => onToggle(todo.id)}
    //             className="h-5 w-5 cursor-pointer rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-200"
    //           />
    //           <span className={`text-lg font-medium ${todo.completed ? "text-slate-400 line-through" : "text-slate-800"}`}>
    //             {todo.title}
    //           </span>
    //         </div>

    //         {/* Sekcja Priorytetu i Akcji */}
    //         <div className="flex items-center gap-4 justify-between sm:justify-end">
    //           <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
    //             todo.priority === "high" ? "bg-red-100 text-red-700" :
    //             todo.priority === "medium" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700"
    //           }`}>
    //             {todo.priority}
    //           </span>

    //           <div className="flex gap-2">
    //             <button onClick={() => onStartEdit(todo.id)} className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm text-blue-700 hover:bg-blue-100">
    //               Edytuj
    //             </button>
    //             <button onClick={() => onDelete(todo.id)} className="rounded-lg bg-red-50 px-3 py-1.5 text-sm text-red-700 hover:bg-red-100">
    //               Usuń
    //             </button>
    //           </div>
    //         </div>
    //       </li>
    //     ))}
    //   </ul>
    // </div>

    // TaskGrid
    // <div className="mx-auto mt-6 w-full max-w-[80%] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm m-16">
    //   <ul className="flex w-full flex-col divide-y divide-slate-200">
    //     {filteredTodos.map((todo) => (
    //       <li
    //         key={todo.id}
    //         className={`task-grid items-center p-4 transition-colors sm:p-5 ${
    //           todo.completed ? "bg-slate-50" : "bg-white hover:bg-slate-50/70"
    //         }`}
    //       >
    //         <div className="flex items-center gap-4">
    //           <input
    //             type="checkbox"
    //             checked={todo.completed}
    //             onChange={() => onToggle(todo.id)}
    //             className="h-5 w-5 cursor-pointer rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-200"
    //           />
    //           <span
    //             className={`text-lg font-medium transition-colors ${
    //               todo.completed
    //                 ? "text-slate-400 line-through"
    //                 : "text-slate-800"
    //             }`}
    //           >
    //             {todo.title}
    //           </span>
    //         </div>
    //         <div className="flex justify-end">
    //           <span
    //             className={`rounded-full px-3 text-center w-16 py-1 text-xs font-semibold ${
    //               todo.priority === "high"
    //                 ? "border border-red-200 bg-red-100 text-red-700"
    //                 : todo.priority === "medium"
    //                   ? "border border-amber-200 bg-amber-100 text-amber-800"
    //                   : "border border-slate-300 bg-slate-100 text-slate-700"
    //             }`}
    //           >
    //             {todo.priority === "high"
    //               ? "Wysoki"
    //               : todo.priority === "medium"
    //                 ? "Sredni"
    //                 : "Niski"}
    //           </span>
    //         </div>
    //         <div className="flex justify-center gap-4">
    //           <button
    //             onClick={() => onStartEdit(todo.id)}
    //             className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
    //           >
    //             Edytuj
    //           </button>
    //           <button
    //             onClick={() => onDelete(todo.id)}
    //             className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
    //           >
    //             Usuń
    //           </button>
    //         </div>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};
