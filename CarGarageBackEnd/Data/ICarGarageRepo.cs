using CarGarageBackEnd.Helpers;
using CarGarageBackEnd.Models;

namespace CarGarageBackEnd.Data
{
    public interface ICarGarageRepo
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SavaAll();

         Task<PagedList<Car>> GetCars(CarParams carParams);

    }
}