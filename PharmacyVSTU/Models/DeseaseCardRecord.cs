using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PharmacyVSTU.Models
{
    public class DeseaseCardRecord
    {
        [Key] public int Id { get; set; }

        /// <summary>
        /// Дата приема
        /// </summary>
        public long Date { get; set; }

        /// <summary>
        /// Информация о болезни пациента
        /// </summary>
        public string Info { get; set; }

        /// <summary>
        /// Рекомендации врача
        /// </summary>
        public string Recomendation { get; set; }

        public int PatientKey { get; set; }
        public virtual Patient Patient { get; set; }

        public int DoctorKey { get; set; }
        public virtual Doctor Doctor { get; set; }


    }
}
