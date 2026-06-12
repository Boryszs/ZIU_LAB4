import { useEffect, type ReactNode } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useOutletContext,
} from "react-router-dom";
import { trackPageView } from "./analytics";
import { ThemeProvider } from "./context/TodoContext";
import { AnalyticsConsent } from "./components/AnalyticsConsent";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import StatsGrid from "./components/dashboard/StatsGrid";
import MultiStepForm from "./components/MultiStepForm";
import TodoApp from "./components/TodoApp";
import SettingsPage from "./SettingsPage";

// A wrapper to pass the TodoApp component via Outlet context
const TasksPage = () => {
  const { appTodo } = useOutletContext<{ appTodo: () => ReactNode }>();
  return <>{appTodo()}</>;
};

const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") return;

    trackPageView(`${location.pathname}${location.search}`);
  }, [location.pathname, location.search]);

  return null;
};

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Przejdź do treści głównej
      </a>
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <PageViewTracker />
        <AnalyticsConsent />
        <ThemeProvider>
          <Routes>
            <Route path="/" element={<DashboardLayout appTodo={TodoApp} />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<StatsGrid />} />
              <Route path="tasks" element={<TasksPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="login" element={<MultiStepForm />} />
              <Route path="register" element={<MultiStepForm />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
