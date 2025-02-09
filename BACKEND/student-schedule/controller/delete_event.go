package controller

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"student-schedule/database"
)


func DeleteEvent(db *database.Database) gin.HandlerFunc {
	return func(c *gin.Context) {
		id, _ := primitive.ObjectIDFromHex(c.Param("id"))
		filter := bson.M{"_id": id}
		_, err := db.Collection.DeleteOne(context.TODO(), filter)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "No se pudo eliminar el evento"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Evento eliminado exitosamente"})
	}
}
