using FrontProjectASP.Data;
using FrontProjectASP.Models;
using FrontProjectASP.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FrontProjectASP.Services
{
    public class SliderService : ISliderService
    {
        private readonly AppDbContext _context;

        public SliderService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Slider> GetSliderByIdAsync(int id)
        {
            return await _context.Sliders.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Slider>> GetAllAsync()
        {
            return await _context.Sliders.ToListAsync();
        }
    }
}
