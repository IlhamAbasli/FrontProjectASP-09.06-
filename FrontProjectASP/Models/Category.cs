namespace FrontProjectASP.Models
{
    public class Category : BaseEntity
    {
        public string CategoryName { get; set; }    
        public string CategoryImage { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}
