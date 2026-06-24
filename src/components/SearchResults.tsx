import { useEffect, useRef, useState, type FormEvent } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AppButton } from "./common/AppButton";
import type { Todo } from "../types/todo.types";

interface SearchResultsProps {
  results: Todo[];
  query: string;
  onQueryChange: (value: string) => void;
}

export function SearchResults({
  results,
  query,
  onQueryChange,
}: SearchResultsProps) {
  const [announcement, setAnnouncement] = useState("");
  const announcementTimeout = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (announcementTimeout.current !== null) {
        window.clearTimeout(announcementTimeout.current);
      }
    };
  }, []);

  const announce = (message: string) => {
    if (announcementTimeout.current !== null) {
      window.clearTimeout(announcementTimeout.current);
    }

    setAnnouncement("");
    announcementTimeout.current = window.setTimeout(() => {
      setAnnouncement(message);
      announcementTimeout.current = null;
    }, 0);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedQuery = query.trim();
    if (normalizedQuery === "") {
      announce("Wpisz frazę, aby wyszukać zadania.");
      return;
    }

    announce(`Znaleziono ${results.length} wyników dla: ${normalizedQuery}`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack
        component="form"
        role="search"
        aria-label="Wyszukiwarka zadań"
        onSubmit={handleSubmit}
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
      >
        <TextField
          id="todo-search"
          type="search"
          label="Wyszukaj zadania"
          placeholder="Wyszukaj zadania..."
          value={query}
          onChange={(event) => {
            if (announcementTimeout.current !== null) {
              window.clearTimeout(announcementTimeout.current);
              announcementTimeout.current = null;
            }

            onQueryChange(event.target.value);
            setAnnouncement("");
          }}
          inputProps={{ "aria-describedby": "search-status" }}
          size="small"
          fullWidth
        />
        <AppButton type="submit" variant="contained" sx={{ minWidth: 112 }}>
          Szukaj
        </AppButton>
      </Stack>

      <Typography
        id="search-status"
        component="p"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1, minHeight: 20 }}
      >
        {announcement}
      </Typography>
    </Box>
  );
}
