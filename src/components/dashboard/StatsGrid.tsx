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
        color="#1565C0"
        bgColor="#E3F2FD"
      />
      <StatsCard
        title="Ukończone"
        value={completed}
        icon={CheckCircleIcon}
        color="#2E7D32"
        bgColor="#E8F5E9"
      />
      <StatsCard
        title="Oczekujące"
        value={pending}
        icon={CircleOutlinedIcon}
        color="#E65100"
        bgColor="#FFF3E0"
      />
    </Box>
  );
}
