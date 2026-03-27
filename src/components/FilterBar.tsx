import React, { useState } from 'react';
import { Filter as FilterType } from '../types/todo.types';

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  const filters: FilterType[] = ['all', 'active', 'completed'];
  const filterNames: Record<FilterType, string> = {
    all: 'Wszystkie',
    active: 'Aktywne',
    completed: 'Ukończone',
  };

  const [showFilters, setShowFilters] = useState(true); // Stan do kontrolowania widoczności filtrów

  return (
    <div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', maxWidth: '700px', width: '100%', margin: '20px auto' }}>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', width: '100%' }}>
        <button onClick={() => setShowFilters(!showFilters)} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', background: '#f8f9fa', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </button>
      </div>
      {showFilters && (
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              style={{
                backgroundColor: activeFilter === filter ? '#007bff' : '#f8f9fa',
                color: activeFilter === filter ? 'white' : 'grey',
                border: activeFilter === filter ? '1px solid #007bff' : '1px solid #708090',
                borderRadius: '4px',
                padding: '8px 12px',
              }}
            >
              {filterNames[filter]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}