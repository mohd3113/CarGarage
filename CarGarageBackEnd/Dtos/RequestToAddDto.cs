namespace CarGarageBackEnd.Dtos
{
    public class RequestToAddDto
    {
        public string FromName { get; set; }

        public string FromEmail { get; set; }

        public string FromAddress { get; set; }

        public string FromMobilePhone { get; set; }

        public List<int> VihiclesIds { get; set; }
    }
}