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
    () => {
      const isDarkMode = theme === 'dark';
      const colors = {
        primary: isDarkMode ? '#4EA3E8' : '#01579B',
        primaryDark: isDarkMode ? '#B9DCF4' : '#003F73',
        primaryLight: isDarkMode ? '#0B2A44' : '#B9DCF4',
        background: isDarkMode ? '#020617' : '#EAF4FB',
        surface: isDarkMode ? '#0B1220' : '#FFFFFF',
        textPrimary: isDarkMode ? '#F8FAFC' : '#0F172A',
        textSecondary: isDarkMode ? '#D7E3EF' : '#334155',
        border: isDarkMode ? '#3E5870' : '#9AB6C9',
        borderStrong: isDarkMode ? '#6E8AA3' : '#6F91A8',
        error: isDarkMode ? '#F87171' : '#B42318',
        success: isDarkMode ? '#5EEAD4' : '#00695C',
        warning: isDarkMode ? '#FBBF24' : '#8A5A00',
        hover: isDarkMode ? 'rgba(78, 163, 232, 0.16)' : 'rgba(1, 87, 155, 0.10)',
        selected: isDarkMode ? 'rgba(78, 163, 232, 0.24)' : 'rgba(1, 87, 155, 0.16)',
      };

      return createTheme({
        palette: {
          mode: theme,
          contrastThreshold: 4.5,
          primary: {
            main: colors.primary,
            dark: colors.primaryDark,
            light: colors.primaryLight,
            contrastText: '#FFFFFF',
          },
          background: {
            default: colors.background,
            paper: colors.surface,
          },
          text: {
            primary: colors.textPrimary,
            secondary: colors.textSecondary,
          },
          divider: colors.border,
          error: {
            main: colors.error,
          },
          success: {
            main: colors.success,
          },
          warning: {
            main: colors.warning,
          },
          action: {
            hover: colors.hover,
            selected: colors.selected,
            disabled: isDarkMode ? 'rgba(215, 227, 239, 0.42)' : 'rgba(51, 65, 85, 0.42)',
            disabledBackground: isDarkMode
              ? 'rgba(215, 227, 239, 0.14)'
              : 'rgba(51, 65, 85, 0.14)',
          },
        },
        shape: {
          borderRadius: 12,
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              outlined: {
                borderColor: colors.border,
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                minHeight: 44,
                textTransform: 'none',
                fontWeight: 700,
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              notchedOutline: {
                borderColor: colors.borderStrong,
              },
              root: {
                backgroundColor: colors.surface,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: colors.primary,
                },
              },
            },
          },
          MuiInputLabel: {
            styleOverrides: {
              root: {
                color: colors.textSecondary,
              },
            },
          },
          MuiFormLabel: {
            styleOverrides: {
              root: {
                color: colors.textSecondary,
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
          MuiToggleButton: {
            styleOverrides: {
              root: {
                borderColor: colors.borderStrong,
                color: colors.textPrimary,
                '&.Mui-selected': {
                  backgroundColor: colors.primary,
                  color: '#FFFFFF',
                  '&:hover': {
                    backgroundColor: isDarkMode ? '#2F86CC' : '#003F73',
                  },
                },
              },
            },
          },
        },
      });
    },
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
