import { createContext, useContext, useEffect, useReducer, useState, ReactNode } from 'react';
import { todoReducer } from '../reducers/todoReducer';
import { PriorityType, Todo } from '../types/todo.types';

interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
  todos: Todo[];
  addTodo: (title: string, priority: PriorityType) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, title: string, priority: PriorityType) => void;
}

const initialTodos: Todo[] = [
  { id: '1', title: 'Nauczyc sie Reacta', completed: false, priority: 'medium', date: '12-12-2026' },
  { id: '2', title: 'Zrobic zakupy', completed: true, priority: 'low', date: '11-12-2026' },
  { id: '3', title: 'Napisac raport', completed: false, priority: 'high', date: '10-12-2026' },
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = window.localStorage.getItem('theme');

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        todos,
        addTodo: (title, priority) => {
          dispatch({ type: 'ADD', payload: { title, priority } });
        },
        toggleTodo: (id) => {
          dispatch({ type: 'TOGGLE', payload: id });
        },
        deleteTodo: (id) => {
          dispatch({ type: 'DELETE', payload: id });
        },
        editTodo: (id, title, priority) => {
          dispatch({ type: 'EDIT', payload: { id, title, priority } });
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}

export function useTodoContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTodoContext must be used within a ThemeProvider');
  }
  return ctx;
}
