using FluentValidation;
using MediatR;

namespace Cars.Application.Core;

/// <summary>
/// Pipeline MediatR: przed wywołaniem handlera uruchamia wszystkie walidatory dla danego żądania.
/// Przy błędach rzuca ValidationException, którą middleware w Cars.API zamienia na 400 Bad Request.
/// </summary>
public class ValidationBehavior<TRequest, TResponse>(IEnumerable<IValidator<TRequest>> validators)
    : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
{
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        if (!validators.Any()) return await next();

        var context = new ValidationContext<TRequest>(request);
        var results = await Task.WhenAll(validators.Select(v => v.ValidateAsync(context, cancellationToken)));
        var failures = results.SelectMany(r => r.Errors).Where(f => f is not null).ToList();

        if (failures.Count != 0) throw new ValidationException(failures);

        return await next();
    }
}
