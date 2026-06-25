// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import { z } from "zod";
import { PriorityType } from '../types/todo.types';
import { todoMockApi } from './todoMockApi';

const createTodoSchema = z.object({
  title: z.string().min(1, "Tytuł nie może być pusty"),
  completed: z.boolean(),
  priority: z.custom<PriorityType>(
    (value) => typeof value === "string" && Object.values(PriorityType).includes(value as PriorityType)
  ),
  date: z.string(),
});

const updateTodoSchema = createTodoSchema.partial();

export const handlers = [
  // 1. GET: Pobieranie listy
  http.get('/api/todos', async () => {
    const todos = await todoMockApi.getAll();

    return HttpResponse.json(todos);
  }),

  // 2. GET: Pobieranie szczegółów
  http.get('/api/todos/:id', async ({ params }) => {
    try {
      const item = await todoMockApi.getDetails(String(params.id));

      return HttpResponse.json(item);
    } catch (error) {
      return new HttpResponse(null, { status: 404, statusText: 'Not Found' });
    }
  }),

  // 3. POST: Tworzenie zadania
  http.post('/api/todos', async ({ request }) => {
    try {
      const body = await request.json();
      const validatedData = createTodoSchema.parse(body);
      const newTodo = await todoMockApi.create(validatedData);

      return HttpResponse.json(newTodo, { status: 201 });
    } catch (error) {
      return HttpResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
  }),

  // 4. PUT: Edycja zadania
  http.put('/api/todos/:id', async ({ params, request }) => {
    const id = Number(params.id); // <-- Konwersja na liczbę

    try {
      const body = await request.json();
      const validatedData = updateTodoSchema.parse(body);
      const updatedTodo = await todoMockApi.update(id, validatedData);

      return HttpResponse.json(updatedTodo);
    } catch (error) {
      return HttpResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
  }),

  // 5. DELETE: Usuwanie zadania
  http.delete('/api/todos/:id', async ({ params }) => {
    const id = Number(params.id); // <-- Konwersja na liczbę

    try {
      await todoMockApi.delete(id);

      return new HttpResponse(null, { status: 204 });
    } catch (error) {
      return new HttpResponse(null, { status: 404 });
    }
  }),
];
