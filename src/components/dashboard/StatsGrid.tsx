import StatsCard from "./StatsCard";
import { CheckCircleIcon, CircleIcon, ListIcon } from "../icons";
import { useTodoContext } from "../../context/TodoContext";

export default function StatsGrid() {
  const { todos } = useTodoContext();
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const pending = todos.filter((todo) => !todo.completed).length;

  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      <StatsCard
        title="Wszystkie zadania"
        value={total}
        icon={ListIcon}
        color="#1565C0"
        bgColor="#E3F2FD"
      />
      <StatsCard
        title="Ukonczone"
        value={completed}
        icon={CheckCircleIcon}
        color="#2E7D32"
        bgColor="#E8F5E9"
      />
      <StatsCard
        title="Oczekujace"
        value={pending}
        icon={CircleIcon}
        color="#E65100"
        bgColor="#FFF3E0"
      />
    </section>
  );
}
