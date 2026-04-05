import React from 'react';
import { Filter as FilterType, PriorityType } from '../types/todo.types';

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
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  if (filteredTodos.length === 0) {
    return (
      <div className="mx-auto mt-6 w-full max-w-[700px] rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm">
        Brak zadań. Dodaj nowe zadanie!
      </div>
    );
  }

  return (
    <div className="mx-auto mt-6 w-full max-w-[700px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <ul className="flex w-full flex-col divide-y divide-slate-200">
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between p-4 transition-colors sm:p-5 ${
              todo.completed
                ? 'bg-slate-50'
                : 'bg-white hover:bg-slate-50/70'
            }`}
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className="h-5 w-5 cursor-pointer rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-200"
              />
              <div className="flex flex-col text-left">
                <span
                  className={`text-lg font-medium transition-colors ${
                    todo.completed
                      ? 'text-slate-400 line-through'
                      : 'text-slate-800'
                  }`}
                >
                  {todo.title}
                </span>
              </div>
            </div>

          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                todo.priority === 'high'
                  ? 'border border-red-200 bg-red-100 text-red-700'
                  : todo.priority === 'medium'
                  ? 'border border-amber-200 bg-amber-100 text-amber-800'
                  : 'border border-slate-200 bg-slate-100 text-slate-700'
              }`}
            >
              {todo.priority === 'high'
                ? 'Wysoki'
                : todo.priority === 'medium'
                ? 'Sredni'
                : 'Niski'}
            </span>
              <button
                onClick={() => onStartEdit(todo.id)}
                className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
              >
                Edytuj
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
              >
                Usuń
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
