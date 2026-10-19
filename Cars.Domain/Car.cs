namespace Cars.Domain;

public class Car
{
    public Guid Id { get; set; }
    public string Brand { get; set; } = string.Empty;
    public string Model { get; set; } = string.Empty;
    public int DoorsNumber { get; set; }
    public int LuggageCapacity { get; set; }          // litry
    public int EngineCapacity { get; set; }           // cm3
    public FuelType FuelType { get; set; }
    public DateTime ProductionDate { get; set; }
    public double AverageFuelConsumption { get; set; } // l/100 km
    public BodyType BodyType { get; set; }
}
