import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useOutletContext,
} from "react-router-dom";
import { ThemeProvider } from "./context/TodoContext";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import StatsGrid from "./components/dashboard/StatsGrid";
import MultiStepForm from "./components/MultiStepForm";
import TodoApp from "./components/TodoApp";
import SettingsPage from "./SettingsPage";

// A wrapper to pass the TodoApp component via Outlet context
const TasksPage = () => {
  const { appTodo } = useOutletContext<{ appTodo: () => React.ReactNode }>();
  return <>{appTodo()}</>;
};

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Przejdź do treści głównej
      </a>
      <BrowserRouter>
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
