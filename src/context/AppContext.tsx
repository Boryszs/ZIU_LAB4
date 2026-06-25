import {
  createContext,
  lazy,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  ReactNode,
} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { todoApiService } from '../api/todoApiService';
import { todoReducer } from '../reducers/todoReducer';
import type { AppThemeMode } from '../theme/colors';
import { appColors, getModeColors } from '../theme/colors';
import { AppStatus } from '../types/appStatus.types';
import { PriorityType } from '../types/todo.types';
import type { Todo } from '../types/todo.types';

const AppStatusSnackbar = lazy(() => import('../components/AppStatusSnackbar'));

interface AppContextType {
  theme: AppThemeMode;
  setTheme: (t: AppThemeMode) => void;
  todos: Todo[];
  isFetching: boolean;
  appStatus: AppStatus;
  loadTodos: () => Promise<void>;
  addTodo: (title: string, priority: PriorityType) => Promise<void>;
  toggleTodo: (id: number, status: boolean) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  editTodo: (id: number, title: string, priority: PriorityType) => Promise<void>;
  getTodoDetails: (id: number) => Promise<Todo>;
}

const idleStatus: AppStatus = { type: 'idle', message: '' };

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
    .format(date)
    .replace(/\./g, '-');
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<AppThemeMode>(() => {
    const savedTheme = window.localStorage.getItem('theme');

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });
  
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [isFetching, setIsFetching] = useState(false);
  const [appStatus, setAppStatus] = useState<AppStatus>(idleStatus);
  const isLoadingTodosRef = useRef(false);
  const todoDetailsRequestsRef = useRef(new Map<number, Promise<Todo>>());

  useEffect(() => {
    // Inicjalne ładowanie zadań przy montowaniu komponentu
    void loadTodos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLoadingStatus = useCallback((message: string) => {
    setAppStatus({ type: 'loading', message });
  }, []);

  const setSuccessStatus = useCallback((message: string) => {
    setAppStatus({ type: 'success', message });
  }, []);

  const setErrorStatus = useCallback((message: string) => {
    setAppStatus({ type: 'error', message });
  }, []);

  const loadTodos = useCallback(
    async () => {
      if (isLoadingTodosRef.current) {
        return;
      }

      isLoadingTodosRef.current = true;
      setIsFetching(true);

      try {
        const fetchedTodos = await todoApiService.getAll();
        dispatch({ type: 'LOAD_TODOS', payload: fetchedTodos });
      } catch (err) {
        setErrorStatus('Nie udało się pobrać listy zadań.');
      } finally {
        isLoadingTodosRef.current = false;
        setIsFetching(false);
      }
    },
    [setErrorStatus],
  );

  const getTodoDetails = useCallback(
    async (id: number) => {
      const currentRequest = todoDetailsRequestsRef.current.get(id);

      if (currentRequest) {
        return currentRequest;
      }

      const request = todoApiService
        .getDetails(id)
        .catch((err) => {
          setErrorStatus('Nie udało się pobrać szczegółów zadania.');
          throw err;
        })
        .finally(() => {
          todoDetailsRequestsRef.current.delete(id);
        });

      todoDetailsRequestsRef.current.set(id, request);

      try {
        return await request;
      } catch (err) {
        throw err;
      }
    },
    [setErrorStatus],
  );

  const handleCloseStatus = useCallback(() => {
    setAppStatus((currentStatus) =>
      currentStatus.type === 'loading' ? currentStatus : idleStatus,
    );
  }, []);

  const muiTheme = useMemo(
    () => {
      const colors = getModeColors(theme);

      return createTheme({
        palette: {
          mode: theme,
          contrastThreshold: 4.5,
          primary: {
            main: colors.primary,
            dark: colors.primaryDark,
            light: colors.primaryLight,
            contrastText: appColors.common.white,
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
            disabled: appColors.action.disabled[theme],
            disabledBackground: appColors.action.disabledBackground[theme],
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
          MuiToggleButton: {
            styleOverrides: {
              root: {
                borderColor: colors.borderStrong,
                color: colors.textPrimary,
                '&.Mui-selected': {
                  backgroundColor: colors.primary,
                  color: appColors.common.white,
                  '&:hover': {
                    backgroundColor: appColors.interaction.selectedButtonHover[theme],
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

  const value = useMemo<AppContextType>(() => ({
    theme,
    setTheme,
    todos,
    isFetching,
    appStatus,
    loadTodos,
    getTodoDetails,
    addTodo: async (title, priority) => {
      setLoadingStatus('Dodawanie zadania...');

      try {
        const createdTodo = await todoApiService.create({
          title,
          priority,
          completed: false,
          date: formatDate(new Date()),
        });

        dispatch({ type: 'ADD_TODO', payload: createdTodo });
        setSuccessStatus('Zadanie dodane pomyślnie!');
      } catch (err) {
        setErrorStatus('Wystąpił błąd podczas dodawania zadania.');
        throw err;
      }
    },
    toggleTodo: async (id, status) => {
      setLoadingStatus('Aktualizowanie statusu zadania...');

      try {
        const updatedTodo = await todoApiService.toggle(id, status);

        dispatch({ type: 'UPDATE_TODO', payload: updatedTodo });
        setSuccessStatus('Status zadania został zaktualizowany.');
      } catch (err) {
        setErrorStatus('Nie udało się zaktualizować statusu.');
      }
    },
    deleteTodo: async (id) => {
      setLoadingStatus('Usuwanie zadania...');

      try {
        await todoApiService.delete(id);
        dispatch({ type: 'DELETE_TODO', payload: id });
        setSuccessStatus('Zadanie zostało usunięte.');
      } catch (err) {
        setErrorStatus('Nie udało się usunąć zadania.');
      }
    },
    editTodo: async (id, title, priority) => {
      setLoadingStatus('Zapisywanie zmian...');

      try {
        const updatedTodo = await todoApiService.update(id, { title, priority });

        dispatch({ type: 'UPDATE_TODO', payload: updatedTodo });
        setSuccessStatus('Zadanie zapisane pomyślnie!');
      } catch (err) {
        setErrorStatus('Wystąpił błąd podczas zapisywania zadania.');
        throw err;
      }
    },
  }), [
    appStatus,
    isFetching,
    setErrorStatus,
    setLoadingStatus,
    setSuccessStatus,
    theme,
    todos,
    loadTodos,
    getTodoDetails,
  ]);

  const isStatusOpen = appStatus.type !== 'idle' && Boolean(appStatus.message);
  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <AppContext.Provider value={value}>
        {children}
      </AppContext.Provider>
      {isStatusOpen && (
        <Suspense fallback={null}>
          <AppStatusSnackbar
            status={appStatus}
            onClose={handleCloseStatus}
          />
        </Suspense>
      )}
    </MuiThemeProvider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return ctx;
}

export function useAppTheme() {
  const { theme, setTheme } = useAppContext();

  return { theme, setTheme };
}
