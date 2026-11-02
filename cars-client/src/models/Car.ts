// Model samochodu – zgodny z encją Car z Cars.Domain (backend .NET).
// Enumy jako tekst, tak jak zwraca je API (JsonStringEnumConverter).

export const FUEL_TYPES = ['Petrol', 'Diesel', 'LPG', 'Hybrid', 'Electric'] as const;
export type FuelType = (typeof FUEL_TYPES)[number];

export const BODY_TYPES = ['Hatchback', 'Sedan', 'Kombi', 'SUV', 'Coupe', 'Cabrio', 'Van'] as const;
export type BodyType = (typeof BODY_TYPES)[number];

export interface Car {
  id: string;
  brand: string;
  model: string;
  doorsNumber: number;
  luggageCapacity: number; // litry
  engineCapacity: number; // cm³
  fuelType: FuelType;
  productionDate: string; // ISO, np. 2021-03-15T00:00:00
  averageFuelConsumption: number; // l/100 km
  bodyType: BodyType;
}

/** Dane wysyłane przy tworzeniu / edycji (bez id). */
export type CarInput = Omit<Car, 'id'>;

export const FUEL_TYPE_LABELS: Record<FuelType, string> = {
  Petrol: 'Benzyna',
  Diesel: 'Diesel',
  LPG: 'LPG',
  Hybrid: 'Hybryda',
  Electric: 'Elektryczny',
};

export const BODY_TYPE_LABELS: Record<BodyType, string> = {
  Hatchback: 'Hatchback',
  Sedan: 'Sedan',
  Kombi: 'Kombi',
  SUV: 'SUV',
  Coupe: 'Coupé',
  Cabrio: 'Kabriolet',
  Van: 'Van',
};
