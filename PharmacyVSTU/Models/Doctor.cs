﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PharmacyVSTU.Models
{
    public class Doctor
    {
        [Key] public int Id { get; set; }

        public string Info { get; set; } // todo: изменить тип на string
        public virtual User User { get; set; }

        public virtual List<DoctorWorkingTime> DoctorWorkingTimes { get; set; } = new List<DoctorWorkingTime>();

        public virtual List<DeseaseCardRecord> DeseaseCardRecords { get; set; } = new List<DeseaseCardRecord>();

    }
}