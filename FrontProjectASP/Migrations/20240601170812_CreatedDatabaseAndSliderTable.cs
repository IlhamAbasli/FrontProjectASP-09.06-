using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FrontProjectASP.Migrations
{
    public partial class CreatedDatabaseAndSliderTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Sliders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SliderTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SliderName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SliderDiscount = table.Column<int>(type: "int", nullable: false),
                    SliderDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SliderImage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActiveSlider = table.Column<bool>(type: "bit", nullable: false),
                    SliderNumber = table.Column<int>(type: "int", nullable: false),
                    SliderProductPrice = table.Column<int>(type: "int", nullable: false),
                    SoftDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sliders", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Sliders");
        }
    }
}
