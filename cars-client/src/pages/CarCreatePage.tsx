import { useNavigate } from 'react-router-dom';
import { CarForm } from '../components/CarForm';
import type { CarInput } from '../models/Car';
import { carService } from '../services/carService';

export function CarCreatePage() {
  const navigate = useNavigate();

  const handleSubmit = async (car: CarInput) => {
    const created = await carService.create(car);
    navigate(`/cars/${created.id}`); // po zapisie: widok nowego auta
  };

  return (
    <section>
      <div className="page-header">
        <h1>Nowy samochód</h1>
      </div>
      <CarForm submitLabel="Dodaj samochód" onSubmit={handleSubmit} onCancel={() => navigate('/cars')} />
    </section>
  );
}
