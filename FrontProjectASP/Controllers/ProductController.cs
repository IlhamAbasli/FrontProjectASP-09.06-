using FrontProjectASP.Models;
using FrontProjectASP.Services.Interfaces;
using FrontProjectASP.ViewModels.Products;
using Microsoft.AspNetCore.Mvc;

namespace FrontProjectASP.Controllers
{
    public class ProductController : Controller
    {
        private readonly IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        public async Task<IActionResult> Index(int? id)
        {
            if(id is null) return BadRequest();

            Product product = await _productService.GetByIdAsync((int)id);

            if(product is null) return NotFound();

            ProductDetailVM model = new()
            {
                ProductName = product.Name,
                ProductDescription = product.Description,
                Price = product.Price,
                Category = product.Category.CategoryName,
                Status = product.StockStatus.Status,
                ProductImages = product.ProductImages.ToList(),
            };

            return View(model);
        }
    }
}
