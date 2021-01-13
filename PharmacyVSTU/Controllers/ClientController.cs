using System;
using Microsoft.AspNetCore.Mvc;
using PharmacyVSTU.Models;

namespace PharmacyVSTU.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClientController : ControllerBase
    {
        /// <summary>
        /// Возвращает данные о клиенте, который уже авторизирован по ключу регистрации
        /// </summary>
        /// <returns>Свойства авторизированного клиента</returns>
        [HttpGet("data")]
        public Client GetClientData()
        {
            throw new NotImplementedException();
        }
    }
}