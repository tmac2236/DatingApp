using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;

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
        public DateTime DateOfBirth { get; set; }
        public DateTime LastActive { get; set; }
        [StringLength(50)]
        public string City { get; set; }
        [StringLength(50)]
        public string Country { get; set; }

        public ICollection<Photo> Photos { get; set; }

        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

    }
}