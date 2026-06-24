import type { SelectOption } from "../../types/select.types";
import type { Filter } from "../../types/todo.types";

export const statusFilterOptions: readonly SelectOption<Filter>[] = [
  { value: "all", label: "Wszystkie" },
  { value: "active", label: "Aktywne" },
  { value: "completed", label: "Ukończone" },
];
