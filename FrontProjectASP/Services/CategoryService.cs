using FrontProjectASP.Data;
using FrontProjectASP.Models;
using FrontProjectASP.Services.Interfaces;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace FrontProjectASP.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _context;
        public CategoryService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Category>> GetAllAsync()
        {
            return await _context.Categories.Include(m=>m.Products)
                                            .ToListAsync();
        }

        public async Task<SelectList> GetAllBySelectedList()
        {
            var categories = await _context.Categories.ToListAsync();
            return new SelectList(categories, "Id", "CategoryName");
        }

        public async Task<Category> GetByIdAsync(int id)
        {
            return await _context.Categories.FirstOrDefaultAsync(m => m.Id == id);
        }
    }
}
