import React, { useState } from 'react';
import './App.css';
import { Todo, Filter as FilterType } from './types/todo.types';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';
import { FilterBar } from './components/FilterBar';

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', title: 'Nauczyć się Reacta', completed: false, priority: 'medium' },
    { id: '2', title: 'Zrobić zakupy', completed: true, priority: 'low' },
    { id: '3', title: 'Napisać raport', completed: false, priority: 'high' },
  ]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAdd = (title: string, priority: 'low' | 'medium' | 'high') => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      priority,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
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

  const handleEdit = (id: string, newTitle: string, newPriority: 'low' | 'medium' | 'high') => {
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
        <h1>Lista Zadań</h1>
        <p>Aktywne zadania: {activeCount}</p>
      </header>
      <main>
        <AddTodoForm onAdd={handleAdd} />
        <FilterBar activeFilter={filter} onFilterChange={setFilter}
                   searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
        <TodoList
          todos={filteredTodos}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </main>
    </div>
  );
}

export default App;