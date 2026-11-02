import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CarTable } from '../components/CarTable';
import { EmptyState, ErrorMessage, Loading } from '../components/Feedback';
import type { Car } from '../models/Car';
import { carService } from '../services/carService';

export function CarListPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadCars = useCallback(() => {
    setLoading(true);
    setError(null);
    carService
      .getAll()
      .then(setCars)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Nieznany błąd'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadCars();
  }, [loadCars]);

  // Zadanie dodatkowe: filtrowanie po marce lub modelu
  const visibleCars = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return cars;
    return cars.filter((c) => `${c.brand} ${c.model}`.toLowerCase().includes(q));
  }, [cars, filter]);

  const handleDelete = async (car: Car) => {
    if (!window.confirm(`Czy na pewno usunąć samochód ${car.brand} ${car.model}?`)) return;

    setDeletingId(car.id);
    try {
      await carService.remove(car.id);
      setCars((prev) => prev.filter((c) => c.id !== car.id));
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Nie udało się usunąć samochodu.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section>
      <div className="page-header">
        <h1>Samochody</h1>
        <Link to="/cars/new" className="btn">
          + Dodaj samochód
        </Link>
      </div>

      {loading && <Loading />}

      {!loading && error && (
        <ErrorMessage message={error}>
          <button type="button" className="btn btn--small" onClick={loadCars}>
            Spróbuj ponownie
          </button>
        </ErrorMessage>
      )}

      {!loading && !error && cars.length === 0 && (
        <EmptyState>
          Brak samochodów w bazie. <Link to="/cars/new">Dodaj pierwszy samochód</Link>.
        </EmptyState>
      )}

      {!loading && !error && cars.length > 0 && (
        <>
          <div className="toolbar">
            <input
              type="search"
              className="toolbar__search"
              placeholder="Filtruj po marce lub modelu…"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              aria-label="Filtruj po marce lub modelu"
            />
            <span className="toolbar__count">
              {visibleCars.length} z {cars.length}
            </span>
          </div>

          {visibleCars.length === 0 ? (
            <EmptyState>Brak samochodów pasujących do „{filter}”.</EmptyState>
          ) : (
            <CarTable cars={visibleCars} deletingId={deletingId} onDelete={handleDelete} />
          )}
        </>
      )}
    </section>
  );
}
