import React, { useState } from 'react';
import './App.css';
import { Todo, Filter as FilterType, PriorityType } from './types/todo.types';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import { FilterBar } from './components/FilterBar';

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', title: 'Nauczyć się Reacta', completed: false, priority: 'medium', date: '12-12-2026' },
    { id: '2', title: 'Zrobić zakupy', completed: true, priority: 'low', date: '11-12-2026' },
    { id: '3', title: 'Napisać raport', completed: false, priority: 'high', date: '10-12-2026' },
  ]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'list' | 'add'>('list');

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

  const handleEdit = (id: string, newTitle: string, newPriority: PriorityType) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle, priority: newPriority } : todo,
      )
    );
  };

  // Logika filtrowania
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  }).filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Licznik aktywnych zadań
  const activeCount = todos.filter((t) => !t.completed).length;

  // Przeniesiono pole wyszukiwania do FilterBar
  // const [searchTerm, setSearchTerm] = useState(''); // Ten stan jest teraz używany w FilterBar
  // Logika wyszukiwania jest już w filteredTodos

  return (
    <div className="App">
      <header className="App-header">
        <h1>{view === 'list' ? 'Lista Zadań' : 'Dodaj Nowe Zadanie'}</h1>
        {view === 'list' && <p>Aktywne zadania: {activeCount}</p>}
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
              searchTerm={searchTerm}
              onSearchTermChange={setSearchTerm}
            />
            <TodoList todos={filteredTodos} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />
          </>
        ) : (
          <AddTodoForm onAdd={handleAdd} onCancel={() => setView('list')} />
        )}
      </main>
    </div>
  );
}

export default App;