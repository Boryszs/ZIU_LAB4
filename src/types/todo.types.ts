
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  date: string;
}

export type Filter = 'all' | 'active' | 'completed';
export type PriorityType = 'low' | 'medium' | 'high';
export type PriorityFilter = 'all' | PriorityType;
export type AppStatusType = 'idle' | 'loading' | 'success' | 'error';

export interface AppStatus {
  type: AppStatusType;
  message: string;
}

export type TodoAction =
  | { type: 'ADD'; payload: { title: string; priority: PriorityType } }
  | { type: 'TOGGLE'; payload: string }
  | { type: 'DELETE'; payload: string }
  | { type: 'EDIT'; payload: { id: string; title: string; priority: PriorityType } };
