import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  ReactNode,
} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
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
  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
          primary: {
            main: '#1565C0',
            dark: '#0D47A1',
            light: '#E3F2FD',
          },
          background: {
            default: theme === 'dark' ? '#020617' : '#F5F7FA',
            paper: theme === 'dark' ? '#0F172A' : '#FFFFFF',
          },
          text: {
            primary: theme === 'dark' ? '#F8FAFC' : '#0F172A',
            secondary: theme === 'dark' ? '#CBD5E1' : '#475569',
          },
          error: {
            main: '#C62828',
          },
          success: {
            main: '#2E7D32',
          },
          warning: {
            main: '#E65100',
          },
        },
        shape: {
          borderRadius: 12,
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                minHeight: 44,
                textTransform: 'none',
                fontWeight: 700,
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                minHeight: 44,
                minWidth: 44,
              },
            },
          },
        },
      }),
    [theme],
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
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
    </MuiThemeProvider>
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
