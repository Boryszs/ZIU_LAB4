import React, { useState } from 'react';
import { Todo, PriorityType } from '../types/todo.types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTitle: string, newPriority: PriorityType) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newPriority, setNewPriority] = useState<PriorityType>(todo.priority);

  const handleSave = () => {
    if (newTitle.trim()) {
      onEdit(todo.id, newTitle.trim(), newPriority);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setNewTitle(todo.title);
      setNewPriority(todo.priority);
    }
  };

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px',
        border: '1px solid #ddd',
        borderRadius: '4px',
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        disabled={isEditing}
      />
      {!isEditing && (
        <span
          style={{
            minWidth: '60px',
            padding: '2px 5px',
            borderRadius: '3px',
            backgroundColor: todo.priority === 'high' ? '#f8d7da' : todo.priority === 'medium' ? '#fff3cd' : '#d4edda',
            color: todo.priority === 'high' ? '#721c24' : todo.priority === 'medium' ? '#856404' : '#155724',
            fontSize: '0.8em',
            textAlign: 'center',
          }}
        >
          {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
        </span>
      )}
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            style={{ flexGrow: 1 }}
          />
          <select value={newPriority} onChange={(e) => setNewPriority(e.target.value as PriorityType)}>
            <option value="low">Niski</option>
            <option value="medium">Średni</option>
            <option value="high">Wysoki</option>
          </select>
        </>
      ) : (
        <span
          style={{ textDecoration: todo.completed ? 'line-through' : 'none', flexGrow: 1 }}
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </span>
      )}
      <button onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
        {isEditing ? 'Zapisz' : 'Edytuj'}
      </button>
      <button onClick={() => onDelete(todo.id)}>Usuń</button>
    </li>
  );
}