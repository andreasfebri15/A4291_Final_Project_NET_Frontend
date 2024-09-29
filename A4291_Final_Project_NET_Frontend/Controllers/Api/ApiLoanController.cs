using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;
using A4291_Final_Project_NET_Frontend.Dto.Req;

namespace A4291_Final_Project_NET_Frontend.Controllers.Api
{
    public class ApiLoanController : Controller
    {
        private readonly HttpClient _httpClient;

        public ApiLoanController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }


        [HttpGet]
        public async Task<IActionResult> GetAllLoan()
        {
          

            var response = await _httpClient.GetAsync("https://localhost:7037/rest/v1/loan/GetAllLoans");

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
		public async Task<IActionResult> GetLoanById(string id)
		{
			if (string.IsNullOrEmpty(id))
			{
				return BadRequest("Loan id cannot be null or empty");
			}
			var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
			_httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
			var response = await _httpClient.GetAsync($"https://localhost:7205/rest/v1/loan/GetById/{id}");

			if (response.IsSuccessStatusCode)
			{
				var responData = await response.Content.ReadAsStringAsync();
				return Ok(responData);
			}
			else
			{
				return BadRequest("Fetch Loan Failed");
			}
		}

		[HttpPost]
		public async Task<IActionResult> CreateLoan([FromBody] ReqLoan reqLoanDto)
		{
			var json = JsonSerializer.Serialize(reqLoanDto);
			var content = new StringContent(json, Encoding.UTF8, "application/json");

			var response = await _httpClient.PostAsync("https://localhost:7037/rest/v1/loan/NewLoan", content);

			if (response.IsSuccessStatusCode)
			{
				var responData = await response.Content.ReadAsStringAsync();
				return Ok(responData);
			}
			else
			{
				return BadRequest("Create Loan Failed");
			}
		}
	}
}
