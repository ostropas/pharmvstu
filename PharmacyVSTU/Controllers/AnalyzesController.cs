using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using PharmacyVSTU.Models;

namespace PharmacyVSTU.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AnalyzesController : ControllerBase
    {
        /// <summary>
        /// Получить все анализы
        /// </summary>
        /// <returns></returns>
        [HttpGet("all")]
        public List<Analyze> GetAll()
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Создать новый анализ
        /// </summary>
        /// <param name="analyze"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        [HttpPost("create")]
        public Analyze Create(Analyze analyze)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Обновить существующий анализ
        /// </summary>
        /// <param name="analyze"></param>
        /// <exception cref="NotImplementedException"></exception>
        [HttpPost("update")]
        public void Update(Analyze analyze)
        {
            throw new NotImplementedException();
        }
    }
}