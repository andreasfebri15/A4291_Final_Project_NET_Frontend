using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text;

namespace A4291_Final_Project_NET_Frontend.Controllers.Api
{
    public class ApiLoginController : Controller
    {
        private readonly HttpClient _httpClient;

        public ApiLoginController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            var json = JsonSerializer.Serialize(loginRequest);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync("https://localhost:7037/api/Login", content);

            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                return Ok(responseData);
            }
            else
            {
                return BadRequest("Login Failed");
            }
        }
    }
}
