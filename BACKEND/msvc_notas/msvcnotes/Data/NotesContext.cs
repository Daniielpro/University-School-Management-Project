using System;
using Microsoft.EntityFrameworkCore;
using msvcnotes.models;

namespace msvcnotes.Data;

public class NotesContext : DbContext
{

public NotesContext(DbContextOptions<NotesContext> options) :base(options){

}
public DbSet<Notes> Notas {get;set;}

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }

}

