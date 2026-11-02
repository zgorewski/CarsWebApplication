import { useState } from 'react';
import type { ChangeEvent, FormEvent, ReactNode } from 'react';
import type { BodyType, CarInput, FuelType } from '../models/Car';
import { BODY_TYPES, BODY_TYPE_LABELS, FUEL_TYPES, FUEL_TYPE_LABELS } from '../models/Car';

// Stan formularza trzyma wartości jako tekst (tak jak inputy), konwersja przy zapisie.
interface FormValues {
  brand: string;
  model: string;
  doorsNumber: string;
  luggageCapacity: string;
  engineCapacity: string;
  fuelType: FuelType;
  productionDate: string; // YYYY-MM-DD (input type="date")
  averageFuelConsumption: string;
  bodyType: BodyType;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_CAR: CarInput = {
  brand: '',
  model: '',
  doorsNumber: 5,
  luggageCapacity: 0,
  engineCapacity: 0,
  fuelType: 'Petrol',
  productionDate: '',
  averageFuelConsumption: 0,
  bodyType: 'Hatchback',
};

function toFormValues(car: CarInput): FormValues {
  return {
    brand: car.brand,
    model: car.model,
    doorsNumber: String(car.doorsNumber),
    luggageCapacity: car.luggageCapacity ? String(car.luggageCapacity) : '',
    engineCapacity: car.engineCapacity ? String(car.engineCapacity) : '',
    fuelType: car.fuelType,
    productionDate: car.productionDate ? car.productionDate.slice(0, 10) : '',
    averageFuelConsumption: car.averageFuelConsumption ? String(car.averageFuelConsumption) : '',
    bodyType: car.bodyType,
  };
}

function toCarInput(v: FormValues): CarInput {
  return {
    brand: v.brand.trim(),
    model: v.model.trim(),
    doorsNumber: Number(v.doorsNumber),
    luggageCapacity: Number(v.luggageCapacity),
    engineCapacity: Number(v.engineCapacity),
    fuelType: v.fuelType,
    productionDate: `${v.productionDate}T00:00:00`,
    averageFuelConsumption: Number(v.averageFuelConsumption),
    bodyType: v.bodyType,
  };
}

// Te same reguły co w CarValidator po stronie .NET (lab 2).
function validate(v: FormValues): FormErrors {
  const errors: FormErrors = {};
  const isNumber = (s: string) => s.trim() !== '' && !Number.isNaN(Number(s));

  if (!v.brand.trim()) errors.brand = 'Marka nie może być pusta.';
  if (!v.model.trim()) errors.model = 'Model nie może być pusty.';
  if (!isNumber(v.doorsNumber) || Number(v.doorsNumber) < 2 || Number(v.doorsNumber) > 5)
    errors.doorsNumber = 'Liczba drzwi musi być z zakresu 2–5.';
  if (!isNumber(v.luggageCapacity)) errors.luggageCapacity = 'Podaj pojemność bagażnika.';
  else if (Number(v.luggageCapacity) < 0) errors.luggageCapacity = 'Pojemność bagażnika nie może być ujemna.';
  if (!isNumber(v.engineCapacity) || Number(v.engineCapacity) <= 0)
    errors.engineCapacity = 'Pojemność silnika musi być większa od 0.';
  if (!v.productionDate) errors.productionDate = 'Podaj datę produkcji.';
  else if (new Date(v.productionDate) > new Date()) errors.productionDate = 'Data produkcji nie może być z przyszłości.';
  if (!isNumber(v.averageFuelConsumption) || Number(v.averageFuelConsumption) <= 0)
    errors.averageFuelConsumption = 'Średnie spalanie musi być większe od 0.';

  return errors;
}

interface CarFormProps {
  initialValues?: CarInput;
  submitLabel: string;
  onSubmit: (car: CarInput) => Promise<void>;
  onCancel: () => void;
}

export function CarForm({ initialValues = EMPTY_CAR, submitLabel, onSubmit, onCancel }: CarFormProps) {
  const [values, setValues] = useState<FormValues>(() => toFormValues(initialValues));
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      await onSubmit(toCarInput(values));
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Nie udało się zapisać danych.');
      setSubmitting(false);
    }
  };

  const field = (name: keyof FormValues, label: string, input: ReactNode) => (
    <div className={`form__field${errors[name] ? ' form__field--invalid' : ''}`}>
      <label htmlFor={name}>{label}</label>
      {input}
      {errors[name] && <span className="form__error">{errors[name]}</span>}
    </div>
  );

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {submitError && <div className="feedback feedback--error">{submitError}</div>}

      <div className="form__grid">
        {field('brand', 'Marka', <input id="brand" name="brand" value={values.brand} onChange={handleChange} />)}
        {field('model', 'Model', <input id="model" name="model" value={values.model} onChange={handleChange} />)}
        {field(
          'doorsNumber',
          'Liczba drzwi',
          <input id="doorsNumber" name="doorsNumber" type="number" min={2} max={5} value={values.doorsNumber} onChange={handleChange} />,
        )}
        {field(
          'luggageCapacity',
          'Pojemność bagażnika [l]',
          <input id="luggageCapacity" name="luggageCapacity" type="number" min={0} value={values.luggageCapacity} onChange={handleChange} />,
        )}
        {field(
          'engineCapacity',
          'Pojemność silnika [cm³]',
          <input id="engineCapacity" name="engineCapacity" type="number" min={1} value={values.engineCapacity} onChange={handleChange} />,
        )}
        {field(
          'averageFuelConsumption',
          'Średnie spalanie [l/100 km]',
          <input
            id="averageFuelConsumption"
            name="averageFuelConsumption"
            type="number"
            step="0.1"
            min={0}
            value={values.averageFuelConsumption}
            onChange={handleChange}
          />,
        )}
        {field(
          'fuelType',
          'Rodzaj paliwa',
          <select id="fuelType" name="fuelType" value={values.fuelType} onChange={handleChange}>
            {FUEL_TYPES.map((f) => (
              <option key={f} value={f}>
                {FUEL_TYPE_LABELS[f]}
              </option>
            ))}
          </select>,
        )}
        {field(
          'bodyType',
          'Typ nadwozia',
          <select id="bodyType" name="bodyType" value={values.bodyType} onChange={handleChange}>
            {BODY_TYPES.map((b) => (
              <option key={b} value={b}>
                {BODY_TYPE_LABELS[b]}
              </option>
            ))}
          </select>,
        )}
        {field(
          'productionDate',
          'Data produkcji',
          <input id="productionDate" name="productionDate" type="date" value={values.productionDate} onChange={handleChange} />,
        )}
      </div>

      <div className="form__actions">
        <button type="submit" className="btn" disabled={submitting}>
          {submitting ? 'Zapisywanie…' : submitLabel}
        </button>
        <button type="button" className="btn btn--secondary" onClick={onCancel} disabled={submitting}>
          Anuluj
        </button>
      </div>
    </form>
  );
}
