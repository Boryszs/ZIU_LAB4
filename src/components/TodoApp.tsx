import { useState } from "react";
import { useTodoContext } from "../context/TodoContext";
import { Filter as FilterType, PriorityType } from "../types/todo.types";
import { AddTodoForm } from "./AddTodoForm";
import { FilterBar } from "./FilterBar";
import { SearchResults } from "./SearchResults";
import { TodoList } from "./TodoList";

export default function TodoApp() {
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
          <SearchResults
            results={filteredTodos}
            query={searchTerm}
            onQueryChange={(value) => {
              setSearchTerm(value);
            }}
          />
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
  
        <section aria-labelledby="todo-view-heading">
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
        </section>
      </section>
    );
  }
