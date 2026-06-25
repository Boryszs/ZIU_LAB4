import { Suspense, lazy, type MouseEvent } from "react";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { AppShellSkeleton } from "./components/loading/LoadingSkeletons";

const DashboardLayout = lazy(() => import("./components/dashboard/DashboardLayout"));
const AnalyticsConsent = lazy(() => import("./components/AnalyticsConsent").then(m => ({ default: m.AnalyticsConsent })));
const StatsGrid = lazy(() => import("./components/dashboard/StatsGrid"));
const MultiStepForm = lazy(() => import("./components/MultiStepForm"));
const TasksPage = lazy(() => import("./pages/TasksPage"));
const TodoFormPage = lazy(() => import("./components/TodoFormPage"));
const SettingsPage = lazy(() => import("./SettingsPage"));

const routerFuture = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

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
      <Router future={routerFuture}>
        <AppProvider>
          <Suspense fallback={null}>
            <AnalyticsConsent />
          </Suspense>
          <Suspense fallback={<AppShellSkeleton />}>
            <Routes>
              <Route
                path="/"
                element={<DashboardLayout title="Dashboard" />}
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
        </AppProvider>
      </Router>
    </>
  );
}

export default App;
