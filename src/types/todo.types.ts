export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export type Filter = 'all' | 'active' | 'completed';
export type PriorityType = 'low' | 'medium' | 'high';

export type TodoAction =
  | { type: 'ADD'; payload: { title: string; priority: PriorityType } }
  | { type: 'TOGGLE'; payload: string }
  | { type: 'DELETE'; payload: string }
  | { type: 'EDIT'; payload: { id: string; title: string; priority: PriorityType } };