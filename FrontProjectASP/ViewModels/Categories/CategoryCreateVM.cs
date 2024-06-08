using System.ComponentModel.DataAnnotations;

namespace FrontProjectASP.ViewModels.Categories
{
    public class CategoryCreateVM
    {
        [Required]
        public string CategoryName { get; set; }
        [Required]
        public IFormFile CategoryImage { get; set; }
    }
}
