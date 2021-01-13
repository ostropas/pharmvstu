using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PharmacyVSTU.Models;

namespace PharmacyVSTU.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : BasePharmacyController
    {
        // Регистрация, отправляем логин/пароль, ждем токен для дальнейшей работы с сервисом
        [HttpPost("signUpDoctor")]
        public string SignUp(BasePerson person)
        {
            throw new NotImplementedException();
        }
        
        // Авторизация, отправляем логин/пароль, ждем токен для дальнейшей работы с сервисом
        [HttpPost("signIn")]
        public string SignIn(BasePerson person)
        {
            throw new NotImplementedException();
        }

        public AuthController(ILogger<BasePharmacyController> logger, ApplicationContext db) : base(logger, db)
        {
        }
    }
}