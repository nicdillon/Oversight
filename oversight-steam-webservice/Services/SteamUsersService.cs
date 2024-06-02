using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace oversight_steam_webservice.Services
{
    public class ApiService
    {
        private readonly HttpClient _httpClient;

        public ApiService(HttpClient httpClient)
        {
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
        }

        public async Task<T> GetAsync<T>(string url)
        {
            HttpResponseMessage response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsAsync<T>();
        }

        public async Task<TResponse> PostAsync<TRequest, TResponse>(string url, TRequest request)
        {
            HttpResponseMessage response = await _httpClient.PostAsJsonAsync(url, request);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsAsync<TResponse>();
        }

        public async Task<TResponse> PutAsync<TRequest, TResponse>(string url, TRequest request)
        {
            HttpResponseMessage response = await _httpClient.PutAsJsonAsync(url, request);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadAsAsync<TResponse>();
        }

        public async Task DeleteAsync(string url)
        {
            HttpResponseMessage response = await _httpClient.DeleteAsync(url);
            response.EnsureSuccessStatusCode();
        }
    }
}
