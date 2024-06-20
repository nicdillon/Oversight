using static System.Net.WebRequestMethods;
using oversight_steam_webservice.Models;

namespace oversight_steam_webservice.Services
{
    public class SteamAPIService
    {
        private readonly HttpClient _httpClient;
        private const string STEAM_API_URL = "https://api.steampowered.com/IStoreService/GetAppList/v1/?include_games=true&include_dlc=false&include_software=false&include_videos=false&include_hardware=false";
        private const string STEAM_API_KEY = "XXXXX";

        public SteamAPIService(HttpClient httpClient)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
        }

        public async Task<IEnumerable<SteamGame>> GetGamesAsync<IEnumerable>(int itemsPerPage)
        {
            string steamUrlWithKey = string.Concat(STEAM_API_URL, "&key=", STEAM_API_KEY, "&max_results=", itemsPerPage.ToString());
            HttpResponseMessage response = await _httpClient.GetAsync(steamUrlWithKey);

            try 
            {
                List<SteamGame> result = (await response.Content.ReadFromJsonAsync<SteamAPIGetAppsReponse>(value => new SteamAPIGetAppsReponse() 
                { 
                    Response
                }) ?? new SteamAPIGetAppsReponse()).Response.Games;
                return result;
            }
            catch (Exception exception)
            {
                Console.WriteLine($"SteamUsersService Error in GetGamesAsync: {exception}");
                return [];
            }
        }

        //public async Task<TResponse> PostAsync<TRequest, TResponse>(string url, TRequest request)
        //{
        //    HttpResponseMessage response = await _httpClient.PostAsJsonAsync(url, request);
        //    response.EnsureSuccessStatusCode();
        //    return await response.Content.ReadFromJsonAsync<TResponse>();
        //}

        //public async Task<TResponse> PutAsync<TRequest, TResponse>(string url, TRequest request)
        //{
        //    HttpResponseMessage response = await _httpClient.PutAsJsonAsync(url, request);
        //    response.EnsureSuccessStatusCode();
        //    return await response.Content.ReadFromJsonAsync<TResponse>();
        //}

        //public async Task DeleteAsync(string url)
        //{
        //    HttpResponseMessage response = await _httpClient.DeleteAsync(url);
        //    response.EnsureSuccessStatusCode();
        //}
    }
}
