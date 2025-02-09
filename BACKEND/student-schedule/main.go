package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/graphql-go/handler"
	"student-schedule/database"
	customGraphQL "student-schedule/graphql"
)

func main() {
	// Conectar a MongoDB
	db := database.NewDatabase("mongodb://localhost:27017", "student_schedule", "events")

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

	// ✅ Crear instancia de Gin
	r := gin.Default()

	// ✅ Servir archivos estáticos desde `/public`, sin afectar otras rutas
	r.Static("/public", "./public")

	// ✅ Servir `index.html` en la raíz `/`
	r.GET("/", func(c *gin.Context) {
		c.File("./public/index.html")
	})

	// ✅ Endpoint para GraphQL
	r.POST("/graphql", gin.WrapH(h))
	r.GET("/graphql", gin.WrapH(h))

	// ✅ Iniciar el servidor
	log.Println("Servidor corriendo en http://localhost:8080/")
	log.Fatal(r.Run(":8080"))
}