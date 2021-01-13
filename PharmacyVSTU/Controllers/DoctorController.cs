using System;
using Microsoft.AspNetCore.Mvc;
using PharmacyVSTU.Models;

namespace PharmacyVSTU.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DoctorController : ControllerBase
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
    }
}