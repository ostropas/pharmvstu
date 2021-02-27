using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PharmacyVSTU.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace PharmacyVSTU.Controllers
{
    /// <summary>
    /// Организует операции с данными учетки юзера
    /// </summary>
    [Authorize]
    [Route("api/user")]
    [ApiController]
    public class UserController : BasePharmacyController
    {
        public UserController(ILogger<BasePharmacyController> logger, ApplicationContext db) : base(logger, db)
        {
        }

        /// <summary>
        /// Экшон получения данных пользователя
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            // Получаем id пользователя из токена. Id туда попал при выдаче токена во время авторизации
            var nameIdentifier = this.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
            int userId = int.Parse(nameIdentifier.Value);

            User user = await _db.Users.FirstOrDefaultAsync(x => x.Id == userId);

            var userData = new
            {
                doctor = user.Role.Id == (int)RolesScroll.Doctor ? true : false,
                fio = user.Fio,
                email = user.Email,
                id = user.Id

            };

            return Ok(userData);
        }
    }
}
