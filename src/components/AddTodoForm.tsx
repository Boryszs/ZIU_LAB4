import React, { useState } from "react";
import { PriorityType } from "../types/todo.types";

interface AddTodoFormProps {
  onAdd: (title: string, priority: PriorityType) => void;
}
export function AddTodoForm({ onAdd }: AddTodoFormProps) {
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
      setInputValue("");
      setPriority("medium"); // Resetuj priorytet po dodaniu
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Dodaj nowe zadanie..."
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value as PriorityType)}>
        <option value="low">Niski</option>
        <option value="medium">Średni</option>
        <option value="high">Wysoki</option>
      </select>
      <button type="submit">Dodaj</button>
    </form>
  );
}
