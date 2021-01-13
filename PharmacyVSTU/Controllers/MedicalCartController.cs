using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PharmacyVSTU.Models;

namespace PharmacyVSTU.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MedicalCartController : ControllerBase
    {
        /// <summary>
        /// Добавить новую мед карту (предполагается, что там изначально должен быть клиент
        /// </summary>
        /// <param name="medicalCart"></param>
        /// <returns>Созданная карта</returns>
        /// <exception cref="NotImplementedException"></exception>
        [HttpPost("create")]
        public MedicalCart CreateMedicalCart(MedicalCart medicalCart)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Обновить информацию о мед карте
        /// </summary>
        /// <param name="medicalCart"></param>
        /// <returns>Обновленная мед карте</returns>
        /// <exception cref="NotImplementedException"></exception>
        [HttpPost("update")]
        public MedicalCart Update(MedicalCart medicalCart)
        {
            throw new NotImplementedException();
        }

        [HttpDelete("delete")]
        public void Delete(MedicalCart medicalCart)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Получить все карточки
        /// </summary>
        /// <exception cref="NotImplementedException"></exception>
        [HttpGet("all")]
        public List<MedicalCart> GetAll()
        {
            throw new NotImplementedException();
        }
    }
}