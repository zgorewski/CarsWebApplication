# Cars Client (Lab 3)

Aplikacja React + TypeScript + Vite do zarządzania samochodami.
Backend symuluje **json-server** (`db.json`) – aplikacja nie łączy się jeszcze z Cars API (.NET).

## Uruchomienie

Wymagany Node.js 22.12+ (LTS).

```bash
npm install
npm start          # json-server (port 3001) + Vite (port 5173), otwiera przeglądarkę
```

Osobno: `npm run server` (json-server) i `npm run dev` (Vite).
Skróty: macOS – `run-mac.command` (prawy klik → Otwórz), Windows – `URUCHOM.bat`.

- Aplikacja: http://localhost:5173
- API: http://localhost:3001/cars

## Routing

| Ścieżka | Widok |
|---|---|
| `/` | `HomePage` |
| `/cars` | `CarListPage` – lista, filtr po marce/modelu, Szczegóły / Edytuj / Usuń |
| `/cars/new` | `CarCreatePage` – formularz dodawania |
| `/cars/:id` | `CarDetailsPage` – szczegóły, usuwanie z potwierdzeniem |
| `/cars/:id/edit` | `CarEditPage` – formularz edycji (PUT) |
| `*` | `NotFoundPage` |

Wspólne menu: `NavBar` z `NavLink` (aktywny link podświetlony).

## Struktura

```
src/
├── models/Car.ts              # interfejs Car, typy paliwa i nadwozia
├── services/carService.ts     # komunikacja HTTP (fetch): getAll, getById, create, update, remove
├── hooks/useCar.ts            # pobranie jednego auta (szczegóły, edycja)
├── components/                # Layout, NavBar, CarTable, CarForm (formularz kontrolowany), Feedback
└── pages/                     # HomePage, CarListPage, CarDetailsPage, CarCreatePage, CarEditPage, NotFoundPage
```

Obsłużone stany: ładowanie, błąd pobierania (z ponowieniem), pusta lista, brak wyników filtra,
nieistniejący samochód. Formularz waliduje dane tymi samymi regułami co `CarValidator` w backendzie.
