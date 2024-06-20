using Microsoft.AspNetCore.Mvc;
using oversight_steam_webservice.Models;
using oversight_steam_webservice.Services;

namespace oversight_steam_webservice.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SteamAPIController : ControllerBase
    {
        private readonly ILogger<SteamAPIController> _logger;
        private SteamAPIService _steamUsersService;

        public SteamAPIController(ILogger<SteamAPIController> logger, SteamAPIService steamUsersService)
        {
            _logger = logger;
            _steamUsersService = steamUsersService;
        }

        [HttpGet(Name = "GetSteamGames")]
        public async Task<IEnumerable<SteamGame>> GetGamesAsync()
        {
            try
            {
                return await _steamUsersService.GetGamesAsync<IEnumerable<SteamGame>>(10);
            }
            catch (Exception ex)
            {
                string message = $"Error getting Steam games: {ex.Message}";
                _logger.LogError(message: message);
                return [];
            }
        }
    }
}
