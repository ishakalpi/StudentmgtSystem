using Microsoft.EntityFrameworkCore;

namespace crudStudent.Models
{
    public class StudentDbContext : DbContext
    {
        public StudentDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            optionsBuilder.UseSqlServer("Data Source=.; initial Catalog=Students; User Id=sa; Password=123;TrustServerCertificate=True");

        }

    }
}
