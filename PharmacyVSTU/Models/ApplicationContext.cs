using Microsoft.EntityFrameworkCore;

namespace PharmacyVSTU.Models
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<DoctorWorkingTime> DoctorWorkingTimes { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<DeseaseCardRecord> DeseaseCards { get; set; }
        

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
            modelBuilder.Entity<User>()
            .HasOne(p => p.Role)
            .WithMany(t => t.Users)
            .HasForeignKey(p => p.RoleKey);

            modelBuilder.Entity<Doctor>()
            .HasOne(p => p.User);

            modelBuilder.Entity<Patient>()
            .HasOne(p => p.User);

            modelBuilder.Entity<DoctorWorkingTime>()
            .HasOne(p => p.Doctor)
            .WithMany(t => t.DoctorWorkingTimes)
            .HasForeignKey(p => p.DoctorKey);

            modelBuilder.Entity<DeseaseCardRecord>()
            .HasOne(p => p.Patient)
            .WithMany(t => t.DeseaseCardRecords)
            .HasForeignKey(p => p.PatientKey);

            modelBuilder.Entity<DeseaseCardRecord>()
            .HasOne(p => p.Doctor)
            .WithMany(t => t.DeseaseCardRecords)
            .HasForeignKey(p => p.DoctorKey);

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