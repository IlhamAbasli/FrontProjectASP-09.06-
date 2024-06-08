using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FrontProjectASP.Migrations
{
    public partial class RemovedStockTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_StockStatuses_StockStatusId",
                table: "Products");

            migrationBuilder.DropTable(
                name: "StockStatuses");

            migrationBuilder.DropIndex(
                name: "IX_Products_StockStatusId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "StockStatusId",
                table: "Products");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "StockStatusId",
                table: "Products",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "StockStatuses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SoftDeleted = table.Column<bool>(type: "bit", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockStatuses", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_StockStatusId",
                table: "Products",
                column: "StockStatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_StockStatuses_StockStatusId",
                table: "Products",
                column: "StockStatusId",
                principalTable: "StockStatuses",
                principalColumn: "Id");
        }
    }
}
