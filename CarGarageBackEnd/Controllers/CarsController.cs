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
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var properties = await _repo.GetCars(carsParams);

            var propertiesForReturn = _mapper.Map<IEnumerable<CarForListDto>>(properties);

            Response.AddPagination(properties.CurrentPage, properties.PageSize, properties.TotalCount, properties.TotalPages);
            return Ok(propertiesForReturn);
        }
    }
}