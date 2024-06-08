using FrontProjectASP.Data;
using FrontProjectASP.Helpers.Extensions;
using FrontProjectASP.Models;
using FrontProjectASP.Services.Interfaces;
using FrontProjectASP.ViewModels.Sliders;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FrontProjectASP.Areas.Admin.Controllers
{
    [Area("Admin")]
    [Authorize(Roles = "SuperAdmin,Admin")]
    public class SliderController : Controller
    {
        private readonly ISliderService _sliderService;
        private readonly IWebHostEnvironment _env;
        private readonly AppDbContext _context;

        public SliderController(ISliderService sliderService, 
                                IWebHostEnvironment env,
                                AppDbContext context)
        {
            _sliderService = sliderService;
            _env = env;
            _context = context;
        }


        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var sliders = await _sliderService.GetAllAsync();
            return View(sliders);
        }

        [HttpGet]
        [Authorize(Roles = "SuperAdmin")]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(SliderCreateVM request)
        {
            if(!ModelState.IsValid) return View();


            if (!request.Image.CheckFileType("image/"))
            {
                ModelState.AddModelError("Image", "File must be only Image");
                return View();
            }

            if (!request.Image.CheckFileSize(700))
            {
                ModelState.AddModelError("Image", "File size must be less than 200Kb");
                return View();
            }

            string fileName = Guid.NewGuid().ToString() + "-" + request.Image.FileName;

            string path = Path.Combine(_env.WebRootPath, "assets/images", fileName);
            await request.Image.SaveFileToLocalAsync(path);

            await _context.Sliders.AddAsync(new Slider
            {
                SliderName = request.Name,
                SliderDescription = request.Description,
                SliderTitle = request.Title,
                SliderImage = fileName,
            });

            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));   

        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id is null) return BadRequest();

            Slider slider = await _sliderService.GetSliderByIdAsync((int)id);

            if (slider is null) return NotFound();

            string existFile = Path.Combine(_env.WebRootPath, "assets/images", slider.SliderImage);
            existFile.DeleteFileFromLocal();

            _context.Sliders.Remove(slider);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }


        [HttpGet]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id is null) return BadRequest();

            Slider slider = await _sliderService.GetSliderByIdAsync((int)id);

            if (slider is null) return NotFound();

            SliderEditVM model = new()
            {
                Name = slider.SliderName,
                Description = slider.SliderDescription,
                ExistImage = slider.SliderImage,
                Title = slider.SliderTitle,
            };

            return View(model);
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int?id,SliderEditVM request)
        {

            if (!ModelState.IsValid) return View();

            if (id is null) return BadRequest();

            Slider slider = await _sliderService.GetSliderByIdAsync((int)id);

            if (slider is null) return NotFound();

            if(request.NewImage is not null)
            {
                if (!request.NewImage.CheckFileType("image/"))
                {
                    ModelState.AddModelError("NewImage", "File must be only Image");
                    request.ExistImage = slider.SliderImage;
                    return View(request);
                }

                if (!request.NewImage.CheckFileSize(200))
                {
                    ModelState.AddModelError("NewImage", "File size must be less than 200Kb");
                    request.ExistImage = slider.SliderImage;
                    return View(request);
                }

                string oldPath = Path.Combine(_env.WebRootPath, "assets/images",slider.SliderImage);
                oldPath.DeleteFileFromLocal();
                string newFileName = Guid.NewGuid().ToString() + "-" + request.NewImage.FileName;
                string newPath = Path.Combine(_env.WebRootPath,"assets/images",newFileName);
                await request.NewImage.SaveFileToLocalAsync(newPath);

                slider.SliderImage = newFileName;
            }

            slider.SliderName = request.Name;
            slider.SliderDescription = request.Description;
            slider.SliderTitle = request.Title;
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }


        [HttpGet]
        public async Task<IActionResult> Detail(int? id)
        {
            if (id is null) return BadRequest();

            Slider slider = await _sliderService.GetSliderByIdAsync((int)id);

            if (slider is null) return NotFound();

            SliderDetailVM model = new()
            {
                Title = slider.SliderTitle,
                Description = slider.SliderDescription,
                Name = slider.SliderName,
                Image = slider.SliderImage,
            };

            return View(model);
        }
    }
}
