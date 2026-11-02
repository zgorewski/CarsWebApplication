import { useNavigate, useParams } from 'react-router-dom';
import { CarForm } from '../components/CarForm';
import { ErrorMessage, Loading } from '../components/Feedback';
import { useCar } from '../hooks/useCar';
import type { CarInput } from '../models/Car';
import { carService } from '../services/carService';
import { CarNotFound } from './CarDetailsPage';

export function CarEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { car, loading, error, notFound } = useCar(id);

  if (loading) return <Loading />;
  if (notFound) return <CarNotFound />;
  if (error || !car) return <ErrorMessage message={error ?? 'Nie udało się pobrać samochodu.'} />;

  const handleSubmit = async (values: CarInput) => {
    await carService.update(car.id, values); // PUT /cars/:id
    navigate(`/cars/${car.id}`);
  };

  return (
    <section>
      <div className="page-header">
        <h1>
          Edycja: {car.brand} {car.model}
        </h1>
      </div>
      <CarForm
        key={car.id}
        initialValues={car}
        submitLabel="Zapisz zmiany"
        onSubmit={handleSubmit}
        onCancel={() => navigate(`/cars/${car.id}`)}
      />
    </section>
  );
}
