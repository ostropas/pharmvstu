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
        private readonly ApplicationContext _context;

        public TestController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<List<Client>> Simple()
        {
            return await _context.Clients.ToListAsync();
        }
        //
        // // GET
        // public IActionResult Index()
        // {
        //     return View();
        // }
    }
}