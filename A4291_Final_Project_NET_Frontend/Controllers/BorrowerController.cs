using Microsoft.AspNetCore.Mvc;

namespace A4291_Final_Project_NET_Frontend.Controllers
{
    public class BorrowerController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult HistoryLoan()
        {
            return View();
        }
    }
}
