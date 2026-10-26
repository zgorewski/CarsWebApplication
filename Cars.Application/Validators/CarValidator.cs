using Cars.Domain;
using FluentValidation;

namespace Cars.Application.Validators;

public class CarValidator : AbstractValidator<Car>
{
    public CarValidator()
    {
        RuleFor(x => x.Brand)
            .NotEmpty().WithMessage("Brand nie może być puste.");

        RuleFor(x => x.Model)
            .NotEmpty().WithMessage("Model nie może być puste.");

        RuleFor(x => x.DoorsNumber)
            .InclusiveBetween(2, 5).WithMessage("DoorsNumber musi być z zakresu od 2 do 5.");

        RuleFor(x => x.LuggageCapacity)
            .GreaterThanOrEqualTo(0).WithMessage("LuggageCapacity nie może być ujemne.");

        RuleFor(x => x.EngineCapacity)
            .GreaterThan(0).WithMessage("EngineCapacity musi być większe od 0.");

        RuleFor(x => x.ProductionDate)
            .Must(date => date.ToUniversalTime() <= DateTime.UtcNow)
            .WithMessage("ProductionDate nie może być datą z przyszłości.");

        RuleFor(x => x.AverageFuelConsumption)
            .GreaterThan(0).WithMessage("AverageFuelConsumption musi być większe od 0.");
    }
}
