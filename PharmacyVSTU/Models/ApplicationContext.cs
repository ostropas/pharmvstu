using Microsoft.EntityFrameworkCore;

namespace PharmacyVSTU.Models
{
    public class ApplicationContext : DbContext
    {

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<MedicalCart> MedicalCarts { get; set; }
        public DbSet<Medicament> Medicaments { get; set; }
        public DbSet<Doctor> Doctors { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            Database.EnsureCreated();   // создаем базу данных при первом обращении
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
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

            modelBuilder.Entity<User>()
            .HasOne(p => p.Role)
            .WithMany(t => t.Users)
            .HasForeignKey(p => p.RoleKey);

            // Предзаполняем таблицы, такие как роли и т.п. при создании бд
            Prefill(modelBuilder);
        }

        /// <summary>
        /// Начальное предзаполнение бд
        /// </summary>
        /// <param name="modelBuilder"></param>
        private void Prefill(ModelBuilder modelBuilder)
        {
            // начальное предзаполнение таблиц
            modelBuilder.Entity<Role>().HasData(
            new Role[]
            {
                new Role { Id = 1, Name = "Doctor"},
                new Role { Id = 2, Name = "Client"}
            });
        }
    }
}