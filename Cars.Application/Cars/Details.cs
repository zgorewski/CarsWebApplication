using Cars.Domain;
using Cars.Infrastructure;
using MediatR;

namespace Cars.Application.Cars;

public class Details
{
    public class Query : IRequest<Car?>
    {
        public Guid Id { get; set; }
    }

    public class Handler(DataContext context) : IRequestHandler<Query, Car?>
    {
        public async Task<Car?> Handle(Query request, CancellationToken cancellationToken)
        {
            // null => kontroler zwraca 404
            return await context.Cars.FindAsync([request.Id], cancellationToken);
        }
    }
}
