﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PharmacyVSTU.Models;
using PharmacyVSTU.Models.InterfaceModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PharmacyVSTU.Controllers
{
    /// <summary>
    /// Организует операции с пациентом
    /// </summary>
    [Authorize]
    [Route("api/patient/card")]
    [ApiController]
    public class DeseaseCardController : BasePharmacyController
    {
        public DeseaseCardController(ILogger<DeseaseCardController> logger, ApplicationContext db) : base(logger, db)
        {
        }

        /// <summary>
        /// Получение карты пациента
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetDeseaseCard([FromQuery] int cardId)
        {
            // ид карты == ид пациента
            Patient patien = await _db.Patients.FirstOrDefaultAsync(x => x.Id == cardId);
            if (patien == null)
            {
                var notFoundRes = NotFound();
                _logger.Log(LogLevel.Information, $"{this.Request.Host.Value + this.Request.Path.Value}: {notFoundRes.StatusCode}");

                return notFoundRes;
            }

            var deseaseCard = new List<object>();
            foreach(var record in patien.DeseaseCardRecords)
            {
                deseaseCard.Add(new {
                    doctorId = record.DoctorKey,
                    date = record.Date,
                    info = record.Info,
                    recomendation = record.Recomendation
                });
            }

            var okRes = Ok(deseaseCard);
            _logger.Log(LogLevel.Information, $"{this.Request.Host.Value + this.Request.Path.Value}: {okRes.StatusCode}");

            return okRes;
        }

        /// <summary>
        /// Добавление новой записи в карту пациента
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> AddRecordToDeseaseCard([FromQuery] int cardId, [FromBody] AddRecordToDeseaseCardModel deseaseRecord)
        {
            // ид карты == ид пациента
            Patient patien = await _db.Patients.FirstOrDefaultAsync(x => x.Id == cardId);
            if (patien == null)
            {
                string errorText = "Не найдена такая карта";
                var notFoundRes = NotFound(errorText);
                _logger.Log(LogLevel.Information, $"{this.Request.Host.Value + this.Request.Path.Value}: {notFoundRes.StatusCode}: {errorText}");

                return notFoundRes;
            }

            /* Тут доставали доктора по токену
            // Получаем id пользователя из токена. Id туда попал при выдаче токена во время авторизации
            var nameIdentifier = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
            int userId = int.Parse(nameIdentifier.Value);
            // достаем доктора
            Doctor doctor = await _db.Doctors.FirstOrDefaultAsync(x => x.Id == cardId);
            if (doctor == null)
            {
                return NotFound("Не найдена такой доктор");
            }
            */

            // достаем доктора
            Doctor doctor = await _db.Doctors.FirstOrDefaultAsync(x => x.Id == deseaseRecord.DoctorId);
            if (doctor == null)
            {
                string errorText = "Не найдена такой доктор";
                var noFoundRes = NotFound(errorText);
                _logger.Log(LogLevel.Information, $"{this.Request.Host.Value + this.Request.Path.Value}: {noFoundRes.StatusCode}: {errorText}");

                return noFoundRes;
            }

            DeseaseCardRecord newDeseaseRecord = new DeseaseCardRecord()
            {
                Date = deseaseRecord.Date,
                Info = deseaseRecord.Info,
                Doctor = doctor,
                Patient = patien
            };
            _db.DeseaseCards.Add(newDeseaseRecord);
            await _db.SaveChangesAsync();

            return Ok(new { success = true });
        }

        /// <summary>
        /// Обновление последней зписи в карточке пациента
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> UpdateRecordToDeseaseCard([FromQuery] int cardId, [FromBody] UpdateRecordToDeseaseCardModel deseaseRecord)
        {
            // ид карты == ид пациента
            Patient patient = await _db.Patients.FirstOrDefaultAsync(x => x.Id == cardId);
            if (patient == null)
            {
                string errorText = "Не найдена такая карта";
                var notFoundRes = NotFound("Не найдена такая карта");
                _logger.Log(LogLevel.Information, $"{this.Request.Host.Value + this.Request.Path.Value}: {notFoundRes.StatusCode}: {errorText}");

                return notFoundRes;
            }

            DeseaseCardRecord lastDeseaseRecord = patient.DeseaseCardRecords.FirstOrDefault(c => c.Id == patient.DeseaseCardRecords.Max(x => x.Id)); // последняя запись имеет наибольшую цифру в поле ид
            if (lastDeseaseRecord == null)
            {
                var notFoundRes = NotFound();
                _logger.Log(LogLevel.Information, $"{this.Request.Host.Value + this.Request.Path.Value}: {notFoundRes.StatusCode}");

                return notFoundRes;
            }

            if (!string.IsNullOrWhiteSpace(deseaseRecord.Info)) lastDeseaseRecord.Info = deseaseRecord.Info;
            if (!string.IsNullOrWhiteSpace(deseaseRecord.Recomendation)) lastDeseaseRecord.Recomendation = deseaseRecord.Recomendation;

            await _db.SaveChangesAsync();

            var okRes = Ok(new { success = true });
            _logger.Log(LogLevel.Information, $"{this.Request.Host.Value + this.Request.Path.Value}: {okRes.StatusCode}");

            return okRes;
        }
    }
}
