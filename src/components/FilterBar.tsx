import React from 'react';
import { Filter as FilterType } from '../types/todo.types';

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

export function FilterBar({ activeFilter, onFilterChange, searchTerm, onSearchTermChange }: FilterBarProps) {
  const filters: FilterType[] = ['all', 'active', 'completed'];
  const filterNames: Record<FilterType, string> = {
    all: 'Wszystkie',
    active: 'Aktywne',
    completed: 'Ukończone',
  };

  return (
    <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
      <input
        type="text"
        placeholder="Wyszukaj zadania..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', flexGrow: 1 }}
      />
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          style={{
            backgroundColor: activeFilter === filter ? '#007bff' : '#f8f9fa',
            color: activeFilter === filter ? 'white' : 'black',
          }}
        >
          {filterNames[filter]}
        </button>
      ))}
    </div>
  );
}