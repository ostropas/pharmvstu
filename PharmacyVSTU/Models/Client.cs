using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PharmacyVSTU.Models
{
    public class Client : BasePerson
    {
        [Key] [Column("idclients")] public int Id { get; set; }
        [Column("fullname")] public string Fullname { get; set; }
        [Column("email")] public string Email { get; set; }
        [Column("birthday")] public DateTime Birthday { get; set; }
        [Column("placeresidense")] public string PlaceResidense { get; set; }
        [Column("phone")] public string Phone { get; set; }
        [Column("post")] public string Post { get; set; }
        public virtual List<MedicalCart> MedicalCarts { get; set; }
    }
}