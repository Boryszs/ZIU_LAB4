import { useState } from "react";
import { Filter as FilterType, PriorityType } from "./types/todo.types";
import { FilterBar } from "./components/FilterBar";
import { ThemeProvider, useTodoContext } from "./context/TodoContext";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import type { DashboardSection } from "./components/dashboard/Sidebar";
import { AddTodoForm } from "./components/AddTodoForm";
import { TodoList } from "./components/TodoList";

function TodoApp() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<"list" | "add" | "edit">("list");
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodoContext();

  const handleAdd = (title: string, priority: PriorityType) => {
    addTodo(title, priority);
    setView("list");
  };

  const handleStartEdit = (id: string) => {
    setEditingTodoId(id);
    setView("edit");
  };

  const handleSaveEdit = (newTitle: string, newPriority: PriorityType) => {
    if (!editingTodoId) return;
    editTodo(editingTodoId, newTitle, newPriority);
    setView("list");
    setEditingTodoId(null);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const activeCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="min-h-screen bg-white p-4 transition-colors dark:bg-[#1e1e1e]">
      <div className="mx-auto flex w-full max-w-[700px] flex-wrap items-center gap-4 sm:flex-nowrap sm:gap-10">
        <h2 className="m-0 max-w-[250px] whitespace-nowrap text-2xl font-semibold text-[#595959] dark:text-slate-50">
          ToDo List
        </h2>
        <input
          type="text"
          placeholder="Wyszukaj zadania..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="h-10 min-w-0 flex-grow rounded border border-slate-300 bg-white px-2 text-base text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400"
        />
      </div>

      <header className="flex flex-col items-center justify-center px-5 py-5 text-center">
        <h1 className="m-0 text-2xl font-semibold text-[#2a2a2a] dark:text-slate-50 sm:text-3xl">
          {view === "add"
            ? "Dodaj Nowe Zadanie"
            : view === "edit"
              ? "Edytuj Zadanie"
              : "Lista Zadan"}
        </h1>
        {view === "list" && (
          <p className="mt-2 text-sm text-[#2a2a2a] dark:text-slate-50">
            Aktywne zadania: {activeCount}
          </p>
        )}
      </header>

      <main>
        {view === "list" ? (
          <>
            <button
              type="button"
              aria-label="Dodaj nowe zadanie"
              onClick={() => setView("add")}
              className="fixed bottom-5 right-5 z-[1000] flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#007bff] text-4xl leading-none text-white shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              <span aria-hidden="true">+</span>
            </button>
            <FilterBar activeFilter={filter} onFilterChange={setFilter} />
            <TodoList
              todos={filteredTodos}
              filter={filter}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onStartEdit={handleStartEdit}
            />
          </>
        ) : view === "add" ? (
          <AddTodoForm onSave={handleAdd} onCancel={() => setView("list")} />
        ) : (
          <AddTodoForm
            onSave={handleSaveEdit}
            onCancel={() => {
              setView("list");
              setEditingTodoId(null);
            }}
            initialData={todos.find((todo) => todo.id === editingTodoId)}
          />
        )}
      </main>
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] =
    useState<DashboardSection>("login");

  return (
    <ThemeProvider>
      <DashboardLayout
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        appTodo={TodoApp}
      />
    </ThemeProvider>
  );
}

export default App;
