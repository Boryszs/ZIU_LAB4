import type { Todo } from '../types/todo.types';

const BASE_URL = '/api/todos';

async function parseJsonResponse<TData>(response: Response, errorMessage: string): Promise<TData> {
    if (!response.ok) {
        throw new Error(errorMessage);
    }

    return response.json();
}

export const todoApiService = {
    getAll: async (): Promise<Todo[]> => {
        const response = await fetch(BASE_URL);

        return parseJsonResponse<Todo[]>(response, 'Nie udało się pobrać listy zadań');
    },

    getDetails: async (id: string | number): Promise<Todo> => {
        const response = await fetch(`${BASE_URL}/${id}`);

        return parseJsonResponse<Todo>(response, `Nie udało się pobrać zadania o ID: ${id}`);
    },

    create: async (data: Omit<Todo, 'id'>): Promise<Todo> => {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return parseJsonResponse<Todo>(response, 'Błąd podczas tworzenia zadania');
    },

    update: async (id: string | number, data: Partial<Todo>): Promise<Todo> => {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return parseJsonResponse<Todo>(response, 'Błąd podczas aktualizacji zadania');
    },

    delete: async (id: string | number): Promise<void> => {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Błąd podczas usuwania zadania');
        }
    },

    toggle: async (id: string | number, status: boolean): Promise<Todo> => {
        return todoApiService.update(id, { completed: status });
    },
};
