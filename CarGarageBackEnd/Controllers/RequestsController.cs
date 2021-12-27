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
        public IActionResult GetRequests()
        {
            var requests = _repo.GetRequests();
            var requestsForReturn = _mapper.Map<IEnumerable<RequestForListDto>>(requests);
            return Ok(requestsForReturn);
        }

        [HttpPost]
        public IActionResult AddRequest(RequestToAddDto requestToAddDto)
        {
            Request req = _mapper.Map<Request>(requestToAddDto);
            _repo.Add(req);
            _repo.SavaAll();
            foreach (var ve in requestToAddDto.VihiclesIds)
            {
                _repo.Add(new RequestVehicle { RequestId = req.RequestId, VehicleId = ve });
            }
            _repo.SavaAll();
            var requestForDetailsDto = _mapper.Map<RequestForDetailsDto>(req);
            return CreatedAtRoute("GetStudent", new { requestId = req.RequestId, }, requestForDetailsDto);
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