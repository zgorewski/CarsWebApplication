import { Link } from 'react-router-dom';
import type { Car } from '../models/Car';
import { FUEL_TYPE_LABELS } from '../models/Car';

interface CarTableProps {
  cars: Car[];
  deletingId: string | null;
  onDelete: (car: Car) => void;
}

export function CarTable({ cars, deletingId, onDelete }: CarTableProps) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Marka</th>
          <th>Model</th>
          <th>Rok</th>
          <th>Paliwo</th>
          <th className="table__actions-col">Akcje</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car) => (
          <tr key={car.id}>
            <td>{car.brand}</td>
            <td>{car.model}</td>
            <td>{new Date(car.productionDate).getFullYear()}</td>
            <td>{FUEL_TYPE_LABELS[car.fuelType] ?? car.fuelType}</td>
            <td>
              <div className="table__actions">
                <Link to={`/cars/${car.id}`} className="btn btn--small">
                  Szczegóły
                </Link>
                <Link to={`/cars/${car.id}/edit`} className="btn btn--small btn--secondary">
                  Edytuj
                </Link>
                <button
                  type="button"
                  className="btn btn--small btn--danger"
                  onClick={() => onDelete(car)}
                  disabled={deletingId === car.id}
                >
                  {deletingId === car.id ? 'Usuwanie…' : 'Usuń'}
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
