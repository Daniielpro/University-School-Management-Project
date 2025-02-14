package com.example.maestro_service.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "maestros")
public class Maestro {
    
    @Id
    private String id;
    private String nombre;
    private String materia;

}

