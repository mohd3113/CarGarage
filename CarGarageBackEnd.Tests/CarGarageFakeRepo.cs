using CarGarageBackEnd.Data;
using CarGarageBackEnd.Helpers;
using CarGarageBackEnd.Models;
using Microsoft.EntityFrameworkCore;
using MockQueryable.Moq;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarGarageBackEnd.Tests
{
    public class CarGarageFakeRepo : ICarGarageRepo
    {
        private readonly List<Vehicle> _cars;

        public CarGarageFakeRepo()
        {
            _cars = new List<Vehicle>()
            {
                new Vehicle
                    {
                        VehicleId = 1,
                        Make = "Nissan",
                        Model = "Sunny",
                        YearModel = 2015,
                        Price = 30000,
                        Licensed = true,
                        DateAdded = DateTime.Now,
                        CarId = 1
                    },
                    new Vehicle{
                        VehicleId = 2,
                         Make = "Nissan",
                        Model = "Sunny",
                        YearModel = 2015,
                        Price = 30000,
                        Licensed = true,
                        DateAdded = DateTime.Now,
                        CarId = 1,
                    }
            };
        }

        Task<bool> ICarGarageRepo.SavaAll()
        {
            throw new NotImplementedException();
        }

        public PagedList<Vehicle> GetCars(CarParams carParams)
        {
            return  PagedList<Vehicle>.CreateAsync(_cars.AsQueryable(), carParams.PageNumber, carParams.PageSize);
        }

        Task<Vehicle> ICarGarageRepo.GetCar(int id)
        {
            throw new NotImplementedException();
        }

        public void Add<T>(T entity) where T : class
        {
            throw new NotImplementedException();
        }

        public void Delete<T>(T entity) where T : class
        {
            throw new NotImplementedException();
        }

    }
}