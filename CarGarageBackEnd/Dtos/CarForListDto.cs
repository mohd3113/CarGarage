using CarGarageBackEnd.Models;

namespace CarGarageBackEnd.Dtos
{
    public class CarForListDto
    {
        public int VehicleId { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public int YearModel { get; set; }
        public decimal Price { get; set; }
        public bool Licensed { get; set; }
        public string CarLocation { get; set; }
        public string Lat { get; set; }
        public string Long { get; set; }
        public string WarehouseName { get; set; }
        public DateTime DateAdded { get; set; }

    }
}