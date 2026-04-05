import { Grid } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import StatsCard from "./StatsCard";
import { useTodoContext } from "../../context/TodoContext";

export default function StatsGrid() {
  const { todos } = useTodoContext();
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const pending = todos.filter((todo) => !todo.completed).length;

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
      <Grid size={{ xs: 12, sm: 4 }}>
        <StatsCard
          title="Ukonczone"
          value={completed}
          icon={CheckCircleIcon}
          color="#2E7D32"
          bgColor="#E8F5E9"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <StatsCard
          title="Oczekujace"
          value={pending}
          icon={RadioButtonUncheckedIcon}
          color="#E65100"
          bgColor="#FFF3E0"
        />
      </Grid>
    </Grid>
  );
}
