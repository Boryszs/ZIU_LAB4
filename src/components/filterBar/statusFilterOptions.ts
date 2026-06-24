import type { SelectOption } from "../../types/select.types";
import { Filter } from "../../types/todo.types";

export const statusFilterOptions: readonly SelectOption<Filter>[] = [
  { value: Filter.All, label: "Wszystkie" },
  { value: Filter.Active, label: "Aktywne" },
  { value: Filter.Completed, label: "Ukończone" },
];
