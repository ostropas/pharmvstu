using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace PharmacyVSTU.Models
{
    static public class Helpers
    {
        /// <summary>
        /// Вычисление хеша строки
        /// </summary>
        static public string GetHash(string text)
        {
            byte[] salt = new byte[128 / 8];

            // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: text,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10,
                numBytesRequested: 256 / 8));

            return hashed;
        }
    }
}
