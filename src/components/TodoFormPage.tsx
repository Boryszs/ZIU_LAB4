import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import { useAppContext } from "../context/AppContext";
import { usePageTitle } from "../hooks/usePageTitle";
import { PriorityType } from "../types/todo.types";
import type { Todo } from "../types/todo.types";
import { AddTodoForm } from "./AddTodoForm";
import { AppButton } from "./common/AppButton";
import { FormPageSkeleton } from "./loading/LoadingSkeletons";
import { TodoFormPageLayout } from "./todo/TodoFormPageLayout";

interface TodoFormPageProps {
  mode: "add" | "edit";
  title: string;
}

const headingId = "todo-form-page-title";

export default function TodoFormPage({ mode, title }: TodoFormPageProps) {
  usePageTitle(title);

  const navigate = useNavigate();
  const { todoId } = useParams<{ todoId: string }>();
  const { addTodo, editTodo, getTodoDetails } = useAppContext();
  const isEditing = mode === "edit";
  const parsedTodoId = todoId ? Number(todoId) : null;
  const [todo, setTodo] = useState<Todo | undefined>();
  const [isLoadingTodo, setIsLoadingTodo] = useState(isEditing);

  useEffect(() => {
    if (!isEditing) {
      setTodo(undefined);
      setIsLoadingTodo(false);
      return;
    }

    if (parsedTodoId === null || Number.isNaN(parsedTodoId)) {
      setTodo(undefined);
      setIsLoadingTodo(false);
      return;
    }

    let isActive = true;

    const loadTodoDetails = async () => {
      setIsLoadingTodo(true);

      try {
        const loadedTodo = await getTodoDetails(parsedTodoId);

        if (isActive) {
          setTodo(loadedTodo);
        }
      } catch (err) {
        if (isActive) {
          setTodo(undefined);
        }
      } finally {
        if (isActive) {
          setIsLoadingTodo(false);
        }
      }
    };

    loadTodoDetails();

    return () => {
      isActive = false;
    };
  }, [getTodoDetails, isEditing, parsedTodoId]);

  const goBackToTasks = () => {
    navigate("/tasks");
  };

  const handleSave = async (title: string, priority: PriorityType) => {
    if (isEditing) {
      if (parsedTodoId === null || Number.isNaN(parsedTodoId)) return;
      await editTodo(parsedTodoId, title, priority);
    } else {
      await addTodo(title, priority);
    }

    goBackToTasks();
  };

  if (isEditing && isLoadingTodo) {
    return (
      <TodoFormPageLayout headingId={headingId} title={title}>
        <FormPageSkeleton
          contained
          label="Ładowanie zadania do edycji"
          showHeading={false}
        />
      </TodoFormPageLayout>
    );
  }

  if (isEditing && !todo) {
    return (
      <TodoFormPageLayout headingId={headingId} title="Nie znaleziono zadania">
        <Alert severity="error" role="alert" sx={{ mb: 2 }}>
          Nie znaleziono zadania do edycji.
        </Alert>
        <AppButton type="button" variant="contained" onClick={goBackToTasks}>
          Wróć do listy
        </AppButton>
      </TodoFormPageLayout>
    );
  }

  return (
    <TodoFormPageLayout headingId={headingId} title={title}>
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
    </TodoFormPageLayout>
  );
}
