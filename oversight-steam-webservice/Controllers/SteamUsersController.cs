using Microsoft.AspNetCore.Mvc;

namespace oversight_steam_webservice.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SteamUsersController : ControllerBase
    {
        private readonly ILogger<SteamUsersController> _logger;

        public SteamUsersController(ILogger<SteamUsersController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetSteamUsers")]
        public IEnumerable<SteamUser> Get()
        {
            return Enumerable.Select(index => new SteamUser
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
