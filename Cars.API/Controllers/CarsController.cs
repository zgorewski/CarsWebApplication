using Cars.Application.Cars;
using Cars.Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Cars.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarsController(IMediator mediator) : ControllerBase
{
    // GET /api/cars -> 200
    [HttpGet]
    public async Task<ActionResult<List<Car>>> GetCars()
    {
        return await mediator.Send(new GetCarList.Query());
    }

    // GET /api/cars/{id} -> 200 / 404
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Car>> GetCar(Guid id)
    {
        var car = await mediator.Send(new Details.Query { Id = id });

        if (car is null) return NotFound();

        return car;
    }

    // POST /api/cars -> 201 / 400
    [HttpPost]
    public async Task<ActionResult<Car>> CreateCar(Car car)
    {
        var created = await mediator.Send(new Create.Command { Car = car });

        return CreatedAtAction(nameof(GetCar), new { id = created.Id }, created);
    }

    // PUT /api/cars/{id} -> 204 / 400 / 404
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateCar(Guid id, Car car)
    {
        var updated = await mediator.Send(new Edit.Command { Id = id, Car = car });

        if (!updated) return NotFound();

        return NoContent();
    }

    // DELETE /api/cars/{id} -> 204 / 404
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteCar(Guid id)
    {
        var deleted = await mediator.Send(new Delete.Command { Id = id });

        if (!deleted) return NotFound();

        return NoContent();
    }
}
