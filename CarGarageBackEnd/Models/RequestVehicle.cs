using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarGarageBackEnd.Models
{
    public class RequestVehicle
    {
        [Key]
        [Column(Order = 1)]
        public int RequestId { get; set; }

        [Key]
        [Column(Order = 2)]
        public int VehicleId { get; set; }

        public virtual Vehicle Vehicle { get; set; }

        public virtual Request Request { get; set; }
    }
}