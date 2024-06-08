using Microsoft.AspNetCore.Mvc.Rendering;

namespace FrontProjectASP.ViewModels.Users
{
    public class UserRoleVM
    {
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Roles { get; set; }
    }
}
