using System.ComponentModel.DataAnnotations;

namespace A4291_Final_Project_NET_Frontend.Dto.Req
{
    public class ReqRegistrasiUsers
    {
        [Required(ErrorMessage = "name is required")]
        [MaxLength(30, ErrorMessage = "name cannot exceed 30 characters")]
        public string Name { get; set; }


        [Required(ErrorMessage = "email is required")]
        [MaxLength(50, ErrorMessage = "name cannot exceed 30 characters")]
        public string Email { get; set; }

        [Required(ErrorMessage = "role is required")]
        [MaxLength(30, ErrorMessage = "role cannot exceed 30 characters")]
        public string Role { get; set; }
    }
}
