using FrontProjectASP.Models;
using FrontProjectASP.Services.Interfaces;
using FrontProjectASP.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace FrontProjectASP.Controllers
{
    public class HomeController : Controller
    {
        private readonly ISliderService _sliderService;
        private readonly ICategoryService _categoryService;
        private readonly IProductService _productService;
        public HomeController(ISliderService sliderService, 
                              ICategoryService categoryService, 
                              IProductService productService)
        {
            _sliderService = sliderService;
            _categoryService = categoryService;
            _productService = productService;
        }
        public async Task<IActionResult> Index()
        {
            List<Slider> sliders = await _sliderService.GetAllAsync();
            List<Category> categories = await _categoryService.GetAllAsync();
            List<Product> products = await _productService.GetAllAsync();


            HomeVM model = new()
            {
                Sliders = sliders,
                Categories = categories.Take(5).ToList(),
                Products = products
                
            };
            return View(model);
        }
    }
}
