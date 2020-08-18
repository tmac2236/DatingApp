using System.ComponentModel.DataAnnotations;
using System;
namespace DatingApp.API.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [StringLength(50)]
        public string Account { get; set; }
        [StringLength(250)]
        public string Password { get; set; }
        [StringLength(100)]
        public string Email { get; set; }
        [StringLength(80)]
        public string Fullname { get; set; }

        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

    }
}