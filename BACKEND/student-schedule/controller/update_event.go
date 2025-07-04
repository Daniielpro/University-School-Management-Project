package controller

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"student-schedule/database"
)

// UpdateEvent maneja la actualización de un evento
func UpdateEvent(db *database.Database) gin.HandlerFunc {
	return func(c *gin.Context) {
		id, _ := primitive.ObjectIDFromHex(c.Param("id"))
		var event Event
		if err := c.ShouldBindJSON(&event); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		filter := bson.M{"_id": id}
		update := bson.M{"$set": event}
		_, err := db.Collection.UpdateOne(context.TODO(), filter, update)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo actualizar el evento"})
			return
		}

		c.JSON(http.StatusOK, event)
	}
}
