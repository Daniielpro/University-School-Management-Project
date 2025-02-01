﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using msvcnotes.Data;

#nullable disable

namespace msvcnotes.Migrations
{
    [DbContext(typeof(NotesContext))]
    partial class NotesContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("msvcnotes.models.Notes", b =>
                {
                    b.Property<int>("idNota")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("idNota"));

                    b.Property<int>("Mensaje")
                        .HasColumnType("int");

                    b.Property<DateTime>("fechacreacion")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("fecharecordatorio")
                        .HasColumnType("datetime2");

                    b.HasKey("idNota");

                    b.ToTable("Notas");
                });
#pragma warning restore 612, 618
        }
    }
}
