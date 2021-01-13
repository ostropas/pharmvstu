using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PharmacyVSTU.Models;

namespace PharmacyVSTU.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DoctorController : BasePharmacyController
    {
        /// <summary>
        /// Получает информацию об авторизированном докторе через ключ авторизации
        /// </summary>
        /// <returns>Авторизированный доктор</returns>
        /// <exception cref="NotImplementedException"></exception>
        [HttpGet("data")]
        public Doctor GetCurrentDoctorInfo()
        {
            throw new NotImplementedException();
        }

        public DoctorController(ILogger<BasePharmacyController> logger, ApplicationContext db) : base(logger, db)
        {
        }
    }
}