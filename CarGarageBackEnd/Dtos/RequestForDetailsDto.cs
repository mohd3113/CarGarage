using CarGarageBackEnd.Models;

namespace CarGarageBackEnd.Dtos
{
    public class RequestForDetailsDto
    {
        public string FromName { get; set; }
        public string FromEmail { get; set; }
        public string FromAddress { get; set; }
        public string FromMobilePhone { get; set; }
        public DateTime RequestDate { get; set; }
        public List<Vehicle> Vehicles { get; set; }

    }
}