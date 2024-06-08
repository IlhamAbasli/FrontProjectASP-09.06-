using FrontProjectASP.Data;
using FrontProjectASP.Models;
using FrontProjectASP.Services.Interfaces;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace FrontProjectASP.Services
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;
        public ProductService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<Product>> GetAllAsync()
        {
            return await _context.Products.Include(m=>m.ProductImages).Include(m=>m.StockStatus).ToListAsync();
        }

        public async Task<Product> GetByIdAsync(int id)
        {
            return await _context.Products.Include(m=>m.ProductImages).Include(m=>m.Category).Include(m=>m.StockStatus).FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<SelectList> GetProductStatusesAsync()
        {
            var statuses = await _context.StockStatuses.ToListAsync();
            return new SelectList(statuses, "Id", "Status");
        }
    }
}
