using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PharmacyVSTU.Models;
using System.IO;
using System.Threading.Tasks;

namespace PharmacyVSTU.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentationController : BasePharmacyController
    {
        [HttpGet]
        public async Task<ContentResult> Index()
        {
            var data = await System.IO.File.ReadAllTextAsync("doc.html");
            return new ContentResult {
                ContentType = "text/html",
                StatusCode = (int)HttpStatusCode.OK,
                Content = data
            };
        }


        public DocumentationController(ILogger<BasePharmacyController> logger, ApplicationContext db) : base(logger, db)
        {
        }
    }
}