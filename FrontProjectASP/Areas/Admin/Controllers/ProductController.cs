using FrontProjectASP.Data;
using FrontProjectASP.Helpers.Extensions;
using FrontProjectASP.Models;
using FrontProjectASP.Services.Interfaces;
using FrontProjectASP.ViewModels.Products;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FrontProjectASP.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(Roles = "SuperAdmin,Admin")]
    public class ProductController : Controller
    {
        private readonly IProductService _productService;
        private readonly ICategoryService _categoryService;
        private readonly IWebHostEnvironment _env;
        private readonly AppDbContext _context;
        public ProductController(IProductService productService, 
                                 ICategoryService categoryService,
                                 IWebHostEnvironment env,
                                 AppDbContext context)
        {
            _productService = productService;
            _categoryService = categoryService;
            _env = env;
            _context = context;
        }


        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var products = await _productService.GetAllAsync();  
            
            List<ProductVM> model = products.Select(m=> new ProductVM { ProductId = m.Id, ProductName = m.Name}).ToList();

            return View(model);
        }

        [HttpGet]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Create()
        {
            ViewBag.categories = await _categoryService.GetAllBySelectedList();
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(ProductCreateVM request)
        {
            if(!ModelState.IsValid) return View();

            foreach (var item in request.ProductImages)
            {
                if (!item.CheckFileSize(500))
                {
                    ModelState.AddModelError("ProductImages", "Image size must be less than 500Kb");
                    return View();
                }
                if (!item.CheckFileType("image/"))
                {
                    ModelState.AddModelError("ProductImages", "File type must be image");
                    return View();
                }
            }

            List<ProductImage> images = new();

            foreach (var item in request.ProductImages)
            {
                string fileName = Guid.NewGuid().ToString() + "-" + item.FileName;
                string path = Path.Combine(_env.WebRootPath, "assets/images", fileName);
                await item.SaveFileToLocalAsync(path);

                images.Add(new ProductImage { Image = fileName });
            }

            images.FirstOrDefault().IsMain = true;

            await _context.Products.AddAsync(new Product
            {
                Name = request.Name,
                Description = request.Description,
                Price = decimal.Parse(request.Price),
                CategoryId = request.CategoryId,    
                StockStatusId = 1,
                ProductImages = images
            });
            await _context.SaveChangesAsync();  

            return RedirectToAction("Index");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Delete(int? id)
        {
            if(id is null) return BadRequest();

            Product product = await _productService.GetByIdAsync((int)id);

            if(product is null) return NotFound();

            foreach (var item in product.ProductImages)
            {
                var path = Path.Combine(_env.WebRootPath, "assets/images", item.Image);
                path.DeleteFileFromLocal();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return RedirectToAction("Index");
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int? id)
        {
            ViewBag.categories = await _categoryService.GetAllBySelectedList();
            ViewBag.statuses = await _productService.GetProductStatusesAsync();

            if (id is null) return BadRequest();

            Product product = await _productService.GetByIdAsync((int)id);

            if (product is null) return NotFound();

            ProductEditVM model = new()
            {
                ProductName = product.Name,
                ProductDescription = product.Description,
                ProductPrice = product.Price,
                CategoryId = product.CategoryId,
                StatusId = product.StockStatusId,
                ExistImages = product.ProductImages.ToList(),
            };

            return View(model);
        }

        [HttpGet]
        public async Task<IActionResult> Detail(int? id)
        {
            if (id is null) return BadRequest();

            Product product = await _productService.GetByIdAsync((int)id);

            if (product is null) return NotFound();

            ProductDetailVM model = new()
            {
                ProductName= product.Name,
                ProductDescription= product.Description,
                Price = product.Price,
                Category = product.Category.CategoryName,
                ProductImages = product.ProductImages.ToList(),
            };

            return View(model);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int? id,ProductEditVM request)
        {
            ViewBag.categories = await _categoryService.GetAllBySelectedList();
            ViewBag.statuses = await _productService.GetProductStatusesAsync();


            if (id is null) return BadRequest();

            Product product = await _productService.GetByIdAsync((int)id);

            if (product is null) return NotFound();

            if (!ModelState.IsValid)
            {
                request.ExistImages = product.ProductImages.ToList();
                return View(request);
            }

            if(request.NewImages is not null)
            {
                foreach (var item in request.NewImages)
                {
                    if (!item.CheckFileSize(500))
                    {
                        ModelState.AddModelError("ProductImages", "Image size must be less than 500Kb");
                        request.ExistImages = product.ProductImages.ToList();
                        return View(request);
                    }
                    if (!item.CheckFileType("image/"))
                    {
                        ModelState.AddModelError("ProductImages", "File type must be image");
                        request.ExistImages = product.ProductImages.ToList();
                        return View(request);
                    }
                }

                foreach (var item in request.NewImages)
                {
                    string fileName = Guid.NewGuid().ToString() + "-" + item.FileName;
                    string path = Path.Combine(_env.WebRootPath, "assets/images", fileName);
                    await item.SaveFileToLocalAsync(path);

                    product.ProductImages.Add(new ProductImage { Image = fileName });
                }
            }

            product.Name = request.ProductName;
            product.Description = request.ProductDescription;
            product.Price = request.ProductPrice;
            product.DiscountPrice = request.DiscountPrice;
            product.CategoryId = request.CategoryId;
            product.StockStatusId = request.StatusId;

            await _context.SaveChangesAsync();

            return RedirectToAction("Index");

        }

        [HttpPost]
        public async Task<IActionResult> DeleteImage(int? id,int? productId)
        {
            if (id is null || productId is null) return BadRequest();

            var product = await _context.Products.Where(m => m.Id == productId)
                                                 .Include(m => m.ProductImages)
                                                 .FirstOrDefaultAsync();
            if (product is null) return NotFound();

            var image = product.ProductImages.FirstOrDefault(m => m.Id == id);

            if (image.IsMain)
            {
                return Problem();
            }

            string path = Path.Combine(_env.WebRootPath, "assets/images", image.Image);
            path.DeleteFileFromLocal();

            product.ProductImages.Remove(image); 

            await _context.SaveChangesAsync();

            return Ok();
        }


        [HttpPost]
        public async Task<IActionResult> ChangeMainImage(int? id,int? productId)
        {
            if (id is null || productId is null) BadRequest();

            Product product = await _productService.GetByIdAsync((int)productId);

            if (product is null) NotFound();

            var images = product.ProductImages.Where(m => m.IsMain == true);

            foreach (var image in images)
            {
                image.IsMain = false;
            }

            product.ProductImages.FirstOrDefault(m => m.Id == id).IsMain = true;

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
