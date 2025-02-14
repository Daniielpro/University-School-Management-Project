package com.example.maestro_service.service;

import com.example.maestro_service.model.Maestro;
import com.example.maestro_service.repository.MaestroRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class MaestroService {

    private final MaestroRepository maestroRepository;

    public MaestroService(MaestroRepository maestroRepository) {
        this.maestroRepository = maestroRepository;
    }

    public List<Maestro> obtenerTodos() {
        return maestroRepository.findAll();
    }

    public Optional<Maestro> obtenerPorId(String id) {
        return maestroRepository.findById(id);
    }

    public Maestro guardarMaestro(Maestro maestro) {
        return maestroRepository.save(maestro);
    }

    public void eliminarMaestro(String id) {
        maestroRepository.deleteById(id);
    }
}
