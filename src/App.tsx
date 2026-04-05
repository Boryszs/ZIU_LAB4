import "./App.css";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import { ThemeProvider } from "./context/TodoContext";

function App() {
  return (
    <ThemeProvider>
      <DashboardLayout />
    </ThemeProvider>
  );
}

export default App;
