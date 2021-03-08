using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PharmacyVSTU.Models.InterfaceModels
{
    public class UpdateRecordToDeseaseCardModel
    {
        /// <summary>
        /// Информация о болезни пациента
        /// </summary>
        [Required(ErrorMessage = "Не указана информация")]
        public string Info { get; set; }

        /// <summary>
        /// Рекомендации по болезни пациента
        /// </summary>
        [Required(ErrorMessage = "Не указаны рекомендации")]
        public string Recomendation { get; set; }
    }
}
