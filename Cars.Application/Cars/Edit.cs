using Cars.Application.Validators;
using Cars.Domain;
using Cars.Infrastructure;
using FluentValidation;
using MediatR;

namespace Cars.Application.Cars;

public class Edit
{
    public class Command : IRequest<bool>
    {
        public Guid Id { get; set; }
        public required Car Car { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.Car).SetValidator(new CarValidator());
        }
    }

    public class Handler(DataContext context) : IRequestHandler<Command, bool>
    {
        public async Task<bool> Handle(Command request, CancellationToken cancellationToken)
        {
            var existingCar = await context.Cars.FindAsync([request.Id], cancellationToken);

            // false => kontroler zwraca 404
            if (existingCar is null) return false;

            var car = request.Car;
            existingCar.Brand = car.Brand;
            existingCar.Model = car.Model;
            existingCar.DoorsNumber = car.DoorsNumber;
            existingCar.LuggageCapacity = car.LuggageCapacity;
            existingCar.EngineCapacity = car.EngineCapacity;
            existingCar.FuelType = car.FuelType;
            existingCar.ProductionDate = car.ProductionDate;
            existingCar.AverageFuelConsumption = car.AverageFuelConsumption;
            existingCar.BodyType = car.BodyType;

            await context.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}
