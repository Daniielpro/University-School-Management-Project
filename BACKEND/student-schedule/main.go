package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/graphql-go/handler"
	"student-schedule/database"
	customGraphQL "student-schedule/graphql" // Renombramos la importación para evitar conflictos
)

func main() {
	// Conectar a MongoDB
	db := database.NewDatabase("mongodb://localhost:27017", "student_schedule", "events")

	// Crear esquema GraphQL
	schema, err := customGraphQL.NewSchema(db) // Usamos el alias "customGraphQL"
	if err != nil {
		log.Fatal("Error al crear el esquema de GraphQL:", err)
	}

	// Configurar el manejador de GraphQL
	h := handler.New(&handler.Config{
		Schema:   &schema,
		Pretty:   true,
		GraphiQL: true, // Habilita la interfaz GraphiQL en el navegador
	})

	// Configurar servidor con Gin
	r := gin.Default()
	r.Static("/public", "./public")

	// Endpoint para GraphQL
	r.Any("/graphql", gin.WrapH(h))

	// Correr el servidor en el puerto 8080
	log.Println("Servidor corriendo en http://localhost:8080/graphql")
	log.Fatal(r.Run(":8080"))
}
