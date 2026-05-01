import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useOutletContext,
} from "react-router-dom";
import { Filter as FilterType, PriorityType } from "./types/todo.types";
import { FilterBar } from "./components/FilterBar";
import { ThemeProvider, useTodoContext } from "./context/TodoContext";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import { AddTodoForm } from "./components/AddTodoForm";
import { TodoList } from "./components/TodoList";
import { useState } from "react";
import StatsGrid from "./components/dashboard/StatsGrid";
import MultiStepForm from "./components/MultiStepForm";

// The TodoApp component remains as the logic for the "Tasks" page.
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
    <section
      aria-labelledby="todo-app-title"
      className="min-h-screen bg-[#F5F7FA] p-4 transition-colors dark:bg-slate-950"
    >
      <header className="mx-auto flex w-full max-w-[700px] flex-wrap items-center gap-4 sm:flex-nowrap sm:gap-10">
        <h2
          id="todo-app-title"
          className="m-0 max-w-[250px] whitespace-nowrap text-2xl font-semibold text-[#595959] dark:text-slate-50"
        >
          ToDo List
        </h2>
        <div
          role="search"
          aria-label="Wyszukiwarka zadań"
          className="flex-grow"
        >
          <label htmlFor="todo-search" className="sr-only">
            Wyszukaj zadania
          </label>
          <input
            id="todo-search"
            type="search"
            aria-label="Wyszukaj zadania"
            placeholder="Wyszukaj zadania..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="h-10 w-full rounded border border-slate-300 bg-white px-2 text-base text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400"
          />
        </div>
      </header>

      <header className="flex flex-col items-center justify-center px-5 py-5 text-center">
        <h1
          id="todo-view-heading"
          className="m-0 text-2xl font-semibold text-[#2a2a2a] dark:text-slate-50 sm:text-3xl"
        >
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

      <main aria-labelledby="todo-view-heading">
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
    </section>
  );
}

// A placeholder for the settings page
const SettingsPage = () => (
  <section className="text-center">Strona ustawień jest w budowie.</section>
);

// A wrapper to pass the TodoApp component via Outlet context
const TasksPage = () => {
  const { appTodo } = useOutletContext<{ appTodo: () => React.ReactNode }>();
  return <>{appTodo()}</>;
};

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Przejdź do treści głównej
      </a>
      <BrowserRouter>
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<DashboardLayout appTodo={TodoApp} />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<StatsGrid />} />
              <Route path="tasks" element={<TasksPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="login" element={<MultiStepForm />} />
              <Route path="register" element={<MultiStepForm />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
