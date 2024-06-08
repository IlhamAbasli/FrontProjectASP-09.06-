using System.ComponentModel.DataAnnotations;

namespace FrontProjectASP.ViewModels.Sliders
{
    public class SliderCreateVM
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public IFormFile Image { get; set; }
        [Required]
        public int? SliderNumber { get; set; }
    }
}
