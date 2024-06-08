using System.ComponentModel.DataAnnotations;

namespace FrontProjectASP.ViewModels.Products
{
    public class ProductCreateVM
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public int CategoryId { get; set; }
        [Required]
        public List<IFormFile> ProductImages { get; set; }
        [Required]
        public string Price { get; set; }

    }
}
