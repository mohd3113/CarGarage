using Microsoft.AspNetCore.Identity;

namespace CarGarageBackEnd.Models
{
    public class User : IdentityUser<int>
    {
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; }
        public string About { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }

    }
}