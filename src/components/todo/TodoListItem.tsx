import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { motion, type Variants } from "framer-motion";
import { priorityLabels } from "../../constants/priorityOptions";
import { appColors } from "../../theme/colors";
import type { Todo } from "../../types/todo.types";
import { AppButton } from "../common/AppButton";

interface TodoListItemProps {
  todo: Todo;
  variants: Variants;
  onDelete: (id: number) => void;
  onStartEdit: (id: number) => void;
  onToggle: (id: number, status: boolean) => void;
}

const priorityColor = appColors.priority;

function formatTodoDate(value: string) {
  const timestamp = Number(value);

  if (Number.isFinite(timestamp) && value.trim() !== "") {
    return new Intl.DateTimeFormat("pl-PL", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
      .format(new Date(timestamp))
      .replace(/\./g, "-");
  }

  return value;
}

export function TodoListItem({
  todo,
  variants,
  onDelete,
  onStartEdit,
  onToggle,
}: TodoListItemProps) {
  const colors = priorityColor[todo.priority];

  return (
    <Box
      component={motion.li}
      variants={variants}
      sx={{
        display: "grid",
        gridTemplateColumns: "auto minmax(0, 1fr) auto auto",
        alignItems: "center",
        columnGap: { xs: 0.75, sm: 1.5 },
        rowGap: 1,
        px: { xs: 1.5, sm: 2.5 },
        py: 1.5,
        borderRadius: 2,
        border: 1,
        borderColor: "divider",
        bgcolor: todo.completed ? "action.hover" : "background.paper",
        "@media (prefers-reduced-motion: no-preference)": {
          transition: "transform 160ms ease, box-shadow 160ms ease, background-color 160ms ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: 3,
            bgcolor: "action.hover",
          },
        },
        "@media (prefers-reduced-motion: reduce)": {
          transition: "background-color 160ms ease",
          "&:hover": {
            bgcolor: "action.hover",
          },
        },
      }}
    >
      <Checkbox
        checked={todo.completed}
        onChange={(event) => onToggle(todo.id, event.target.checked)}
        inputProps={{
          "aria-label": todo.completed
            ? `Oznacz zadanie '${todo.title}' jako nieukończone`
            : `Oznacz zadanie '${todo.title}' jako ukończone`,
        }}
        sx={{ p: 1 }}
      />

      <Box component="article" sx={{ minWidth: 0, flex: 1 }}>
        <Typography
          component="p"
          fontWeight={700}
          noWrap
          sx={{
            textDecoration: todo.completed ? "line-through" : "none",
            color: todo.completed ? "text.secondary" : "text.primary",
          }}
        >
          {todo.title}
        </Typography>
        <Typography
          component="p"
          variant="body2"
          color="text.secondary"
          sx={{ textDecoration: todo.completed ? "line-through" : "none" }}
        >
          {formatTodoDate(todo.date)}
        </Typography>
      </Box>

      <Chip
        label={priorityLabels[todo.priority]}
        size="small"
        variant="outlined"
        sx={{
          justifySelf: "end",
          minWidth: { xs: 72, sm: 80 },
          fontWeight: 700,
          ...colors,
          opacity: todo.completed ? 0.72 : 1,
        }}
      />

      <Stack
        component="footer"
        direction="row"
        spacing={0.25}
        sx={{ justifySelf: "end" }}
      >
        <AppButton
          type="button"
          iconOnly
          tone="primary"
          variant="text"
          onClick={() => onStartEdit(todo.id)}
          aria-label={`Edytuj zadanie ${todo.title}`}
        >
          <EditIcon />
        </AppButton>
        <AppButton
          type="button"
          iconOnly
          tone="danger"
          variant="text"
          onClick={() => onDelete(todo.id)}
          aria-label={`Usuń zadanie ${todo.title}`}
        >
          <DeleteIcon />
        </AppButton>
      </Stack>
    </Box>
  );
}
