using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PharmacyVSTU.Models
{
    public class DoctorWorkingTime
    {
        [Key] public int Id { get; set; }

        /// <summary>
        ///  Время начала рабочего дня
        /// </summary>
        public string Start { get; set; }

        /// <summary>
        ///  Время окончания рабочего дня
        /// </summary>
        public string End { get; set; }

        /// <summary>
        /// Номер дня недели (пн - 1, вт - 2, ...)
        /// </summary>
        public int WeekdayNumber { get; set; }

        public int DoctorKey { get; set; }
        public virtual Doctor Doctor { get; set; }

        public void SetWeeklySchedule(int doctorId)
        {
            for(int i = 1; i <= 5; i++)
            {

            }
        }
    }

   
}
