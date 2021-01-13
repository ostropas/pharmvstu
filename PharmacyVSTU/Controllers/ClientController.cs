using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PharmacyVSTU.Models;

namespace PharmacyVSTU.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClientController : BasePharmacyController
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

        public ClientController(ILogger<BasePharmacyController> logger, ApplicationContext db) : base(logger, db)
        {
        }
    }
}