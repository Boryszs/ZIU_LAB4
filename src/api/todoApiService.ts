// src/api/todoApi.ts
import { Todo } from '../types/todo.types';

const BASE_URL = '/api/todos';

export const todoApi = {
    // 1. Pobieranie wszystkich zadań (GET)
    getAll: async (): Promise<Todo[]> => {
        const response = await fetch(BASE_URL);
        if (!response.ok) throw new Error('Nie udało się pobrać listy zadań');

        return response.json();
    },

    // 2. Pobieranie jednego zadania (GET)
    getById: async (id: string | number): Promise<Todo> => {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) throw new Error(`Nie udało się pobrać zadania o ID: ${id}`);

        return response.json();
    },

    // 3. Tworzenie nowego zadania (POST)
    create: async (data: Omit<Todo, 'id'>): Promise<Todo> => {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Ważne: mówimy serwerowi, że wysyłamy JSON
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Błąd podczas tworzenia zadania');

        return response.json();
    },

    // 4. Edycja istniejącego zadania (PUT / PATCH)
    update: async (id: string | number, data: Partial<Todo>): Promise<Todo> => {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT', // lub PATCH
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error('Błąd podczas aktualizacji zadania');

        return response.json();
    },

    // 5. Usuwanie zadania (DELETE)
    delete: async (id: string | number): Promise<void> => {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('Błąd podczas usuwania zadania');
    }
};