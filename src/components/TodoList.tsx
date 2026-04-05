import { useMemo } from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Checkbox,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Filter, Todo } from "../types/todo.types";

interface TodoListProps {
  todos: Todo[];
  filter: Filter;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onStartEdit: (id: string) => void;
}

const priorityColor = {
  low: "default",
  medium: "warning",
  high: "error",
} as const;

const priorityLabel = {
  low: "Niski",
  medium: "Sredni",
  high: "Wysoki",
} as const;

export function TodoList({
  todos,
  filter,
  onToggle,
  onDelete,
  onStartEdit,
}: TodoListProps) {
  const filteredTodos = useMemo(() => {
    if (filter === "active") {
      return todos.filter((todo) => !todo.completed);
    }
    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  }, [todos, filter]);

  if (filteredTodos.length === 0) {
    return (
      <Typography color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
        Brak zadan. Dodaj pierwsze!
      </Typography>
    );
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        overflow: "hidden",
        maxWidth: 700,
        width: "100%",
        mx: "auto",
        my: 3,
        borderRadius: 3,
      }}
    >
      <List disablePadding>
        {filteredTodos.map((todo, idx) => (
          <ListItem
            key={todo.id}
            divider={idx < filteredTodos.length - 1}
            sx={{
              bgcolor: todo.completed ? "action.hover" : "background.paper",
              alignItems: "center",
              gap: 1,
            }}
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  color="primary"
                  onClick={() => onStartEdit(todo.id)}
                  aria-label="Edytuj zadanie"
                  sx={{ mr: 0.5 }}
                >
                  <EditOutlinedIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  color="error"
                  onClick={() => onDelete(todo.id)}
                  aria-label="Usun zadanie"
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </>
            }
          >
            <ListItemIcon sx={{ minWidth: 44 }}>
              <Checkbox
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                icon={<CheckBoxOutlineBlankIcon />}
                checkedIcon={<CheckBoxIcon />}
                slotProps={{ input: { "aria-label": todo.title } }}
              />
            </ListItemIcon>

            <ListItemText
              primary={todo.title}
              secondary={todo.date}
              slotProps={{
                primary: {
                  sx: {
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "text.disabled" : "text.primary",
                    fontWeight: 600,
                  },
                },
                secondary: {
                  sx: {
                    textDecoration: todo.completed ? "line-through" : "none",
                  },
                },
              }}
            />
            <Chip
              label={priorityLabel[todo.priority]}
              size="small"
              color={priorityColor[todo.priority]}
              variant={todo.completed ? "outlined" : "filled"}
              sx={{ mr: 6, width: 80}}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
