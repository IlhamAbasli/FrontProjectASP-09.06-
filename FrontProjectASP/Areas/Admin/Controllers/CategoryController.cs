using FrontProjectASP.Data;
using FrontProjectASP.Helpers.Extensions;
using FrontProjectASP.Models;
using FrontProjectASP.Services.Interfaces;
using FrontProjectASP.ViewModels.Categories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FrontProjectASP.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(Roles = "SuperAdmin,Admin")]
    public class CategoryController : Controller
    {
        private readonly ICategoryService _categoryService;
        private readonly IWebHostEnvironment _env;
        private readonly AppDbContext _context;
        public CategoryController(ICategoryService categoryService,
                                  IWebHostEnvironment env,
                                  AppDbContext context)
        {
            _categoryService = categoryService;
            _env = env;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var datas = await _categoryService.GetAllAsync();

            List<CategoryVM> categories = datas.Select(m=> new CategoryVM { CategoryId = m.Id, CategoryName = m.CategoryName}).ToList();
            return View(categories);
        }

        [HttpGet]
        [Authorize(Roles = "SuperAdmin")]
        public IActionResult Create()
        {
            return View();  
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(CategoryCreateVM request)
        {
            if(!ModelState.IsValid)
            {
                return View();
            }

            bool existCategory = await _context.Categories.AnyAsync(m => m.CategoryName.Trim() == request.CategoryName.Trim());

            if(existCategory)
            {
                ModelState.AddModelError("CategoryName", "This category has already exist");
                return View();
            }

            if (!request.CategoryImage.CheckFileSize(500))
            {
                ModelState.AddModelError("CategoryImage", "Image size must be less than 500Kb");
                return View();
            }

            if (!request.CategoryImage.CheckFileType("image/")){
                ModelState.AddModelError("CategoryImage", "File type must be image");
                return View();  
            }

            var fileName = Guid.NewGuid().ToString() + "-" + request.CategoryImage.FileName;
            var path = Path.Combine(_env.WebRootPath, "assets/images", fileName);
            await request.CategoryImage.SaveFileToLocalAsync(path);

            await _context.AddAsync(new Category { CategoryName = request.CategoryName, CategoryImage = fileName });
            await _context.SaveChangesAsync();

            return RedirectToAction("Index");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id is null) return BadRequest();

            Category category = await _categoryService.GetByIdAsync((int)id);

            if(category is null) return NotFound();

            string path = Path.Combine(_env.WebRootPath, "assets/images", category.CategoryImage);
            path.DeleteFileFromLocal();

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return RedirectToAction("Index");
        }


        [HttpGet]
        public async Task<IActionResult> Detail(int? id)
        {
            if(id is null) return BadRequest();

            Category category = await _categoryService.GetByIdAsync((int) id);

            if(category is null) return NotFound();

            CategoryDetailVM model = new()
            {
                CategoryName = category.CategoryName,
                CategoryImage = category.CategoryImage,
            };

            return View(model);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id is null) return BadRequest();

            Category category = await _categoryService.GetByIdAsync((int)id);

            if (category is null) return NotFound();


            CategoryEditVM model = new()
            {
                CategoryName = category.CategoryName,
                ExistCategoryImage = category.CategoryImage
            };

            return View(model);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int? id,CategoryEditVM request)
        {
            if (id is null) return BadRequest();

            Category category = await _categoryService.GetByIdAsync((int)id);

            if (category is null) return NotFound();

            if (request.NewCategoryImage is not null)
            {
                if (!request.NewCategoryImage.CheckFileSize(500))
                {
                    ModelState.AddModelError("NewCategoryImage", "Image size must be less than 500Kb");
                    request.ExistCategoryImage = category.CategoryImage;
                    return View(request);
                }

                if (!request.NewCategoryImage.CheckFileType("image/"))
                {
                    ModelState.AddModelError("NewCategoryImage", "File type must be image");
                    request.ExistCategoryImage = category.CategoryImage;
                    return View(request);
                }

                string oldPath = Path.Combine(_env.WebRootPath, "assets/images", category.CategoryImage);
                oldPath.DeleteFileFromLocal();

                string newFileName = Guid.NewGuid().ToString() + "-" + request.NewCategoryImage.FileName;
                string newPath = Path.Combine(_env.WebRootPath, "assets/images", newFileName);
                await request.NewCategoryImage.SaveFileToLocalAsync(newPath);
            }

            category.CategoryName = request.CategoryName;
            await _context.SaveChangesAsync();

            return RedirectToAction("Index");
        }

    }
}
