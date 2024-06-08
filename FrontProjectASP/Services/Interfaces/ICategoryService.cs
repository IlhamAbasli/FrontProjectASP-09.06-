using FrontProjectASP.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace FrontProjectASP.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<List<Category>> GetAllAsync();
        Task<SelectList> GetAllBySelectedList();
        Task<Category> GetByIdAsync(int id);    
    }
}
