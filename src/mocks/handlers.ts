// src/mocks/handlers.ts
import { http, HttpResponse, delay } from 'msw';
import { z } from "zod";
import { PriorityType } from '../types/todo.types';
import type { Todo } from '../types/todo.types';

const createTodoSchema = z.object({
  title: z.string().min(1, "Tytuł nie może być pusty"),
  completed: z.boolean(),
  priority: z.custom<PriorityType>(
    (value) => typeof value === "string" && Object.values(PriorityType).includes(value as PriorityType)
  ),
  date: z.string(),
});

const updateTodoSchema = createTodoSchema.partial();

let mockDatabase: Todo[] = [
  { id: 1, title: 'Nauczyc sie Reacta', completed: false, priority: PriorityType.Medium, date: '12-12-2026' },
  { id: 2, title: 'Zrobic zakupy', completed: true, priority: PriorityType.Low, date: '11-12-2026' },
  { id: 3, title: 'Napisac raport', completed: false, priority: PriorityType.High, date: '10-12-2026' },
];

export const handlers = [
  // 1. GET: Pobieranie listy
  http.get('/api/todos', async () => {
    await delay();
    return HttpResponse.json(mockDatabase);
  }),

  // 2. GET: Pobieranie szczegółów
  http.get('/api/todos/:id', async ({ params }) => {
    await delay();
    const id = Number(params.id); // <-- Konwersja na liczbę
    const item = mockDatabase.find((item) => item.id === id);

    if (!item) {
      return new HttpResponse(null, { status: 404, statusText: 'Not Found' });
    }
    return HttpResponse.json(item);
  }),

  // 3. POST: Tworzenie zadania
  http.post('/api/todos', async ({ request }) => {
    await delay();
    try {
      const body = await request.json();
      const validatedData = createTodoSchema.parse(body);

      // <-- Szukamy najwyższego ID i dodajemy 1
      const newId = mockDatabase.length > 0 ? Math.max(...mockDatabase.map(i => i.id)) + 1 : 1;
      
      const newTodo: Todo = { id: newId, ...validatedData };

      mockDatabase.push(newTodo);

      return HttpResponse.json(newTodo, { status: 201 });
    } catch (error) {
      return HttpResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
  }),

  // 4. PUT: Edycja zadania
  http.put('/api/todos/:id', async ({ params, request }) => {
    await delay();
    const id = Number(params.id); // <-- Konwersja na liczbę
    const index = mockDatabase.findIndex((item) => item.id === id);

    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    try {
      const body = await request.json();
      const validatedData = updateTodoSchema.parse(body);

      mockDatabase[index] = {
        ...mockDatabase[index],
        ...validatedData,
      };

      return HttpResponse.json(mockDatabase[index]);
    } catch (error) {
      return HttpResponse.json({ error: 'Invalid data' }, { status: 400 });
    }
  }),

  // 5. DELETE: Usuwanie zadania
  http.delete('/api/todos/:id', async ({ params }) => {
    await delay();
    const id = Number(params.id); // <-- Konwersja na liczbę
    const index = mockDatabase.findIndex((item) => item.id === id);
    
    if (index !== -1) {
      mockDatabase.splice(index, 1);
    }
    
    return new HttpResponse(null, { status: 204 });
  }),
];
