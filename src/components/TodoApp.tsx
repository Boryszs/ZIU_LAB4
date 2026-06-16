import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { trackCtaClick } from "../analytics";
import { useTodoContext } from "../context/TodoContext";
import { Filter as FilterType } from "../types/todo.types";
import { FilterBar } from "./FilterBar";
import { SearchResults } from "./SearchResults";
import { TodoList } from "./TodoList";

const visuallyHidden = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
};

export default function TodoApp() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { todos, toggleTodo, deleteTodo, isFetching } = useTodoContext();

  const handleStartEdit = (id: string) => {
    navigate(`/tasks/${id}/edit`);
  };

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [todos, searchTerm]);

  const activeCount = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  return (
    <Box
      component="section"
      aria-labelledby="todo-app-title"
      sx={{ minHeight: "100vh", bgcolor: "background.default", p: { xs: 2, md: 3 } }}
    >
      <Box
        component="header"
        sx={{
          mx: "auto",
          width: "100%",
          maxWidth: 700,
          display: "flex",
          alignItems: "center",
          gap: { xs: 2, sm: 5 },
        }}
      >
        <Box component="h2" id="todo-app-title" sx={visuallyHidden}>
          Aplikacja listy zadań
        </Box>
        <SearchResults
          results={filteredTodos}
          query={searchTerm}
          onQueryChange={(value) => {
            setSearchTerm(value);
          }}
        />
      </Box>

      <Box component="header" sx={{ py: 3, textAlign: "center" }}>
        <Typography id="todo-view-heading" component="h1" variant="h4" fontWeight={800}>
          Lista zadań
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Aktywne zadania: {activeCount}
        </Typography>
      </Box>

      <Box component="section" aria-labelledby="todo-view-heading">
        <FilterBar activeFilter={filter} onFilterChange={setFilter} />
        
        {isFetching ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
            <CircularProgress aria-label="Ładowanie zadań..." />
          </Box>
        ) : (
          <TodoList
            todos={filteredTodos}
            filter={filter}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onStartEdit={handleStartEdit}
          />
        )}

        <Box
          sx={{
            mx: "auto",
            mt: 2,
            width: "100%",
            maxWidth: 700,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Fab
            color="primary"
            aria-label="Dodaj nowe zadanie"
            onClick={() => {
              trackCtaClick("add_todo", "tasks_floating_button");
              navigate("/tasks/new");
            }}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Box>
    </Box>
  );
}
