using Microsoft.EntityFrameworkCore;
using DatingApp.API.Models;
namespace DatingApp.API.Data
{
    public class DataContext : DbContext
    {
        //Constructor
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        //EF
        public DbSet<Cust_Dept_Basic> Cust_Dept_Basic { get; set; }
        public DbSet<User> User { get; set; }

        public DbSet<Photo> Photo{get;set;}
    }
}