import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ErrorMessage, Loading } from '../components/Feedback';
import { useCar } from '../hooks/useCar';
import { BODY_TYPE_LABELS, FUEL_TYPE_LABELS } from '../models/Car';
import { carService } from '../services/carService';

export function CarDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { car, loading, error, notFound } = useCar(id);
  const [deleting, setDeleting] = useState(false);

  if (loading) return <Loading />;
  if (notFound) return <CarNotFound />;
  if (error || !car) return <ErrorMessage message={error ?? 'Nie udało się pobrać samochodu.'} />;

  const handleDelete = async () => {
    if (!window.confirm(`Czy na pewno usunąć samochód ${car.brand} ${car.model}?`)) return;
    setDeleting(true);
    try {
      await carService.remove(car.id);
      navigate('/cars');
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Nie udało się usunąć samochodu.');
      setDeleting(false);
    }
  };

  const rows: [string, string][] = [
    ['Marka', car.brand],
    ['Model', car.model],
    ['Typ nadwozia', BODY_TYPE_LABELS[car.bodyType] ?? car.bodyType],
    ['Rodzaj paliwa', FUEL_TYPE_LABELS[car.fuelType] ?? car.fuelType],
    ['Liczba drzwi', String(car.doorsNumber)],
    ['Pojemność bagażnika', `${car.luggageCapacity} l`],
    ['Pojemność silnika', `${car.engineCapacity} cm³`],
    ['Średnie spalanie', `${car.averageFuelConsumption} l/100 km`],
    ['Data produkcji', new Date(car.productionDate).toLocaleDateString('pl-PL')],
  ];

  return (
    <section>
      <div className="page-header">
        <h1>
          {car.brand} {car.model}
        </h1>
      </div>

      <dl className="details">
        {rows.map(([label, value]) => (
          <div className="details__row" key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <div className="form__actions">
        <Link to={`/cars/${car.id}/edit`} className="btn">
          Edytuj
        </Link>
        <button type="button" className="btn btn--danger" onClick={handleDelete} disabled={deleting}>
          {deleting ? 'Usuwanie…' : 'Usuń'}
        </button>
        <Link to="/cars" className="btn btn--secondary">
          ← Wróć do listy
        </Link>
      </div>
    </section>
  );
}

export function CarNotFound() {
  return (
    <section className="feedback feedback--empty">
      <h2>Nie znaleziono samochodu</h2>
      <p>Samochód o podanym identyfikatorze nie istnieje lub został usunięty.</p>
      <Link to="/cars" className="btn">
        Wróć do listy
      </Link>
    </section>
  );
}
