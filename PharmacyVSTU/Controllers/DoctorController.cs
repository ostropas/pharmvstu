using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PharmacyVSTU.Models;
using PharmacyVSTU.Models.InterfaceModels;
using PharmacyVSTU.Extensions;

namespace PharmacyVSTU.Controllers
{
    /// <summary>
    /// Организует операции с доктором
    /// </summary>
    [Authorize]
    [Route("api/doctor")]
    [ApiController]
    public class DoctorController : BasePharmacyController
    {
        public DoctorController(ILogger<BasePharmacyController> logger, ApplicationContext db) : base(logger, db)
        {
        }

        /// <summary>
        /// Получение записанных пациентов
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("patients")]
        public async Task<IActionResult> GetPatients()
        {
            // Получаем id пользователя из токена. Id туда попал при выдаче токена во время авторизации
            var nameIdentifier = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
            int userId = int.Parse(nameIdentifier.Value);
            User user = await _db.Users.FirstOrDefaultAsync(x => x.Id == userId);

            // Достаем доктора
            Doctor doctor = await _db.Doctors.FirstOrDefaultAsync(x => x.User.Id == user.Id);
            if (doctor == null)
            {
                string errorText = "Такой доктор не найден";
                var notFoundRes = NotFound(errorText);
                _logger.Log(LogLevel.Information, $"{this.Request.Host.Value + this.Request.Path.Value}: {notFoundRes.StatusCode}: {errorText}");

                return notFoundRes;
            }

            // Достаем все связанные с доктором записи карт болезней
            List<DeseaseCardRecord> cards = await _db.DeseaseCards.Where(x => x.DoctorKey == doctor.Id).ToListAsync();

            // Достаем пациентов этих записей карт
            List<Patient> patients = cards.Select(x => x.Patient).Distinct().ToList();

            var result = new List<object>();
            foreach (var patient in patients)
            {
                result.Add(new
                {
                    id = patient.Id,
                    cardId = patient.Id,
                    email = patient.User.Email,
                    fio = patient.User.Fio
                });
            }

            var okRes = Ok(result);
            _logger.Log(LogLevel.Information, $"{this.Request.Host.Value + this.Request.Path.Value}: {okRes.StatusCode}");

            return okRes;
        }

        /// <summary>
        /// Получение записанных пациентов
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetDoctors()
        {
            List<Doctor> doctors = _db.Doctors.Select(x => x).ToList(); // делаем селект, чтобы сработала лейзи подгрузка

            var result = new List<object>();
            foreach (var doctor in doctors)
            {
                result.Add(new
                {
                    doctorId = doctor.Id,
                    fio = doctor.User.Fio,
                    info = doctor.Info
                });
            }

            var okRes = Ok(result);
            _logger.Log(LogLevel.Information, $"{this.Request.Host.Value + this.Request.Path.Value}: {okRes.StatusCode}");

            return okRes;
        }

        /// <summary>
        /// Получение информации о докторе
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet]
        [Route("info")]
        public async Task<IActionResult> GetDoctorInfo([FromQuery] int doctorId)
        {
            Doctor doctor = await _db.Doctors.FirstOrDefaultAsync(x => x.Id == doctorId);
            if(doctor == null)
            {
                string errorText = "Такой доктор не найден";
                var notFoundRes = NotFound(errorText);
                _logger.Log(LogLevel.Information, $"{this.Request.Host.Value + this.Request.Path.Value}: {notFoundRes.StatusCode}: errorText");

                return notFoundRes;
            }

            var result = new
            {
                doctorId = doctor.Id,
                fio = doctor.User.Fio,
                info = doctor.Info
            };

            var okRes = Ok(result);
            _logger.Log(LogLevel.Information, $"{this.Request.Host.Value + this.Request.Path.Value}: {okRes.StatusCode}");

            return okRes;
        }

        /// <summary>
        /// Обновление данных доктора
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        [Route("info")]
        public async Task<IActionResult> UpdateDoctorInfo([FromBody] UpdateDoctorInfoModel model)
        {
            // Получаем id пользователя из токена. Id туда попал при выдаче токена во время авторизации
            var nameIdentifier = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
            int userId = int.Parse(nameIdentifier.Value);

            // Достаем запись юзера
            User user = await _db.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (user == null)
            {
                var notFoundRes = NotFound();
                _logger.Log(LogLevel.Information, $"{this.Request.Host.Value + this.Request.Path.Value}: {notFoundRes.StatusCode}");

                return notFoundRes;
            }

            // Достаем запись пациента
            Doctor doctor = await _db.Doctors.FirstOrDefaultAsync(x => x.User.Id == user.Id);
            if (doctor == null)
            {
                var notFoundRes = NotFound();
                _logger.Log(LogLevel.Information, $"{this.Request.Host.Value + this.Request.Path.Value}: {notFoundRes.StatusCode}");

                return notFoundRes;
            }

            if (!string.IsNullOrWhiteSpace(model.Email)) user.Email = model.Email;
            if (!string.IsNullOrWhiteSpace(model.Fio)) user.Fio = model.Fio;
            if (!string.IsNullOrWhiteSpace(model.Info)) doctor.Info = model.Info;

            await _db.SaveChangesAsync();

            var okRes = Ok(new { success = true });
            _logger.Log(LogLevel.Information, $"{this.Request.Host.Value + this.Request.Path.Value}: {okRes.StatusCode}");

            return okRes;
        }

        /// <summary>
        /// Получение расписания доктора
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet]
        [Route("workingTime")]
        public async Task<IActionResult> GetDoctorWorkingTime([FromQuery] int doctorId)
        {
            Doctor doctor = await _db.Doctors.FirstOrDefaultAsync(x => x.Id == doctorId);
            if (doctor == null)
            {
                string errorText = "Такой доктор не найден";
                var notFoundRes = NotFound(errorText);
                _logger.Log(LogLevel.Information, $"{this.Request.Host.Value + this.Request.Path.Value}: {notFoundRes.StatusCode}: {errorText}");

                return notFoundRes;
            }

            var result = new List<object>();
            foreach (var time in doctor.DoctorWorkingTimes)
            {
                result.Add(new
                {
                    day = time.WeekdayNumber,
                    start = time.Start,
                    end = time.End
                });
            }

            var okRes = Ok(result);
            _logger.Log(LogLevel.Information, $"{this.Request.Host.Value + this.Request.Path.Value}: {okRes.StatusCode}");

            return okRes;
        }

        /// <summary>
        /// Обновление расписания доктора
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        [Route("workingTime")]
        public async Task<IActionResult> UpdateDoctorWorkingTime([FromBody] UpdateDoctorWorkingTimeModel model)
        {
            // Получаем id пользователя из токена. Id туда попал при выдаче токена во время авторизации
            var nameIdentifier = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
            int userId = int.Parse(nameIdentifier.Value);

            // Достаем запись юзера
            User user = await _db.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (user == null)
            {
                var notFoundRes = NotFound();
                _logger.Log(LogLevel.Information, $"{this.Request.Host.Value + this.Request.Path.Value}: {notFoundRes.StatusCode}");

                return notFoundRes;
            }

            Doctor doctor = await _db.Doctors.FirstOrDefaultAsync(x => x.User.Id == user.Id);
            if (doctor == null)
            {
                string errorText = "Такой доктор не найден";
                var notFoundRes = NotFound(errorText);
                _logger.Log(LogLevel.Information, $"{this.Request.Host.Value + this.Request.Path.Value}: {notFoundRes.StatusCode}: {errorText}");

                return notFoundRes;
            }

            foreach (var workingDay 
                in model.workingTime)
            {
                DoctorWorkingTime newWorkingDay = new DoctorWorkingTime()
                {
                    Start = workingDay.Start,
                    End = workingDay.End,
                    Doctor = doctor,
                    WeekdayNumber = workingDay.Day,
                };

                DoctorWorkingTime workingTime = _db.DoctorWorkingTimes.FirstOrDefault(x => x.WeekdayNumber == newWorkingDay.WeekdayNumber && x.Doctor.Id == newWorkingDay.Doctor.Id);

                // Если создаваемый день есть уже в бд, то обновляем, иначе создаем новый
                if (workingTime != null)
                {
                    workingTime.Start = newWorkingDay.Start;
                    workingTime.End = newWorkingDay.End;
                }
                else
                {
                    _db.DoctorWorkingTimes.Add(newWorkingDay);
                }
                
                await _db.SaveChangesAsync();
            }

            var okRes = Ok(new { success = true });
            _logger.Log(LogLevel.Information, $"{this.Request.Host.Value + this.Request.Path.Value}: {okRes.StatusCode}");

            return okRes;
        }

        /// <summary>
        /// Получить доступное для записи время
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpGet]
        [Route("appointment")]
        public async Task<IActionResult> GetAppointmentTime([FromQuery] int doctorId)
        {

            Doctor doctor = await _db.Doctors.FirstOrDefaultAsync(x => x.Id == doctorId);
            if (doctor == null)
            {
                string errorText = "Такой доктор не найден";
                var notFoundRes = NotFound(errorText);
                _logger.Log(LogLevel.Information, $"{this.Request.Host.Value + this.Request.Path.Value}: {notFoundRes.StatusCode}: {errorText}");

                return notFoundRes;
            }

            List<long> availabelTime = new List<long>();
            foreach (var daySchedule in doctor.DoctorWorkingTimes)
            {
                // находим начало и конец даты дня недели
                DateTime timeStart = DateTime.Parse(daySchedule.Start); // парсит в сегоднешнее число с указаным временем
                DateTime nextDayOfWeekStart = timeStart.NextDayOfWeek((DayOfWeek)daySchedule.WeekdayNumber);
                long nextDayOfWeekStartTS = (int)(nextDayOfWeekStart - new DateTime(1970, 1, 1)).TotalSeconds;

                DateTime timeEnd = DateTime.Parse(daySchedule.End);
                DateTime nextDayOfWeekEnd = timeEnd.NextDayOfWeek((DayOfWeek)daySchedule.WeekdayNumber);
                long nextDayOfWeekEndTS = (int)(nextDayOfWeekEnd - new DateTime(1970, 1, 1)).TotalSeconds;

                long appointmentLong = 1800; // 30 мин в секундах

                for(long time = nextDayOfWeekStartTS; time <= nextDayOfWeekEndTS - appointmentLong; time += appointmentLong)
                {
                    // если на это время нет записей в карточках пользователей, то это доступное время
                    if (!_db.DeseaseCards.Any(x => x.Date == time))
                        availabelTime.Add(time);
                }
            }

            var okRes = Ok(availabelTime);
            _logger.Log(LogLevel.Information, $"{this.Request.Host.Value + this.Request.Path.Value}: {okRes.StatusCode}");

            return okRes;
        }
    }
}