using System.ComponentModel.DataAnnotations;

namespace PharmacyVSTU.Models
{
    public class Client
    {
        [Key]
        public int idclients { get; set; }
        public string fullname { get; set; }
        public string email { get; set; }
    }
}