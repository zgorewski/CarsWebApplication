import { useEffect, useState } from 'react';
import type { Car } from '../models/Car';
import { carService, HttpError } from '../services/carService';

interface UseCarResult {
  car: Car | null;
  loading: boolean;
  error: string | null;
  notFound: boolean;
}

/** Pobiera jeden samochód po id (widok szczegółów i edycji). */
export function useCar(id: string | undefined): UseCarResult {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    let ignore = false;

    setLoading(true);
    setError(null);
    setNotFound(false);

    carService
      .getById(id)
      .then((data) => {
        if (!ignore) setCar(data);
      })
      .catch((err: unknown) => {
        if (ignore) return;
        if (err instanceof HttpError && err.status === 404) setNotFound(true);
        else setError(err instanceof Error ? err.message : 'Nieznany błąd');
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  return { car, loading, error, notFound };
}
