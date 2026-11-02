import type { Car, CarInput } from '../models/Car';

// json-server symuluje backend (npm run server → http://localhost:3001/cars).
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';
const CARS_URL = `${API_URL}/cars`;

export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers },
    });
  } catch {
    throw new Error('Brak połączenia z serwerem. Czy json-server jest uruchomiony (npm run server)?');
  }

  if (!response.ok) {
    throw new HttpError(response.status, `Serwer zwrócił błąd ${response.status} ${response.statusText}`.trim());
  }

  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export const carService = {
  getAll(): Promise<Car[]> {
    return request<Car[]>(CARS_URL);
  },

  getById(id: string): Promise<Car> {
    return request<Car>(`${CARS_URL}/${encodeURIComponent(id)}`);
  },

  create(car: CarInput): Promise<Car> {
    return request<Car>(CARS_URL, { method: 'POST', body: JSON.stringify(car) });
  },

  update(id: string, car: CarInput): Promise<Car> {
    return request<Car>(`${CARS_URL}/${encodeURIComponent(id)}`, {
      method: 'PUT',
      body: JSON.stringify({ ...car, id }),
    });
  },

  remove(id: string): Promise<void> {
    return request<void>(`${CARS_URL}/${encodeURIComponent(id)}`, { method: 'DELETE' });
  },
};
