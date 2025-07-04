package controller

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"student-schedule/database"
)

// GetEvents maneja la obtención de todos los eventos
func GetEvents(db *database.Database) gin.HandlerFunc {
	return func(c *gin.Context) {
		var events []Event
		cursor, err := db.Collection.Find(context.TODO(), bson.M{})
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudieron recuperar los eventos"})
			return
		}
		defer cursor.Close(context.TODO())

		for cursor.Next(context.TODO()) {
			var event Event
			cursor.Decode(&event)
			events = append(events, event)
		}

		c.JSON(http.StatusOK, events)
	}
}

