using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PharmacyVSTU.Models
{
    public class Doctor : BasePerson
    {
        [Key] [Column("iddoctor")] public int Id { get; set; }
        [Column("fullname")] public string FullName { get; set; }
        [Column("departmen")] public string Department { get; set; }
        [Column("post")] public string Post { get; set; }
        [Column("birthday")] public DateTime Birthday { get; set; }
        public List<MedicalCart> MedicalCarts { get; set; }
    }
}