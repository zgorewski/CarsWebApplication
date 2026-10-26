using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace Cars.API.Middleware;

/// <summary>
/// Zamienia ValidationException (rzucaną przez ValidationBehavior) na 400 Bad Request
/// w standardowym formacie ValidationProblemDetails.
/// </summary>
public class ValidationExceptionMiddleware(RequestDelegate next)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException ex)
        {
            var errors = ex.Errors
                .GroupBy(e => e.PropertyName.StartsWith("Car.") ? e.PropertyName[4..] : e.PropertyName)
                .ToDictionary(g => g.Key, g => g.Select(e => e.ErrorMessage).ToArray());

            var problem = new ValidationProblemDetails(errors)
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "Błąd walidacji danych"
            };

            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            await context.Response.WriteAsJsonAsync(problem);
        }
    }
}
