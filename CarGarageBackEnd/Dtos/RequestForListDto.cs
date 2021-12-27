namespace CarGarageBackEnd.Dtos
{
    public class RequestForListDto
    {
        public string FromName { get; set; }
        public string FromEmail { get; set; }
        public string FromMobilePhone { get; set; }
        public decimal Total { get; set; }
    }
}