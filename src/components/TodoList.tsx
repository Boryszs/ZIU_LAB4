import { useMemo } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Filter, Todo } from "../types/todo.types";

interface TodoListProps {
  todos: Todo[];
  filter: Filter;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStartEdit: (id: string) => void;
}

const priorityLabel = {
  low: "Niski",
  medium: "Średni",
  high: "Wysoki",
} as const;

const priorityColor = {
  low: { color: "#1E293B", borderColor: "#64748B", bgcolor: "#E2E8F0" },
  medium: { color: "#6B3A00", borderColor: "#B45309", bgcolor: "#F6D7A8" },
  high: { color: "#7F1D1D", borderColor: "#B91C1C", bgcolor: "#F4B4B4" },
} as const;

function formatTodoDate(value: string) {
  const timestamp = Number(value);

  if (Number.isFinite(timestamp) && value.trim() !== "") {
    return new Intl.DateTimeFormat("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
      .format(new Date(timestamp))
      .replace(/\./g, "-");
  }

  return value;
}

export function TodoList({
  todos,
  filter,
  onToggle,
  onDelete,
  onStartEdit,
}: TodoListProps) {
  const filteredTodos = useMemo(() => {
    if (filter === "active") return todos.filter((todo) => !todo.completed);
    if (filter === "completed") return todos.filter((todo) => todo.completed);
    return todos;
  }, [todos, filter]);

  if (filteredTodos.length === 0) {
    return (
      <Alert
        severity="info"
        role="status"
        aria-live="polite"
        sx={{ mx: "auto", mt: 4, maxWidth: 700 }}
      >
        Brak zadań. Dodaj pierwsze!
      </Alert>
    );
  }

  return (
    <Paper
      component="section"
      aria-label="Lista zadań"
      variant="outlined"
      sx={{ mx: "auto", my: 3, width: "100%", maxWidth: 700, overflow: "hidden" }}
    >
      <List disablePadding>
        {filteredTodos.map((todo) => {
          const colors = priorityColor[todo.priority];

          return (
            <Box
              component="li"
              key={todo.id}
              sx={{
                display: { xs: "grid", sm: "flex" },
                gridTemplateColumns: "auto minmax(0, 1fr)",
                alignItems: { xs: "flex-start", sm: "center" },
                gap: 1.5,
                px: { xs: 2, sm: 2.5 },
                py: 1.5,
                borderBottom: 1,
                borderColor: "divider",
                bgcolor: todo.completed ? "action.hover" : "background.paper",
                transition: "background-color 160ms ease",
                "&:last-child": { borderBottom: 0 },
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <Checkbox
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                inputProps={{
                  "aria-label": todo.completed
                    ? `Oznacz zadanie '${todo.title}' jako nieukończone`
                    : `Oznacz zadanie '${todo.title}' jako ukończone`,
                }}
                sx={{ p: 1 }}
              />

              <Box component="article" sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  component="p"
                  fontWeight={700}
                  noWrap
                  sx={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "text.secondary" : "text.primary",
                  }}
                >
                  {todo.title}
                </Typography>
                <Typography
                  component="p"
                  variant="body2"
                  color="text.secondary"
                  sx={{ textDecoration: todo.completed ? "line-through" : "none" }}
                >
                  {formatTodoDate(todo.date)}
                </Typography>
              </Box>

              <Chip
                label={priorityLabel[todo.priority]}
                size="small"
                variant="outlined"
                sx={{
                  gridColumn: { xs: "2", sm: "auto" },
                  justifySelf: { xs: "start", sm: "auto" },
                  minWidth: 80,
                  fontWeight: 700,
                  ...colors,
                  opacity: todo.completed ? 0.72 : 1,
                }}
              />

              <Stack
                component="footer"
                direction="row"
                spacing={0.5}
                sx={{ gridColumn: { xs: "2", sm: "auto" } }}
              >
                <IconButton
                  type="button"
                  color="primary"
                  onClick={() => onStartEdit(todo.id)}
                  aria-label={`Edytuj zadanie ${todo.title}`}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  type="button"
                  color="error"
                  onClick={() => onDelete(todo.id)}
                  aria-label={`Usuń zadanie ${todo.title}`}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Box>
          );
        })}
      </List>
    </Paper>
  );
}
