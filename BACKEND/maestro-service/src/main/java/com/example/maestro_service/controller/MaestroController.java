package com.example.maestro_service.controller;

import com.example.maestro_service.model.Maestro;
import com.example.maestro_service.service.MaestroService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/maestros")
public class MaestroController {

    private final MaestroService maestroService;

    public MaestroController(MaestroService maestroService) {
        this.maestroService = maestroService;
    }

    @GetMapping
    public ResponseEntity<List<Maestro>> obtenerTodos() {
        return ResponseEntity.ok(maestroService.obtenerTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Maestro> obtenerPorId(@PathVariable String id) {
        Optional<Maestro> maestro = maestroService.obtenerPorId(id);
        return maestro.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Maestro> guardarMaestro(@RequestBody Maestro maestro) {
        return ResponseEntity.ok(maestroService.guardarMaestro(maestro));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarMaestro(@PathVariable String id) {
        maestroService.eliminarMaestro(id);
        return ResponseEntity.noContent().build();
    }
}
