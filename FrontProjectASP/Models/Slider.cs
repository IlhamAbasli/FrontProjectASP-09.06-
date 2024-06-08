using System.ComponentModel.DataAnnotations.Schema;

namespace FrontProjectASP.Models
{
    public class Slider : BaseEntity
    { 
        public string SliderTitle { get; set; }
        public string SliderName { get; set; }
        public string SliderDescription { get; set; }
        public string SliderImage { get; set; }
        public int SliderNumber { get; set; }
    }
}
