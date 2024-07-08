using System.ComponentModel.DataAnnotations;

namespace AjaxCrudCoreMvc.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage ="Name Cant be Blank")]
        public string Name { get; set; }
        [Required(ErrorMessage = "City Cant be Blank")]
        public string City { get; set; }
        [Required(ErrorMessage = "State Cant be Blank")]
        public string State { get; set; }
        [Required]
        public decimal? Salary { get; set; }
    }
}
