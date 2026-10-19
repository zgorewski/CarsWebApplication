using Cars.Domain;

namespace Cars.Infrastructure;

public static class Seed
{
    public static async Task SeedData(DataContext context)
    {
        if (context.Cars.Any()) return;

        var cars = new List<Car>
        {
            new()
            {
                Brand = "Toyota", Model = "Corolla", DoorsNumber = 5, LuggageCapacity = 361,
                EngineCapacity = 1798, FuelType = FuelType.Hybrid, ProductionDate = new DateTime(2021, 3, 15),
                AverageFuelConsumption = 4.5, BodyType = BodyType.Hatchback
            },
            new()
            {
                Brand = "Skoda", Model = "Octavia", DoorsNumber = 5, LuggageCapacity = 640,
                EngineCapacity = 1968, FuelType = FuelType.Diesel, ProductionDate = new DateTime(2020, 6, 1),
                AverageFuelConsumption = 4.9, BodyType = BodyType.Kombi
            },
            new()
            {
                Brand = "Volkswagen", Model = "Golf", DoorsNumber = 5, LuggageCapacity = 381,
                EngineCapacity = 1498, FuelType = FuelType.Petrol, ProductionDate = new DateTime(2022, 1, 20),
                AverageFuelConsumption = 5.8, BodyType = BodyType.Hatchback
            },
            new()
            {
                Brand = "BMW", Model = "320i", DoorsNumber = 4, LuggageCapacity = 480,
                EngineCapacity = 1998, FuelType = FuelType.Petrol, ProductionDate = new DateTime(2019, 9, 10),
                AverageFuelConsumption = 6.9, BodyType = BodyType.Sedan
            },
            new()
            {
                Brand = "Tesla", Model = "Model Y", DoorsNumber = 5, LuggageCapacity = 854,
                EngineCapacity = 0, FuelType = FuelType.Electric, ProductionDate = new DateTime(2023, 5, 5),
                AverageFuelConsumption = 0, BodyType = BodyType.SUV
            },
            new()
            {
                Brand = "Dacia", Model = "Duster", DoorsNumber = 5, LuggageCapacity = 445,
                EngineCapacity = 999, FuelType = FuelType.LPG, ProductionDate = new DateTime(2022, 11, 2),
                AverageFuelConsumption = 7.4, BodyType = BodyType.SUV
            }
        };

        context.Cars.AddRange(cars);
        await context.SaveChangesAsync();
    }
}
