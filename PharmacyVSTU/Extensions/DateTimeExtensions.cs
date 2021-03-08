using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PharmacyVSTU.Extensions
{
    static class DateTimeExtensions
    {
        public static DateTime NextDayOfWeek(this DateTime date, DayOfWeek day)
        {
            int diff = ((int)day - (int)date.DayOfWeek + 6) % 7;
            return date.AddDays(diff + 1);
        }
    }
}
