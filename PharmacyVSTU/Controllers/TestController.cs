using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PharmacyVSTU.Models;

namespace PharmacyVSTU.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        private ApplicationContext _db;

        public TestController(ApplicationContext db)
        {
            _db = db;
        }
        
        [HttpGet]
        public async Task<List<Doctor>> GetClients()
        {
            return await _db.Doctors.Include(x => x.MedicalCarts).ToListAsync();
        }
    }
}