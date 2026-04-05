import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { PriorityType, Todo } from "../types/todo.types";

interface AddTodoFormProps {
  onSave: (title: string, priority: PriorityType) => void;
  onCancel: () => void;
  initialData?: Pick<Todo, "title" | "priority">;
}

export function AddTodoForm({
  onSave,
  onCancel,
  initialData,
}: AddTodoFormProps) {
  const [inputValue, setInputValue] = useState<string>(
    initialData?.title || "",
  );
  const [priority, setPriority] = useState<PriorityType>(
    initialData?.priority || "medium",
  );

  useEffect(() => {
    setInputValue(initialData?.title || "");
    setPriority(initialData?.priority || "medium");
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      return;
    }

    onSave(inputValue.trim(), priority);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        maxWidth: 420,
        width: "100%",
        mx: "auto",
        my: 3,
        borderRadius: 3,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "grid", gap: 2, textAlign: "left" }}
      >
        <Typography variant="h6">
          {initialData ? "Edytuj zadanie" : "Dodaj nowe zadanie"}
        </Typography>

        <TextField
          fullWidth
          size="medium"
          label="Tresc zadania"
          placeholder="Wpisz tresc zadania..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <FormControl fullWidth size="medium">
          <InputLabel id="priority-label">Priorytet</InputLabel>
          <Select
            labelId="priority-label"
            value={priority}
            label="Priorytet"
            sx={{ textAlign: "left" }}
            onChange={(e) => setPriority(e.target.value as PriorityType)}
          >
            <MenuItem value="low">Niski</MenuItem>
            <MenuItem value="medium">Sredni</MenuItem>
            <MenuItem value="high">Wysoki</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", gap: 1.5, justifyContent: "flex-end" }}>
          <Button
            type="button"
            variant="outlined"
            color="inherit"
            onClick={onCancel}
            startIcon={<CancelIcon />}
          >
            Anuluj
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={initialData ? <SaveIcon /> : <AddIcon />}
            disabled={!inputValue.trim()}
          >
            {initialData ? "Zapisz zmiany" : "Dodaj"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
