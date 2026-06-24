import type { SelectOption } from "../types/select.types";
import { PriorityFilter, PriorityType } from "../types/todo.types";

export const priorityLabels: Record<PriorityType, string> = {
  [PriorityType.Low]: "Niski",
  [PriorityType.Medium]: "Średni",
  [PriorityType.High]: "Wysoki",
};

export const priorityOptions: readonly SelectOption<PriorityType>[] = [
  { value: PriorityType.Low, label: priorityLabels[PriorityType.Low] },
  { value: PriorityType.Medium, label: priorityLabels[PriorityType.Medium] },
  { value: PriorityType.High, label: priorityLabels[PriorityType.High] },
];

export const priorityFilterOptions: readonly SelectOption<PriorityFilter>[] = [
  { value: PriorityFilter.All, label: "Wszystkie" },
  { value: PriorityFilter.High, label: priorityLabels[PriorityType.High] },
  { value: PriorityFilter.Medium, label: priorityLabels[PriorityType.Medium] },
  { value: PriorityFilter.Low, label: priorityLabels[PriorityType.Low] },
];
