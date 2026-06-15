import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useTodoContext } from "../../context/TodoContext";
import StatsCard from "./StatsCard";

export default function StatsGrid() {
  const { todos } = useTodoContext();
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const pending = todos.filter((todo) => !todo.completed).length;

  return (
    <Box
      component="section"
      aria-label="Statystyki zadań"
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
        gap: { xs: 2, md: 3 },
      }}
    >
      <StatsCard
        title="Wszystkie zadania"
        value={total}
        icon={FormatListBulletedIcon}
        color="#014F86"
        bgColor="#C7E0F4"
      />
      <StatsCard
        title="Ukończone"
        value={completed}
        icon={CheckCircleIcon}
        color="#005C4B"
        bgColor="#BFE7D7"
      />
      <StatsCard
        title="Oczekujące"
        value={pending}
        icon={CircleOutlinedIcon}
        color="#7A3E00"
        bgColor="#F1CF9D"
      />
    </Box>
  );
}
