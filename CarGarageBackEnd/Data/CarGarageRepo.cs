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

        public async Task<PagedList<Vehicle>> GetCars(CarParams carParams)
        {
            var cars = _context.Vehicles.AsQueryable();
            if (!string.IsNullOrEmpty(carParams.Warehouse))
            {
                cars = _context.Vehicles.Where(p => p.Car.Warehouse.Name == carParams.Warehouse);
            }
            if (!string.IsNullOrEmpty(carParams.Model))
            {
                cars = _context.Vehicles.Where(p => p.Model == carParams.Model);
            }
            if (carParams.Price != null)
            {
                if (carParams.Price != 0)
                {
                    cars = _context.Vehicles.Where(p => p.Price <= carParams.Price);
                }
            }
            if (carParams.OrderBy == "DNTO")
            {
                cars = cars.OrderByDescending(p => p.DateAdded);
            }
            if (carParams.OrderBy == "DOTN")
            {
                cars = cars.OrderBy(p => p.DateAdded);
            }
            if (carParams.OrderBy == "PLTH")
            {
                cars = cars.OrderBy(p => p.Price);
            }
            if (carParams.OrderBy == "PHTL")
            {
                cars = cars.OrderByDescending(p => p.Price);
            }
            return await PagedList<Vehicle>.CreateAsync(cars, carParams.PageNumber, carParams.PageSize);

        }

        public async Task<bool> SavaAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}