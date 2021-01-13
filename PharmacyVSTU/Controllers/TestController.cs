using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PharmacyVSTU.Models;

namespace PharmacyVSTU.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : BasePharmacyController
    {
        [HttpGet]
        public async Task<List<Doctor>> GetClients()
        {
            return await _db.Doctors.Include(x => x.MedicalCarts).ToListAsync();
        }

        public TestController(ILogger<BasePharmacyController> logger, ApplicationContext db) : base(logger, db)
        {
        }
    }
}