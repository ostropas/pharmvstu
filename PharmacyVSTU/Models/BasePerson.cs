using System.ComponentModel.DataAnnotations.Schema;

namespace PharmacyVSTU.Models
{
    public class BasePerson
    {
        [NotMapped] public string Login { get; set; }
        [NotMapped] public string Password { get; set; }
    }
}