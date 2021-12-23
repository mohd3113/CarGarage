using Microsoft.AspNetCore.Identity;

namespace CarGarageBackEnd.Models
{
    public class Role : IdentityRole<int>
    {
        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}