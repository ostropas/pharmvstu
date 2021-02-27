﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using PharmacyVSTU.InterfaceModels;
using PharmacyVSTU.Models;
using System.Text.Json;

namespace PharmacyVSTU.Controllers
{
    /// <summary>
    /// Организует регистрацию/авторизацию
    /// </summary>
    [ApiController]
    public class AuthController : BasePharmacyController
    {
        public AuthController(ILogger<BasePharmacyController> logger, ApplicationContext db) : base(logger, db)
        {
        }

        /// <summary>
        /// Экшон регистрации
        /// </summary>
        [Route("reg")]
        [HttpPost]
        public async Task<IActionResult> SignUp([FromBody]RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                // Добавляем нового юзера, если указанного Email еще нет в бд
                User user = await _db.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
                if (user == null)
                {
                    // ищем роль
                    RolesScroll roleKey = model.Doctor == true ? RolesScroll.Doctor : RolesScroll.Client;
                    int intRoleKey = (int)roleKey;
                    Role userRole = await _db.Roles.FirstOrDefaultAsync(r => r.Id == intRoleKey);

                    // добавляем пользователя в бд
                    _db.Users.Add(new User { Email = model.Email, Fio = model.Fio, Password = model.Password, RoleKey = userRole.Id });
                    await _db.SaveChangesAsync();

                    // генерим токен с данными пользователя, чтоб юзер бл сразу авторизованным после регистрации
                    var identity = GetIdentity(model.Email, model.Password);
                    string jwt = GenJWT(identity);
                    var response = new
                    {
                        access_token = jwt
                    };

                    return Ok(response);
                }
                else
                {
                    return BadRequest(new { errorText = "Пользователь с таким емейлом уже зарегистрирован." });
                }
            }
            return BadRequest(model);
        }

        /// <summary>
        /// Экшон авторизации
        /// </summary>
        [Route("auth")]
        [HttpPost]
        public async Task<IActionResult> SignIn([FromBody] LoginModel model)
        {
            if (ModelState.IsValid)
            {
                var identity = GetIdentity(model.Email, model.Password);
                if (identity == null)
                {
                    return BadRequest(new { errorText = "Не найдено пользователя с таким емейлом" });
                }

                string jwt = GenJWT(identity);

                var response = new
                {
                    access_token = jwt
                };

                return Ok(JsonSerializer.Serialize(response));
            }
            return BadRequest(model);
        }

        /// <summary>
        /// Получение claim'а учетки пользователя
        /// </summary>
        [NonAction]
        private ClaimsIdentity GetIdentity(string email, string password)
        {
            User user = _db.Users.FirstOrDefault(x => x.Email == email && x.Password == password);
            if (user != null)
            {
                string role = _db.Users.Include(u => u.Role.Name).ToString();
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    //new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email), // todo: емейл вроде не пригождается
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role?.Name)
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            // если пользователя не найдено
            return null;
        }

        /// <summary>
        /// Генерация jwt-токена
        /// </summary>
        [NonAction]
        private string GenJWT(ClaimsIdentity identity)
        {
            var now = DateTime.UtcNow;

            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromHours(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return encodedJwt;
        }
    }
}