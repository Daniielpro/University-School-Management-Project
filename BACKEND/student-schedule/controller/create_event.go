package controller

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"student-schedule/database"
)

// CreateEvent maneja la creación de un evento
func CreateEvent(db *database.Database) gin.HandlerFunc {
	return func(c *gin.Context) {
		var event Event
		if err := c.ShouldBindJSON(&event); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		event.ID = primitive.NewObjectID()
		_, err := db.Collection.InsertOne(context.TODO(), event)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo insertar el evento"})
			return
		}

		c.JSON(http.StatusCreated, event)
	}
}
