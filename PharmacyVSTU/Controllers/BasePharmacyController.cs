using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PharmacyVSTU.Models;

namespace PharmacyVSTU.Controllers
{
    public class BasePharmacyController : ControllerBase
    {
        protected readonly ILogger _logger;
        protected readonly ApplicationContext _db;

        public BasePharmacyController(ILogger<BasePharmacyController> logger, ApplicationContext db)
        {
            _logger = logger;
            _db = db;
        }
    }
}