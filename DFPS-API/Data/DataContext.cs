using Microsoft.EntityFrameworkCore;
using DFPS.API.Models;
using DFPS.API.DTOs;
using DFPS_API.DTOs;

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

        //DTO
        public DbSet<GetReportDataPassDto> GetReportDataPassDto { get; set; }
        public DbSet<PDModelDto> GetPDModelDto { get; set; }
        public DbSet<AttendanceDto> GetAttendances { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<GetReportDataPassDto>()
                .HasNoKey();
            modelBuilder.Entity<PDModelDto>()
                .HasNoKey();
            modelBuilder.Entity<AttendanceDto>()
                .HasNoKey();                
        }
    }
}