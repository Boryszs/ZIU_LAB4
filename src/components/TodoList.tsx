import { useMemo } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { motion, useReducedMotion } from "framer-motion";
import { Filter, Todo } from "../types/todo.types";
import { listVariants, itemVariants, reducedItemVariants } from "../shared/animations/variants";
import { appColors } from "../theme/colors";

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

const priorityColor = appColors.priority;

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
  const shouldReduceMotion = useReducedMotion();
  const currentItemVariants = shouldReduceMotion ? reducedItemVariants : itemVariants;
  const infoAlert = appColors.alert.info;

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
        sx={(theme) => ({
          mx: "auto",
          mt: 4,
          width: "100%",
          maxWidth: 700,
          alignItems: "center",
          fontSize: 12,
          border: "1px solid",
          borderColor: infoAlert[theme.palette.mode].border,
          borderRadius: 1,
          bgcolor: infoAlert[theme.palette.mode].background,
          color: infoAlert[theme.palette.mode].text,
          boxShadow:
            theme.palette.mode === "dark"
              ? appColors.shadow.todoInfoDark
              : appColors.shadow.todoInfoLight,
          px: { xs: 2, sm: 3 },
          "& .MuiAlert-icon": {
            color: infoAlert[theme.palette.mode].icon,
          },
          "& .MuiAlert-message": {
            width: "100%",
          },
        })}
      >
        <Typography component="p" fontWeight={700}>
          Brak zadań
        </Typography>
      </Alert>
    );
  }

  return (
    <Paper
      component="section"
      aria-label="Lista zadań"
      variant="outlined"
      sx={{ mx: "auto", my: 3, width: "100%", maxWidth: 700, overflow: "visible", border: 'none', bgcolor: 'transparent' }}
    >
      <Box
        component={motion.ul}
        variants={listVariants}
        initial="initial"
        animate="in"
        sx={{ p: 0, m: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 1 }}
      >
        {filteredTodos.map((todo) => {
          const colors = priorityColor[todo.priority];

          return (
            <Box
              component={motion.li}
              variants={currentItemVariants}
              key={todo.id}
              sx={{
                display: "grid",
                gridTemplateColumns: "auto minmax(0, 1fr) auto auto",
                alignItems: "center",
                columnGap: { xs: 0.75, sm: 1.5 },
                rowGap: 1,
                px: { xs: 1.5, sm: 2.5 },
                py: 1.5,
                borderRadius: 2,
                border: 1,
                borderColor: "divider",
                bgcolor: todo.completed ? "action.hover" : "background.paper",
                "@media (prefers-reduced-motion: no-preference)": {
                  transition: "transform 160ms ease, box-shadow 160ms ease, background-color 160ms ease",
                  "&:hover": { 
                    transform: "translateY(-2px)",
                    boxShadow: 3,
                    bgcolor: "action.hover"
                  },
                },
                "@media (prefers-reduced-motion: reduce)": {
                  transition: "background-color 160ms ease",
                  "&:hover": { 
                    bgcolor: "action.hover"
                  },
                }
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
                  justifySelf: "end",
                  minWidth: { xs: 72, sm: 80 },
                  fontWeight: 700,
                  ...colors,
                  opacity: todo.completed ? 0.72 : 1,
                }}
              />

              <Stack
                component="footer"
                direction="row"
                spacing={0.25}
                sx={{ justifySelf: "end" }}
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
      </Box>
    </Paper>
  );
}
