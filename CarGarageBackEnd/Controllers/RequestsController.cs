using AutoMapper;
using CarGarageBackEnd.Data;
using CarGarageBackEnd.Dtos;
using CarGarageBackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarGarageBackEnd.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class RequestsController : ControllerBase
    {

        private readonly ICarGarageRepo _repo;
        private readonly IMapper _mapper;
        public RequestsController(ICarGarageRepo repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetRequests()
        {
            var requests = await _repo.GetRequests();
            var requestsForReturn = _mapper.Map<IEnumerable<RequestForListDto>>(requests);
            return Ok(requestsForReturn);
        }

        [HttpPost]
        public async Task<IActionResult> AddRequest(RequestToAddDto requestToAddDto)
        {
            Request req = _mapper.Map<Request>(requestToAddDto);
            _repo.Add(req);
            await _repo.SavaAll();
            foreach (var ve in requestToAddDto.VehiclesIds)
            {
                _repo.Add(new RequestVehicle { RequestId = req.RequestId, VehicleId = ve });
                 await _repo.SavaAll();
            }
            var requestForDetailsDto = _mapper.Map<RequestForDetailsDto>(req);
            return Ok();
        }

        [HttpGet("{id}", Name = "GetRequest")]
        public async Task<IActionResult> GetRequest(int id)
        {
            var requestFromRepo = await _repo.GetRequest(id);

            if (requestFromRepo == null)
            {
                return NotFound();
            }
            var studentForDetailsDto = _mapper.Map<RequestForDetailsDto>(requestFromRepo);
            return Ok(studentForDetailsDto);
        }
    }
}