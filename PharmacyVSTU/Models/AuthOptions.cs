using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PharmacyVSTU.Models
{
    /// <summary>
    /// Справочник для хранения данных, нужных для выдачи токена
    /// </summary>
    public class AuthOptions
    {
        public const string ISSUER = "UberServer"; // издатель токена
        public const string AUDIENCE = "oiClient"; // потребитель токена
        const string KEY = "superhypersecrettext234324234))00";   // ключ для шифрации
        public const int LIFETIME = 3000; // время жизни токена - 3 минута
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
