using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PharmacyVSTU.Models
{
    public class User
    {
        [Key] public int Id { get; set; }
        public string Email { get; set; }
        public string Fio { get; set; }
        public string Password { get; set; }


        public int RoleKey { get; set; }
        public virtual Role Role { get; set; }
    }
}
