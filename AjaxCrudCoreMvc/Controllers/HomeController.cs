using AjaxCrudCoreMvc.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace AjaxCrudCoreMvc.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly EmployeeDbContext _context;

        public HomeController(ILogger<HomeController> logger,EmployeeDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult EmployeeList()
        {
            var data = _context.Employees.ToList();
            return new JsonResult(data); 
        }
       
        public JsonResult AddEmployee(Employee emp)
        {
            var data = new Employee()
            {
                Name = emp.Name,    
                City = emp.City,
                State = emp.State,
                Salary = emp.Salary
            };
            _context.Employees.Add(data);
            _context.SaveChanges(); 
            return new JsonResult("data is saved");    
        }

        public JsonResult Delete(int id)
        {
            var data = _context.Employees.Where(x => x.Id == id).SingleOrDefault();
            _context.Employees.Remove(data);    
            _context.SaveChanges();
            return new JsonResult("data Deleted");
        }

        public JsonResult Edit(int id)
        {
            var data = _context.Employees.Where(x => x.Id == id).SingleOrDefault();
            return new JsonResult(data);    
        }
        [HttpPost]
        public JsonResult Update(Employee emp)
        {
            _context.Employees.Update(emp);
            _context.SaveChanges();
            return new JsonResult("Recard Updated !!");  
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
