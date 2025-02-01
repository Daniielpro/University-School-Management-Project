using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace msvcnotes.models;

public class Notes
{
  [Key]
 public int idNota {get;set;}
  public int Mensaje {get;set;}
  public DateTime fechacreacion {get;set;}
  public DateTime fecharecordatorio {get;set;}

}
