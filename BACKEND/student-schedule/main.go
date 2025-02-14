package main

import (
	"log"

	"student-schedule/database"
	customGraphQL "student-schedule/graphql"

	"github.com/gin-gonic/gin"
	"github.com/graphql-go/handler"
)

func main() {
	// Conectar a MongoDB
	db := database.NewDatabase("mongodb://admin:1751404730@54.84.7.37:27017/student_schedule?authSource=admin", "student_schedule", "events")

	// Crear esquema GraphQL
	schema, err := customGraphQL.NewSchema(db)
	if err != nil {
		log.Fatal("Error al crear el esquema de GraphQL:", err)
	}

	// Configurar el manejador de GraphQL
	h := handler.New(&handler.Config{
		Schema:   &schema,
		Pretty:   true,
		GraphiQL: true,
	})

	// ✅ Servir archivos estáticos (Frontend)
	r := gin.Default()
	r.Static("/public", "./public")

	r.GET("/", func(c *gin.Context) {
		c.String(200, "¡Bienvenido a Student Schedule Microservices!")
	})

	// ✅ Endpoint para GraphQL
	r.Any("/graphql", gin.WrapH(h))

	// ✅ Iniciar el servidor
	log.Println("Servidor corriendo en http://35.153.238.113:8080/")
	log.Fatal(r.Run(":8080"))
}
