using FrontProjectASP.Models;

namespace FrontProjectASP.Services.Interfaces
{
    public interface ISliderService
    {
        Task<List<Slider>> GetAllAsync();
        Task<Slider> GetSliderByIdAsync(int id);
    }
}
