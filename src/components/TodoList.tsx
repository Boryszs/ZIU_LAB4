import { useMemo } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { motion, useReducedMotion } from "framer-motion";
import { Filter } from "../types/todo.types";
import type { Todo } from "../types/todo.types";
import { listVariants, itemVariants, reducedItemVariants } from "../shared/animations/variants";
import { TodoListEmptyState } from "./todo/TodoListEmptyState";
import { TodoListItem } from "./todo/TodoListItem";

interface TodoListProps {
  todos: Todo[];
  filter: Filter;
  onToggle: (id: number, status: boolean) => void;
  onDelete: (id: number) => void;
  onStartEdit: (id: number) => void;
}

export function TodoList({
  todos,
  filter,
  onToggle,
  onDelete,
  onStartEdit,
}: TodoListProps) {
  const shouldReduceMotion = useReducedMotion();
  const currentItemVariants = shouldReduceMotion ? reducedItemVariants : itemVariants;

  const filteredTodos = useMemo(() => {
    if (filter === Filter.Active) return todos.filter((todo) => !todo.completed);
    if (filter === Filter.Completed) return todos.filter((todo) => todo.completed);
    return todos;
  }, [todos, filter]);

  if (filteredTodos.length === 0) {
    return <TodoListEmptyState />;
  }

  return (
    <Paper
      component="section"
      aria-label="Lista zadań"
      variant="outlined"
      sx={{ mx: "auto", my: 3, width: "100%", maxWidth: 700, overflow: "visible", border: 'none', bgcolor: 'transparent' }}
    >
      <Box
        component={motion.ul}
        variants={listVariants}
        initial="initial"
        animate="in"
        sx={{ p: 0, m: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 1 }}
      >
        {filteredTodos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            variants={currentItemVariants}
            onToggle={onToggle}
            onDelete={onDelete}
            onStartEdit={onStartEdit}
          />
        ))}
      </Box>
    </Paper>
  );
}
