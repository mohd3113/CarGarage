namespace CarGarageBackEnd.Models
{
    public class Car
    {
        public int CarId { get; set; }
        public string Location { get; set; }
        public int WarehouseId { get; set; }
        public virtual Warehouse Warehouse { get; set; }
        public virtual ICollection<Vehicle> Vehicles { get; set; }
    }
}