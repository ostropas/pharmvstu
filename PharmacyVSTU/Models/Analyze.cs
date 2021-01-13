using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PharmacyVSTU.Models
{
    public class Analyze
    {
        [Key] [Column("idanalyzes")] public string Id { get; set; }
        [Column("dataanalyze")] public string Data { get; set; }
    }
}