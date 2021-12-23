namespace CarGarageBackEnd.Dtos
{
    public class JsonLocation
    {
        public string lat { get; set; }
        public string lon { get; set; }
    }

    public class JsonCar
    {
        public string location { get; set; }
        public List<JsonVehicles> vehicles { get; set; }
    }

    public class JsonVehicles
    {
        public string make { get; set; }
        public string model { get; set; }
        public int year_model { get; set; }
        public decimal price { get; set; }
        public bool licensed { get; set; }
        public DateTime date_added { get; set; }
    }
    public class CarsFromJsonDto
    {
        public int _id { get; set; }
        public string name { get; set; }
        public JsonLocation location { get; set; }
        public JsonCar cars { get; set; }
    }
}