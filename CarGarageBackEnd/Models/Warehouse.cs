namespace CarGarageBackEnd.Models
{
    public class Warehouse
    {
        public int WarehouseId { get; set; }
        public string Name { get; set; }
        public virtual Location Location { get; set; }
        public virtual Car Cars { get; set; }

    }
}