package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/graphql-go/handler"
	"student-schedule/database"
	customGraphQL "student-schedule/graphql"
)

func main() {
	
	db := database.NewDatabase("mongodb://localhost:27017", "student_schedule", "events")

	
	schema, err := customGraphQL.NewSchema(db)
	if err != nil {
		log.Fatal("Error al crear el esquema de GraphQL:", err)
	}

	
	h := handler.New(&handler.Config{
		Schema:   &schema,
		Pretty:   true,
		GraphiQL: true,
	})

	
	r := gin.Default()

	
	r.Static("/public", "./public")

	
	r.GET("/", func(c *gin.Context) {
		c.File("./public/index.html")
	})

	
	r.POST("/graphql", gin.WrapH(h))
	r.GET("/graphql", gin.WrapH(h))

	
	log.Println("Servidor corriendo en http://localhost:8080/")
	log.Fatal(r.Run(":8080"))
}