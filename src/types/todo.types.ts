
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
  | { type: 'ADD'; payload: { title: string; priority: PriorityType } }
  | { type: 'TOGGLE'; payload: number }
  | { type: 'DELETE'; payload: number }
  | { type: 'EDIT'; payload: { id: number; title: string; priority: PriorityType } };
