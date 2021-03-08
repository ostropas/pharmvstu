using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PharmacyVSTU.Models.InterfaceModels
{
    public class AddRecordToDeseaseCardModel
    {
        /// <summary>
        /// Дата приема
        /// </summary>
        [Required(ErrorMessage = "Не указана дата приема")]
        public long Date { get; set; }

        /// <summary>
        /// Информация о болезни пациента
        /// </summary>
        [Required(ErrorMessage = "Не указана информация")]
        public string Info { get; set; }

        [Required(ErrorMessage = "Не указан ид доктора")]
        public int DoctorId { get; set; }
    }
}
