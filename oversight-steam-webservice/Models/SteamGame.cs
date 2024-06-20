namespace oversight_steam_webservice.Models
{
    public class SteamGame
    {
        public int AppId { get; set; }
        public string Name { get; set; }
        public long LastModified { get; set; }
        public int PriceChangeNumber { get; set; }
    }
}
