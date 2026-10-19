# CarsWebApplication – Lab 1

REST API dla samochodów: ASP.NET Core Web API + EF Core + SQLite, podział na 4 projekty.

## O co chodzi (w 30 sekund)

| Projekt | Co robi | Zależy od |
|---|---|---|
| `Cars.Domain` | klasa `Car` (+ enumy `FuelType`, `BodyType`) – „czym jest samochód” | nic |
| `Cars.Application` | na razie pusty, logika dojdzie na kolejnych labach | Domain |
| `Cars.Infrastructure` | `DataContext` (EF Core ↔ SQLite), migracje, `Seed` (dane startowe) | Domain |
| `Cars.API` | `CarsController` – przyjmuje żądania HTTP, `Program.cs`, `appsettings.json` | Application, Infrastructure |

Przepływ: żądanie HTTP → `CarsController` → `DataContext` (EF Core) → plik bazy `cars.db`.

## Wymagania

- .NET 9 SDK (`dotnet --list-sdks`).
- narzędzie EF: `dotnet tool install --global dotnet-ef`

## Uruchomienie

```bash
cd CarsWebApplication
dotnet restore
dotnet ef database update -p Cars.Infrastructure -s Cars.API   # tworzy cars.db (krok 6)
dotnet run --project Cars.API
```

Swagger: http://localhost:5000/swagger

Uwaga: aplikacja przy starcie sama robi `Migrate()` + `Seed`, więc nawet bez `database update` baza się utworzy
i dostanie 6 samochodów.

### Jak powstała migracja (krok 5)

```bash
dotnet ef migrations add InitialCreate -p Cars.Infrastructure -s Cars.API -o Migrations
```

Jeśli z migracją byłby jakiś problem: usuń folder `Cars.Infrastructure/Migrations` i plik `Cars.API/cars.db`,
odpal powyższą komendę jeszcze raz.

## Endpointy

| Metoda | URL | Wynik |
|---|---|---|
| GET | `/api/cars` | 200 + lista |
| GET | `/api/cars/{id}` | 200 albo 404 |
| POST | `/api/cars` | 201 Created + nowy samochód |
| PUT | `/api/cars/{id}` | 204 albo 404 |
| DELETE | `/api/cars/{id}` | 204 albo 404 |

Przykładowe body (POST/PUT):

```json
{
  "brand": "Fiat",
  "model": "Panda",
  "doorsNumber": 5,
  "luggageCapacity": 225,
  "engineCapacity": 1242,
  "fuelType": "Petrol",
  "productionDate": "2020-04-10T00:00:00",
  "averageFuelConsumption": 5.6,
  "bodyType": "Hatchback"
}
```

`fuelType`: Petrol, Diesel, LPG, Hybrid, Electric · `bodyType`: Hatchback, Sedan, Kombi, SUV, Coupe, Cabrio, Van

## Testy (zad. 4 i 5)

Postman → Import → `Cars.postman_collection.json` → prawy klik na kolekcji → **Run**.
Zapytania idą w kolejności z zadania 4 (lista, po id, 404, dodanie, aktualizacja, usunięcie, lista po usunięciu),
`carId` ustawia się sam, każde ma test na kod odpowiedzi.

Alternatywnie w Swaggerze: rozwiń endpoint → *Try it out* → *Execute*.
