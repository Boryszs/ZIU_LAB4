import { Grid } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import StatsCard from "./StatsCard";
import { useTheme } from "../../context/TodoContext";

export default function StatsGrid() {
  useTheme();
  // TODO 2: Oblicz wartości na podstawie state.todos
  const total = 0; // UZUPEŁNIJ: liczba wszystkich zadań
  const completed = 0; // UZUPEŁNIJ: liczba ukończonych
  const pending = 0; // UZUPEŁNIJ: liczba oczekujących
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <StatsCard
          title="Wszystkie zadania"
          value={total}
          icon={FormatListBulletedIcon}
          color="#1565C0"
          bgColor="#E3F2FD"
        />
      </Grid>
      {/* TODO 3: Dodaj karty dla Ukończone i Oczekujące */}
    </Grid>
  );
}
