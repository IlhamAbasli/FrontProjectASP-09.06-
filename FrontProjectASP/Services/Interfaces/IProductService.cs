using FrontProjectASP.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace FrontProjectASP.Services.Interfaces
{
    public interface IProductService
    {
        Task<List<Product>> GetAllAsync();

        Task<Product> GetByIdAsync(int id);
        Task<SelectList> GetProductStatusesAsync();
    }
}
