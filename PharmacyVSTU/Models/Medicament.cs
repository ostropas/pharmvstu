using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PharmacyVSTU.Models
{
    public class Medicament
    {
        [Key] [Column("idmedicaments")] public int Id { get; set; }
        [Column("namemedicaments")] public string Name { get; set; }
        [Column("countmedicaments")] public int Count { get; set; }
    }
}