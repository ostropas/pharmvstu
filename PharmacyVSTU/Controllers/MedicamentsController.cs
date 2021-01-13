using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PharmacyVSTU.Models;

namespace PharmacyVSTU.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MedicamentsController : BasePharmacyController
    {
        /// <summary>
        /// Создаем новую запись о лекарстве
        /// </summary>
        /// <param name="medicament">Новое лекарство</param>
        /// <returns>Созданное лекарство</returns>
        /// <exception cref="NotImplementedException"></exception>
        [HttpPost("create")]
        public Medicament CreateMedicament(Medicament medicament)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Возвращает все доступные лекарства
        /// </summary>
        /// <returns>Все лекарства</returns>
        /// <exception cref="NotImplementedException"></exception>
        [HttpGet("all")]
        public List<Medicament> GetAllMedicaments()
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Удаляет указанное лекарство
        /// </summary>
        /// <param name="medicament">лекарство для удаления</param>
        /// <returns>удалено ли лекарство</returns>
        /// <exception cref="NotImplementedException"></exception>
        [HttpDelete("delete")]
        public void Delete(Medicament medicament)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Обновляет значения лекарства
        /// </summary>
        /// <param name="medicament">Лекарство для обнавления</param>
        /// <exception cref="NotImplementedException"></exception>
        public void Update(Medicament medicament)
        {
            throw new NotImplementedException();
        }

        public MedicamentsController(ILogger<BasePharmacyController> logger, ApplicationContext db) : base(logger, db)
        {
        }
    }
}