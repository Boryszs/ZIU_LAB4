import { Suspense, lazy, type MouseEvent } from "react";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
  useOutletContext,
} from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { ThemeProvider } from "./context/TodoContext";
import { usePageTitle } from "./hooks/usePageTitle";
import type { DashboardOutletContext } from "./components/dashboard/DashboardLayout";

const DashboardLayout = lazy(() => import("./components/dashboard/DashboardLayout"));
const AnalyticsConsent = lazy(() => import("./components/AnalyticsConsent").then(m => ({ default: m.AnalyticsConsent })));
const StatsGrid = lazy(() => import("./components/dashboard/StatsGrid"));
const MultiStepForm = lazy(() => import("./components/MultiStepForm"));
const TodoApp = lazy(() => import("./components/TodoApp"));
const TodoFormPage = lazy(() => import("./components/TodoFormPage"));
const SettingsPage = lazy(() => import("./SettingsPage"));

// A wrapper to pass the TodoApp component via Outlet context
interface TitledPageProps {
  title: string;
}

const TasksPage = ({ title }: TitledPageProps) => {
  usePageTitle(title);

  const { appTodo } = useOutletContext<DashboardOutletContext>();
  return <>{appTodo?.()}</>;
};

const LoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress aria-label="Wczytywanie..." />
  </Box>
);

function App() {
  const handleSkipToMain = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const mainContent = document.getElementById("main-content");
    mainContent?.focus({ preventScroll: true });
    mainContent?.scrollIntoView?.({ block: "start" });
  };

  return (
    <>
      <a
        href="#main-content"
        className="skip-link"
        onClick={handleSkipToMain}
      >
        Przejdź do treści głównej
      </a>
      <Router>
        <ThemeProvider>
          <Suspense fallback={null}>
            <AnalyticsConsent />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route
                path="/"
                element={
                  <DashboardLayout
                    appTodo={() => <TodoApp />}
                    title="Dashboard"
                  />
                }
              >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route
                  path="dashboard"
                  element={<StatsGrid title="Dashboard" />}
                />
                <Route path="tasks" element={<TasksPage title="Zadania" />} />
                <Route
                  path="tasks/new"
                  element={<TodoFormPage mode="add" title="Dodaj zadanie" />}
                />
                <Route
                  path="tasks/:todoId/edit"
                  element={
                    <TodoFormPage mode="edit" title="Edytuj zadanie" />
                  }
                />
                <Route
                  path="settings"
                  element={<SettingsPage title="Ustawienia" />}
                />
                <Route
                  path="login"
                  element={<MultiStepForm title="Logowanie" />}
                />
                <Route
                  path="register"
                  element={<MultiStepForm title="Rejestracja" />}
                />
              </Route>
            </Routes>
          </Suspense>
        </ThemeProvider>
      </Router>
    </>
  );
}

export default App;
