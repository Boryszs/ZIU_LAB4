import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { trackFormAbandonment, trackFormSubmit } from "../analytics";
import { PriorityType, Todo } from "../types/todo.types";

interface AddTodoFormProps {
  onSave: (title: string, priority: PriorityType) => void;
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
    initialData?.priority || "medium",
  );
  const hasInteractedRef = useRef(false);
  const submittedRef = useRef(false);
  const abandonmentSentRef = useRef(false);
  const [titleTouched, setTitleTouched] = useState(false);
  const isEditing = Boolean(initialData);
  const formName = isEditing ? "todo_edit" : "todo_create";
  const formNameRef = useRef(formName);

  const emitAbandonment = () => {
    if (
      hasInteractedRef.current &&
      !submittedRef.current &&
      !abandonmentSentRef.current
    ) {
      trackFormAbandonment(formNameRef.current);
      abandonmentSentRef.current = true;
    }
  };

  useEffect(() => {
    setInputValue(initialData?.title || "");
    setPriority(initialData?.priority || "medium");
    setTitleTouched(false);
  }, [initialData]);

  useEffect(() => {
    formNameRef.current = formName;
  }, [formName]);

  useEffect(() => {
    return () => {
      if (
        hasInteractedRef.current &&
        !submittedRef.current &&
        !abandonmentSentRef.current
      ) {
        trackFormAbandonment(formNameRef.current);
        abandonmentSentRef.current = true;
      }
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputValue.trim()) {
      setTitleTouched(true);
      return;
    }
    submittedRef.current = true;
    trackFormSubmit(formName, "success");
    onSave(inputValue.trim(), priority);
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
              {isEditing ? "Edytuj zadanie" : "Dodaj nowe zadanie"}
            </Typography>
          )}

          <TextField
            id="todo-title"
            label="Treść zadania"
            placeholder="Wpisz treść zadania..."
            value={inputValue}
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

          <FormControl fullWidth>
            <InputLabel id="todo-priority-label">Priorytet</InputLabel>
            <Select
              labelId="todo-priority-label"
              id="todo-priority"
              value={priority}
              label="Priorytet"
              onChange={(event) => {
                hasInteractedRef.current = true;
                setPriority(event.target.value as PriorityType);
              }}
            >
              <MenuItem value="low">Niski</MenuItem>
              <MenuItem value="medium">Średni</MenuItem>
              <MenuItem value="high">Wysoki</MenuItem>
            </Select>
          </FormControl>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            justifyContent="flex-end"
          >
            <Button
              type="button"
              variant="outlined"
              color="inherit"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
            >
              Anuluj
            </Button>

            <Button
              type="submit"
              variant="contained"
              startIcon={isEditing ? <SaveIcon /> : <AddIcon />}
              disabled={!inputValue.trim()}
            >
              {isEditing ? "Zapisz zmiany" : "Dodaj"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
