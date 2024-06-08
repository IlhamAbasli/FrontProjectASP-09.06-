using Microsoft.AspNetCore.Identity;

namespace FrontProjectASP.Models
{
    public class AppUser : IdentityUser
    {
        public string FullName { get; set; }
    }
}
