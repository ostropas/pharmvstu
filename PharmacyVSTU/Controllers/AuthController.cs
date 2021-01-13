using System;
using Microsoft.AspNetCore.Mvc;

namespace PharmacyVSTU.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        // Регистрация, отправляем логин/пароль, ждем токен для дальнейшей работы с сервисом
        [HttpPost("/signUp")]
        public string SignUp(string login, string password)
        {
            throw new NotImplementedException();
        }
        
        // Авторизация, отправляем логин/пароль, ждем токен для дальнейшей работы с сервисом
        [HttpPost("/signIn")]
        public string SignIn(string login, string password)
        {
            throw new NotImplementedException();
        }
    }
}