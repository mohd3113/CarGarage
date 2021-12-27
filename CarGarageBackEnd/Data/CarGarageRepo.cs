using CarGarageBackEnd.Helpers;
using CarGarageBackEnd.Models;
using Microsoft.EntityFrameworkCore;

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

        public async Task<Vehicle> GetCar(int id)
        {
            return await _context.Vehicles.FirstOrDefaultAsync(p => p.VehicleId == id);
        }

        public async Task<List<string>> GetCarMake()
        {
            return await _context.Vehicles.GroupBy(p => p.Make).Select(p => p.Key).OrderBy(p => p).ToListAsync();
        }

        public PagedList<Vehicle> GetCars(CarParams carParams)
        {
            var cars = _context.Vehicles.Where(p => p.Licensed == carParams.Licensed).ToList();
            if (!string.IsNullOrEmpty(carParams.Warehouse))
            {
                cars = cars.Where(p => p.Car.Warehouse.Name == carParams.Warehouse).ToList();
            }
            if (!string.IsNullOrEmpty(carParams.Model))
            {
                cars = cars.Where(p => p.Make == carParams.Model).ToList();
            }
            if (carParams.Price != null)
            {
                if (carParams.Price != 0)
                {
                    cars = cars.Where(p => p.Price <= carParams.Price).ToList();
                }
            }
            if (carParams.OrderBy == "DNTO")
            {
                cars = cars.OrderByDescending(p => p.DateAdded).ToList();
            }
            if (carParams.OrderBy == "DOTN")
            {
                cars = cars.OrderBy(p => p.DateAdded).ToList();
            }
            if (carParams.OrderBy == "PLTH")
            {
                cars = cars.OrderBy(p => p.Price).ToList();
            }
            if (carParams.OrderBy == "PHTL")
            {
                cars = cars.OrderByDescending(p => p.Price).ToList();
            }
            return PagedList<Vehicle>.CreateAsync(cars, carParams.PageNumber, carParams.PageSize);

        }

        public async Task<bool> SavaAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}