import React from 'react';
import { Todo, PriorityType } from '../types/todo.types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStartEdit: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onStartEdit }: TodoItemProps) {

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: 'white',
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => { e.stopPropagation(); onToggle(todo.id); }}
        style={{ cursor: 'pointer' }}
      />
      <div style={{ flexGrow: 1, textAlign: 'left', cursor: 'pointer' }} onClick={() => onStartEdit(todo.id)}>
        <span style={{ fontWeight: 'bold', textDecoration: todo.completed ? 'line-through' : 'none' }}>
          {todo.title}
        </span>
        <span style={{ marginLeft: '10px', color: 'grey' }}>
          {todo.date}
        </span>
      </div>
      <span
        style={{
          backgroundColor: '#343a40',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '0.8em',
          whiteSpace: 'nowrap',
        }}
      >
        {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
      </span>
      <button onClick={(e) => { e.stopPropagation(); onDelete(todo.id); }}>Usuń</button>
    </li>
  );
}