import React, { useState } from 'react';
import './App.css';
import { Todo, Filter as FilterType, PriorityType } from './types/todo.types';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import { FilterBar } from './components/FilterBar';
import { ThemeProvider, useTheme } from './context/TodoContext';

// Dydaktyczny przykład użycia Context API

function ThemeButton() {
  // Ten komponent nie przyjmuje żadnych propsów!
  // Bezpośrednio "konsumuje" kontekst za pomocą hooka.
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';
  const buttonText = isDark ? 'Zmień na motyw jasny' : 'Zmień na motyw ciemny';
  const icon = isDark ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16c-4.467 0-8.098-3.63-8.098-8.098S3.877 0 8.344 0c1.167 0 2.28.319 3.233.877a.733.733 0 0 1-.031.893.787.787 0 0 1-.81.316A7.208 7.208 0 0 0 8.344.278ZM10.5 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-.5 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-.5 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 1a4 4 0 1 1 0-8 4 4 0 0 1 0 8ZM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0Zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13Zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5ZM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8Zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0Zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0Zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707ZM4.464 4.464a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707Z"/>
    </svg>
  );

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 1100,
        padding: '8px 12px',
        borderRadius: '20px',
        backgroundColor: isDark ? '#444' : '#f0f0f0',
        color: isDark ? 'white' : 'black',
        border: '1px solid #666',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      {icon} {buttonText}
    </button>
  );
}

function Sidebar() {
  // Ten komponent nie używa motywu, więc nie musi go przyjmować ani przekazywać.
  return (
    <div style={{ position: 'relative' }}>
      <ThemeButton />
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  // Ten komponent również nie musi wiedzieć nic o motywie.
  return <>{children}</>;
}

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', title: 'Nauczyć się Reacta', completed: false, priority: 'medium', date: '12-12-2026' },
    { id: '2', title: 'Zrobić zakupy', completed: true, priority: 'low', date: '11-12-2026' },
    { id: '3', title: 'Napisać raport', completed: false, priority: 'high', date: '10-12-2026' },
  ]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const { theme } = useTheme(); // Pobieramy motyw do stylizacji

  const handleAdd = (title: string, priority: PriorityType) => {
    const d = new Date();
    const date = `${d.getDate().toString().padStart(2, '0')}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getFullYear()}`;
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      priority,
      date: date,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setView('list'); // Powrót do widoku listy po dodaniu
  };

  const handleToggle = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      )
    );
  };

  const handleDelete = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleStartEdit = (id: string) => {
    setEditingTodoId(id);
    setView('edit');
  };

  const handleSaveEdit = (newTitle: string, newPriority: PriorityType) => {
    if (!editingTodoId) return;
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === editingTodoId ? { ...todo, title: newTitle, priority: newPriority } : todo,
      )
    );
    setView('list');
    setEditingTodoId(null);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Licznik aktywnych zadań
  const activeCount = todos.filter((t) => !t.completed).length;

  // Przeniesiono pole wyszukiwania do FilterBar
  // const [searchTerm, setSearchTerm] = useState(''); // Ten stan jest teraz używany w FilterBar
  // Logika wyszukiwania jest już w filteredTodos

  return (
    <div className="App" style={{ backgroundColor: theme === 'dark' ? '#1e1e1e' : '#D3D3D3' }}>
      {/* Logo i pole wyszukiwania na samej górze, wyrównane do lewej */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '40px', margin: '0 auto 0 auto', maxWidth: '700px', boxSizing: 'border-box' }}>
        <h2 style={{ margin: 0, whiteSpace: 'nowrap', maxWidth: '250px', color: theme === 'dark' ? '#f8f9fa' : 'grey' }}>ToDo List</h2>
        <input
          type="text"
          placeholder="Wyszukaj zadania..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', flexGrow: 1, maxWidth: '650px' }}
        />
      </div>

      <header className="App-header">
        <h1 style={{color: theme === 'dark' ? '#f8f9fa' : '#2a2a2a'}}>{view === 'add' ? 'Dodaj Nowe Zadanie' : view === 'edit' ? 'Edytuj Zadanie' : 'Lista Zadań'}</h1>
        {view === 'list' && <p style={{color: theme === 'dark' ? '#f8f9fa' : '#2a2a2a'}}>Aktywne zadania: {activeCount}</p>}
      </header>
      <main>
        {view === 'list' ? (
          <>
            {/* Floating Action Button (FAB) */}
            <button
              onClick={() => setView('add')}
              style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#007bff',
                color: 'white',
                fontSize: '2rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000, // Upewnij się, że jest nad innymi elementami
              }}
            >
              +
            </button>
            <FilterBar
              activeFilter={filter}
              onFilterChange={setFilter}
              // searchTerm={searchTerm}
              // onSearchTermChange={setSearchTerm}
            />
            <TodoList
              todos={filteredTodos}
              filter={filter}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onStartEdit={handleStartEdit}
            />
          </>
        ) : view === 'add' ? (
          <AddTodoForm onSave={handleAdd} onCancel={() => setView('list')} />
        ) : ( // view === 'edit'
          <AddTodoForm
            onSave={handleSaveEdit}
            onCancel={() => { setView('list'); setEditingTodoId(null); }}
            initialData={todos.find(t => t.id === editingTodoId)}
          />
        ) }
      </main>
    </div>
  );
}

function App() {
  // Główny komponent App opakowuje całą aplikację w ThemeProvider.
  // Dzięki temu każdy komponent wewnątrz drzewa ma dostęp do kontekstu.
  return (
    <ThemeProvider>
      <Layout>
        <Sidebar />
        <TodoApp />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
