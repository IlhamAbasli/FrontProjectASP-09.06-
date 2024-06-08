using FrontProjectASP.Models;
using FrontProjectASP.ViewModels.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace FrontProjectASP.Areas.Admin.Controllers
{
    [Area("Admin")]
    public class UserController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        public UserController(UserManager<AppUser> userManager,RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            List<UserRoleVM> userRoles = new();
            
            var users = _userManager.Users.ToList(); 
            
            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                string rolesStr = string.Join(",", roles);

                userRoles.Add(new UserRoleVM
                {
                    Email = user.Email,
                    FullName = user.FullName,
                    UserName = user.UserName,
                    Roles = rolesStr,
                });
            }

            return View(userRoles);
        }

        [HttpGet]        
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> AddRole()
        {
            ViewBag.users = new SelectList(_userManager.Users.ToList(),"Id","FullName");
            ViewBag.roles = new SelectList(_roleManager.Roles.ToList(),"Id","Name");
            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddRole(AddRoleVM request)
        {
            var user = _userManager.FindByIdAsync(request.UserId).Result;
            var role = _roleManager.FindByIdAsync(request.RoleId).Result;

            await _userManager.AddToRoleAsync(user, role.ToString());
            return RedirectToAction("Index");
        }
    }
}
