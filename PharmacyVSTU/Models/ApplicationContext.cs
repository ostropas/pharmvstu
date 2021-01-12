using Microsoft.EntityFrameworkCore;

namespace PharmacyVSTU.Models
{
        public class ApplicationContext : DbContext
        {
            public DbSet<Client> Clients { get; set; }
            public ApplicationContext(DbContextOptions<ApplicationContext> options)
                : base(options)
            {
                Database.EnsureCreated();   // создаем базу данных при первом обращении
            }

            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                modelBuilder.Entity<Client>().ToTable("clients");
            }
        }
}