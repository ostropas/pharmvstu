using Microsoft.EntityFrameworkCore;

namespace PharmacyVSTU.Models
{
        public class ApplicationContext : DbContext
        {
            public DbSet<Client> Clients { get; set; }
            public DbSet<MedicalCart> MedicalCarts { get; set; }
            public DbSet<Medicament> Medicaments { get; set; }
            public DbSet<Doctor> Doctors { get; set; }

            public ApplicationContext(DbContextOptions<ApplicationContext> options)
                : base(options)
            {
                Database.EnsureCreated();   // создаем базу данных при первом обращении
            }

            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                modelBuilder.Entity<Client>().
                    ToTable("clients");

                modelBuilder.Entity<Doctor>()
                    .ToTable("doctor");
                
                modelBuilder.Entity<MedicalCart>()
                    .ToTable("medicalcart")
                    .HasOne(x => x.Client)
                    .WithMany(x => x.MedicalCarts)
                    .HasForeignKey(x => x.ClientForeignKey).
                    HasPrincipalKey(x => x.Id);
                
                modelBuilder.Entity<MedicalCart>()
                    .HasOne(x => x.Doctor)
                    .WithMany(x => x.MedicalCarts)
                    .HasForeignKey(x => x.DoctorForeignKey).
                    HasPrincipalKey(x => x.Id);
                
                modelBuilder.Entity<Medicament>().
                    ToTable("medicaments");
            }
        }
}