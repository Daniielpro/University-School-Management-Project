package com.example.maestro_service.repository;

import com.example.maestro_service.model.Maestro;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaestroRepository extends MongoRepository<Maestro, String> {
}
