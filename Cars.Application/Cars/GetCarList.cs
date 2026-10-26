using Cars.Domain;
using Cars.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Cars.Application.Cars;

public class GetCarList
{
    public class Query : IRequest<List<Car>> { }

    public class Handler(DataContext context) : IRequestHandler<Query, List<Car>>
    {
        public async Task<List<Car>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Cars.ToListAsync(cancellationToken);
        }
    }
}
