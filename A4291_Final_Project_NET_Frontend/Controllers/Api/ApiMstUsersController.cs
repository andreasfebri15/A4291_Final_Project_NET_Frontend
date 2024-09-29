using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;
using Microsoft.AspNetCore.Identity.Data;
using A4291_Final_Project_NET_Frontend.Dto.Req;

namespace A4291_Final_Project_NET_Frontend.Controllers.Api
{
    public class ApiMstUsersController : Controller
    {
        private readonly HttpClient _httpClient;

        public ApiMstUsersController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterRequest RegisterRequest)
        {

            var json = JsonSerializer.Serialize(RegisterRequest);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync("https://localhost:7037/api/Register", content);

            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                return Ok(responseData);
            }
            else
            {
                return BadRequest("Register Failed");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);


            var response = await _httpClient.GetAsync("https://localhost:7037/api/GetAllUser");

            if (response.IsSuccessStatusCode)
            {
                var responseData = await response.Content.ReadAsStringAsync();
                return Ok(responseData);
            }
            else
            {
                return BadRequest("Failed to get users");
            }

        }

        [HttpGet]
        public async Task<IActionResult> GetUserById(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("User ID cannot be null or empty.");
            }

            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.GetAsync($"https://localhost:7037/api/GetUserById/{id}");

            if (response.IsSuccessStatusCode)
            {
                var jsonData = await response.Content.ReadAsStringAsync();
                return Ok(jsonData);
            }
            else
            {
                return BadRequest("Failed to fetch user.");
            }
        }


        [HttpPut]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] ReqMstUsers reqMstUserDto)
        {
            if (reqMstUserDto == null)
            {
                return BadRequest("Invalid user data.");
            }

            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var json = JsonSerializer.Serialize(reqMstUserDto);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PutAsync($"https://localhost:7037/api/Update/{id}", content);

            if (response.IsSuccessStatusCode)
            {
                var jsonData = await response.Content.ReadAsStringAsync();
                return Ok(jsonData);
            }
            else
            {
                return BadRequest("Failed to update user.");
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.DeleteAsync($"https://localhost:7037/api/Delete/{id}");

            if (response.IsSuccessStatusCode)
            {
                return Ok("User deleted successfully.");
            }
            else
            {
                return BadRequest("Failed to delete user.");
            }
        }


    }
}
