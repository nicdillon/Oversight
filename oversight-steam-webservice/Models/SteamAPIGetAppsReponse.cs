namespace oversight_steam_webservice.Models
{
    public class SteamAPIGetAppsReponse
    {
        public Response Response { get; set; } = new();
    }

    public class Response
    {
        public List<SteamGame> Games { get; set; } = [];
        public bool HaveMoreResults { get; set; }
        public int LastAppId { get; set; }
    }
}
