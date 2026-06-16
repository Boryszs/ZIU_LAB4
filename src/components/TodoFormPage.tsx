import { useNavigate, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTodoContext } from "../context/TodoContext";
import { PriorityType } from "../types/todo.types";
import { AddTodoForm } from "./AddTodoForm";

interface TodoFormPageProps {
  mode: "add" | "edit";
}

const headingId = "todo-form-page-title";

export default function TodoFormPage({ mode }: TodoFormPageProps) {
  const navigate = useNavigate();
  const { todoId } = useParams<{ todoId: string }>();
  const { todos, addTodo, editTodo } = useTodoContext();
  const isEditing = mode === "edit";
  const todo = isEditing ? todos.find((item) => item.id === todoId) : undefined;

  const goBackToTasks = () => {
    navigate("/tasks");
  };

  const handleSave = async (title: string, priority: PriorityType) => {
    if (isEditing) {
      if (!todoId) return;
      await editTodo(todoId, title, priority);
    } else {
      await addTodo(title, priority);
    }

    goBackToTasks();
  };

  if (isEditing && !todo) {
    return (
      <Box
        component="section"
        aria-labelledby={headingId}
        sx={{
          mx: "auto",
          width: "100%",
          maxWidth: 560,
          py: { xs: 2, md: 3 },
        }}
      >
        <Typography
          id={headingId}
          component="h1"
          variant="h4"
          fontWeight={800}
          sx={{ mb: 2 }}
        >
          Nie znaleziono zadania
        </Typography>
        <Alert severity="error" role="alert" sx={{ mb: 2 }}>
          Nie znaleziono zadania do edycji.
        </Alert>
        <Button type="button" variant="contained" onClick={goBackToTasks}>
          Wróć do listy
        </Button>
      </Box>
    );
  }

  return (
    <Box
      component="section"
      aria-labelledby={headingId}
      sx={{
        mx: "auto",
        width: "100%",
        maxWidth: 560,
        py: { xs: 2, md: 3 },
      }}
    >
      <Typography
        id={headingId}
        component="h1"
        variant="h4"
        fontWeight={800}
        sx={{ mb: 2 }}
      >
        {isEditing ? "Edytuj zadanie" : "Dodaj nowe zadanie"}
      </Typography>
      <Paper
        variant="outlined"
        sx={{
          borderRadius: 2,
          p: { xs: 2, sm: 3 },
        }}
      >
        <AddTodoForm
          onSave={handleSave}
          onCancel={goBackToTasks}
          initialData={todo}
          headingId={headingId}
          showHeading={false}
        />
      </Paper>
    </Box>
  );
}
