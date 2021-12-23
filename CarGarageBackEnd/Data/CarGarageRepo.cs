using CarGarageBackEnd.Helpers;
using CarGarageBackEnd.Models;

namespace CarGarageBackEnd.Data
{
    public class CarGarageRepo : ICarGarageRepo
    {
        private readonly DataContext _context;
        public CarGarageRepo(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<PagedList<Car>> GetCars(CarParams carParams)
        {
            var cars = _context.Cars.AsQueryable();
             return await PagedList<Car>.CreateAsync(cars, carParams.PageNumber, carParams.PageSize);
            
        }

        public async Task<bool> SavaAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}