using System.ComponentModel.DataAnnotations.Schema;

namespace CarGarageBackEnd.Models
{
    public class Location
    {
        [ForeignKey("Warehouse")]
        public int LocationId { get; set; }
        public string Lat { get; set; }
        public string Long { get; set; }
        public virtual Warehouse Warehouse { get; set; }
    }
}