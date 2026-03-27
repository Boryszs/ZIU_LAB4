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
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: 'white',
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        disabled={isEditing}
        style={{ cursor: 'pointer' }}
      />
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
        <>
          <div style={{ flexGrow: 1, textAlign: 'left' }} onDoubleClick={() => setIsEditing(true)}>
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
        </>
      )}
      <button onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
        {isEditing ? 'Zapisz' : 'Edytuj'}
      </button>
      <button onClick={() => onDelete(todo.id)}>Usuń</button>
    </li>
  );
}