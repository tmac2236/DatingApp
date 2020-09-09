using Microsoft.EntityFrameworkCore;
using DFPS.API.Models;
namespace DFPS.API.Data
{
    public class DataContext : DbContext
    {
        //Constructor
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        //EF
        public DbSet<User> User { get; set; }

        public DbSet<Jang1Base> Jang1Base { get; set; }
        public DbSet<Jang1HR> Jang1HR { get; set; }
        public DbSet<SampleWorkBase> SampleWorkBase { get; set; }
        public DbSet<SampleWorkProcess> SampleWorkProcess { get; set; }
        public DbSet<SampleWorkWorker> SampleWorkWorker { get; set; }
    }
}