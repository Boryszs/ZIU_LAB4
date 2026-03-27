import React from 'react';
import { Todo, PriorityType } from '../types/todo.types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStartEdit: (id: string) => void;
}

export function TodoList({ todos, onToggle, onDelete, onStartEdit }: TodoListProps) {
  if (todos.length === 0) {
    return <p>Brak zadań do wyświetlenia.</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '700px', width: '100%', margin: '20px auto' }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onStartEdit={onStartEdit}
        />
      ))}
    </ul>
  );
}