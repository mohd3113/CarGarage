namespace CarGarageBackEnd.Models
{
    public class Vehicle
    {
        public int VehicleId { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public int YearModel { get; set; }
        public decimal Price { get; set; }
        public bool Licensed { get; set; }
        public DateTime DateAdded { get; set; }
        public int CarId { get; set; }
        public virtual Car Car { get; set; }

        public virtual ICollection<RequestVehicle> RequestVihicles { get; set; }
    }
}