using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PharmacyVSTU.Models
{
    public class Patient
    {
        [Key] public int Id { get; set; }

        public virtual User User { get; set; }

        public virtual List<DeseaseCardRecord> DeseaseCardRecords { get; set; } = new List<DeseaseCardRecord>();

    }
}
