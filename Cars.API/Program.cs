using System.Text.Json.Serialization;
using Cars.API.Middleware;
using Cars.Application.Cars;
using Cars.Application.Core;
using Cars.Infrastructure;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers(o =>
        // bez tego puste "brand"/"model" zatrzymałby wbudowany [Required] zamiast FluentValidation
        o.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true)
    // enumy jako tekst w JSON ("Diesel"); liczby (np. "fuelType": 1) też są akceptowane
    .AddJsonOptions(o => o.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DataContext>(opt =>
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// MediatR: handlery z Cars.Application + walidacja w pipeline
builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssemblyContaining<GetCarList.Handler>();
    cfg.AddOpenBehavior(typeof(ValidationBehavior<,>));
});

// FluentValidation: rejestracja wszystkich walidatorów z Cars.Application
builder.Services.AddValidatorsFromAssemblyContaining<Create.CommandValidator>();

var app = builder.Build();

app.UseMiddleware<ValidationExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();

// Przy starcie: zastosuj migracje (tworzy cars.db) i dodaj dane startowe
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<DataContext>();
        await context.Database.MigrateAsync();
        await Seed.SeedData(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Błąd podczas migracji / seedowania bazy");
    }
}

app.Run();
