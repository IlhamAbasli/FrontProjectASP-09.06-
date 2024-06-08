namespace FrontProjectASP.Models
{
    public class StockStatus : BaseEntity
    {
        public string Status { get; set; }
        public ICollection<Product> Products { get; set; }
    }
}
