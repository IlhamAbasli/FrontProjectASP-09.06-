using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FrontProjectASP.Migrations
{
    public partial class CreatedRelationProductStock : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StockStatusId",
                table: "Products",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Products_StockStatusId",
                table: "Products",
                column: "StockStatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_StockStatuses_StockStatusId",
                table: "Products",
                column: "StockStatusId",
                principalTable: "StockStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_StockStatuses_StockStatusId",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_StockStatusId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "StockStatusId",
                table: "Products");
        }
    }
}
