import type { SelectOption } from "../types/select.types";
import type { PriorityFilter, PriorityType } from "../types/todo.types";

export const priorityLabels: Record<PriorityType, string> = {
  low: "Niski",
  medium: "Średni",
  high: "Wysoki",
};

export const priorityOptions: readonly SelectOption<PriorityType>[] = [
  { value: "low", label: priorityLabels.low },
  { value: "medium", label: priorityLabels.medium },
  { value: "high", label: priorityLabels.high },
];

export const priorityFilterOptions: readonly SelectOption<PriorityFilter>[] = [
  { value: "all", label: "Wszystkie" },
  { value: "high", label: priorityLabels.high },
  { value: "medium", label: priorityLabels.medium },
  { value: "low", label: priorityLabels.low },
];
