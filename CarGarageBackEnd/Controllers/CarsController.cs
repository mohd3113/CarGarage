using System.Security.Claims;
using AutoMapper;
using CarGarageBackEnd.Data;
using CarGarageBackEnd.Dtos;
using CarGarageBackEnd.Helpers;
using CarGarageBackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CarGarageBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class CarsController : ControllerBase
    {
        private readonly ICarGarageRepo _repo;
        private readonly IMapper _mapper;
        public CarsController(ICarGarageRepo repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetCars([FromQuery] CarParams carsParams)
        {
            var cars = _repo.GetCars(carsParams);
            var carsForReturn = _mapper.Map<IEnumerable<CarForListDto>>(cars);
            Response.AddPagination(cars.CurrentPage, cars.PageSize, cars.TotalCount, cars.TotalPages);
            return Ok(carsForReturn);
        }

        [HttpGet("{id}", Name = "GetCar")]
        public async Task<IActionResult> GetCar(int id)
        {
            var carFromRepo = await _repo.GetCar(id);
            if (carFromRepo == null)
            {
                return NotFound();
            }
            var propertyForDetailsDto = _mapper.Map<CarForListDto>(carFromRepo);
            return Ok(propertyForDetailsDto);
        }

        [HttpGet("GetCarMake")]
        public async Task<IActionResult> GetCarMake()
        {
            var makeFromRepo = await _repo.GetCarMake();
            return Ok(makeFromRepo);
        }
    }
}