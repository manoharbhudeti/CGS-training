using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace mastercourse.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("Course", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CourseName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Details")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PlayListID")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("totalModule")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Courses");
                });

            modelBuilder.Entity("EmployeeDetails", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("EmployeeDetails");
                });

            modelBuilder.Entity("EmployeeProgress", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CourseID")
                        .HasColumnType("int");

                    b.Property<int>("EmployeeID")
                        .HasColumnType("int");

                    b.Property<int>("ModulesCompleted")
                        .HasColumnType("int");

                    b.Property<float>("Progress")
                        .HasColumnType("float");

                    b.Property<int>("TotalModule")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CourseID");

                    b.HasIndex("EmployeeID");

                    b.ToTable("EmployeeProgress");
                });

            modelBuilder.Entity("ModuleStatus", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CourseID")
                        .HasColumnType("int");

                    b.Property<int>("EmployeeID")
                        .HasColumnType("int");

                    b.Property<int>("ModuleNo")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CourseID");

                    b.HasIndex("EmployeeID");

                    b.ToTable("ModuleStatus");
                });

            modelBuilder.Entity("EmployeeProgress", b =>
                {
                    b.HasOne("Course", null)
                        .WithMany()
                        .HasForeignKey("CourseID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EmployeeDetails", null)
                        .WithMany()
                        .HasForeignKey("EmployeeID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ModuleStatus", b =>
                {
                    b.HasOne("Course", "Course")
                        .WithMany()
                        .HasForeignKey("CourseID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EmployeeDetails", "EmployeeDetail")
                        .WithMany()
                        .HasForeignKey("EmployeeID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Course");

                    b.Navigation("EmployeeDetail");
                });
#pragma warning restore 612, 618
        }
    }
}
