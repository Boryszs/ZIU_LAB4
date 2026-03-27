import React, { useState } from "react";
import { PriorityType } from "../types/todo.types";

interface AddTodoFormProps {
  onAdd: (title: string, priority: PriorityType) => void;
  onCancel: () => void;
}
export function AddTodoForm({ onAdd, onCancel }: AddTodoFormProps) {
  // TODO (1): zadeklaruj stan inputValue za pomocą useState<string>
  const [inputValue, setInputValue] = useState<string>('');
  const [priority, setPriority] = useState<PriorityType>('medium'); // Domyślny priorytet

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO (2): sprawdź, czy inputValue.trim() nie jest pusty
    //           jeśli tak: wywołaj onAdd(inputValue.trim())
    //           i zresetuj inputValue do pustego stringa
    if (inputValue.trim()) {
      onAdd(inputValue.trim(), priority);
      // Stan nie musi być resetowany, komponent zostanie odmontowany
    }
  };
  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: 'white', maxWidth: '350px', width: '100%', margin: '20px auto' }}>
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
          <button type="submit">Dodaj</button>
          <button type="button" onClick={onCancel}>
            Anuluj
          </button>
        </div>
      </form>
    </div>
  );
}
