import { useNavigate, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTodoContext } from "../context/TodoContext";
import { usePageTitle } from "../hooks/usePageTitle";
import { PriorityType } from "../types/todo.types";
import { AddTodoForm } from "./AddTodoForm";
import { AppButton } from "./common/AppButton";
import { FormPageSkeleton } from "./loading/LoadingSkeletons";

interface TodoFormPageProps {
  mode: "add" | "edit";
  title: string;
}

const headingId = "todo-form-page-title";

export default function TodoFormPage({ mode, title }: TodoFormPageProps) {
  usePageTitle(title);

  const navigate = useNavigate();
  const { todoId } = useParams<{ todoId: string }>();
  const { todos, addTodo, editTodo, isFetching } = useTodoContext();
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

  if (isEditing && isFetching) {
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
          {title}
        </Typography>
        <FormPageSkeleton
          label="Ładowanie zadania do edycji"
          showHeading={false}
        />
      </Box>
    );
  }

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
        <AppButton type="button" variant="contained" onClick={goBackToTasks}>
          Wróć do listy
        </AppButton>
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
        {title}
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
