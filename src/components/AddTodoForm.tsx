import React, { useState, useEffect } from "react";
import { PriorityType, Todo } from "../types/todo.types";
import { useTheme } from "../context/TodoContext";

interface AddTodoFormProps {
  onSave: (title: string, priority: PriorityType) => void;
  onCancel: () => void;
  initialData?: Pick<Todo, 'title' | 'priority'>;
}
export function AddTodoForm({ onSave, onCancel, initialData }: AddTodoFormProps) {
  const [inputValue, setInputValue] = useState<string>(initialData?.title || '');
  const [priority, setPriority] = useState<PriorityType>(initialData?.priority || 'medium');
  const { theme } = useTheme();

  useEffect(() => {
    setInputValue(initialData?.title || '');
    setPriority(initialData?.priority || 'medium');
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSave(inputValue.trim(), priority);
    }
  };
  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f8f9fa', maxWidth: '350px', width: '100%', margin: '20px auto' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Dodaj nowe zadanie..."
          style={{ padding: '10px', fontSize: '1rem' }}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value as PriorityType)} style={{ padding: '10px', fontSize: '1rem' }}>
          <option value="low">Niski</option>
          <option value="medium">Średni</option>
          <option value="high">Wysoki</option>
        </select>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button
            type="submit"
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '10px 15px',
              cursor: 'pointer',
            }}
          >
            {initialData ? 'Zapisz zmiany' : 'Dodaj'}
          </button>
          <button type="button" onClick={onCancel} style={{
            backgroundColor: 'white',
            color: 'grey',
            border: '1px solid grey',
            borderRadius: '4px',
            padding: '10px 15px',
            cursor: 'pointer',
          }}>
            Anuluj
          </button>
        </div>
      </form>
    </div>
  );
}
