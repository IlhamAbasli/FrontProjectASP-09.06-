using FrontProjectASP.Models;

namespace FrontProjectASP.ViewModels.Products
{
    public class ProductDetailVM
    {
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public decimal? Price { get; set; }
        public decimal? DiscountPrice { get; set; }
        public string Category {  get; set; }
        public string Status { get; set; }
        public List<ProductImage> ProductImages { get; set; }
    }
}
