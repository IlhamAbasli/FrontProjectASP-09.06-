using System.ComponentModel.DataAnnotations;

namespace FrontProjectASP.ViewModels.Categories
{
    public class CategoryEditVM
    {
        [Required]
        public string CategoryName { get; set; }
        [Required]
        public string ExistCategoryImage { get; set; }
        public IFormFile NewCategoryImage { get; set; }
    }
}
