using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PharmacyVSTU.Models.InterfaceModels
{
    public class UpdateDoctorWorkingTimeModel
    {

        [Required]
        public List<WorkingDay> workingTime { get; set; }

    }

    public class WorkingDay
    {
        [Required]
        public int Day { get; set; }

        [Required]
        public string Start { get; set; }

        [Required]
        public string End { get; set; } 
    }
}
