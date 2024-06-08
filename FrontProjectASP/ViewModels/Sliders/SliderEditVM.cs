using System.ComponentModel.DataAnnotations;

namespace FrontProjectASP.ViewModels.Sliders
{
    public class SliderEditVM
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public IFormFile NewImage { get; set; }
        public string ExistImage { get; set; }

    }
}
