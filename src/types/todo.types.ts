
export enum Filter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export enum PriorityType {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export enum PriorityFilter {
  All = 'all',
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority: PriorityType;
  date: string;
}

export type TodoAction =
  | { type: 'LOAD_TODOS'; payload: Todo[] }
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'UPDATE_TODO'; payload: Todo }
  | { type: 'DELETE_TODO'; payload: number };
