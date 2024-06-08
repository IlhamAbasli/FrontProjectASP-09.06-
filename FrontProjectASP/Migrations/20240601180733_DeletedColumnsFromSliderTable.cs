using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FrontProjectASP.Migrations
{
    public partial class DeletedColumnsFromSliderTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActiveSlider",
                table: "Sliders");

            migrationBuilder.DropColumn(
                name: "SliderProductPrice",
                table: "Sliders");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ActiveSlider",
                table: "Sliders",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "SliderProductPrice",
                table: "Sliders",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
