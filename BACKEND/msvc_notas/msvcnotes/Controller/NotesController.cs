using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using msvcnotes.Data;
using msvcnotes.models;

namespace msvcnotes.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
          private readonly NotesContext _context ;
        public NotesController(NotesContext notasContext)
        {
            _context = notasContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notes>>> GetNotas()
        {
          return await _context.Notas.ToListAsync();

        }
        [HttpPost]
         public async Task<ActionResult<Notes>> PostNotas(Notes nota)
        {
          _context.Notas.Add(nota);
          await _context.SaveChangesAsync();
          return CreatedAtAction(nameof(GetNotas),new{id=nota.idNota},nota);
        } 
    }
}
