using Microsoft.EntityFrameworkCore;
using DatingApp.API.Models;
namespace DatingApp.API.Data
{
    public class DataContext : DbContext
    {
       //Constructor
       public DataContext(DbContextOptions<DataContext> options) : base (options) {}
       //EF
       public virtual DbSet<Cust_Dept_Basic> Cust_Dept_Basic { get; set; }


       protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cust_Dept_Basic>(entity =>{
                entity.HasKey(x =>x.Id);
            });
        }
    }
}