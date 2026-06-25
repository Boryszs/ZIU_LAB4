import { PriorityType } from '../types/todo.types';
import type { Todo } from '../types/todo.types';

type CreateTodoData = Omit<Todo, 'id'>;
type UpdateTodoData = Partial<Omit<Todo, 'id'>>;

const MIN_RESPONSE_DELAY_MS = 50;
const MAX_RESPONSE_DELAY_MS = 400;

const mockDatabase: Todo[] = [
  { id: 1, title: 'Nauczyc sie Reacta', completed: false, priority: PriorityType.Medium, date: '12-12-2026' },
  { id: 2, title: 'Zrobic zakupy', completed: true, priority: PriorityType.Low, date: '11-12-2026' },
  { id: 3, title: 'Napisac raport', completed: false, priority: PriorityType.High, date: '10-12-2026' },
];

function delayResponse() {
  const responseDelayMs =
    Math.floor(Math.random() * (MAX_RESPONSE_DELAY_MS - MIN_RESPONSE_DELAY_MS + 1)) +
    MIN_RESPONSE_DELAY_MS;

  return new Promise((resolve) => {
    setTimeout(resolve, responseDelayMs);
  });
}

function cloneTodo(todo: Todo): Todo {
  return { ...todo };
}

function getNextId() {
  return mockDatabase.length > 0
    ? Math.max(...mockDatabase.map((todo) => todo.id)) + 1
    : 1;
}

export const todoMockApi = {
  getAll: async (): Promise<Todo[]> => {
    await delayResponse();
    return mockDatabase.map(cloneTodo);
  },

  getDetails: async (id: string | number): Promise<Todo> => {
    await delayResponse();

    const todo = mockDatabase.find((item) => item.id === Number(id));

    if (!todo) {
      throw new Error(`Todo not found: ${id}`);
    }

    return cloneTodo(todo);
  },

  create: async (data: CreateTodoData): Promise<Todo> => {
    await delayResponse();

    const newTodo: Todo = {
      id: getNextId(),
      ...data,
    };

    mockDatabase.unshift(newTodo);

    return cloneTodo(newTodo);
  },

  update: async (id: string | number, data: UpdateTodoData): Promise<Todo> => {
    await delayResponse();

    const index = mockDatabase.findIndex((item) => item.id === Number(id));

    if (index === -1) {
      throw new Error(`Todo not found: ${id}`);
    }

    mockDatabase[index] = {
      ...mockDatabase[index],
      ...data,
    };

    return cloneTodo(mockDatabase[index]);
  },

  toggle: async (id: string | number, status: boolean): Promise<Todo> => {
    return todoMockApi.update(id, { completed: status });
  },

  delete: async (id: string | number): Promise<void> => {
    await delayResponse();

    const index = mockDatabase.findIndex((item) => item.id === Number(id));

    if (index === -1) {
      throw new Error(`Todo not found: ${id}`);
    }

    mockDatabase.splice(index, 1);
  },
};
