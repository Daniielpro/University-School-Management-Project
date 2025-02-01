using System.Globalization;
using Microsoft.AspNetCore.Localization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using msvcnotes.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<RequestLocalizationOptions>(option =>
{
option.DefaultRequestCulture = new RequestCulture("en-US");
option.SupportedCultures = new [] {new CultureInfo("en-Us")};
option.SupportedUICultures =new [] {new CultureInfo("en-Us")};

});

builder.Services.AddDbContext<NotesContext>(option =>
option.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

var app = builder.Build();

app.UseRequestLocalization();

using (var scope = app.Services.CreateScope() )
{
    var dbContext = scope.ServiceProvider.GetRequiredService<NotesContext>();
    dbContext.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.Run();
