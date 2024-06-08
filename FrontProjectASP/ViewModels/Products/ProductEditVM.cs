using FrontProjectASP.Models;
using System.ComponentModel.DataAnnotations;

namespace FrontProjectASP.ViewModels.Products
{
    public class ProductEditVM
    {
        [Required]
        public string ProductName { get; set; }
        [Required]
        public string ProductDescription { get; set; }
        [Required]
        public decimal? ProductPrice { get; set; }
        public decimal? DiscountPrice { get; set; }
        public int CategoryId { get; set; }
        public int StatusId { get; set; }
        public List<ProductImage> ExistImages { get; set; }
        public List<IFormFile> NewImages { get; set; }
    }
}
