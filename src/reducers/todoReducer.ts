import { Todo, TodoAction } from '../types/todo.types';

export function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'LOAD_TODOS':
      return action.payload;
    case 'ADD_TODO':
      return [action.payload, ...state];
    case 'UPDATE_TODO':
      return state.map(t => t.id === action.payload.id ? action.payload : t);
    case 'DELETE_TODO':
      return state.filter(t => t.id !== action.payload);
    default:
      return state;
  }
}
