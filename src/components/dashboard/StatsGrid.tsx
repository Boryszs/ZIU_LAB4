import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useTodoContext } from "../../context/TodoContext";
import { usePageTitle } from "../../hooks/usePageTitle";
import { appColors } from "../../theme/colors";
import StatsCard from "./StatsCard";

interface StatsGridProps {
  title: string;
}

export default function StatsGrid({ title }: StatsGridProps) {
  usePageTitle(title);

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
        color={appColors.dashboard.total.color}
        bgColor={appColors.dashboard.total.bgColor}
      />
      <StatsCard
        title="Ukończone"
        value={completed}
        icon={CheckCircleIcon}
        color={appColors.dashboard.completed.color}
        bgColor={appColors.dashboard.completed.bgColor}
      />
      <StatsCard
        title="Oczekujące"
        value={pending}
        icon={CircleOutlinedIcon}
        color={appColors.dashboard.pending.color}
        bgColor={appColors.dashboard.pending.bgColor}
      />
    </Box>
  );
}
