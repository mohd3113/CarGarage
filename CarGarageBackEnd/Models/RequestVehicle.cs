using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarGarageBackEnd.Models
{
    public class RequestVehicle
    {

        public int RequestVehicleId { get; set; }
        public int RequestId { get; set; }
        public int VehicleId { get; set; }
        public virtual Vehicle Vehicle { get; set; }
        public virtual Request Request { get; set; }
    }
}