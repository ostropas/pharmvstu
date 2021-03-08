using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PharmacyVSTU.Models
{
    public class Role
    {
        [Key] public int Id { get; set; }

        public string Name { get; set; }

        public virtual List<User> Users { get; set; } = new List<User>();
    }

    /// <summary>
    /// Дает понять роль по id
    /// </summary>
    public enum RolesScroll
    {
        Doctor = 1,
        Patient = 2
    }
}
