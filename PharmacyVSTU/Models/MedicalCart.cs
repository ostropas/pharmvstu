using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PharmacyVSTU.Models
{
    public class MedicalCart
    {
        [Key] [Column("idmedicalcart")] public int Id { get; set; }
        [Column("hospital")] public string Hospital { get; set; }
        [Column("disease")] public string Disease { get; set; }
        [Column("treatment")] public string Treatment { get; set; }
        [Column("dateadmission")] public DateTime DateAdmission { get; set; }
        
        [Column("idclients")] public int ClientForeignKey { get; set; }
        public Client Client { get; set; }
        
        [Column("iddoctor")] public int DoctorForeignKey { get; set; }
        public Doctor Doctor { get; set; }
    }
}