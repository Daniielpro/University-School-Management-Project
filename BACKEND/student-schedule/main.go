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

	// ✅ Servir `index.html` en la ruta `/`
	r.GET("/", func(c *gin.Context) {
		c.File("./public/index.html")
	})

	// ✅ Endpoint para GraphQL
	r.Any("/graphql", gin.WrapH(h))

	// ✅ Iniciar el servidor
	log.Println("Servidor corriendo en http://0.0.0.0:8080/") // Cambié 35.153.238.113 por 0.0.0.0
	log.Fatal(r.Run("0.0.0.0:8080"))                          // Cambié localhost por 0.0.0.0 para escuchar en todas las interfaces
}
