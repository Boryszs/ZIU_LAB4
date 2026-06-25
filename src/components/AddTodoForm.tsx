import { useCallback, useEffect, useId, useRef, useState, type FormEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { trackFormAbandonment, trackFormSubmit } from "../analytics";
import { priorityOptions } from "../constants/priorityOptions";
import { PriorityType } from "../types/todo.types";
import type { Todo } from "../types/todo.types";
import { AppButton } from "./common/AppButton";
import { AppSelectField } from "./common/AppSelectField";

interface AddTodoFormProps {
  onSave: (title: string, priority: PriorityType) => Promise<void>;
  onCancel: () => void;
  initialData?: Pick<Todo, "title" | "priority">;
  headingId?: string;
  showHeading?: boolean;
}

export function AddTodoForm({
  onSave,
  onCancel,
  initialData,
  headingId,
  showHeading = true,
}: AddTodoFormProps) {
  const [inputValue, setInputValue] = useState(initialData?.title || "");
  const [priority, setPriority] = useState<PriorityType>(
    initialData?.priority || PriorityType.Medium,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasInteractedRef = useRef(false);
  const submittedRef = useRef(false);
  const abandonmentSentRef = useRef(false);
  const [titleTouched, setTitleTouched] = useState(false);
  const isEditing = Boolean(initialData);
  const formName = isEditing ? "todo_edit" : "todo_create";
  const formNameRef = useRef(formName);
  const isMounted = useRef(true);

  const emitAbandonment = useCallback(() => {
    if (
      hasInteractedRef.current &&
      !submittedRef.current &&
      !abandonmentSentRef.current
    ) {
      trackFormAbandonment(formNameRef.current);
      abandonmentSentRef.current = true;
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setInputValue(initialData?.title || "");
    setPriority(initialData?.priority || PriorityType.Medium);
    setTitleTouched(false);
  }, [initialData]);

  useEffect(() => {
    formNameRef.current = formName;
  }, [formName]);

  useEffect(() => {
    return emitAbandonment;
  }, [emitAbandonment]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim()) {
      setTitleTouched(true);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSave(inputValue.trim(), priority);
      if (isMounted.current) {
        submittedRef.current = true;
        trackFormSubmit(formName, "success");
      }
    } catch (e) {
      if (isMounted.current) {
        trackFormSubmit(formName, "error");
      }
    } finally {
      if (isMounted.current) {
        setIsSubmitting(false);
      }
    }
  };

  const handleCancel = () => {
    emitAbandonment();
    onCancel();
  };

  const generatedHeadingId = useId();
  const resolvedHeadingId = headingId ?? generatedHeadingId;
  const titleError = titleTouched && !inputValue.trim()
    ? "Treść zadania jest wymagana."
    : "";

  return (
    <Box
      component="section"
      aria-labelledby={showHeading ? resolvedHeadingId : headingId}
      sx={{ width: "100%" }}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          {showHeading && (
            <Typography
              id={resolvedHeadingId}
              component="h2"
              variant="h5"
              fontWeight={800}
            >
              {isEditing ? "Edytuj zadanie" : "Dodaj zadanie"}
            </Typography>
          )}

          <TextField
            id="todo-title"
            label="Treść zadania"
            placeholder="Wpisz treść zadania..."
            value={inputValue}
            disabled={isSubmitting}
            onBlur={() => setTitleTouched(true)}
            onChange={(event) => {
              hasInteractedRef.current = true;
              setTitleTouched(true);
              setInputValue(event.target.value);
            }}
            required
            error={Boolean(titleError)}
            helperText={titleError || " "}
            FormHelperTextProps={titleError ? { role: "alert" } : undefined}
            fullWidth
          />

          <AppSelectField
            id="todo-priority"
            disabled={isSubmitting}
            label="Priorytet"
            options={priorityOptions}
            value={priority}
            onChange={(event) => {
              hasInteractedRef.current = true;
              setPriority(event.target.value as PriorityType);
            }}
          />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            justifyContent="flex-end"
          >
            <AppButton
              type="button"
              variant="outlined"
              tone="neutral"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              Anuluj
            </AppButton>

            <AppButton
              type="submit"
              variant="contained"
              disabled={!inputValue.trim() || isSubmitting}
              loading={isSubmitting}
              startIcon={isEditing ? <SaveIcon /> : <AddIcon />}
            >
              {isSubmitting ? "Zapisywanie..." : isEditing ? "Zapisz zmiany" : "Dodaj"}
            </AppButton>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
