namespace CarGarageBackEnd.Models
{
    public class Request
    {
        public int RequestId { get; set; }

        public string FromName { get; set; }

        public string FromEmail { get; set; }

        public string FromAddress { get; set; }

        public string FromMobilePhone { get; set; }

        public DateTime RequestDate { get; set; }
        public virtual ICollection<RequestVehicle> RequestVihicles  { get; set; }

    }
}