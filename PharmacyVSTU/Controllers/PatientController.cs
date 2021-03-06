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
    [Route("api/patient/info")]
    [ApiController]

    public class PatientController : BasePharmacyController
    {
        public PatientController(ILogger<PatientController> logger, ApplicationContext db) : base(logger, db)
        {
        }

        /// <summary>
        /// Получение данных пациента
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetPatient()
        {
            // Получаем id пользователя из токена. Id туда попал при выдаче токена во время авторизации
            var nameIdentifier = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
            int userId = int.Parse(nameIdentifier.Value);

            // Достаем запись юзера
            User user = await _db.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if(user == null)
            {
                return NotFound();
            }

            // Достаем запись пациента
            Patient patient = await _db.Patients.FirstOrDefaultAsync(x => x.User.Id == user.Id);
            if (patient == null)
            {
                return NotFound();
            }

            var userData = new
            {
                patientId = patient.Id,
                fio = user.Fio,
                cardId = patient.Id
            };

            return Ok(userData);
        }

        /// <summary>
        /// Обновление данных пациента
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> UpdatePatient([FromBody] PatientUpdateModel model)
        {
            // Получаем id пользователя из токена. Id туда попал при выдаче токена во время авторизации
            var nameIdentifier = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
            int userId = int.Parse(nameIdentifier.Value);

            // Достаем запись юзера
            User user = await _db.Users.FirstOrDefaultAsync(x => x.Id == userId);
            if (user == null)
            {
                return NotFound();
            }

            // Достаем запись пациента
            Patient patient = await _db.Patients.FirstOrDefaultAsync(x => x.User.Id == user.Id);
            if (user == null)
            {
                return NotFound();
            }

            if(!string.IsNullOrWhiteSpace(model.Email)) user.Email = model.Email;
            if(!string.IsNullOrWhiteSpace(model.Fio)) user.Fio = model.Fio;

            await _db.SaveChangesAsync();

            return Ok(new { success = true });
        }
    }
}
