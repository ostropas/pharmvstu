using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PharmacyVSTU.Models;

namespace PharmacyVSTU.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorController : BasePharmacyController
    {
        /// <summary>
        /// Получает информацию об авторизированном докторе через ключ авторизации
        /// </summary>
        /// <returns>Авторизированный доктор</returns>
        /// <exception cref="NotImplementedException"></exception>
        [HttpGet("data")]
        public string GetCurrentDoctorInfo()
        {
            return "It works";
        }

        public DoctorController(ILogger<BasePharmacyController> logger, ApplicationContext db) : base(logger, db)
        {
        }
    }
}