import { Todo, TodoAction } from '../types/todo.types';

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
    .format(date)
    .replace(/\./g, '-');
}

export function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'ADD':
      return [{ id: crypto.randomUUID(), title: action.payload.title, completed: false, priority: action.payload.priority, date: formatDate(new Date())}, ...state];
    case 'TOGGLE':
      return state.map(t => t.id === action.payload ? { ...t, completed: !t.completed } : t);
    case 'DELETE':
      return state.filter(t => t.id !== action.payload);
    case 'EDIT':
      return state.map(t =>
        t.id === action.payload.id ? { ...t, title: action.payload.title, priority: action.payload.priority } : t
      );
    default:
      return state;
  }
}
