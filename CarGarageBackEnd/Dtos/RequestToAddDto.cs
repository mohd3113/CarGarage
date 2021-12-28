using CarGarageBackEnd.Models;

namespace CarGarageBackEnd.Dtos
{
    public class RequestToAddDto
    {
        public string FromName { get; set; }

        public string FromEmail { get; set; }

        public string FromAddress { get; set; }

        public string FromMobilePhone { get; set; }

        public DateTime RequestDate { get; set; }

        public List<int> VehiclesIds { get; set; }

        public RequestToAddDto()
        {
            RequestDate = DateTime.Now;
        }


    }
}