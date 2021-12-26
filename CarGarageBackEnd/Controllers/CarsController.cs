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
        private readonly UserManager<User> _userManager;
        public CarsController(ICarGarageRepo repo, IMapper mapper, UserManager<User> userManager)
        {
            _mapper = mapper;
            _repo = repo;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetCars([FromQuery] CarParams carsParams)
        {
            var cars = await _repo.GetCars(carsParams);
            var propertiesForReturn = _mapper.Map<IEnumerable<CarForListDto>>(cars);
            Response.AddPagination(cars.CurrentPage, cars.PageSize, cars.TotalCount, cars.TotalPages);
            return Ok(propertiesForReturn);
        }

        [HttpGet("{id}", Name = "GetCar")]
        public async Task<IActionResult> GetProperty(int id)
        {
            var carFromRepo = await _repo.GetCar(id);
            if (carFromRepo == null)
            {
                return NotFound();
            }
            var propertyForDetailsDto = _mapper.Map<CarForListDto>(carFromRepo);
            return Ok(propertyForDetailsDto);
        }
    }
}