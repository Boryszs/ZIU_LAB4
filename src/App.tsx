import { Suspense, lazy, type ReactNode } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useOutletContext,
} from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { ThemeProvider } from "./context/TodoContext";

const DashboardLayout = lazy(() => import("./components/dashboard/DashboardLayout"));
const AnalyticsConsent = lazy(() => import("./components/AnalyticsConsent").then(m => ({ default: m.AnalyticsConsent })));
const StatsGrid = lazy(() => import("./components/dashboard/StatsGrid"));
const MultiStepForm = lazy(() => import("./components/MultiStepForm"));
const TodoApp = lazy(() => import("./components/TodoApp"));
const TodoFormPage = lazy(() => import("./components/TodoFormPage"));
const SettingsPage = lazy(() => import("./SettingsPage"));

// A wrapper to pass the TodoApp component via Outlet context
const TasksPage = () => {
  const { appTodo } = useOutletContext<{ appTodo: () => ReactNode }>();
  return <>{appTodo()}</>;
};

const LoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress aria-label="Wczytywanie..." />
  </Box>
);

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Przejdź do treści głównej
      </a>
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <ThemeProvider>
          <Suspense fallback={null}>
            <AnalyticsConsent />
          </Suspense>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<DashboardLayout appTodo={() => <TodoApp />} />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<StatsGrid />} />
                <Route path="tasks" element={<TasksPage />} />
                <Route path="tasks/new" element={<TodoFormPage mode="add" />} />
                <Route
                  path="tasks/:todoId/edit"
                  element={<TodoFormPage mode="edit" />}
                />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="login" element={<MultiStepForm />} />
                <Route path="register" element={<MultiStepForm />} />
              </Route>
            </Routes>
          </Suspense>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
