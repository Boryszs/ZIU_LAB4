import TodoApp from "../components/TodoApp";
import { usePageTitle } from "../hooks/usePageTitle";

interface TasksPageProps {
  title: string;
}

export default function TasksPage({ title }: TasksPageProps) {
  usePageTitle(title);

  return <TodoApp />;
}
