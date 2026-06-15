import { useId, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Filter as FilterType } from "../types/todo.types";

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  const filters: FilterType[] = ["all", "active", "completed"];
  const filtersId = useId();
  const filterNames: Record<FilterType, string> = {
    all: "Wszystkie",
    active: "Aktywne",
    completed: "Ukończone",
  };

  const [showFilters, setShowFilters] = useState(true);

  return (
    <Stack
      component="section"
      aria-label="Filtr zadań"
      spacing={1.5}
      alignItems="center"
      sx={{ mx: "auto", my: 2.5, width: "100%", maxWidth: 700 }}
    >
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          type="button"
          aria-label="Pokaż lub ukryj filtry zadań"
          aria-controls={filtersId}
          aria-expanded={showFilters}
          onClick={() => setShowFilters((prev) => !prev)}
          color="primary"
        >
          <FilterListIcon />
        </IconButton>
      </Box>

      <Collapse in={showFilters} unmountOnExit>
        <ToggleButtonGroup
          id={filtersId}
          exclusive
          value={activeFilter}
          aria-label="Filtry zadań"
          onChange={(_, value: FilterType | null) => {
            if (value) {
              onFilterChange(value);
            }
          }}
          sx={{ flexWrap: "wrap", justifyContent: "center", gap: 1 }}
        >
          {filters.map((filter) => (
            <ToggleButton
              key={filter}
              value={filter}
              aria-label={`Pokaż ${filterNames[filter].toLowerCase()} zadania`}
              sx={{ minHeight: 44, px: 2, border: 1, borderColor: "divider" }}
            >
              {filterNames[filter]}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Collapse>
    </Stack>
  );
}
